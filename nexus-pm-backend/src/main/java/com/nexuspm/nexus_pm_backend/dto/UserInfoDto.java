package com.nexuspm.nexus_pm_backend.dto;

import com.nexuspm.nexus_pm_backend.model.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UserInfoDto {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private String avatarUrl;
    private User.UserRole role;
    private Boolean isActive;
    private Boolean isEmailVerified;
    private String timezone;
    private String theme;
    private String provider;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;

    public UserInfoDto(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.fullName = user.getFullName();
        this.avatarUrl = user.getAvatarUrl();
        this.role = user.getRole();
        this.isActive = user.getIsActive();
        this.isEmailVerified = user.getIsEmailVerified();
        this.timezone = user.getTimezone();
        this.theme = user.getTheme();
        this.provider = user.getProvider();
        this.lastLoginAt = user.getLastLoginAt();
        this.createdAt = user.getCreatedAt();
    }
}
