package com.nexuspm.nexus_pm_backend.controller;

import com.nexuspm.nexus_pm_backend.model.Issue;
import com.nexuspm.nexus_pm_backend.service.IssueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class IssueController {

    private final IssueService issueService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getIssuesByProject(
            @PathVariable UUID projectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search) {
        try {
            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

            if (search != null && !search.trim().isEmpty()) {
                Page<Issue> issues = issueService.searchIssuesByProject(projectId, search, pageable);
                return ResponseEntity.ok(issues);
            } else {
                List<Issue> issues = issueService.findByProjectId(projectId);
                return ResponseEntity.ok(issues);
            }
        } catch (Exception e) {
            log.error("Error getting issues: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIssueById(@PathVariable UUID id) {
        try {
            Issue issue = issueService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Issue not found"));
            return ResponseEntity.ok(issue);
        } catch (Exception e) {
            log.error("Error getting issue: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createIssue(@RequestBody Map<String, Object> issueRequest) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = auth.getName();
            
            Issue issue = new Issue();
            issue.setTitle((String) issueRequest.get("title"));
            issue.setDescription((String) issueRequest.get("description"));
            
            if (issueRequest.containsKey("type")) {
                issue.setType(Issue.IssueType.valueOf((String) issueRequest.get("type")));
            }
            if (issueRequest.containsKey("priority")) {
                issue.setPriority(Issue.IssuePriority.valueOf((String) issueRequest.get("priority")));
            }

            UUID projectId = UUID.fromString((String) issueRequest.get("projectId"));
            UUID reporterId = UUID.fromString((String) issueRequest.get("reporterId"));
            
            Issue savedIssue = issueService.createIssue(issue, projectId, reporterId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedIssue);

        } catch (Exception e) {
            log.error("Error creating issue: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIssue(@PathVariable UUID id, @RequestBody Issue issueUpdate) {
        try {
            Issue updatedIssue = issueService.updateIssue(id, issueUpdate);
            return ResponseEntity.ok(updatedIssue);
        } catch (Exception e) {
            log.error("Error updating issue: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateIssueStatus(@PathVariable UUID id, @RequestBody Map<String, String> statusRequest) {
        try {
            Issue.IssueStatus status = Issue.IssueStatus.valueOf(statusRequest.get("status"));
            Issue updatedIssue = issueService.updateIssueStatus(id, status);
            return ResponseEntity.ok(updatedIssue);
        } catch (Exception e) {
            log.error("Error updating issue status: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/assign")
    public ResponseEntity<?> assignIssue(@PathVariable UUID id, @RequestBody Map<String, String> assignRequest) {
        try {
            UUID assigneeId = UUID.fromString(assignRequest.get("assigneeId"));
            Issue updatedIssue = issueService.assignIssue(id, assigneeId);
            return ResponseEntity.ok(updatedIssue);
        } catch (Exception e) {
            log.error("Error assigning issue: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/unassign")
    public ResponseEntity<?> unassignIssue(@PathVariable UUID id) {
        try {
            Issue updatedIssue = issueService.unassignIssue(id);
            return ResponseEntity.ok(updatedIssue);
        } catch (Exception e) {
            log.error("Error unassigning issue: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIssue(@PathVariable UUID id) {
        try {
            issueService.deleteIssue(id);
            return ResponseEntity.ok(Map.of("message", "Issue deleted successfully"));
        } catch (Exception e) {
            log.error("Error deleting issue: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }
}
