package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.Comment;
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
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    
    List<Comment> findByIssueId(UUID issueId);
    
    List<Comment> findByIssueIdOrderByCreatedAtAsc(UUID issueId);
    
    List<Comment> findByAuthorId(UUID authorId);
    
    List<Comment> findByParentId(UUID parentId);
    
    @Query("SELECT c FROM Comment c WHERE c.issue.id = :issueId AND c.parent IS NULL ORDER BY c.createdAt ASC")
    List<Comment> findTopLevelCommentsByIssueId(@Param("issueId") UUID issueId);
    
    @Query("SELECT c FROM Comment c WHERE c.issue.id = :issueId AND c.isInternal = :isInternal ORDER BY c.createdAt ASC")
    List<Comment> findByIssueIdAndIsInternal(@Param("issueId") UUID issueId, 
                                           @Param("isInternal") Boolean isInternal);
    
    Page<Comment> findByIssueIdOrderByCreatedAtDesc(UUID issueId, Pageable pageable);
    
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.issue.id = :issueId")
    long countByIssueId(@Param("issueId") UUID issueId);
    
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.author.id = :authorId")
    long countByAuthorId(@Param("authorId") UUID authorId);
    
    @Query("SELECT c FROM Comment c WHERE c.createdAt >= :since ORDER BY c.createdAt DESC")
    List<Comment> findRecentComments(@Param("since") LocalDateTime since, Pageable pageable);
    
    @Query("SELECT c FROM Comment c WHERE c.issue.project.id = :projectId ORDER BY c.createdAt DESC")
    Page<Comment> findByProjectId(@Param("projectId") UUID projectId, Pageable pageable);
}
