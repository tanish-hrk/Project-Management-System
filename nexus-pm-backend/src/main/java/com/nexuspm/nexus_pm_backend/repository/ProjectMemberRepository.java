package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, UUID> {
    
    List<ProjectMember> findByProjectId(UUID projectId);
    
    List<ProjectMember> findByUserId(UUID userId);
    
    Optional<ProjectMember> findByProjectIdAndUserId(UUID projectId, UUID userId);
    
    List<ProjectMember> findByRole(ProjectMember.MemberRole role);
    
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.project.id = :projectId AND pm.role = :role")
    List<ProjectMember> findByProjectIdAndRole(@Param("projectId") UUID projectId, 
                                             @Param("role") ProjectMember.MemberRole role);
    
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.user.id = :userId AND pm.role = :role")
    List<ProjectMember> findByUserIdAndRole(@Param("userId") UUID userId, 
                                          @Param("role") ProjectMember.MemberRole role);
    
    @Query("SELECT COUNT(pm) FROM ProjectMember pm WHERE pm.project.id = :projectId")
    long countByProjectId(@Param("projectId") UUID projectId);
    
    @Query("SELECT COUNT(pm) FROM ProjectMember pm WHERE pm.user.id = :userId")
    long countByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.project.id = :projectId AND pm.role IN ('LEAD', 'MANAGER')")
    List<ProjectMember> findProjectLeadersAndManagers(@Param("projectId") UUID projectId);
    
    boolean existsByProjectIdAndUserId(UUID projectId, UUID userId);
    
    @Query("SELECT pm FROM ProjectMember pm LEFT JOIN FETCH pm.user WHERE pm.project.id = :projectId")
    List<ProjectMember> findByProjectIdWithUser(@Param("projectId") UUID projectId);
    
    @Query("SELECT pm FROM ProjectMember pm LEFT JOIN FETCH pm.project WHERE pm.user.id = :userId")
    List<ProjectMember> findByUserIdWithProject(@Param("userId") UUID userId);
}
