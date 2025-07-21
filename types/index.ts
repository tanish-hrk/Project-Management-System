// Core Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "manager" | "developer" | "viewer"
  teams: string[]
  preferences: UserPreferences
  isOnline?: boolean
  lastSeen?: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  timezone: string
  notifications: NotificationSettings
  boardView: "kanban" | "scrum" | "calendar" | "gantt"
  sidebarCollapsed: boolean
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  mentions: boolean
  assignments: boolean
  comments: boolean
  statusChanges: boolean
}

// Project Hierarchy
export interface Project {
  id: string
  name: string
  key: string // e.g., "PROJ"
  description?: string
  avatar?: string
  lead: string
  members: ProjectMember[]
  settings: ProjectSettings
  status: "active" | "archived" | "template"
  visibility: "public" | "private"
  createdAt: Date
  updatedAt: Date
}

export interface ProjectMember {
  userId: string
  role: "admin" | "member" | "viewer"
  permissions: string[]
  joinedAt: Date
}

export interface ProjectSettings {
  workflow: Workflow
  issueTypes: IssueType[]
  priorities: Priority[]
  statuses: Status[]
  wipLimits: Record<string, number>
  swimlanes: Swimlane[]
  customFields: CustomField[]
}

export interface Epic {
  id: string
  projectId: string
  name: string
  description?: string
  status: "planning" | "in-progress" | "done" | "cancelled"
  startDate?: Date
  endDate?: Date
  progress: number
  color: string
  labels: string[]
  assignee?: string
  reporter: string
  watchers: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  projectId: string
  epicId?: string
  parentId?: string // For subtasks
  key: string // e.g., "PROJ-123"
  title: string
  description?: string
  type: IssueType
  status: Status
  priority: Priority
  assignee?: string
  reporter: string
  labels: string[]
  components: string[]
  fixVersions: string[]
  storyPoints?: number
  originalEstimate?: number
  remainingEstimate?: number
  timeSpent?: number
  watchers: string[]
  attachments: Attachment[]
  customFields: Record<string, any>
  position: number
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  resolution?: string
  resolutionDate?: Date
}

export interface IssueType {
  id: string
  name: string
  icon: string
  color: string
  description?: string
  subtask: boolean
  statuses: string[]
}

export interface Status {
  id: string
  name: string
  category: "todo" | "in-progress" | "done"
  color: string
  order: number
  description?: string
}

export interface Priority {
  id: string
  name: string
  icon: string
  color: string
  order: number
  description?: string
}

export interface Workflow {
  id: string
  name: string
  description?: string
  transitions: WorkflowTransition[]
  statuses: string[]
}

export interface WorkflowTransition {
  id: string
  name: string
  from: string
  to: string
  conditions?: WorkflowCondition[]
  validators?: WorkflowValidator[]
  postFunctions?: WorkflowPostFunction[]
}

export interface WorkflowCondition {
  type: string
  configuration: Record<string, any>
}

export interface WorkflowValidator {
  type: string
  configuration: Record<string, any>
}

export interface WorkflowPostFunction {
  type: string
  configuration: Record<string, any>
}

export interface Swimlane {
  id: string
  name: string
  query: string
  color: string
  order: number
  description?: string
}

export interface CustomField {
  id: string
  name: string
  type: "text" | "number" | "date" | "select" | "multiselect" | "user" | "boolean"
  required: boolean
  options?: string[]
  defaultValue?: any
}

// Sprint & Agile
export interface Sprint {
  id: string
  projectId: string
  name: string
  goal?: string
  startDate: Date
  endDate: Date
  status: "future" | "active" | "closed"
  issues: string[]
  capacity?: number
  createdAt: Date
  updatedAt: Date
}

export interface SprintMetrics {
  sprintId: string
  totalStoryPoints: number
  completedStoryPoints: number
  totalIssues: number
  completedIssues: number
  burndownData: BurndownPoint[]
  velocityData: VelocityPoint[]
  scopeChanges: ScopeChange[]
}

export interface BurndownPoint {
  date: Date
  remaining: number
  ideal: number
  completed: number
}

export interface VelocityPoint {
  sprint: string
  committed: number
  completed: number
  date: Date
}

export interface ScopeChange {
  date: Date
  issueId: string
  action: "added" | "removed"
  storyPoints: number
}

// Comments & Collaboration
export interface Comment {
  id: string
  issueId: string
  author: string
  content: string
  mentions: string[]
  reactions: Reaction[]
  parentId?: string // For threaded replies
  attachments: Attachment[]
  edited: boolean
  createdAt: Date
  updatedAt: Date
  editedAt?: Date
}

export interface Reaction {
  emoji: string
  users: string[]
  count: number
}

export interface Attachment {
  id: string
  filename: string
  originalName: string
  size: number
  mimeType: string
  url: string
  thumbnailUrl?: string
  uploadedBy: string
  uploadedAt: Date
}

// Real-time Collaboration
export interface PresenceUser {
  userId: string
  name: string
  avatar?: string
  cursor?: { x: number; y: number }
  selection?: string
  activity: "viewing" | "editing" | "idle"
  location: string // current page/issue
  lastSeen: Date
}

export interface TypingIndicator {
  userId: string
  issueId: string
  location: "description" | "comment"
  timestamp: Date
}

export interface LiveEdit {
  id: string
  issueId: string
  field: string
  userId: string
  operation: "insert" | "delete" | "replace"
  position: number
  content: string
  timestamp: Date
}

// Search & Filters
export interface SearchFilters {
  query?: string
  projects?: string[]
  assignees?: string[]
  reporters?: string[]
  statuses?: string[]
  priorities?: string[]
  types?: string[]
  labels?: string[]
  components?: string[]
  fixVersions?: string[]
  epics?: string[]
  sprints?: string[]
  watchers?: string[]
  createdAfter?: Date
  createdBefore?: Date
  updatedAfter?: Date
  updatedBefore?: Date
  dueAfter?: Date
  dueBefore?: Date
  customFields?: Record<string, any>
}

export interface SearchResult {
  issues: Task[]
  epics: Epic[]
  projects: Project[]
  total: number
  facets: SearchFacets
  suggestions: string[]
}

export interface SearchFacets {
  projects: FacetCount[]
  assignees: FacetCount[]
  statuses: FacetCount[]
  priorities: FacetCount[]
  types: FacetCount[]
  labels: FacetCount[]
}

export interface FacetCount {
  value: string
  label: string
  count: number
}

// Dashboard & Reporting
export interface DashboardWidget {
  id: string
  type: "chart" | "list" | "metric" | "calendar" | "activity" | "burndown" | "velocity"
  title: string
  description?: string
  config: WidgetConfig
  position: { x: number; y: number; w: number; h: number }
  refreshInterval?: number
}

export interface WidgetConfig {
  chartType?: "line" | "bar" | "pie" | "doughnut" | "area"
  dataSource: string
  filters: SearchFilters
  groupBy?: string
  timeRange?: string
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Time Tracking
export interface TimeEntry {
  id: string
  issueId: string
  userId: string
  description?: string
  timeSpent: number // in minutes
  date: Date
  billable: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WorkLog {
  id: string
  issueId: string
  userId: string
  timeSpent: number
  remainingEstimate?: number
  description?: string
  date: Date
  createdAt: Date
}

// Notifications
export interface Notification {
  id: string
  userId: string
  type: "mention" | "assignment" | "comment" | "status_change" | "due_date" | "sprint_start" | "sprint_end"
  title: string
  message: string
  entityType: "issue" | "project" | "sprint" | "epic"
  entityId: string
  actionUrl?: string
  read: boolean
  emailSent: boolean
  createdAt: Date
}

// Activity & Audit
export interface Activity {
  id: string
  entityType: "issue" | "project" | "sprint" | "epic" | "comment"
  entityId: string
  action: string
  actor: string
  changes?: ActivityChange[]
  metadata?: Record<string, any>
  createdAt: Date
}

export interface ActivityChange {
  field: string
  oldValue: any
  newValue: any
  displayName?: string
}

// Calendar & Timeline
export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  type: "issue" | "sprint" | "release" | "meeting"
  entityId: string
  color?: string
  description?: string
}

export interface TimelineItem {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  progress: number
  type: "epic" | "sprint" | "release" | "milestone"
  entityId: string
  color: string
  dependencies?: string[]
}

// Gantt Chart
export interface GanttTask {
  id: string
  name: string
  start: Date
  end: Date
  progress: number
  dependencies?: string[]
  type: "task" | "milestone" | "project"
  assignee?: string
  color?: string
  children?: GanttTask[]
}

// Socket Events
export interface SocketEvents {
  // Connection
  connect: () => void
  disconnect: () => void

  // Project
  join_project: (data: { projectId: string }) => void
  leave_project: (data: { projectId: string }) => void

  // Issues
  issue_updated: (issue: Task) => void
  issue_created: (issue: Task) => void
  issue_deleted: (data: { issueId: string }) => void

  // Drag & Drop
  issue_drag_start: (data: { issueId: string; fromStatus: string; userId: string }) => void
  issue_drag_end: (data: { issueId: string; toStatus: string; position: number; userId: string }) => void

  // Comments
  comment_added: (comment: Comment) => void
  comment_updated: (comment: Comment) => void
  comment_deleted: (data: { commentId: string }) => void

  // Typing
  typing_start: (data: { issueId: string; location: string; userId: string }) => void
  typing_stop: (data: { issueId: string; location: string; userId: string }) => void

  // Presence
  user_joined: (user: PresenceUser) => void
  user_left: (data: { userId: string }) => void
  presence_update: (user: PresenceUser) => void

  // Notifications
  notification: (notification: Notification) => void

  // Live Editing
  live_edit: (edit: LiveEdit) => void
}
