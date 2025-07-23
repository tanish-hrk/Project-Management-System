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
@Table(name = "issues")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    
    @Column(name = "key", nullable = false)
    private String key;
    
    @Column(name = "title", nullable = false)
    private String title;
    
    @Column(name = "description", columnDefinition = "text")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private IssueType type = IssueType.TASK;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private IssueStatus status = IssueStatus.OPEN;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private IssuePriority priority = IssuePriority.MEDIUM;
    
    @Column(name = "story_points")
    private Integer storyPoints;
    
    @Column(name = "estimate_hours")
    private Double estimateHours;
    
    @Column(name = "time_spent_hours")
    private Double timeSpentHours = 0.0;
    
    @Column(name = "resolution")
    private String resolution;
    
    @Column(name = "due_date")
    private LocalDateTime dueDate;
    
    @Column(name = "custom_fields", columnDefinition = "jsonb")
    private String customFields = "{}";
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    private User assignee;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Issue parent;
    
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Issue> subtasks = new HashSet<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;
    
    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Comment> comments = new HashSet<>();
    
    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Attachment> attachments = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "issue_labels",
        joinColumns = @JoinColumn(name = "issue_id"),
        inverseJoinColumns = @JoinColumn(name = "label_id")
    )
    private Set<IssueLabel> labels = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "issue_watchers",
        joinColumns = @JoinColumn(name = "issue_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> watchers = new HashSet<>();
    
    // Helper methods
    public String getDisplayKey() {
        return project.getKey() + "-" + key;
    }
    
    public boolean isCompleted() {
        return status == IssueStatus.CLOSED || status == IssueStatus.RESOLVED;
    }
    
    public boolean isInProgress() {
        return status == IssueStatus.IN_PROGRESS;
    }
    
    public boolean isOverdue() {
        return dueDate != null && dueDate.isBefore(LocalDateTime.now()) && !isCompleted();
    }
    
    public void addWatcher(User user) {
        watchers.add(user);
        user.getWatchedIssues().add(this);
    }
    
    public void removeWatcher(User user) {
        watchers.remove(user);
        user.getWatchedIssues().remove(this);
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if ((status == IssueStatus.RESOLVED || status == IssueStatus.CLOSED) && resolvedAt == null) {
            resolvedAt = LocalDateTime.now();
        }
    }
    
    public enum IssueType {
        EPIC, STORY, TASK, BUG, SUBTASK
    }
    
    public enum IssueStatus {
        OPEN, IN_PROGRESS, IN_REVIEW, TESTING, RESOLVED, CLOSED, BLOCKED
    }
    
    public enum IssuePriority {
        LOWEST, LOW, MEDIUM, HIGH, HIGHEST
    }
}
