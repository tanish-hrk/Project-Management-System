package com.nexuspm.nexus_pm_backend.repository;

import com.nexuspm.nexus_pm_backend.model.User;
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
public interface UserRepository extends JpaRepository<User, UUID> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailIgnoreCase(String email);
    
    boolean existsByEmail(String email);
    
    boolean existsByEmailIgnoreCase(String email);
    
    List<User> findByIsActiveTrue();
    
    List<User> findByRole(User.UserRole role);
    
    List<User> findByIsActiveTrueAndRole(User.UserRole role);
    
    @Query("SELECT u FROM User u WHERE u.isActive = true AND " +
           "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<User> searchActiveUsers(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.id IN :userIds")
    List<User> findActiveUsersByIds(@Param("userIds") List<UUID> userIds);
    
    @Query("SELECT u FROM User u WHERE u.lastLoginAt < :dateTime")
    List<User> findUsersNotLoggedInSince(@Param("dateTime") LocalDateTime dateTime);
    
    @Query("SELECT u FROM User u WHERE u.isEmailVerified = false AND u.createdAt < :dateTime")
    List<User> findUnverifiedUsersCreatedBefore(@Param("dateTime") LocalDateTime dateTime);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.isActive = true")
    long countActiveUsers();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countUsersByRole(@Param("role") User.UserRole role);
    
    @Query("SELECT u FROM User u JOIN u.projectMemberships pm WHERE pm.project.id = :projectId AND u.isActive = true")
    List<User> findActiveUsersByProjectId(@Param("projectId") UUID projectId);
    
    @Query("SELECT u FROM User u WHERE u.twoFactorEnabled = true")
    List<User> findUsersWithTwoFactorEnabled();
}
