package com.nexuspm.nexus_pm_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private UserInfoDto user;

    public AuthResponse(String token, String refreshToken, UserInfoDto user) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = user;
    }
}
