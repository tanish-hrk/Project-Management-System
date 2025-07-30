package com.nexuspm.nexus_pm_backend.config;

import com.nexuspm.nexus_pm_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;

// @Slf4j
// @Configuration
// @RequiredArgsConstructor
public class DataInitializationConfig {

    private final AuthService authService;
    private final DataSource dataSource;

    @EventListener(ApplicationReadyEvent.class)
    @Async
    public void initData() {
        try {
            log.info("Initializing demo data...");
            
            // Wait for schema to be ready with retry logic
            if (waitForSchemaReady()) {
                authService.createDemoCredentials();
                log.info("Demo data initialization completed.");
            } else {
                log.warn("Schema not ready after waiting. Skipping demo data initialization.");
            }
        } catch (Exception e) {
            log.warn("Failed to initialize demo data: {}", e.getMessage());
            log.debug("Full error:", e);
        }
    }

    private boolean waitForSchemaReady() {
        int maxRetries = 20;
        int retryDelay = 500; // 500ms
        
        for (int i = 0; i < maxRetries; i++) {
            try {
                Thread.sleep(retryDelay);
                
                try (Connection connection = dataSource.getConnection()) {
                    DatabaseMetaData metaData = connection.getMetaData();
                    
                    // Check for USERS table (case insensitive)
                    boolean usersFound = false;
                    try (ResultSet rs = metaData.getTables(null, null, null, new String[]{"TABLE"})) {
                        while (rs.next()) {
                            String tableName = rs.getString("TABLE_NAME");
                            if ("USERS".equalsIgnoreCase(tableName)) {
                                usersFound = true;
                                break;
                            }
                        }
                    }
                    
                    if (usersFound) {
                        log.info("Schema is ready. USERS table found.");
                        return true;
                    }
                }
                
                log.debug("Schema not ready yet. Retry {}/{}", i + 1, maxRetries);
            } catch (Exception e) {
                log.debug("Error checking schema readiness: {}", e.getMessage());
            }
        }
        
        return false;
    }
}
