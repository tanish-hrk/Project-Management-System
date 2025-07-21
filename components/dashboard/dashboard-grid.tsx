"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Calendar, Clock, ArrowUpRight } from "lucide-react"

const projectStats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: BarChart3,
    color: "text-blue-600",
  },
  {
    title: "Active Issues",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Team Members",
    value: "32",
    change: "+4",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "This Month",
    value: "89%",
    change: "+5%",
    trend: "up",
    icon: Calendar,
    color: "text-orange-600",
  },
]

const recentProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Modern online shopping experience",
    progress: 75,
    status: "In Progress",
    team: [
      { name: "Alice Johnson", avatar: "/placeholder.svg?height=24&width=24" },
      { name: "Bob Smith", avatar: "/placeholder.svg?height=24&width=24" },
      { name: "Carol Davis", avatar: "/placeholder.svg?height=24&width=24" },
    ],
    dueDate: "Dec 15, 2024",
    priority: "High",
  },
  {
    id: "2",
    name: "Mobile App Redesign",
    description: "Complete UI/UX overhaul",
    progress: 45,
    status: "Planning",
    team: [
      { name: "David Wilson", avatar: "/placeholder.svg?height=24&width=24" },
      { name: "Emma Brown", avatar: "/placeholder.svg?height=24&width=24" },
    ],
    dueDate: "Jan 20, 2025",
    priority: "Medium",
  },
  {
    id: "3",
    name: "API Integration",
    description: "Third-party service connections",
    progress: 90,
    status: "Review",
    team: [
      { name: "Frank Miller", avatar: "/placeholder.svg?height=24&width=24" },
      { name: "Grace Lee", avatar: "/placeholder.svg?height=24&width=24" },
      { name: "Henry Taylor", avatar: "/placeholder.svg?height=24&width=24" },
      { name: "Ivy Chen", avatar: "/placeholder.svg?height=24&width=24" },
    ],
    dueDate: "Nov 30, 2024",
    priority: "High",
  },
]

export function DashboardGrid() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectStats.map((stat, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-300">
                <span className="text-green-400">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Projects</CardTitle>
              <CardDescription className="text-gray-300">Your active projects and their progress</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View All
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-white">{project.name}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        project.priority === "High"
                          ? "border-red-500 text-red-400"
                          : project.priority === "Medium"
                            ? "border-yellow-500 text-yellow-400"
                            : "border-green-500 text-green-400"
                      }`}
                    >
                      {project.priority}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-gray-300">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-black">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-white/20 border-2 border-black flex items-center justify-center">
                          <span className="text-xs text-white font-medium">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{project.team.length} members</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Due {project.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
