"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Kanban, List, Calendar, BarChart3, Settings, Users, Target, GitBranch, Archive, Plus } from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

const projectViews = [
  { title: "Board", url: "/board", icon: Kanban },
  { title: "Backlog", url: "/backlog", icon: List },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Timeline", url: "/timeline", icon: GitBranch },
  { title: "Reports", url: "/reports", icon: BarChart3 },
]

const projectSettings = [
  { title: "Project Settings", url: "/settings", icon: Settings },
  { title: "Team Members", url: "/members", icon: Users },
  { title: "Releases", url: "/releases", icon: Archive },
]

export function ProjectSidebar() {
  const { currentProject, activeSprint, issues } = useAppStore()

  if (!currentProject) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>No Project Selected</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">Select a project to view details</p>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  const projectIssues = issues.filter((issue) => issue.projectId === currentProject.id)
  const completedIssues = projectIssues.filter((issue) => issue.status.category === "done")
  const progressPercentage = projectIssues.length > 0 ? (completedIssues.length / projectIssues.length) * 100 : 0

  return (
    <>
      {/* Project Overview */}
      <SidebarGroup>
        <SidebarGroupLabel>Project Overview</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-3 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentProject.avatar || "/placeholder.svg"} />
                <AvatarFallback>{currentProject.key}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{currentProject.name}</h3>
                <p className="text-xs text-muted-foreground">{currentProject.key}</p>
              </div>
            </div>

            {currentProject.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{currentProject.description}</p>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>
                  {completedIssues.length}/{projectIssues.length} issues
                </span>
              </div>
              <Progress value={progressPercentage} className="h-1.5" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Team</span>
              <div className="flex -space-x-1">
                {currentProject.members.slice(0, 3).map((member, index) => (
                  <Avatar key={index} className="h-5 w-5 border border-background">
                    <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                    <AvatarFallback className="text-xs">{member.userId.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ))}
                {currentProject.members.length > 3 && (
                  <div className="h-5 w-5 rounded-full bg-muted border border-background flex items-center justify-center">
                    <span className="text-xs">+{currentProject.members.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Active Sprint */}
      {activeSprint && (
        <SidebarGroup>
          <SidebarGroupLabel>Active Sprint</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-sm">{activeSprint.name}</span>
                <Badge variant="default" className="text-xs">
                  Active
                </Badge>
              </div>
              {activeSprint.goal && <p className="text-xs text-muted-foreground line-clamp-2">{activeSprint.goal}</p>}
              <div className="text-xs text-muted-foreground">
                {activeSprint.issues.length} issues •
                {Math.ceil((activeSprint.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Project Views */}
      <SidebarGroup>
        <SidebarGroupLabel>Views</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {projectViews.map((view) => (
              <SidebarMenuItem key={view.title}>
                <SidebarMenuButton asChild>
                  <Link href={`/projects/${currentProject.id}${view.url}`}>
                    <view.icon />
                    <span>{view.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Quick Actions */}
      <SidebarGroup>
        <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-2 space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Create Issue
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Target className="h-4 w-4 mr-2" />
              Start Sprint
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Project Settings */}
      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {projectSettings.map((setting) => (
              <SidebarMenuItem key={setting.title}>
                <SidebarMenuButton asChild>
                  <Link href={`/projects/${currentProject.id}${setting.url}`}>
                    <setting.icon />
                    <span>{setting.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
