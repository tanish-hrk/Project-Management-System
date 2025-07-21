"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronDown, Plus, Calendar, UserPlus, Target, AlertCircle, Clock, CheckCircle2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  key: string
  status: "active" | "planning" | "inactive"
  avatar: string
  stats: {
    open: number
    inProgress: number
    done: number
    members: number
  }
}

const projects: Project[] = [
  {
    id: "nexus-pm",
    name: "Nexus PM",
    key: "NPM",
    status: "active",
    avatar: "/placeholder.svg?height=24&width=24",
    stats: { open: 23, inProgress: 8, done: 156, members: 12 },
  },
  {
    id: "design-system",
    name: "Design System",
    key: "DS",
    status: "planning",
    avatar: "/placeholder.svg?height=24&width=24",
    stats: { open: 12, inProgress: 4, done: 89, members: 6 },
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    key: "MOB",
    status: "active",
    avatar: "/placeholder.svg?height=24&width=24",
    stats: { open: 34, inProgress: 2, done: 45, members: 8 },
  },
]

interface QuickProjectBarProps {
  className?: string
}

export function QuickProjectBar({ className }: QuickProjectBarProps) {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0])

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "planning":
        return "bg-yellow-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const quickActions = [
    {
      icon: Plus,
      label: "Create Issue",
      shortcut: "⌘C",
      onClick: () => console.log("Create Issue"),
    },
    {
      icon: Target,
      label: "New Sprint",
      shortcut: "⌘S",
      onClick: () => console.log("New Sprint"),
    },
    {
      icon: UserPlus,
      label: "Invite Members",
      shortcut: "⌘I",
      onClick: () => console.log("Invite Members"),
    },
    {
      icon: Calendar,
      label: "Schedule Meeting",
      shortcut: "⌘M",
      onClick: () => console.log("Schedule Meeting"),
    },
  ]

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-4", className)}>
        {/* Project Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 px-3 text-white/90 hover:text-white hover:bg-white/10 border border-white/20 bg-white/5"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={selectedProject.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs bg-blue-600 text-white">{selectedProject.key}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{selectedProject.name}</span>
                <div className={cn("w-2 h-2 rounded-full", getStatusColor(selectedProject.status))} />
                <ChevronDown className="h-3 w-3" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-black/95 border-gray-700 text-white">
            <DropdownMenuLabel className="text-gray-300">Switch Project</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="p-3 focus:bg-gray-800 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={project.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs bg-blue-600 text-white">{project.key}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.name}</span>
                        <div className={cn("w-2 h-2 rounded-full", getStatusColor(project.status))} />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 text-orange-400" />
                          {project.stats.open}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-blue-400" />
                          {project.stats.inProgress}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-400" />
                          {project.stats.done}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          {project.stats.members}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Project Stats */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-orange-300">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">{selectedProject.stats.open}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open Issues</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-blue-300">
                <Clock className="h-4 w-4" />
                <span className="font-medium">{selectedProject.stats.inProgress}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>In Progress</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-green-300">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">{selectedProject.stats.done}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Completed</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-gray-300">
                <Users className="h-4 w-4" />
                <span className="font-medium">{selectedProject.stats.members}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Team Members</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Quick Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {quickActions.map((action) => (
            <Tooltip key={action.label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={action.onClick}
                  className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                >
                  <action.icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {action.label} <span className="text-xs text-gray-400">{action.shortcut}</span>
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/95 border-gray-700 text-white">
              {quickActions.map((action) => (
                <DropdownMenuItem
                  key={action.label}
                  onClick={action.onClick}
                  className="focus:bg-gray-800 cursor-pointer"
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  <span>{action.label}</span>
                  <span className="ml-auto text-xs text-gray-400">{action.shortcut}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  )
}
