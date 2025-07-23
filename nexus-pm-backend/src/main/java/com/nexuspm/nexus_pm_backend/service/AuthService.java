package com.nexuspm.nexus_pm_backend.service;

import com.nexuspm.nexus_pm_backend.model.User;
import com.nexuspm.nexus_pm_backend.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public Map<String, Object> authenticate(String email, String password) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update last login
            userService.updateLastLogin(user.getId());

            // Generate tokens
            String accessToken = jwtTokenUtil.generateToken(userDetails);
            String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("tokenType", "Bearer");
            response.put("user", createUserResponse(user));

            log.info("User authenticated successfully: {}", email);
            return response;

        } catch (AuthenticationException e) {
            log.error("Authentication failed for user: {}", email);
            throw new RuntimeException("Invalid email or password");
        }
    }

    public Map<String, Object> register(String email, String password, String firstName, String lastName) {
        // Check if user already exists
        if (userService.existsByEmail(email)) {
            throw new RuntimeException("Email already registered: " + email);
        }

        // Create new user
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPasswordHash(password); // Will be encoded in userService.createUser()
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setRole(User.UserRole.MEMBER);

        User savedUser = userService.createUser(newUser);

        // Generate tokens
        UserDetails userDetails = userService.loadUserByUsername(email);
        String accessToken = jwtTokenUtil.generateToken(userDetails);
        String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

        // Create response
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);
        response.put("tokenType", "Bearer");
        response.put("user", createUserResponse(savedUser));

        log.info("User registered successfully: {}", email);
        return response;
    }

    public Map<String, Object> refreshToken(String refreshToken) {
        try {
            if (jwtTokenUtil.validateToken(refreshToken)) {
                String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
                UserDetails userDetails = userService.loadUserByUsername(username);
                
                String newAccessToken = jwtTokenUtil.generateToken(userDetails);
                
                Map<String, Object> response = new HashMap<>();
                response.put("accessToken", newAccessToken);
                response.put("tokenType", "Bearer");
                
                log.info("Token refreshed for user: {}", username);
                return response;
            } else {
                throw new RuntimeException("Invalid refresh token");
            }
        } catch (Exception e) {
            log.error("Error refreshing token: {}", e.getMessage());
            throw new RuntimeException("Invalid refresh token");
        }
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getCurrentUser(String email) {
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return createUserResponse(user);
    }

    private Map<String, Object> createUserResponse(User user) {
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        userResponse.put("email", user.getEmail());
        userResponse.put("firstName", user.getFirstName());
        userResponse.put("lastName", user.getLastName());
        userResponse.put("fullName", user.getFullName());
        userResponse.put("avatarUrl", user.getAvatarUrl());
        userResponse.put("role", user.getRole());
        userResponse.put("isActive", user.getIsActive());
        userResponse.put("isEmailVerified", user.getIsEmailVerified());
        userResponse.put("twoFactorEnabled", user.getTwoFactorEnabled());
        userResponse.put("timezone", user.getTimezone());
        userResponse.put("theme", user.getTheme());
        userResponse.put("createdAt", user.getCreatedAt());
        userResponse.put("lastLoginAt", user.getLastLoginAt());
        return userResponse;
    }
}
