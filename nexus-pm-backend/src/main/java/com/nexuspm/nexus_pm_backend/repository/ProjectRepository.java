package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    
    Optional<Project> findByKey(String key);
    
    Optional<Project> findByKeyIgnoreCase(String key);
    
    boolean existsByKey(String key);
    
    boolean existsByKeyIgnoreCase(String key);
    
    List<Project> findByStatus(Project.ProjectStatus status);
    
    List<Project> findByVisibility(Project.ProjectVisibility visibility);
    
    List<Project> findByLeadId(UUID leadId);
    
    @Query("SELECT p FROM Project p WHERE p.status = :status AND p.visibility = :visibility")
    List<Project> findByStatusAndVisibility(@Param("status") Project.ProjectStatus status, 
                                          @Param("visibility") Project.ProjectVisibility visibility);
    
    @Query("SELECT p FROM Project p WHERE " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.key) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Project> searchProjects(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT p FROM Project p JOIN p.members pm WHERE pm.user.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT p FROM Project p JOIN p.members pm WHERE pm.user.id = :userId AND p.status = :status")
    List<Project> findProjectsByUserIdAndStatus(@Param("userId") UUID userId, 
                                               @Param("status") Project.ProjectStatus status);
    
    @Query("SELECT p FROM Project p WHERE p.visibility = 'PUBLIC' OR " +
           "p.id IN (SELECT pm.project.id FROM ProjectMember pm WHERE pm.user.id = :userId)")
    List<Project> findAccessibleProjectsByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT p FROM Project p WHERE p.createdAt BETWEEN :startDate AND :endDate")
    List<Project> findProjectsCreatedBetween(@Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(p) FROM Project p WHERE p.status = :status")
    long countProjectsByStatus(@Param("status") Project.ProjectStatus status);
    
    @Query("SELECT p FROM Project p WHERE p.endDate < :currentDate AND p.status != 'COMPLETED'")
    List<Project> findOverdueProjects(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.members pm LEFT JOIN FETCH pm.user WHERE p.id = :id")
    Optional<Project> findByIdWithMembers(@Param("id") UUID id);
    
    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.sprints WHERE p.id = :id")
    Optional<Project> findByIdWithSprints(@Param("id") UUID id);
    
    @Query("SELECT DISTINCT p FROM Project p LEFT JOIN FETCH p.issues WHERE p.id IN :ids")
    List<Project> findByIdsWithIssues(@Param("ids") List<UUID> ids);
}
