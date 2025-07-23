package com.nexuspm.nexus_pm_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private ActivityAction action;
    
    @Column(name = "entity_type", nullable = false)
    private String entityType;
    
    @Column(name = "entity_id", nullable = false)
    private String entityId;
    
    @Column(name = "description", columnDefinition = "text")
    private String description;
    
    @Column(name = "old_values", columnDefinition = "jsonb")
    private String oldValues;
    
    @Column(name = "new_values", columnDefinition = "jsonb")
    private String newValues;
    
    @Column(name = "metadata", columnDefinition = "jsonb")
    private String metadata = "{}";
    
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "user_agent")
    private String userAgent;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
    
    // Helper methods
    public boolean hasChanges() {
        return oldValues != null && newValues != null;
    }
    
    public boolean isSystemAction() {
        return user == null;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public enum ActivityAction {
        CREATED, UPDATED, DELETED, ASSIGNED, UNASSIGNED, COMMENTED, MOVED, TRANSITIONED,
        LOGGED_TIME, ATTACHED_FILE, REMOVED_FILE, ADDED_WATCHER, REMOVED_WATCHER,
        STARTED_SPRINT, COMPLETED_SPRINT, CANCELLED_SPRINT, JOINED_PROJECT, LEFT_PROJECT,
        LOGIN, LOGOUT, PASSWORD_CHANGED, EMAIL_VERIFIED, PROFILE_UPDATED
    }
}
