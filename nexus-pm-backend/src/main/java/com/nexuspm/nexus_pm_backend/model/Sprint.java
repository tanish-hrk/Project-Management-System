package com.nexuspm.nexus_pm_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "sprints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sprint {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "description", columnDefinition = "text")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SprintStatus status = SprintStatus.PLANNED;
    
    @Column(name = "goal", columnDefinition = "text")
    private String goal;
    
    @Column(name = "start_date")
    private LocalDateTime startDate;
    
    @Column(name = "end_date")
    private LocalDateTime endDate;
    
    @Column(name = "capacity_hours")
    private Double capacityHours;
    
    @Column(name = "velocity")
    private Integer velocity;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Issue> issues = new HashSet<>();
    
    // Helper methods
    public boolean isActive() {
        return status == SprintStatus.ACTIVE;
    }
    
    public boolean isCompleted() {
        return status == SprintStatus.COMPLETED;
    }
    
    public boolean isInProgress() {
        return isActive() && startDate != null && startDate.isBefore(LocalDateTime.now());
    }
    
    public boolean isOverdue() {
        return endDate != null && endDate.isBefore(LocalDateTime.now()) && !isCompleted();
    }
    
    public int getTotalStoryPoints() {
        return issues.stream()
                .filter(issue -> issue.getStoryPoints() != null)
                .mapToInt(Issue::getStoryPoints)
                .sum();
    }
    
    public int getCompletedStoryPoints() {
        return issues.stream()
                .filter(Issue::isCompleted)
                .filter(issue -> issue.getStoryPoints() != null)
                .mapToInt(Issue::getStoryPoints)
                .sum();
    }
    
    public double getProgress() {
        int total = getTotalStoryPoints();
        if (total == 0) return 0.0;
        return (double) getCompletedStoryPoints() / total * 100;
    }
    
    public long getDaysRemaining() {
        if (endDate == null) return 0;
        LocalDateTime now = LocalDateTime.now();
        if (endDate.isBefore(now)) return 0;
        return java.time.Duration.between(now, endDate).toDays();
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (status == SprintStatus.COMPLETED && completedAt == null) {
            completedAt = LocalDateTime.now();
        }
    }
    
    public enum SprintStatus {
        PLANNED, ACTIVE, COMPLETED, CANCELLED
    }
}
