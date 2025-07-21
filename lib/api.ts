import axios from "axios"
import { useAppStore } from "./store"

const API_BASE_URL = "http://localhost:3001/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const { token } = useAppStore.getState()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { reset } = useAppStore.getState()
      reset()
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),

  register: (userData: any) => api.post("/auth/register", userData),

  logout: () => api.post("/auth/logout"),

  refreshToken: () => api.post("/auth/refresh"),

  forgotPassword: (email: string) => api.post("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) => api.post("/auth/reset-password", { token, password }),
}

// Projects API
export const projectsAPI = {
  getAll: () => api.get("/projects"),

  getById: (id: string) => api.get(`/projects/${id}`),

  create: (projectData: any) => api.post("/projects", projectData),

  update: (id: string, projectData: any) => api.put(`/projects/${id}`, projectData),

  delete: (id: string) => api.delete(`/projects/${id}`),

  getMembers: (id: string) => api.get(`/projects/${id}/members`),

  addMember: (id: string, memberData: any) => api.post(`/projects/${id}/members`, memberData),

  removeMember: (id: string, userId: string) => api.delete(`/projects/${id}/members/${userId}`),

  updateMember: (id: string, userId: string, memberData: any) =>
    api.put(`/projects/${id}/members/${userId}`, memberData),
}

// Issues API
export const issuesAPI = {
  getAll: (params?: any) => api.get("/issues", { params }),

  getById: (id: string) => api.get(`/issues/${id}`),

  create: (issueData: any) => api.post("/issues", issueData),

  update: (id: string, issueData: any) => api.put(`/issues/${id}`, issueData),

  delete: (id: string) => api.delete(`/issues/${id}`),

  getByProject: (projectId: string, params?: any) => api.get(`/projects/${projectId}/issues`, { params }),

  getBySprint: (sprintId: string) => api.get(`/sprints/${sprintId}/issues`),

  getByEpic: (epicId: string) => api.get(`/epics/${epicId}/issues`),

  addToSprint: (issueId: string, sprintId: string) => api.post(`/issues/${issueId}/sprint`, { sprintId }),

  removeFromSprint: (issueId: string) => api.delete(`/issues/${issueId}/sprint`),

  addWatcher: (issueId: string, userId: string) => api.post(`/issues/${issueId}/watchers`, { userId }),

  removeWatcher: (issueId: string, userId: string) => api.delete(`/issues/${issueId}/watchers/${userId}`),

  getComments: (issueId: string) => api.get(`/issues/${issueId}/comments`),

  addComment: (issueId: string, commentData: any) => api.post(`/issues/${issueId}/comments`, commentData),

  updateComment: (issueId: string, commentId: string, commentData: any) =>
    api.put(`/issues/${issueId}/comments/${commentId}`, commentData),

  deleteComment: (issueId: string, commentId: string) => api.delete(`/issues/${issueId}/comments/${commentId}`),

  getAttachments: (issueId: string) => api.get(`/issues/${issueId}/attachments`),

  uploadAttachment: (issueId: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return api.post(`/issues/${issueId}/attachments`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  },

  deleteAttachment: (issueId: string, attachmentId: string) =>
    api.delete(`/issues/${issueId}/attachments/${attachmentId}`),

  getActivity: (issueId: string) => api.get(`/issues/${issueId}/activity`),

  logWork: (issueId: string, workLogData: any) => api.post(`/issues/${issueId}/worklog`, workLogData),
}

// Epics API
export const epicsAPI = {
  getAll: (projectId?: string) => api.get("/epics", { params: { projectId } }),

  getById: (id: string) => api.get(`/epics/${id}`),

  create: (epicData: any) => api.post("/epics", epicData),

  update: (id: string, epicData: any) => api.put(`/epics/${id}`, epicData),

  delete: (id: string) => api.delete(`/epics/${id}`),
}

// Sprints API
export const sprintsAPI = {
  getAll: (projectId: string) => api.get(`/projects/${projectId}/sprints`),

  getById: (id: string) => api.get(`/sprints/${id}`),

  create: (sprintData: any) => api.post("/sprints", sprintData),

  update: (id: string, sprintData: any) => api.put(`/sprints/${id}`, sprintData),

  delete: (id: string) => api.delete(`/sprints/${id}`),

  start: (id: string) => api.post(`/sprints/${id}/start`),

  complete: (id: string) => api.post(`/sprints/${id}/complete`),

  getMetrics: (id: string) => api.get(`/sprints/${id}/metrics`),

  getBurndown: (id: string) => api.get(`/sprints/${id}/burndown`),

  getVelocity: (projectId: string) => api.get(`/projects/${projectId}/velocity`),
}

// Search API
export const searchAPI = {
  search: (query: string, filters?: any) => api.get("/search", { params: { q: query, ...filters } }),

  suggestions: (query: string) => api.get("/search/suggestions", { params: { q: query } }),

  savedSearches: () => api.get("/search/saved"),

  saveSearch: (searchData: any) => api.post("/search/saved", searchData),

  deleteSavedSearch: (id: string) => api.delete(`/search/saved/${id}`),
}

// Users API
export const usersAPI = {
  getAll: () => api.get("/users"),

  getById: (id: string) => api.get(`/users/${id}`),

  update: (id: string, userData: any) => api.put(`/users/${id}`, userData),

  updatePreferences: (preferences: any) => api.put("/users/preferences", preferences),

  getActivity: (id: string) => api.get(`/users/${id}/activity`),

  getAssignedIssues: (id: string) => api.get(`/users/${id}/issues/assigned`),

  getReportedIssues: (id: string) => api.get(`/users/${id}/issues/reported`),

  getWatchedIssues: (id: string) => api.get(`/users/${id}/issues/watched`),
}

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get("/notifications"),

  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),

  markAllAsRead: () => api.put("/notifications/read-all"),

  delete: (id: string) => api.delete(`/notifications/${id}`),

  getSettings: () => api.get("/notifications/settings"),

  updateSettings: (settings: any) => api.put("/notifications/settings", settings),
}

// Dashboard API
export const dashboardAPI = {
  getWidgets: () => api.get("/dashboard/widgets"),

  saveWidget: (widgetData: any) => api.post("/dashboard/widgets", widgetData),

  updateWidget: (id: string, widgetData: any) => api.put(`/dashboard/widgets/${id}`, widgetData),

  deleteWidget: (id: string) => api.delete(`/dashboard/widgets/${id}`),

  getStats: () => api.get("/dashboard/stats"),

  getActivity: () => api.get("/dashboard/activity"),
}

// Reports API
export const reportsAPI = {
  getBurndown: (sprintId: string) => api.get(`/reports/burndown/${sprintId}`),

  getVelocity: (projectId: string) => api.get(`/reports/velocity/${projectId}`),

  getControlChart: (projectId: string) => api.get(`/reports/control-chart/${projectId}`),

  getTimeTracking: (projectId: string, params?: any) => api.get(`/reports/time-tracking/${projectId}`, { params }),

  getWorkload: (projectId: string) => api.get(`/reports/workload/${projectId}`),

  export: (reportType: string, params: any) =>
    api.get(`/reports/export/${reportType}`, {
      params,
      responseType: "blob",
    }),
}

export default api
