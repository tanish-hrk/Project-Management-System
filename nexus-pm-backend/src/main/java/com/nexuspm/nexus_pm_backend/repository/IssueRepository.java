package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.Issue;
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
public interface IssueRepository extends JpaRepository<Issue, UUID> {
    
    Optional<Issue> findByKey(String key);
    
    List<Issue> findByProjectId(UUID projectId);
    
    List<Issue> findByProjectIdAndStatus(UUID projectId, Issue.IssueStatus status);
    
    List<Issue> findByAssigneeId(UUID assigneeId);
    
    List<Issue> findByReporterId(UUID reporterId);
    
    List<Issue> findBySprintId(UUID sprintId);
    
    List<Issue> findBySprintIdAndStatus(UUID sprintId, Issue.IssueStatus status);
    
    List<Issue> findByParentId(UUID parentId);
    
    List<Issue> findByType(Issue.IssueType type);
    
    List<Issue> findByPriority(Issue.IssuePriority priority);
    
    @Query("SELECT i FROM Issue i WHERE i.project.id = :projectId AND i.type = :type")
    List<Issue> findByProjectIdAndType(@Param("projectId") UUID projectId, 
                                     @Param("type") Issue.IssueType type);
    
    @Query("SELECT i FROM Issue i WHERE i.project.id = :projectId AND i.priority = :priority")
    List<Issue> findByProjectIdAndPriority(@Param("projectId") UUID projectId, 
                                         @Param("priority") Issue.IssuePriority priority);
    
    @Query("SELECT i FROM Issue i WHERE i.assignee.id = :assigneeId AND i.status IN :statuses")
    List<Issue> findByAssigneeIdAndStatusIn(@Param("assigneeId") UUID assigneeId, 
                                          @Param("statuses") List<Issue.IssueStatus> statuses);
    
    @Query("SELECT i FROM Issue i WHERE i.project.id = :projectId AND " +
           "(LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.key) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Issue> searchIssuesByProject(@Param("projectId") UUID projectId, 
                                    @Param("search") String search, 
                                    Pageable pageable);
    
    @Query("SELECT i FROM Issue i JOIN i.watchers w WHERE w.id = :userId")
    List<Issue> findWatchedIssuesByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT i FROM Issue i WHERE i.dueDate < :currentDate AND i.status NOT IN ('RESOLVED', 'CLOSED')")
    List<Issue> findOverdueIssues(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT i FROM Issue i WHERE i.project.id = :projectId AND i.sprint IS NULL")
    List<Issue> findBacklogIssuesByProject(@Param("projectId") UUID projectId);
    
    @Query("SELECT COUNT(i) FROM Issue i WHERE i.project.id = :projectId AND i.status = :status")
    long countByProjectIdAndStatus(@Param("projectId") UUID projectId, 
                                 @Param("status") Issue.IssueStatus status);
    
    @Query("SELECT COUNT(i) FROM Issue i WHERE i.assignee.id = :assigneeId AND i.status = :status")
    long countByAssigneeIdAndStatus(@Param("assigneeId") UUID assigneeId, 
                                  @Param("status") Issue.IssueStatus status);
    
    @Query("SELECT COUNT(i) FROM Issue i WHERE i.sprint.id = :sprintId")
    long countBySprintId(@Param("sprintId") UUID sprintId);
    
    @Query("SELECT SUM(i.storyPoints) FROM Issue i WHERE i.sprint.id = :sprintId AND i.storyPoints IS NOT NULL")
    Integer sumStoryPointsBySprintId(@Param("sprintId") UUID sprintId);
    
    @Query("SELECT SUM(i.storyPoints) FROM Issue i WHERE i.sprint.id = :sprintId AND " +
           "i.status IN ('RESOLVED', 'CLOSED') AND i.storyPoints IS NOT NULL")
    Integer sumCompletedStoryPointsBySprintId(@Param("sprintId") UUID sprintId);
    
    @Query("SELECT i FROM Issue i LEFT JOIN FETCH i.comments WHERE i.id = :id")
    Optional<Issue> findByIdWithComments(@Param("id") UUID id);
    
    @Query("SELECT i FROM Issue i LEFT JOIN FETCH i.attachments WHERE i.id = :id")
    Optional<Issue> findByIdWithAttachments(@Param("id") UUID id);
    
    @Query("SELECT i FROM Issue i LEFT JOIN FETCH i.labels WHERE i.id = :id")
    Optional<Issue> findByIdWithLabels(@Param("id") UUID id);
    
    @Query("SELECT i FROM Issue i LEFT JOIN FETCH i.watchers WHERE i.id = :id")
    Optional<Issue> findByIdWithWatchers(@Param("id") UUID id);
    
    @Query("SELECT i FROM Issue i WHERE i.updatedAt >= :since ORDER BY i.updatedAt DESC")
    List<Issue> findRecentlyUpdatedIssues(@Param("since") LocalDateTime since, Pageable pageable);
    
    @Query("SELECT MAX(CAST(SUBSTRING(i.key, LENGTH(i.project.key) + 2) AS int)) FROM Issue i WHERE i.project.id = :projectId")
    Integer findMaxIssueNumberByProjectId(@Param("projectId") UUID projectId);
}
