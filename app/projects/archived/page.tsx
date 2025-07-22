"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Archive, 
  Calendar, 
  Users, 
  Search, 
  Grid3X3, 
  List,
  RotateCcw,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Target,
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

const archivedProjects = [
  {
    id: "ARCH-001",
    name: "Legacy System Migration",
    description: "Complete migration from legacy monolith to microservices architecture",
    archivedDate: new Date(2024, 5, 15),
    completedDate: new Date(2024, 5, 10),
    duration: 180, // days
    progress: 100,
    reason: "Completed Successfully",
    owner: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      role: "Technical Lead"
    },
    team: [
      { id: "u1", name: "Sarah Wilson", avatar: "/placeholder-user.jpg" },
      { id: "u2", name: "David Kim", avatar: "/placeholder-user.jpg" },
      { id: "u3", name: "Lisa Garcia", avatar: "/placeholder-user.jpg" },
      { id: "u4", name: "James Park", avatar: "/placeholder-user.jpg" },
      { id: "u5", name: "Emma Rodriguez", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 156,
      completed: 156,
      members: 12,
      sprints: 18
    },
    technologies: ["Node.js", "Docker", "Kubernetes", "PostgreSQL", "React"],
    budget: 450000,
    category: "Infrastructure"
  },
  {
    id: "ARCH-002",
    name: "Customer Portal v1.0",
    description: "Initial version of customer self-service portal with basic functionality",
    archivedDate: new Date(2024, 4, 28),
    completedDate: new Date(2024, 4, 25),
    duration: 120,
    progress: 100,
    reason: "Superseded by v2.0",
    owner: {
      name: "Jennifer Lee",
      avatar: "/placeholder-user.jpg",
      role: "Product Manager"
    },
    team: [
      { id: "u6", name: "Robert Brown", avatar: "/placeholder-user.jpg" },
      { id: "u7", name: "Maria Martinez", avatar: "/placeholder-user.jpg" },
      { id: "u8", name: "Kevin Thompson", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 89,
      completed: 89,
      members: 8,
      sprints: 12
    },
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    budget: 180000,
    category: "Frontend"
  },
  {
    id: "ARCH-003",
    name: "Security Compliance 2023",
    description: "Annual security compliance audit and remediation project",
    archivedDate: new Date(2024, 3, 20),
    completedDate: new Date(2024, 3, 18),
    duration: 90,
    progress: 100,
    reason: "Compliance Achieved",
    owner: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      role: "Security Lead"
    },
    team: [
      { id: "u9", name: "Sophie Davis", avatar: "/placeholder-user.jpg" },
      { id: "u10", name: "Daniel Miller", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 67,
      completed: 67,
      members: 5,
      sprints: 8
    },
    technologies: ["Security Tools", "Audit", "Compliance"],
    budget: 120000,
    category: "Security"
  },
  {
    id: "ARCH-004",
    name: "Mobile App v1.0",
    description: "First version of the mobile application with core features",
    archivedDate: new Date(2024, 2, 10),
    completedDate: new Date(2024, 2, 5),
    duration: 240,
    progress: 95,
    reason: "Discontinued - Market Pivot",
    owner: {
      name: "Grace Kim",
      avatar: "/placeholder-user.jpg",
      role: "Mobile Lead"
    },
    team: [
      { id: "u11", name: "Tom Wilson", avatar: "/placeholder-user.jpg" },
      { id: "u12", name: "Anna Johnson", avatar: "/placeholder-user.jpg" },
      { id: "u13", name: "Ryan Chen", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 124,
      completed: 118,
      members: 6,
      sprints: 20
    },
    technologies: ["React Native", "Firebase", "TypeScript"],
    budget: 320000,
    category: "Mobile"
  },
  {
    id: "ARCH-005",
    name: "Data Warehouse Implementation",
    description: "Implementation of enterprise data warehouse for analytics and reporting",
    archivedDate: new Date(2024, 1, 15),
    completedDate: new Date(2024, 1, 12),
    duration: 300,
    progress: 100,
    reason: "Successfully Delivered",
    owner: {
      name: "Marcus Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Data Architect"
    },
    team: [
      { id: "u14", name: "Isabella Garcia", avatar: "/placeholder-user.jpg" },
      { id: "u15", name: "Oliver Martinez", avatar: "/placeholder-user.jpg" },
      { id: "u16", name: "Sophia Anderson", avatar: "/placeholder-user.jpg" },
      { id: "u17", name: "William Taylor", avatar: "/placeholder-user.jpg" },
    ],
    stats: {
      tasks: 203,
      completed: 203,
      members: 15,
      sprints: 25
    },
    technologies: ["Snowflake", "DBT", "Airflow", "Python", "SQL"],
    budget: 680000,
    category: "Data"
  }
]

export default function ArchivedProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [reasonFilter, setReasonFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const getReasonColor = (reason: string) => {
    if (reason.includes("Completed") || reason.includes("Successfully") || reason.includes("Achieved")) {
      return "text-green-400 bg-green-500/20"
    } else if (reason.includes("Superseded") || reason.includes("Replaced")) {
      return "text-blue-400 bg-blue-500/20"
    } else if (reason.includes("Discontinued") || reason.includes("Cancelled")) {
      return "text-red-400 bg-red-500/20"
    } else {
      return "text-yellow-400 bg-yellow-500/20"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Infrastructure": return "text-purple-400 bg-purple-500/20"
      case "Frontend": return "text-blue-400 bg-blue-500/20"
      case "Backend": return "text-green-400 bg-green-500/20"
      case "Mobile": return "text-pink-400 bg-pink-500/20"
      case "Data": return "text-yellow-400 bg-yellow-500/20"
      case "Security": return "text-red-400 bg-red-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredProjects = archivedProjects.filter(project => {
    const matchesSearch = searchQuery === "" || 
                         project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    const matchesReason = reasonFilter === "all" || project.reason.toLowerCase().includes(reasonFilter.toLowerCase())
    
    return matchesSearch && matchesCategory && matchesReason
  })

  const totalProjects = archivedProjects.length
  const completedProjects = archivedProjects.filter(p => p.progress === 100).length
  const totalBudget = archivedProjects.reduce((sum, p) => sum + p.budget, 0)
  const avgDuration = Math.round(archivedProjects.reduce((sum, p) => sum + p.duration, 0) / archivedProjects.length)

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Archived Projects</h1>
          <p className="text-xl text-gray-300 mt-2">Completed and discontinued projects archive</p>
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
                <p className="text-sm text-gray-400">Total Archived</p>
                <div className="text-3xl font-bold text-purple-400">{totalProjects}</div>
              </div>
              <Archive className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completed</p>
                <div className="text-3xl font-bold text-green-400">{completedProjects}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Budget</p>
                <div className="text-3xl font-bold text-blue-400">
                  ${(totalBudget / 1000000).toFixed(1)}M
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Duration</p>
                <div className="text-3xl font-bold text-orange-400">{avgDuration}d</div>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
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
                placeholder="Search archived projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="superseded">Superseded</SelectItem>
                  <SelectItem value="discontinued">Discontinued</SelectItem>
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
                      <Archive className="h-4 w-4 text-gray-400" />
                      <CardTitle className="text-white text-lg">{project.name}</CardTitle>
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
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restore Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`text-xs ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </Badge>
                  <Badge className={`text-xs ${getReasonColor(project.reason)}`}>
                    {project.reason}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Completion</span>
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
                    <p className="text-gray-400">Duration</p>
                    <p className="text-white font-medium">{project.duration}d</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Budget</p>
                    <p className="text-white font-medium">${(project.budget / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Team Size</p>
                    <p className="text-white font-medium">{project.stats.members}</p>
                  </div>
                </div>

                {/* Team */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Team Lead & Members</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border-2 border-blue-500">
                      <AvatarImage src={project.owner.avatar} alt={project.owner.name} />
                      <AvatarFallback className="text-xs bg-blue-600">
                        {project.owner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex -space-x-2 ml-2">
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

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Completed {format(project.completedDate, "MMM d, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Archive className="h-3 w-3" />
                    Archived {formatDistanceToNow(project.archivedDate, { addSuffix: true })}
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
                    <Archive className="h-5 w-5 text-gray-400" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <Badge className={`text-xs ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </Badge>
                        <Badge className={`text-xs ${getReasonColor(project.reason)}`}>
                          {project.reason}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>Progress: {project.progress}%</span>
                        <span>Duration: {project.duration} days</span>
                        <span>Budget: ${(project.budget / 1000).toFixed(0)}K</span>
                        <span>Team: {project.stats.members} members</span>
                        <span>Archived: {formatDistanceToNow(project.archivedDate, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-24">
                      <Progress value={project.progress} className="bg-gray-700" />
                    </div>
                    
                    <Avatar className="h-8 w-8 border-2 border-blue-500">
                      <AvatarImage src={project.owner.avatar} alt={project.owner.name} />
                      <AvatarFallback className="text-xs bg-blue-600">
                        {project.owner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore Project
                        </DropdownMenuItem>
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
            <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No archived projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No archived projects match your search for "${searchQuery}"`
                : "No projects have been archived yet."
              }
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/projects">Browse Active Projects</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
