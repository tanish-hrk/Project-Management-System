package com.nexuspm.nexus_pm_backend.controller;

import com.nexuspm.nexus_pm_backend.dto.AuthResponse;
import com.nexuspm.nexus_pm_backend.dto.LoginRequest;
import com.nexuspm.nexus_pm_backend.dto.SignupRequest;
import com.nexuspm.nexus_pm_backend.dto.UserInfoDto;
import com.nexuspm.nexus_pm_backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

// @Slf4j
// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Validation failed", "details", errorMessage));
        }

        try {
            AuthResponse response = authService.authenticate(loginRequest);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Login error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest, BindingResult bindingResult) {
        return registerUser(signupRequest, bindingResult);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest, BindingResult bindingResult) {
        return registerUser(signupRequest, bindingResult);
    }

    private ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldErrors().stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Validation failed", "details", errorMessage));
        }

        try {
            AuthResponse response = authService.register(signupRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            log.error("Registration error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> refreshRequest) {
        try {
            String refreshToken = refreshRequest.get("refreshToken");

            if (refreshToken == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Refresh token is required"));
            }

            Map<String, Object> response = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Token refresh error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            UserInfoDto user = authService.getCurrentUser(email);
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            log.error("Get current user error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Since we're using stateless JWT tokens, logout is handled on the client side
        // by removing the token from storage. Here we just return a success response.
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    // Demo credentials endpoint
    @PostMapping("/create-demo")
    public ResponseEntity<?> createDemoCredentials() {
        try {
            authService.createDemoCredentials();
            return ResponseEntity.ok(Map.of(
                "message", "Demo credentials created successfully",
                "credentials", Map.of(
                    "admin", Map.of("email", "admin@demo.com", "password", "demo123", "role", "ADMIN"),
                    "manager", Map.of("email", "manager@demo.com", "password", "demo123", "role", "MANAGER"),
                    "member", Map.of("email", "member@demo.com", "password", "demo123", "role", "MEMBER")
                )
            ));
        } catch (Exception e) {
            log.error("Error creating demo credentials: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to create demo credentials"));
        }
    }

    @GetMapping("/demo-credentials")
    public ResponseEntity<?> getDemoCredentials() {
        return ResponseEntity.ok(Map.of(
            "demo_credentials", Map.of(
                "admin", Map.of(
                    "email", "admin@demo.com",
                    "password", "demo123",
                    "role", "ADMIN",
                    "description", "Full system access"
                ),
                "manager", Map.of(
                    "email", "manager@demo.com",
                    "password", "demo123",
                    "role", "MANAGER",
                    "description", "Project management access"
                ),
                "member", Map.of(
                    "email", "member@demo.com",
                    "password", "demo123",
                    "role", "MEMBER",
                    "description", "Basic project access"
                )
            ),
            "instructions", "Use these credentials to test the application. Call POST /api/auth/create-demo first if not already done."
        ));
    }
}
