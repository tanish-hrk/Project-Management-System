"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanColumn } from "./kanban-column"
import { IssueCard } from "./issue-card"
import { useAppStore } from "@/lib/store"
import { socketManager } from "@/lib/socket"
import type { Task, Status } from "@/types"

interface KanbanBoardProps {
  projectId: string
}

// Mock statuses for demo
const mockStatuses: Status[] = [
  { id: "todo", name: "To Do", category: "todo", color: "#6B7280", order: 1 },
  { id: "in-progress", name: "In Progress", category: "in-progress", color: "#3B82F6", order: 2 },
  { id: "review", name: "In Review", category: "in-progress", color: "#F59E0B", order: 3 },
  { id: "done", name: "Done", category: "done", color: "#10B981", order: 4 },
]

// Mock issues for demo
const mockIssues: Task[] = [
  {
    id: "1",
    projectId: "1",
    key: "NEX-123",
    title: "Implement drag and drop functionality for Kanban board",
    description: "Add drag and drop support using @dnd-kit library",
    type: { id: "story", name: "Story", icon: "📖", color: "#4CAF50", subtask: false, statuses: [] },
    status: { id: "todo", name: "To Do", category: "todo", color: "#6B7280", order: 1 },
    priority: { id: "high", name: "High", icon: "🔴", color: "#F44336", order: 4 },
    assignee: "john-doe",
    reporter: "sarah-wilson",
    labels: ["frontend", "enhancement"],
    components: [],
    fixVersions: [],
    storyPoints: 8,
    watchers: ["john-doe", "sarah-wilson"],
    attachments: [],
    customFields: {},
    position: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    projectId: "1",
    key: "NEX-124",
    title: "Fix authentication bug in login flow",
    description: "Users are unable to login with valid credentials",
    type: { id: "bug", name: "Bug", icon: "🐛", color: "#F44336", subtask: false, statuses: [] },
    status: { id: "in-progress", name: "In Progress", category: "in-progress", color: "#3B82F6", order: 2 },
    priority: { id: "highest", name: "Highest", icon: "🔥", color: "#E91E63", order: 5 },
    assignee: "mike-johnson",
    reporter: "john-doe",
    labels: ["backend", "bug", "urgent"],
    components: ["authentication"],
    fixVersions: ["v1.2.0"],
    storyPoints: 5,
    watchers: ["john-doe", "mike-johnson", "sarah-wilson"],
    attachments: [],
    customFields: {},
    position: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    projectId: "1",
    key: "NEX-125",
    title: "Update user interface design",
    description: "Modernize the UI with new design system",
    type: { id: "task", name: "Task", icon: "✅", color: "#2196F3", subtask: false, statuses: [] },
    status: { id: "review", name: "In Review", category: "in-progress", color: "#F59E0B", order: 3 },
    priority: { id: "medium", name: "Medium", icon: "🟡", color: "#FF9800", order: 3 },
    assignee: "alice-brown",
    reporter: "sarah-wilson",
    labels: ["design", "frontend"],
    components: ["ui"],
    fixVersions: [],
    storyPoints: 13,
    watchers: ["alice-brown", "sarah-wilson"],
    attachments: [
      {
        id: "att1",
        filename: "design-mockup.png",
        originalName: "design-mockup.png",
        size: 1024000,
        mimeType: "image/png",
        url: "/placeholder.svg?height=200&width=300",
        uploadedBy: "alice-brown",
        uploadedAt: new Date(),
      },
    ],
    customFields: {},
    position: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    projectId: "1",
    key: "NEX-126",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment",
    type: { id: "task", name: "Task", icon: "✅", color: "#2196F3", subtask: false, statuses: [] },
    status: { id: "done", name: "Done", category: "done", color: "#10B981", order: 4 },
    priority: { id: "low", name: "Low", icon: "🟢", color: "#4CAF50", order: 2 },
    assignee: "tom-wilson",
    reporter: "john-doe",
    labels: ["devops", "infrastructure"],
    components: ["deployment"],
    fixVersions: ["v1.1.0"],
    storyPoints: 3,
    watchers: ["tom-wilson", "john-doe"],
    attachments: [],
    customFields: {},
    position: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const { issues, setIssues, currentProject } = useAppStore()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [boardIssues, setBoardIssues] = useState<Task[]>(mockIssues)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  // Initialize with mock data
  useEffect(() => {
    setIssues(mockIssues)
  }, [setIssues])

  const statuses = currentProject?.settings?.statuses || mockStatuses
  const projectIssues = boardIssues.filter((issue) => issue.projectId === projectId)

  const getIssuesByStatus = (statusId: string) => {
    return projectIssues.filter((issue) => issue.status.id === statusId).sort((a, b) => a.position - b.position)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)

    // Emit drag start event
    socketManager.dragIssueStart(active.id as string, "")
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the active issue
    const activeIssue = projectIssues.find((issue) => issue.id === activeId)
    if (!activeIssue) return

    // Handle dropping on column
    if (overId.startsWith("column-")) {
      const newStatusId = overId.replace("column-", "")
      const newStatus = statuses.find((s) => s.id === newStatusId)

      if (newStatus && activeIssue.status.id !== newStatusId) {
        // Update issue status optimistically
        const updatedIssue = {
          ...activeIssue,
          status: newStatus,
          updatedAt: new Date(),
        }

        setBoardIssues((prev) => prev.map((issue) => (issue.id === activeId ? updatedIssue : issue)))

        // Emit real-time update
        socketManager.updateIssue(updatedIssue)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Find the active issue
    const activeIssue = projectIssues.find((issue) => issue.id === activeId)
    if (!activeIssue) return

    let newStatusId = activeIssue.status.id
    let newPosition = activeIssue.position

    // Handle dropping on column
    if (overId.startsWith("column-")) {
      newStatusId = overId.replace("column-", "")
    } else {
      // Handle dropping on another issue
      const overIssue = projectIssues.find((issue) => issue.id === overId)
      if (overIssue) {
        newStatusId = overIssue.status.id
        newPosition = overIssue.position
      }
    }

    // Update issue if status or position changed
    if (newStatusId !== activeIssue.status.id || newPosition !== activeIssue.position) {
      const newStatus = statuses.find((s) => s.id === newStatusId)
      if (newStatus) {
        const updatedIssue = {
          ...activeIssue,
          status: newStatus,
          position: newPosition,
          updatedAt: new Date(),
        }

        setBoardIssues((prev) => prev.map((issue) => (issue.id === activeId ? updatedIssue : issue)))

        // Update global state
        setIssues(boardIssues.map((issue) => (issue.id === activeId ? updatedIssue : issue)))

        // Emit drag end event
        socketManager.dragIssueEnd(activeId, newStatusId, newPosition)
      }
    }
  }

  const activeIssue = activeId ? projectIssues.find((issue) => issue.id === activeId) : null

  // WIP limits (mock data)
  const wipLimits = {
    "in-progress": 3,
    review: 2,
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6 min-h-[600px]">
        <SortableContext items={statuses.map((s) => `column-${s.id}`)} strategy={horizontalListSortingStrategy}>
          {statuses.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              issues={getIssuesByStatus(status.id)}
              wipLimit={wipLimits[status.id as keyof typeof wipLimits]}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeIssue ? (
          <div className="rotate-3 opacity-90">
            <IssueCard issue={activeIssue} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
