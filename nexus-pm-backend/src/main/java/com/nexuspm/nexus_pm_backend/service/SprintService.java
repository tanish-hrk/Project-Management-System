package com.nexuspm.nexus_pm_backend.service;

import com.nexuspm.nexus_pm_backend.model.Project;
import com.nexuspm.nexus_pm_backend.model.Sprint;
import com.nexuspm.nexus_pm_backend.repository.SprintRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class SprintService {

    private final SprintRepository sprintRepository;
    private final ProjectService projectService;

    @Transactional(readOnly = true)
    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Sprint> findById(UUID id) {
        return sprintRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Sprint> findByProjectId(UUID projectId) {
        return sprintRepository.findByProjectIdOrderByCreatedAtDesc(projectId);
    }

    @Transactional(readOnly = true)
    public Optional<Sprint> findActiveSprintByProjectId(UUID projectId) {
        return sprintRepository.findActiveSprintByProjectId(projectId);
    }

    @Transactional(readOnly = true)
    public List<Sprint> findPlannedSprintsByProjectId(UUID projectId) {
        return sprintRepository.findPlannedSprintsByProjectId(projectId);
    }

    @Transactional(readOnly = true)
    public List<Sprint> findCompletedSprintsByProjectId(UUID projectId) {
        return sprintRepository.findCompletedSprintsByProjectId(projectId);
    }

    public Sprint createSprint(Sprint sprint, UUID projectId) {
        // Get project
        Project project = projectService.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        sprint.setProject(project);

        // Set default values
        if (sprint.getStatus() == null) {
            sprint.setStatus(Sprint.SprintStatus.PLANNED);
        }

        Sprint savedSprint = sprintRepository.save(sprint);
        log.info("Created sprint {} in project {}", savedSprint.getName(), project.getName());
        return savedSprint;
    }

    public Sprint updateSprint(UUID sprintId, Sprint sprintUpdate) {
        Sprint existingSprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found with id: " + sprintId));

        // Update allowed fields
        if (sprintUpdate.getName() != null) {
            existingSprint.setName(sprintUpdate.getName());
        }
        if (sprintUpdate.getDescription() != null) {
            existingSprint.setDescription(sprintUpdate.getDescription());
        }
        if (sprintUpdate.getGoal() != null) {
            existingSprint.setGoal(sprintUpdate.getGoal());
        }
        if (sprintUpdate.getStartDate() != null) {
            existingSprint.setStartDate(sprintUpdate.getStartDate());
        }
        if (sprintUpdate.getEndDate() != null) {
            existingSprint.setEndDate(sprintUpdate.getEndDate());
        }
        if (sprintUpdate.getCapacityHours() != null) {
            existingSprint.setCapacityHours(sprintUpdate.getCapacityHours());
        }

        Sprint savedSprint = sprintRepository.save(existingSprint);
        log.info("Updated sprint with id: {}", sprintId);
        return savedSprint;
    }

    public Sprint startSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found with id: " + sprintId));

        if (sprint.getStatus() != Sprint.SprintStatus.PLANNED) {
            throw new RuntimeException("Only planned sprints can be started");
        }

        // Check if there's already an active sprint in the project
        Optional<Sprint> activeSprint = sprintRepository.findActiveSprintByProjectId(sprint.getProject().getId());
        if (activeSprint.isPresent()) {
            throw new RuntimeException("There is already an active sprint in this project");
        }

        sprint.setStatus(Sprint.SprintStatus.ACTIVE);
        if (sprint.getStartDate() == null) {
            sprint.setStartDate(LocalDateTime.now());
        }

        Sprint savedSprint = sprintRepository.save(sprint);
        log.info("Started sprint {} in project {}", sprint.getName(), sprint.getProject().getName());
        return savedSprint;
    }

    public Sprint completeSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found with id: " + sprintId));

        if (sprint.getStatus() != Sprint.SprintStatus.ACTIVE) {
            throw new RuntimeException("Only active sprints can be completed");
        }

        sprint.setStatus(Sprint.SprintStatus.COMPLETED);
        sprint.setCompletedAt(LocalDateTime.now());

        // Calculate velocity (completed story points)
        Integer completedStoryPoints = sprint.getCompletedStoryPoints();
        sprint.setVelocity(completedStoryPoints);

        Sprint savedSprint = sprintRepository.save(sprint);
        log.info("Completed sprint {} with velocity {}", sprint.getName(), completedStoryPoints);
        return savedSprint;
    }

    public Sprint cancelSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found with id: " + sprintId));

        if (sprint.getStatus() == Sprint.SprintStatus.COMPLETED) {
            throw new RuntimeException("Cannot cancel completed sprint");
        }

        sprint.setStatus(Sprint.SprintStatus.CANCELLED);

        Sprint savedSprint = sprintRepository.save(sprint);
        log.info("Cancelled sprint {}", sprint.getName());
        return savedSprint;
    }

    public void deleteSprint(UUID sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new RuntimeException("Sprint not found with id: " + sprintId));

        if (sprint.getStatus() == Sprint.SprintStatus.ACTIVE) {
            throw new RuntimeException("Cannot delete active sprint");
        }

        // Move all issues back to backlog
        sprint.getIssues().forEach(issue -> issue.setSprint(null));

        sprintRepository.delete(sprint);
        log.info("Deleted sprint with id: {}", sprintId);
    }

    @Transactional(readOnly = true)
    public List<Sprint> findOverdueSprints() {
        return sprintRepository.findOverdueSprints(LocalDateTime.now());
    }

    @Transactional(readOnly = true)
    public List<Sprint> findCurrentSprints() {
        return sprintRepository.findCurrentSprints(LocalDateTime.now());
    }

    @Transactional(readOnly = true)
    public long countByProjectIdAndStatus(UUID projectId, Sprint.SprintStatus status) {
        return sprintRepository.countByProjectIdAndStatus(projectId, status);
    }

    @Transactional(readOnly = true)
    public Double getAverageVelocityByProjectId(UUID projectId) {
        return sprintRepository.findAverageVelocityByProjectId(projectId);
    }

    @Transactional(readOnly = true)
    public List<Sprint> searchSprintsByProject(UUID projectId, String search) {
        return sprintRepository.searchSprintsByProject(projectId, search);
    }

    @Transactional(readOnly = true)
    public List<Sprint> findSprintsByProjectAndDateRange(UUID projectId, LocalDateTime startDate, LocalDateTime endDate) {
        return sprintRepository.findSprintsByProjectAndDateRange(projectId, startDate, endDate);
    }
}
