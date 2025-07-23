package com.nexuspm.nexus_pm_backend.service;

import com.nexuspm.nexus_pm_backend.model.Project;
import com.nexuspm.nexus_pm_backend.model.ProjectMember;
import com.nexuspm.nexus_pm_backend.model.User;
import com.nexuspm.nexus_pm_backend.repository.ProjectRepository;
import com.nexuspm.nexus_pm_backend.repository.ProjectMemberRepository;
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
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Project> findById(UUID id) {
        return projectRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Project> findByKey(String key) {
        return projectRepository.findByKey(key);
    }

    @Transactional(readOnly = true)
    public List<Project> findByUserId(UUID userId) {
        return projectRepository.findProjectsByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<Project> findAccessibleProjectsByUserId(UUID userId) {
        return projectRepository.findAccessibleProjectsByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Page<Project> searchProjects(String search, Pageable pageable) {
        return projectRepository.searchProjects(search, pageable);
    }

    public Project createProject(Project project, UUID leadId) {
        // Validate project key uniqueness
        if (projectRepository.existsByKeyIgnoreCase(project.getKey())) {
            throw new RuntimeException("Project key already exists: " + project.getKey());
        }

        // Set project lead
        User lead = userService.findById(leadId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + leadId));
        project.setLead(lead);

        // Set default values
        if (project.getStatus() == null) {
            project.setStatus(Project.ProjectStatus.ACTIVE);
        }
        if (project.getVisibility() == null) {
            project.setVisibility(Project.ProjectVisibility.PRIVATE);
        }
        if (project.getSettings() == null) {
            project.setSettings("{}");
        }

        // Save project
        Project savedProject = projectRepository.save(project);

        // Add lead as project member with LEAD role
        ProjectMember leadMember = new ProjectMember();
        leadMember.setProject(savedProject);
        leadMember.setUser(lead);
        leadMember.setRole(ProjectMember.MemberRole.LEAD);
        projectMemberRepository.save(leadMember);

        log.info("Created project {} with key {}", savedProject.getName(), savedProject.getKey());
        return savedProject;
    }

    public Project updateProject(UUID projectId, Project projectUpdate) {
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        // Update allowed fields
        if (projectUpdate.getName() != null) {
            existingProject.setName(projectUpdate.getName());
        }
        if (projectUpdate.getDescription() != null) {
            existingProject.setDescription(projectUpdate.getDescription());
        }
        if (projectUpdate.getAvatarUrl() != null) {
            existingProject.setAvatarUrl(projectUpdate.getAvatarUrl());
        }
        if (projectUpdate.getRepositoryUrl() != null) {
            existingProject.setRepositoryUrl(projectUpdate.getRepositoryUrl());
        }
        if (projectUpdate.getStartDate() != null) {
            existingProject.setStartDate(projectUpdate.getStartDate());
        }
        if (projectUpdate.getEndDate() != null) {
            existingProject.setEndDate(projectUpdate.getEndDate());
        }
        if (projectUpdate.getSettings() != null) {
            existingProject.setSettings(projectUpdate.getSettings());
        }

        Project savedProject = projectRepository.save(existingProject);
        log.info("Updated project with id: {}", projectId);
        return savedProject;
    }

    public Project updateProjectStatus(UUID projectId, Project.ProjectStatus status) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        project.setStatus(status);
        Project savedProject = projectRepository.save(project);
        log.info("Updated project {} status to {}", projectId, status);
        return savedProject;
    }

    public Project updateProjectVisibility(UUID projectId, Project.ProjectVisibility visibility) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        project.setVisibility(visibility);
        Project savedProject = projectRepository.save(project);
        log.info("Updated project {} visibility to {}", projectId, visibility);
        return savedProject;
    }

    public Project archiveProject(UUID projectId) {
        return updateProjectStatus(projectId, Project.ProjectStatus.ARCHIVED);
    }

    public Project completeProject(UUID projectId) {
        return updateProjectStatus(projectId, Project.ProjectStatus.COMPLETED);
    }

    public void deleteProject(UUID projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        projectRepository.delete(project);
        log.info("Deleted project with id: {}", projectId);
    }

    // Project Members Management
    public ProjectMember addMemberToProject(UUID projectId, UUID userId, ProjectMember.MemberRole role) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Check if user is already a member
        if (projectMemberRepository.findByProjectIdAndUserId(projectId, userId).isPresent()) {
            throw new RuntimeException("User is already a member of this project");
        }

        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUser(user);
        member.setRole(role);

        ProjectMember savedMember = projectMemberRepository.save(member);
        log.info("Added user {} to project {} with role {}", userId, projectId, role);
        return savedMember;
    }

    public ProjectMember updateMemberRole(UUID projectId, UUID userId, ProjectMember.MemberRole newRole) {
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new RuntimeException("User is not a member of this project"));

        member.setRole(newRole);
        ProjectMember savedMember = projectMemberRepository.save(member);
        log.info("Updated user {} role in project {} to {}", userId, projectId, newRole);
        return savedMember;
    }

    public void removeMemberFromProject(UUID projectId, UUID userId) {
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new RuntimeException("User is not a member of this project"));

        // Don't allow removing the project lead
        if (member.getRole() == ProjectMember.MemberRole.LEAD) {
            throw new RuntimeException("Cannot remove project lead. Transfer leadership first.");
        }

        projectMemberRepository.delete(member);
        log.info("Removed user {} from project {}", userId, projectId);
    }

    @Transactional(readOnly = true)
    public List<ProjectMember> getProjectMembers(UUID projectId) {
        return projectMemberRepository.findByProjectId(projectId);
    }

    @Transactional(readOnly = true)
    public boolean isUserMemberOfProject(UUID projectId, UUID userId) {
        return projectMemberRepository.findByProjectIdAndUserId(projectId, userId).isPresent();
    }

    @Transactional(readOnly = true)
    public Optional<ProjectMember> getProjectMembership(UUID projectId, UUID userId) {
        return projectMemberRepository.findByProjectIdAndUserId(projectId, userId);
    }

    @Transactional(readOnly = true)
    public long countProjectsByStatus(Project.ProjectStatus status) {
        return projectRepository.countProjectsByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Project> findOverdueProjects() {
        return projectRepository.findOverdueProjects(LocalDateTime.now());
    }
}
