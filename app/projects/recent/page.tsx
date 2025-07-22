"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Clock, 
  Star, 
  Users, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Calendar,
  GitBranch,
  Target,
  Activity,
  Eye,
  MoreHorizontal
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format, formatDistanceToNow } from "date-fns"
import Link from "next/link"

const recentProjects = [
  {
    id: "NX-001",
    name: "Nexus Platform v2.0",
    description: "Next generation project management platform with AI-powered insights and team collaboration tools",
    lastViewed: new Date(2024, 6, 23, 16, 30),
    lastActivity: new Date(2024, 6, 23, 15, 45),
    progress: 78,
    status: "In Progress",
    priority: "High",
    owner: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Product Manager"
    },
    team: [
      { id: "u1", name: "Alex Chen", avatar: "/placeholder-user.jpg" },
      { id: "u2", name: "Maria Garcia", avatar: "/placeholder-user.jpg" },
      { id: "u3", name: "James Wilson", avatar: "/placeholder-user.jpg" },
      { id: "u4", name: "Lisa Park", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 45,
      completed: 35,
      members: 8,
      days: 12
    },
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    favorite: true
  },
  {
    id: "MB-002",
    name: "Mobile App Redesign",
    description: "Complete redesign of mobile application with modern UI/UX patterns and improved performance",
    lastViewed: new Date(2024, 6, 23, 10, 15),
    lastActivity: new Date(2024, 6, 23, 14, 20),
    progress: 45,
    status: "In Progress",
    priority: "Medium",
    owner: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg",
      role: "Lead Designer"
    },
    team: [
      { id: "u5", name: "Emma Davis", avatar: "/placeholder-user.jpg" },
      { id: "u6", name: "Ryan Kumar", avatar: "/placeholder-user.jpg" },
      { id: "u7", name: "Sophie Brown", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 28,
      completed: 12,
      members: 5,
      days: 8
    },
    technologies: ["React Native", "Figma", "TypeScript"],
    favorite: false
  },
  {
    id: "API-003",
    name: "API Gateway Integration",
    description: "Implementation of centralized API gateway for microservices architecture",
    lastViewed: new Date(2024, 6, 22, 14, 45),
    lastActivity: new Date(2024, 6, 23, 11, 30),
    progress: 92,
    status: "Review",
    priority: "High",
    owner: {
      name: "Michael Rodriguez",
      avatar: "/placeholder-user.jpg",
      role: "Backend Lead"
    },
    team: [
      { id: "u8", name: "Anna Thompson", avatar: "/placeholder-user.jpg" },
      { id: "u9", name: "Kevin Lee", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 18,
      completed: 16,
      members: 3,
      days: 4
    },
    technologies: ["Node.js", "Docker", "AWS", "GraphQL"],
    favorite: true
  },
  {
    id: "DS-004",
    name: "Design System Library",
    description: "Comprehensive design system and component library for consistent UI across all products",
    lastViewed: new Date(2024, 6, 21, 16, 20),
    lastActivity: new Date(2024, 6, 22, 13, 15),
    progress: 67,
    status: "In Progress",
    priority: "Medium",
    owner: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg",
      role: "Design Lead"
    },
    team: [
      { id: "u10", name: "Tom Anderson", avatar: "/placeholder-user.jpg" },
      { id: "u11", name: "Grace Wilson", avatar: "/placeholder-user.jpg" },
      { id: "u12", name: "Oliver Martinez", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 32,
      completed: 21,
      members: 4,
      days: 18
    },
    technologies: ["Figma", "React", "Storybook", "Tailwind"],
    favorite: false
  },
  {
    id: "SEC-005",
    name: "Security Audit & Compliance",
    description: "Comprehensive security audit and implementation of compliance measures",
    lastViewed: new Date(2024, 6, 20, 11, 30),
    lastActivity: new Date(2024, 6, 22, 10, 45),
    progress: 34,
    status: "In Progress",
    priority: "Critical",
    owner: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg",
      role: "Security Lead"
    },
    team: [
      { id: "u13", name: "Sarah Williams", avatar: "/placeholder-user.jpg" },
      { id: "u14", name: "Daniel Kim", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 24,
      completed: 8,
      members: 3,
      days: 6
    },
    technologies: ["Security Tools", "Audit", "Compliance"],
    favorite: false
  }
]

export default function RecentProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "text-blue-400 bg-blue-500/20"
      case "Review": return "text-yellow-400 bg-yellow-500/20"
      case "Completed": return "text-green-400 bg-green-500/20"
      case "On Hold": return "text-orange-400 bg-orange-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-red-400 bg-red-500/20"
      case "High": return "text-orange-400 bg-orange-500/20"
      case "Medium": return "text-yellow-400 bg-yellow-500/20"
      case "Low": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredProjects = recentProjects.filter(project => {
    const matchesSearch = searchQuery === "" || 
                         project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Recent Projects</h1>
          <p className="text-xl text-gray-300 mt-2">Recently viewed and active projects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Recently Viewed</p>
                <div className="text-3xl font-bold text-blue-400">{recentProjects.length}</div>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Active Projects</p>
                <div className="text-3xl font-bold text-green-400">
                  {recentProjects.filter(p => p.status === "In Progress").length}
                </div>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Progress</p>
                <div className="text-3xl font-bold text-purple-400">
                  {Math.round(recentProjects.reduce((sum, p) => sum + p.progress, 0) / recentProjects.length)}%
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Team Members</p>
                <div className="text-3xl font-bold text-orange-400">
                  {recentProjects.reduce((sum, p) => sum + p.stats.members, 0)}
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                      {project.favorite && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                    </div>
                    <CardDescription className="text-gray-300 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Project</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                  <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </Badge>
                </div>
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

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-400">Tasks</p>
                    <p className="text-white font-medium">
                      {project.stats.completed}/{project.stats.tasks}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Members</p>
                    <p className="text-white font-medium">{project.stats.members}</p>
                  </div>
                </div>

                {/* Team */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Team</p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-gray-800">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gray-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-300">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Technologies</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-white/20 text-gray-300">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Activity */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Viewed {formatDistanceToNow(project.lastViewed, { addSuffix: true })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {formatDistanceToNow(project.lastActivity, { addSuffix: true })}
                  </span>
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
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        {project.favorite && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                        <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                          {project.status}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>Progress: {project.progress}%</span>
                        <span>Tasks: {project.stats.completed}/{project.stats.tasks}</span>
                        <span>Members: {project.stats.members}</span>
                        <span>Last viewed: {formatDistanceToNow(project.lastViewed, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-24">
                      <Progress value={project.progress} className="bg-gray-700" />
                    </div>
                    
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-gray-800">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gray-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-300">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Project</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No recent projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No projects match your search for "${searchQuery}"`
                : "Start working on projects to see them here."
              }
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/projects">Browse All Projects</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
