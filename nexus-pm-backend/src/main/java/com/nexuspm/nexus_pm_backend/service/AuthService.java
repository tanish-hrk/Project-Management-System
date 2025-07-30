package com.nexuspm.nexus_pm_backend.service;

import com.nexuspm.nexus_pm_backend.dto.AuthResponse;
import com.nexuspm.nexus_pm_backend.dto.LoginRequest;
import com.nexuspm.nexus_pm_backend.dto.SignupRequest;
import com.nexuspm.nexus_pm_backend.dto.UserInfoDto;
import com.nexuspm.nexus_pm_backend.model.User;
import com.nexuspm.nexus_pm_backend.security.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// @Slf4j
// @Service
// @Transactional
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public AuthService(@Lazy AuthenticationManager authenticationManager, 
                      UserService userService, 
                      JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    public AuthResponse authenticate(LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update last login
            userService.updateLastLogin(user.getId());

            // Generate tokens
            String accessToken = jwtTokenUtil.generateToken(userDetails);
            String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

            log.info("User authenticated successfully: {}", loginRequest.getEmail());
            return new AuthResponse(accessToken, refreshToken, new UserInfoDto(user));

        } catch (AuthenticationException e) {
            log.error("Authentication failed for user: {}", loginRequest.getEmail());
            throw new RuntimeException("Invalid email or password");
        }
    }

    public AuthResponse register(SignupRequest signupRequest) {
        // Check if user already exists
        if (userService.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email already registered: " + signupRequest.getEmail());
        }

        // Create new user
        User newUser = new User();
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPasswordHash(signupRequest.getPassword()); // Will be encoded in userService.createUser()
        newUser.setFirstName(signupRequest.getFirstName());
        newUser.setLastName(signupRequest.getLastName());
        newUser.setRole(User.UserRole.MEMBER);
        newUser.setProvider("local");
        newUser.setIsEmailVerified(true); // For demo purposes

        User savedUser = userService.createUser(newUser);

        // Generate tokens
        UserDetails userDetails = userService.loadUserByUsername(signupRequest.getEmail());
        String accessToken = jwtTokenUtil.generateToken(userDetails);
        String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

        log.info("User registered successfully: {}", signupRequest.getEmail());
        return new AuthResponse(accessToken, refreshToken, new UserInfoDto(savedUser));
    }

    public AuthResponse processOAuth2User(OAuth2User oAuth2User, String provider) {
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String avatarUrl = oAuth2User.getAttribute("picture");
        String providerId = oAuth2User.getAttribute("sub");

        User user = userService.findByEmail(email)
                .orElseGet(() -> {
                    // Create new user for OAuth2
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFirstName(firstName);
                    newUser.setLastName(lastName);
                    newUser.setAvatarUrl(avatarUrl);
                    newUser.setProvider(provider);
                    newUser.setProviderId(providerId);
                    newUser.setRole(User.UserRole.MEMBER);
                    newUser.setIsEmailVerified(true);
                    newUser.setIsActive(true);
                    return userService.createOAuth2User(newUser);
                });

        // Update user info if needed
        if (user.getAvatarUrl() == null && avatarUrl != null) {
            user.setAvatarUrl(avatarUrl);
            userService.updateUser(user);
        }

        // Update last login
        userService.updateLastLogin(user.getId());

        // Generate tokens
        UserDetails userDetails = userService.loadUserByUsername(email);
        String accessToken = jwtTokenUtil.generateToken(userDetails);
        String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails);

        log.info("OAuth2 user authenticated successfully: {} via {}", email, provider);
        return new AuthResponse(accessToken, refreshToken, new UserInfoDto(user));
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
    public UserInfoDto getCurrentUser(String email) {
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return new UserInfoDto(user);
    }

    // Demo credentials creation
    public void createDemoCredentials() {
        try {
            // Admin demo user
            if (!userService.existsByEmail("admin@demo.com")) {
                User adminUser = new User();
                adminUser.setEmail("admin@demo.com");
                adminUser.setPasswordHash("demo123");
                adminUser.setFirstName("Admin");
                adminUser.setLastName("User");
                adminUser.setRole(User.UserRole.ADMIN);
                adminUser.setProvider("local");
                adminUser.setIsEmailVerified(true);
                adminUser.setIsActive(true);
                userService.createUser(adminUser);
                log.info("Demo admin user created");
            }

            // Manager demo user
            if (!userService.existsByEmail("manager@demo.com")) {
                User managerUser = new User();
                managerUser.setEmail("manager@demo.com");
                managerUser.setPasswordHash("demo123");
                managerUser.setFirstName("Manager");
                managerUser.setLastName("User");
                managerUser.setRole(User.UserRole.MANAGER);
                managerUser.setProvider("local");
                managerUser.setIsEmailVerified(true);
                managerUser.setIsActive(true);
                userService.createUser(managerUser);
                log.info("Demo manager user created");
            }

            // Member demo user
            if (!userService.existsByEmail("member@demo.com")) {
                User memberUser = new User();
                memberUser.setEmail("member@demo.com");
                memberUser.setPasswordHash("demo123");
                memberUser.setFirstName("Member");
                memberUser.setLastName("User");
                memberUser.setRole(User.UserRole.MEMBER);
                memberUser.setProvider("local");
                memberUser.setIsEmailVerified(true);
                memberUser.setIsActive(true);
                userService.createUser(memberUser);
                log.info("Demo member user created");
            }
        } catch (Exception e) {
            log.error("Error creating demo credentials: {}", e.getMessage());
        }
    }
}
