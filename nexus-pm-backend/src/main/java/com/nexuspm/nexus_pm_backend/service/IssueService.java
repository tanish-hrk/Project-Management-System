package com.nexuspm.nexus_pm_backend.service;

import com.nexuspm.nexus_pm_backend.model.Issue;
import com.nexuspm.nexus_pm_backend.model.Project;
import com.nexuspm.nexus_pm_backend.model.Sprint;
import com.nexuspm.nexus_pm_backend.model.User;
import com.nexuspm.nexus_pm_backend.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
public class IssueService {

    private final IssueRepository issueRepository;
    private final ProjectService projectService;
    private final UserService userService;
    private final SprintService sprintService;

    @Transactional(readOnly = true)
    public List<Issue> findAll() {
        return issueRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Issue> findById(UUID id) {
        return issueRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Issue> findByKey(String key) {
        return issueRepository.findByKey(key);
    }

    @Transactional(readOnly = true)
    public List<Issue> findByProjectId(UUID projectId) {
        return issueRepository.findByProjectId(projectId);
    }

    @Transactional(readOnly = true)
    public List<Issue> findByAssigneeId(UUID assigneeId) {
        return issueRepository.findByAssigneeId(assigneeId);
    }

    @Transactional(readOnly = true)
    public List<Issue> findBySprintId(UUID sprintId) {
        return issueRepository.findBySprintId(sprintId);
    }

    @Transactional(readOnly = true)
    public List<Issue> findBacklogIssues(UUID projectId) {
        return issueRepository.findBacklogIssuesByProject(projectId);
    }

    @Transactional(readOnly = true)
    public Page<Issue> searchIssuesByProject(UUID projectId, String search, Pageable pageable) {
        return issueRepository.searchIssuesByProject(projectId, search, pageable);
    }

    public Issue createIssue(Issue issue, UUID projectId, UUID reporterId) {
        // Get project
        Project project = projectService.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        // Get reporter
        User reporter = userService.findById(reporterId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + reporterId));

        // Generate issue key
        String issueKey = generateIssueKey(project);
        issue.setKey(issueKey);
        issue.setProject(project);
        issue.setReporter(reporter);

        // Set default values
        if (issue.getType() == null) {
            issue.setType(Issue.IssueType.TASK);
        }
        if (issue.getStatus() == null) {
            issue.setStatus(Issue.IssueStatus.OPEN);
        }
        if (issue.getPriority() == null) {
            issue.setPriority(Issue.IssuePriority.MEDIUM);
        }
        if (issue.getTimeSpentHours() == null) {
            issue.setTimeSpentHours(0.0);
        }
        if (issue.getCustomFields() == null) {
            issue.setCustomFields("{}");
        }

        Issue savedIssue = issueRepository.save(issue);
        log.info("Created issue {} in project {}", savedIssue.getKey(), project.getKey());
        return savedIssue;
    }

    public Issue updateIssue(UUID issueId, Issue issueUpdate) {
        Issue existingIssue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        // Update allowed fields
        if (issueUpdate.getTitle() != null) {
            existingIssue.setTitle(issueUpdate.getTitle());
        }
        if (issueUpdate.getDescription() != null) {
            existingIssue.setDescription(issueUpdate.getDescription());
        }
        if (issueUpdate.getType() != null) {
            existingIssue.setType(issueUpdate.getType());
        }
        if (issueUpdate.getPriority() != null) {
            existingIssue.setPriority(issueUpdate.getPriority());
        }
        if (issueUpdate.getStoryPoints() != null) {
            existingIssue.setStoryPoints(issueUpdate.getStoryPoints());
        }
        if (issueUpdate.getEstimateHours() != null) {
            existingIssue.setEstimateHours(issueUpdate.getEstimateHours());
        }
        if (issueUpdate.getDueDate() != null) {
            existingIssue.setDueDate(issueUpdate.getDueDate());
        }
        if (issueUpdate.getCustomFields() != null) {
            existingIssue.setCustomFields(issueUpdate.getCustomFields());
        }

        Issue savedIssue = issueRepository.save(existingIssue);
        log.info("Updated issue with id: {}", issueId);
        return savedIssue;
    }

    public Issue updateIssueStatus(UUID issueId, Issue.IssueStatus status) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        Issue.IssueStatus oldStatus = issue.getStatus();
        issue.setStatus(status);

        // Set resolution timestamp
        if ((status == Issue.IssueStatus.RESOLVED || status == Issue.IssueStatus.CLOSED) 
            && issue.getResolvedAt() == null) {
            issue.setResolvedAt(LocalDateTime.now());
        }

        Issue savedIssue = issueRepository.save(issue);
        log.info("Updated issue {} status from {} to {}", issue.getKey(), oldStatus, status);
        return savedIssue;
    }

    public Issue assignIssue(UUID issueId, UUID assigneeId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        User assignee = userService.findById(assigneeId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + assigneeId));

        issue.setAssignee(assignee);
        Issue savedIssue = issueRepository.save(issue);
        log.info("Assigned issue {} to user {}", issue.getKey(), assignee.getEmail());
        return savedIssue;
    }

    public Issue unassignIssue(UUID issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        String previousAssignee = issue.getAssignee() != null ? issue.getAssignee().getEmail() : "none";
        issue.setAssignee(null);
        Issue savedIssue = issueRepository.save(issue);
        log.info("Unassigned issue {} from user {}", issue.getKey(), previousAssignee);
        return savedIssue;
    }

    public Issue moveIssueToSprint(UUID issueId, UUID sprintId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        if (sprintId != null) {
            Sprint sprint = sprintService.findById(sprintId)
                    .orElseThrow(() -> new RuntimeException("Sprint not found with id: " + sprintId));
            issue.setSprint(sprint);
            log.info("Moved issue {} to sprint {}", issue.getKey(), sprint.getName());
        } else {
            issue.setSprint(null);
            log.info("Moved issue {} to backlog", issue.getKey());
        }

        return issueRepository.save(issue);
    }

    public Issue addWatcher(UUID issueId, UUID userId) {
        Issue issue = issueRepository.findByIdWithWatchers(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        issue.addWatcher(user);
        Issue savedIssue = issueRepository.save(issue);
        log.info("Added watcher {} to issue {}", user.getEmail(), issue.getKey());
        return savedIssue;
    }

    public Issue removeWatcher(UUID issueId, UUID userId) {
        Issue issue = issueRepository.findByIdWithWatchers(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        issue.removeWatcher(user);
        Issue savedIssue = issueRepository.save(issue);
        log.info("Removed watcher {} from issue {}", user.getEmail(), issue.getKey());
        return savedIssue;
    }

    public Issue logTimeSpent(UUID issueId, Double hoursSpent) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        Double currentTime = issue.getTimeSpentHours() != null ? issue.getTimeSpentHours() : 0.0;
        issue.setTimeSpentHours(currentTime + hoursSpent);

        Issue savedIssue = issueRepository.save(issue);
        log.info("Logged {} hours to issue {}", hoursSpent, issue.getKey());
        return savedIssue;
    }

    public void deleteIssue(UUID issueId) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + issueId));

        issueRepository.delete(issue);
        log.info("Deleted issue with id: {}", issueId);
    }

    @Transactional(readOnly = true)
    public List<Issue> findOverdueIssues() {
        return issueRepository.findOverdueIssues(LocalDateTime.now());
    }

    @Transactional(readOnly = true)
    public long countByProjectIdAndStatus(UUID projectId, Issue.IssueStatus status) {
        return issueRepository.countByProjectIdAndStatus(projectId, status);
    }

    @Transactional(readOnly = true)
    public List<Issue> findWatchedIssuesByUserId(UUID userId) {
        return issueRepository.findWatchedIssuesByUserId(userId);
    }

    private String generateIssueKey(Project project) {
        Integer maxNumber = issueRepository.findMaxIssueNumberByProjectId(project.getId());
        int nextNumber = maxNumber != null ? maxNumber + 1 : 1;
        return project.getKey() + "-" + nextNumber;
    }
}
