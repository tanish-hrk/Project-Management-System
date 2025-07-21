"use client"

import { useState } from "react"
import { KanbanBoard } from "@/components/board/kanban-board"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, Settings } from "lucide-react"
import { useAppStore } from "@/lib/store"

interface BoardPageProps {
  params: {
    id: string
  }
}

export default function BoardPage({ params }: BoardPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAssignee, setSelectedAssignee] = useState("all")
  const [selectedSprint, setSelectedSprint] = useState("active")

  const { currentProject } = useAppStore()

  const mockSprints = [
    { id: "active", name: "Current Sprint", status: "active" },
    { id: "sprint-1", name: "Sprint 1", status: "closed" },
    { id: "sprint-2", name: "Sprint 2", status: "future" },
  ]

  const mockAssignees = [
    { id: "all", name: "All assignees" },
    { id: "john", name: "John Doe" },
    { id: "sarah", name: "Sarah Wilson" },
    { id: "mike", name: "Mike Johnson" },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Board Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{currentProject?.name || "Project Board"}</h1>
              <p className="text-muted-foreground">Manage your team's work with Kanban boards</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Team
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Board Settings
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 px-4 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedSprint} onValueChange={setSelectedSprint}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockSprints.map((sprint) => (
                <SelectItem key={sprint.id} value={sprint.id}>
                  <div className="flex items-center gap-2">
                    <Badge variant={sprint.status === "active" ? "default" : "secondary"} className="text-xs">
                      {sprint.status}
                    </Badge>
                    {sprint.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mockAssignees.map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More filters
          </Button>
        </div>
      </div>

      {/* Board Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <KanbanBoard projectId={params.id} />
        </div>
      </div>
    </div>
  )
}
