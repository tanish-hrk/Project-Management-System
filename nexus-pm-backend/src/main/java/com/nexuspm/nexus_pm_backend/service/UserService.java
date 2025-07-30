package com.nexuspm.nexus_pm_backend.service;

import com.nexuspm.nexus_pm_backend.model.User;
import com.nexuspm.nexus_pm_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<User> findAllActiveUsers() {
        return userRepository.findByIsActiveTrue();
    }

    @Transactional(readOnly = true)
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmailIgnoreCase(email);
    }

    public User createUser(User user) {
        if (existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }
        
        // Encode password
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        
        // Set default values
        if (user.getRole() == null) {
            user.setRole(User.UserRole.MEMBER);
        }
        if (user.getIsActive() == null) {
            user.setIsActive(true);
        }
        if (user.getIsEmailVerified() == null) {
            user.setIsEmailVerified(false);
        }
        if (user.getTwoFactorEnabled() == null) {
            user.setTwoFactorEnabled(false);
        }
        if (user.getTimezone() == null) {
            user.setTimezone("UTC");
        }
        if (user.getTheme() == null) {
            user.setTheme("system");
        }
        if (user.getPreferences() == null) {
            user.setPreferences("{}");
        }
        
        log.info("Creating new user with email: {}", user.getEmail());
        return userRepository.save(user);
    }

    public User updateUser(UUID userId, User userUpdate) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Update allowed fields
        if (userUpdate.getFirstName() != null) {
            existingUser.setFirstName(userUpdate.getFirstName());
        }
        if (userUpdate.getLastName() != null) {
            existingUser.setLastName(userUpdate.getLastName());
        }
        if (userUpdate.getAvatarUrl() != null) {
            existingUser.setAvatarUrl(userUpdate.getAvatarUrl());
        }
        if (userUpdate.getTimezone() != null) {
            existingUser.setTimezone(userUpdate.getTimezone());
        }
        if (userUpdate.getTheme() != null) {
            existingUser.setTheme(userUpdate.getTheme());
        }
        if (userUpdate.getPreferences() != null) {
            existingUser.setPreferences(userUpdate.getPreferences());
        }

        log.info("Updating user with id: {}", userId);
        return userRepository.save(existingUser);
    }

    public User updateUserRole(UUID userId, User.UserRole newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setRole(newRole);
        log.info("Updated user role for user {} to {}", userId, newRole);
        return userRepository.save(user);
    }

    public User activateUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setIsActive(true);
        log.info("Activated user with id: {}", userId);
        return userRepository.save(user);
    }

    public User deactivateUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setIsActive(false);
        log.info("Deactivated user with id: {}", userId);
        return userRepository.save(user);
    }

    public User verifyEmail(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setIsEmailVerified(true);
        log.info("Verified email for user with id: {}", userId);
        return userRepository.save(user);
    }

    public boolean changePassword(UUID userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        
        log.info("Password changed for user with id: {}", userId);
        return true;
    }

    public void updateLastLogin(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
    }

    public User createOAuth2User(User user) {
        // For OAuth2 users, we don't encode password as they don't have one
        User savedUser = userRepository.save(user);
        log.info("OAuth2 user created successfully with email: {}", user.getEmail());
        return savedUser;
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public long countActiveUsers() {
        return userRepository.countActiveUsers();
    }

    @Transactional(readOnly = true)
    public List<User> findUsersByRole(User.UserRole role) {
        return userRepository.findByIsActiveTrueAndRole(role);
    }
}
