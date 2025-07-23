package com.nexuspm.nexus_pm_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<?> health() {
        Map<String, Object> healthStatus = new HashMap<>();
        
        try {
            // Check database connection
            try (Connection connection = dataSource.getConnection()) {
                boolean isValid = connection.isValid(5);
                healthStatus.put("database", isValid ? "UP" : "DOWN");
            }
        } catch (Exception e) {
            healthStatus.put("database", "DOWN");
            healthStatus.put("databaseError", e.getMessage());
        }
        
        healthStatus.put("status", "UP");
        healthStatus.put("timestamp", java.time.Instant.now().toString());
        healthStatus.put("service", "nexus-pm-backend");
        healthStatus.put("port", "8080");
        healthStatus.put("contextPath", "/api");
        
        return ResponseEntity.ok(healthStatus);
    }

    @GetMapping("/status")
    public ResponseEntity<?> status() {
        return ResponseEntity.ok(Map.of(
            "application", "Nexus PM Backend",
            "status", "Running",
            "version", "1.0.0",
            "timestamp", java.time.Instant.now().toString()
        ));
    }
}
