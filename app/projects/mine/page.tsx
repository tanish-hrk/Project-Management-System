"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Grid, List, Plus, Star, Clock, Users, Target, TrendingUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const myProjects = [
  {
    id: "NEX",
    name: "Nexus Platform",
    description: "Next-generation project management platform with advanced analytics and team collaboration features",
    status: "Active",
    progress: 68,
    role: "Lead Developer",
    priority: "High",
    dueDate: new Date(2025, 8, 15),
    lastActivity: new Date(2025, 6, 22),
    team: [
      { name: "Alice Brown", avatar: "/placeholder.svg", role: "Product Manager" },
      { name: "Bob Wilson", avatar: "/placeholder.svg", role: "Designer" },
      { name: "Carol Davis", avatar: "/placeholder.svg", role: "Developer" },
    ],
    stats: {
      totalTasks: 45,
      completedTasks: 31,
      openIssues: 8,
      teamMembers: 12,
    },
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"],
    starred: true,
  },
  {
    id: "MOB",
    name: "Mobile App",
    description: "Cross-platform mobile application for project management on the go",
    status: "In Progress",
    progress: 42,
    role: "Senior Developer",
    priority: "Medium",
    dueDate: new Date(2025, 9, 30),
    lastActivity: new Date(2025, 6, 21),
    team: [
      { name: "David Lee", avatar: "/placeholder.svg", role: "Mobile Lead" },
      { name: "Emily Chen", avatar: "/placeholder.svg", role: "UI/UX Designer" },
    ],
    stats: {
      totalTasks: 28,
      completedTasks: 12,
      openIssues: 5,
      teamMembers: 6,
    },
    technologies: ["React Native", "Expo", "Firebase"],
    starred: false,
  },
  {
    id: "API",
    name: "API Gateway",
    description: "Unified API gateway for microservices architecture",
    status: "Planning",
    progress: 15,
    role: "Backend Developer",
    priority: "Low",
    dueDate: new Date(2025, 11, 1),
    lastActivity: new Date(2025, 6, 20),
    team: [
      { name: "Frank Miller", avatar: "/placeholder.svg", role: "DevOps Engineer" },
      { name: "Grace Kim", avatar: "/placeholder.svg", role: "Backend Developer" },
    ],
    stats: {
      totalTasks: 18,
      completedTasks: 3,
      openIssues: 2,
      teamMembers: 4,
    },
    technologies: ["Node.js", "Docker", "Kubernetes", "AWS"],
    starred: true,
  },
]

export default function MyProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [viewType, setViewType] = useState("grid")
  const [sortBy, setSortBy] = useState("lastActivity")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-400 bg-green-500/20"
      case "In Progress": return "text-blue-400 bg-blue-500/20"
      case "Planning": return "text-yellow-400 bg-yellow-500/20"
      case "On Hold": return "text-orange-400 bg-orange-500/20"
      case "Completed": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-500/20"
      case "Medium": return "text-yellow-400 bg-yellow-500/20"
      case "Low": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredProjects = myProjects.filter(project => {
    const matchesSearch = searchQuery === "" || 
                         project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalProjects = myProjects.length
  const activeProjects = myProjects.filter(p => p.status === "Active" || p.status === "In Progress").length
  const completedTasks = myProjects.reduce((sum, p) => sum + p.stats.completedTasks, 0)
  const totalTasks = myProjects.reduce((sum, p) => sum + p.stats.totalTasks, 0)

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">My Projects</h1>
          <p className="text-xl text-gray-300 mt-2">Projects you're actively involved in</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Projects</p>
                <div className="text-3xl font-bold text-white">{totalProjects}</div>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Active Projects</p>
                <div className="text-3xl font-bold text-green-400">{activeProjects}</div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Tasks Completed</p>
                <div className="text-3xl font-bold text-purple-400">{completedTasks}</div>
                <p className="text-xs text-gray-400">of {totalTasks} total</p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completion Rate</p>
                <div className="text-3xl font-bold text-orange-400">
                  {Math.round((completedTasks / totalTasks) * 100)}%
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search my projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastActivity">Last Activity</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View Toggle */}
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                <Button
                  variant={viewType === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("grid")}
                  className={viewType === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewType === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("list")}
                  className={viewType === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid/List */}
      {viewType === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                      {project.starred && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                      {project.id}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="bg-gray-700" />
                </div>

                {/* Role */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                    {project.role}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-400">Tasks</p>
                    <p className="text-white font-medium">
                      {project.stats.completedTasks}/{project.stats.totalTasks}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Team</p>
                    <p className="text-white font-medium">{project.stats.teamMembers} members</p>
                  </div>
                </div>

                {/* Team Avatars */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-gray-800">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    Last updated {formatDistanceToNow(project.lastActivity)} ago
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/projects/${project.id}`}>
                      View Project
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        {project.starred && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                        <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                          {project.id}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{project.role}</span>
                        <span>•</span>
                        <span>{project.stats.completedTasks}/{project.stats.totalTasks} tasks</span>
                        <span>•</span>
                        <span>{project.stats.teamMembers} members</span>
                        <span>•</span>
                        <span>Updated {formatDistanceToNow(project.lastActivity)} ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Progress */}
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm text-gray-400 mb-1">Progress</div>
                      <div className="text-white font-medium">{project.progress}%</div>
                    </div>
                    
                    {/* Team */}
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-gray-800">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                    
                    {/* Action */}
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href={`/projects/${project.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No projects match your search for "${searchQuery}"`
                : "You don't have any projects yet. Create your first project to get started."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
