"use client"

import { useState } from "react"
import { MoreHorizontal, Star, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data - in a real app, this would come from an API
const mockProjects = [
  {
    id: "p1",
    name: "Mobile App Redesign",
    description: "Redesigning the mobile app UI/UX for better user engagement",
    progress: 75,
    role: "Product Manager",
    team: [
      { id: "u1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u2", name: "Sarah Miller", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u3", name: "David Chen", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "Aug 15, 2023",
    status: "In Progress",
    favorite: true,
  },
  {
    id: "p2",
    name: "Dashboard Analytics",
    description: "Implementing analytics dashboard for real-time metrics",
    progress: 40,
    role: "Contributor",
    team: [
      { id: "u4", name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "Sep 30, 2023",
    status: "In Progress",
    favorite: false,
  },
  {
    id: "p3",
    name: "API Integration",
    description: "Integrating third-party APIs for payment processing",
    progress: 90,
    role: "Reviewer",
    team: [
      { id: "u5", name: "Michael Brown", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u6", name: "Lisa Wang", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "Jul 22, 2023",
    status: "Review",
    favorite: true,
  },
  {
    id: "p4",
    name: "User Documentation",
    description: "Creating comprehensive user documentation and guides",
    progress: 100,
    role: "Writer",
    team: [
      { id: "u1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u7", name: "Robert Kim", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "Jun 10, 2023",
    status: "Completed",
    favorite: false,
  },
  {
    id: "p5",
    name: "Marketing Website",
    description: "Developing new marketing website with updated branding",
    progress: 60,
    role: "Contributor",
    team: [
      { id: "u8", name: "Jennifer Lopez", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u9", name: "Thomas Wright", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "Oct 5, 2023",
    status: "In Progress",
    favorite: true,
  },
]

interface ProfileProjectsProps {
  limit?: number
}

export function ProfileProjects({ limit }: ProfileProjectsProps) {
  const [projects, setProjects] = useState(mockProjects)
  const displayProjects = limit ? projects.slice(0, limit) : projects

  const toggleFavorite = (projectId: string) => {
    setProjects(
      projects.map((project) => (project.id === projectId ? { ...project, favorite: !project.favorite } : project)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        {limit && (
          <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300">
            View All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {displayProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base text-white">{project.name}</CardTitle>
                  <CardDescription className="text-xs mt-1 text-gray-300">{project.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="light"
                    size="icon"
                    className={project.favorite ? "text-yellow-400" : "text-gray-400"}
                    onClick={() => toggleFavorite(project.id)}
                  >
                    <Star className="h-4 w-4" fill={project.favorite ? "currentColor" : "none"} />
                    <span className="sr-only">{project.favorite ? "Remove from favorites" : "Add to favorites"}</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="light" size="icon" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Project</DropdownMenuItem>
                      <DropdownMenuItem>View Board</DropdownMenuItem>
                      <DropdownMenuItem>Project Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Role:</span>
                    <span>{project.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Due:</span>
                    <span>{project.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : project.status === "Review"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full md:w-auto bg-transparent border-white/20 text-white hover:bg-white/10">
                    View Board
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
