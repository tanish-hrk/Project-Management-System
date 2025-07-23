package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, UUID> {
    
    List<Sprint> findByProjectId(UUID projectId);
    
    List<Sprint> findByProjectIdAndStatus(UUID projectId, Sprint.SprintStatus status);
    
    List<Sprint> findByStatus(Sprint.SprintStatus status);
    
    @Query("SELECT s FROM Sprint s WHERE s.project.id = :projectId ORDER BY s.createdAt DESC")
    List<Sprint> findByProjectIdOrderByCreatedAtDesc(@Param("projectId") UUID projectId);
    
    @Query("SELECT s FROM Sprint s WHERE s.project.id = :projectId AND s.status = 'ACTIVE'")
    Optional<Sprint> findActiveSprintByProjectId(@Param("projectId") UUID projectId);
    
    @Query("SELECT s FROM Sprint s WHERE s.project.id = :projectId AND s.status = 'PLANNED' ORDER BY s.createdAt ASC")
    List<Sprint> findPlannedSprintsByProjectId(@Param("projectId") UUID projectId);
    
    @Query("SELECT s FROM Sprint s WHERE s.project.id = :projectId AND s.status = 'COMPLETED' ORDER BY s.completedAt DESC")
    List<Sprint> findCompletedSprintsByProjectId(@Param("projectId") UUID projectId);
    
    @Query("SELECT s FROM Sprint s WHERE s.endDate < :currentDate AND s.status = 'ACTIVE'")
    List<Sprint> findOverdueSprints(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT s FROM Sprint s WHERE s.startDate <= :currentDate AND s.endDate >= :currentDate AND s.status = 'ACTIVE'")
    List<Sprint> findCurrentSprints(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT COUNT(s) FROM Sprint s WHERE s.project.id = :projectId AND s.status = :status")
    long countByProjectIdAndStatus(@Param("projectId") UUID projectId, 
                                 @Param("status") Sprint.SprintStatus status);
    
    @Query("SELECT s FROM Sprint s LEFT JOIN FETCH s.issues WHERE s.id = :id")
    Optional<Sprint> findByIdWithIssues(@Param("id") UUID id);
    
    @Query("SELECT s FROM Sprint s WHERE s.project.id = :projectId AND " +
           "(LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(s.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Sprint> searchSprintsByProject(@Param("projectId") UUID projectId, 
                                      @Param("search") String search);
    
    @Query("SELECT s FROM Sprint s WHERE s.project.id = :projectId AND s.startDate BETWEEN :startDate AND :endDate")
    List<Sprint> findSprintsByProjectAndDateRange(@Param("projectId") UUID projectId,
                                                @Param("startDate") LocalDateTime startDate,
                                                @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT AVG(s.velocity) FROM Sprint s WHERE s.project.id = :projectId AND s.velocity IS NOT NULL AND s.status = 'COMPLETED'")
    Double findAverageVelocityByProjectId(@Param("projectId") UUID projectId);
}
