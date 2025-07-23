package com.nexuspm.nexus_pm_backend.controller;

import com.nexuspm.nexus_pm_backend.model.Project;
import com.nexuspm.nexus_pm_backend.model.ProjectMember;
import com.nexuspm.nexus_pm_backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<?> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String search) {
        try {
            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

            if (search != null && !search.trim().isEmpty()) {
                Page<Project> projects = projectService.searchProjects(search, pageable);
                return ResponseEntity.ok(projects);
            } else {
                // For now, return all projects - in production, you'd filter by user access
                List<Project> projects = projectService.findAll();
                return ResponseEntity.ok(projects);
            }
        } catch (Exception e) {
            log.error("Error getting projects: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable UUID id) {
        try {
            Project project = projectService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            log.error("Error getting project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/key/{key}")
    public ResponseEntity<?> getProjectByKey(@PathVariable String key) {
        try {
            Project project = projectService.findByKey(key)
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            log.error("Error getting project by key: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> createProject(@RequestBody Map<String, Object> projectRequest) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = auth.getName();
            
            // Extract project data
            Project project = new Project();
            project.setName((String) projectRequest.get("name"));
            project.setKey((String) projectRequest.get("key"));
            project.setDescription((String) projectRequest.get("description"));
            
            if (projectRequest.containsKey("visibility")) {
                project.setVisibility(Project.ProjectVisibility.valueOf((String) projectRequest.get("visibility")));
            }

            // For now, use the current user as the lead
            // In a real application, you might want to specify the lead ID
            UUID leadId = UUID.fromString((String) projectRequest.get("leadId"));
            
            Project savedProject = projectService.createProject(project, leadId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);

        } catch (Exception e) {
            log.error("Error creating project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> updateProject(@PathVariable UUID id, @RequestBody Project projectUpdate) {
        try {
            Project updatedProject = projectService.updateProject(id, projectUpdate);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            log.error("Error updating project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> updateProjectStatus(@PathVariable UUID id, @RequestBody Map<String, String> statusRequest) {
        try {
            Project.ProjectStatus status = Project.ProjectStatus.valueOf(statusRequest.get("status"));
            Project updatedProject = projectService.updateProjectStatus(id, status);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            log.error("Error updating project status: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable UUID id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok(Map.of("message", "Project deleted successfully"));
        } catch (Exception e) {
            log.error("Error deleting project: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    // Project Members endpoints
    @GetMapping("/{id}/members")
    public ResponseEntity<?> getProjectMembers(@PathVariable UUID id) {
        try {
            List<ProjectMember> members = projectService.getProjectMembers(id);
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            log.error("Error getting project members: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/members")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> addMemberToProject(@PathVariable UUID id, @RequestBody Map<String, Object> memberRequest) {
        try {
            UUID userId = UUID.fromString((String) memberRequest.get("userId"));
            ProjectMember.MemberRole role = ProjectMember.MemberRole.valueOf((String) memberRequest.get("role"));
            
            ProjectMember member = projectService.addMemberToProject(id, userId, role);
            return ResponseEntity.status(HttpStatus.CREATED).body(member);
        } catch (Exception e) {
            log.error("Error adding project member: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/members/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> updateMemberRole(@PathVariable UUID id, @PathVariable UUID userId, 
                                            @RequestBody Map<String, String> roleRequest) {
        try {
            ProjectMember.MemberRole role = ProjectMember.MemberRole.valueOf(roleRequest.get("role"));
            ProjectMember updatedMember = projectService.updateMemberRole(id, userId, role);
            return ResponseEntity.ok(updatedMember);
        } catch (Exception e) {
            log.error("Error updating member role: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}/members/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<?> removeMemberFromProject(@PathVariable UUID id, @PathVariable UUID userId) {
        try {
            projectService.removeMemberFromProject(id, userId);
            return ResponseEntity.ok(Map.of("message", "Member removed successfully"));
        } catch (Exception e) {
            log.error("Error removing project member: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }
}
