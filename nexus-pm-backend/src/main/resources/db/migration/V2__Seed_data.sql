-- V2__Seed_data.sql
-- Insert initial seed data for development

-- Insert demo users
INSERT INTO users (id, email, password_hash, first_name, last_name, role, is_email_verified) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'demo@nexuspm.com', '$2a$10$X1.5K8K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9', 'Demo', 'User', 'ADMIN', true),
('550e8400-e29b-41d4-a716-446655440002', 'john@nexuspm.com', '$2a$10$X1.5K8K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9', 'John', 'Doe', 'MANAGER', true),
('550e8400-e29b-41d4-a716-446655440003', 'jane@nexuspm.com', '$2a$10$X1.5K8K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9', 'Jane', 'Smith', 'MEMBER', true),
('550e8400-e29b-41d4-a716-446655440004', 'mike@nexuspm.com', '$2a$10$X1.5K8K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9', 'Mike', 'Johnson', 'MEMBER', true),
('550e8400-e29b-41d4-a716-446655440005', 'sarah@nexuspm.com', '$2a$10$X1.5K8K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K9', 'Sarah', 'Wilson', 'MEMBER', true);

-- Insert demo projects
INSERT INTO projects (id, key, name, description, lead_id) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'NEX', 'Nexus Platform', 'Next-generation project management platform with advanced analytics', '550e8400-e29b-41d4-a716-446655440001'),
('650e8400-e29b-41d4-a716-446655440002', 'MOB', 'Mobile App', 'Cross-platform mobile application for project management', '550e8400-e29b-41d4-a716-446655440002'),
('650e8400-e29b-41d4-a716-446655440003', 'API', 'API Gateway', 'Centralized API gateway for microservices architecture', '550e8400-e29b-41d4-a716-446655440002');

-- Insert project members
INSERT INTO project_members (project_id, user_id, role) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'MANAGER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),

('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'MANAGER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'MEMBER'),

('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'MANAGER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER');

-- Insert demo sprints
INSERT INTO sprints (id, name, goal, status, project_id, start_date, end_date, capacity) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Sprint 24.3 - Authentication & Security', 'Implement user authentication system and enhance security features', 'ACTIVE', '650e8400-e29b-41d4-a716-446655440001', '2025-07-15', '2025-07-29', 40),
('750e8400-e29b-41d4-a716-446655440002', 'Sprint 24.2 - Dashboard Improvements', 'Enhance dashboard performance and add new analytics features', 'COMPLETED', '650e8400-e29b-41d4-a716-446655440001', '2025-07-01', '2025-07-14', 35),
('750e8400-e29b-41d4-a716-446655440003', 'Sprint M-01 - Mobile Foundation', 'Setup mobile app foundation and basic navigation', 'PLANNING', '650e8400-e29b-41d4-a716-446655440002', '2025-08-01', '2025-08-15', 30);

-- Insert demo issues
INSERT INTO issues (id, key, title, description, type, status, priority, story_points, project_id, assignee_id, reporter_id, sprint_id) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'NEX-123', 'Implement user authentication system', 'Create a secure authentication system with JWT tokens and role-based access control', 'STORY', 'IN_PROGRESS', 'HIGH', 8, '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440002', 'NEX-124', 'Add password reset functionality', 'Users should be able to reset their passwords via email', 'STORY', 'TODO', 'MEDIUM', 5, '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001'),
('850e8400-e29b-41d4-a716-446655440003', 'NEX-125', 'Fix dashboard loading performance', 'Dashboard takes too long to load, need to optimize queries', 'BUG', 'DONE', 'HIGH', 3, '650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440002'),
('850e8400-e29b-41d4-a716-446655440004', 'MOB-45', 'Setup React Native project', 'Initialize React Native project with basic navigation structure', 'TASK', 'TODO', 'HIGH', 5, '650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440003'),
('850e8400-e29b-41d4-a716-446655440005', 'API-101', 'Design API Gateway architecture', 'Create comprehensive architecture design for API Gateway implementation', 'EPIC', 'IN_PROGRESS', 'HIGH', 13, '650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', null);

-- Insert issue labels
INSERT INTO issue_labels (issue_id, label, color) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'authentication', '#FF5630'),
('850e8400-e29b-41d4-a716-446655440001', 'security', '#FF8B00'),
('850e8400-e29b-41d4-a716-446655440001', 'backend', '#36B37E'),
('850e8400-e29b-41d4-a716-446655440002', 'authentication', '#FF5630'),
('850e8400-e29b-41d4-a716-446655440002', 'email', '#0052CC'),
('850e8400-e29b-41d4-a716-446655440003', 'performance', '#FF5630'),
('850e8400-e29b-41d4-a716-446655440003', 'dashboard', '#6554C0'),
('850e8400-e29b-41d4-a716-446655440003', 'optimization', '#00875A'),
('850e8400-e29b-41d4-a716-446655440004', 'mobile', '#0052CC'),
('850e8400-e29b-41d4-a716-446655440004', 'react-native', '#00875A'),
('850e8400-e29b-41d4-a716-446655440005', 'architecture', '#6554C0'),
('850e8400-e29b-41d4-a716-446655440005', 'api', '#00875A');

-- Insert demo comments
INSERT INTO comments (issue_id, author_id, content) VALUES
('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Started working on the JWT implementation. Should have the basic structure ready by tomorrow.'),
('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Great! Let me know if you need help with the frontend integration.'),
('850e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'The performance issue was caused by N+1 queries. Fixed by adding proper JPA joins.'),
('850e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'Setting up the project structure with TypeScript support and React Navigation.');

-- Insert demo teams
INSERT INTO teams (id, name, description, lead_id, project_id) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'Development Team', 'Core development team for platform features', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001'),
('950e8400-e29b-41d4-a716-446655440002', 'Mobile Team', 'Mobile application development team', '550e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440002'),
('950e8400-e29b-41d4-a716-446655440003', 'Backend Team', 'Backend infrastructure and API team', '550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440003');

-- Insert team members
INSERT INTO team_members (team_id, user_id, role) VALUES
('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'LEAD'),
('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),

('950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'LEAD'),
('950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),

('950e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'LEAD'),
('950e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'MEMBER');
