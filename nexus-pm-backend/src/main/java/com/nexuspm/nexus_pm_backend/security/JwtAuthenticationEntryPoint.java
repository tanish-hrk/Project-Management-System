package com.nexuspm.nexus_pm_backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

// @Slf4j
// @Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        
        log.error("Unauthorized error: {}", authException.getMessage());
        
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        
        String jsonResponse = """
            {
                "error": "Unauthorized",
                "message": "Full authentication is required to access this resource",
                "timestamp": "%s",
                "path": "%s"
            }
            """.formatted(java.time.Instant.now().toString(), request.getRequestURI());
            
        response.getWriter().write(jsonResponse);
    }
}
