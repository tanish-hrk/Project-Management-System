import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export interface Project {
  id: string
  name: string
  key: string
  description: string
  status: "active" | "archived" | "planning"
  members: User[]
  createdAt: Date
  updatedAt: Date
}

export interface Issue {
  id: string
  key: string
  title: string
  description: string
  type: "story" | "task" | "bug" | "epic"
  status: "todo" | "in-progress" | "review" | "done"
  priority: "highest" | "high" | "medium" | "low" | "lowest"
  assignee?: User
  reporter: User
  project: Project
  labels: string[]
  createdAt: Date
  updatedAt: Date
}

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void

  // Project state
  currentProject: Project | null
  projects: Project[]
  setCurrentProject: (project: Project | null) => void
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void

  // Issue state
  issues: Issue[]
  setIssues: (issues: Issue[]) => void
  addIssue: (issue: Issue) => void
  updateIssue: (id: string, updates: Partial<Issue>) => void
  deleteIssue: (id: string) => void

  // Search state
  searchQuery: string
  searchResults: any[]
  searchFilters: Record<string, any>
  setSearchQuery: (query: string) => void
  setSearchResults: (results: any[]) => void
  setSearchFilters: (filters: Record<string, any>) => void

  // UI state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // User state
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "admin",
        },
        setUser: (user) => set({ user }),

        // Project state
        currentProject: null,
        projects: [],
        setCurrentProject: (project) => set({ currentProject: project }),
        setProjects: (projects) => set({ projects }),
        addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
        updateProject: (id, updates) =>
          set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
          })),
        deleteProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),

        // Issue state
        issues: [],
        setIssues: (issues) => set({ issues }),
        addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
        updateIssue: (id, updates) =>
          set((state) => ({
            issues: state.issues.map((i) => (i.id === id ? { ...i, ...updates } : i)),
          })),
        deleteIssue: (id) => set((state) => ({ issues: state.issues.filter((i) => i.id !== id) })),

        // Search state
        searchQuery: "",
        searchResults: [],
        searchFilters: {},
        setSearchQuery: (query) => set({ searchQuery: query }),
        setSearchResults: (results) => set({ searchResults: results }),
        setSearchFilters: (filters) => set({ searchFilters: filters }),

        // UI state
        sidebarOpen: false,
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        theme: "system",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "app-storage",
        partialize: (state) => ({
          user: state.user,
          currentProject: state.currentProject,
          projects: state.projects,
          theme: state.theme,
        }),
      },
    ),
    {
      name: "app-store",
    },
  ),
)
