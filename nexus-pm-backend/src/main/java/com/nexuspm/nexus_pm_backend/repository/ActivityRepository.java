package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, UUID> {
    
    List<Activity> findByUserIdOrderByCreatedAtDesc(UUID userId);
    
    Page<Activity> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);
    
    List<Activity> findByProjectIdOrderByCreatedAtDesc(UUID projectId);
    
    Page<Activity> findByProjectIdOrderByCreatedAtDesc(UUID projectId, Pageable pageable);
    
    List<Activity> findByEntityTypeAndEntityId(String entityType, String entityId);
    
    Page<Activity> findByEntityTypeAndEntityIdOrderByCreatedAtDesc(String entityType, String entityId, Pageable pageable);
    
    List<Activity> findByAction(Activity.ActivityAction action);
    
    @Query("SELECT a FROM Activity a WHERE a.project.id = :projectId AND a.user.id = :userId ORDER BY a.createdAt DESC")
    Page<Activity> findByProjectIdAndUserIdOrderByCreatedAtDesc(@Param("projectId") UUID projectId, 
                                                              @Param("userId") UUID userId, 
                                                              Pageable pageable);
    
    @Query("SELECT a FROM Activity a WHERE a.createdAt >= :since ORDER BY a.createdAt DESC")
    Page<Activity> findRecentActivities(@Param("since") LocalDateTime since, Pageable pageable);
    
    @Query("SELECT a FROM Activity a WHERE a.project.id = :projectId AND a.createdAt >= :since ORDER BY a.createdAt DESC")
    List<Activity> findRecentActivitiesByProject(@Param("projectId") UUID projectId, 
                                                @Param("since") LocalDateTime since);
    
    @Query("SELECT a FROM Activity a WHERE a.user.id = :userId AND a.createdAt >= :since ORDER BY a.createdAt DESC")
    List<Activity> findRecentActivitiesByUser(@Param("userId") UUID userId, 
                                            @Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(a) FROM Activity a WHERE a.project.id = :projectId")
    long countByProjectId(@Param("projectId") UUID projectId);
    
    @Query("SELECT COUNT(a) FROM Activity a WHERE a.user.id = :userId")
    long countByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT a FROM Activity a WHERE a.createdAt < :dateTime")
    List<Activity> findOldActivities(@Param("dateTime") LocalDateTime dateTime);
    
    void deleteByCreatedAtBefore(LocalDateTime dateTime);
}
