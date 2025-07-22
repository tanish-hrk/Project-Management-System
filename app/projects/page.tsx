"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, Grid, List, Plus, Users, Target, Calendar, TrendingUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const mockProjects = [
  {
    id: "1",
    key: "NEX",
    name: "Nexus Platform",
    description: "Next-generation project management platform with advanced analytics and team collaboration features",
    lead: { name: "Alice Brown", avatar: "/placeholder.svg" },
    category: "Software Development",
    status: "Active",
    progress: 78,
    members: 12,
    issues: { total: 89, open: 22, completed: 67 },
    created: new Date(2024, 0, 15),
    updated: new Date(2024, 1, 14),
    dueDate: new Date(2024, 3, 30),
    priority: "High",
    tags: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    key: "MOB",
    name: "Mobile Application",
    description: "Cross-platform mobile app for project management on the go",
    lead: { name: "Mike Johnson", avatar: "/placeholder.svg" },
    category: "Mobile Development",
    status: "Active", 
    progress: 65,
    members: 8,
    issues: { total: 67, open: 18, completed: 49 },
    created: new Date(2024, 0, 20),
    updated: new Date(2024, 1, 12),
    dueDate: new Date(2024, 2, 15),
    priority: "Medium",
    tags: ["React Native", "Firebase", "GraphQL"],
  },
  {
    id: "3",
    key: "DS",
    name: "Design System",
    description: "Comprehensive design system and component library for consistent UI across all products",
    lead: { name: "Sarah Wilson", avatar: "/placeholder.svg" },
    category: "Design",
    status: "In Progress",
    progress: 45,
    members: 5,
    issues: { total: 34, open: 12, completed: 22 },
    created: new Date(2024, 1, 1),
    updated: new Date(2024, 1, 10),
    dueDate: new Date(2024, 4, 1),
    priority: "Medium",
    tags: ["Figma", "Storybook", "CSS"],
  },
  {
    id: "4",
    key: "API",
    name: "API Gateway",
    description: "Microservices API gateway for handling authentication, rate limiting, and service orchestration",
    lead: { name: "John Doe", avatar: "/placeholder.svg" },
    category: "Backend",
    status: "Planning",
    progress: 15,
    members: 6,
    issues: { total: 45, open: 38, completed: 7 },
    created: new Date(2024, 1, 5),
    updated: new Date(2024, 1, 8),
    dueDate: new Date(2024, 5, 15),
    priority: "High",
    tags: ["Node.js", "Docker", "Kubernetes"],
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("updated")

  const { user } = useAppStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "In Progress": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "Planning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "On Hold": return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "Completed": return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400"
      case "Medium": return "text-yellow-400"
      case "Low": return "text-green-400"
      default: return "text-gray-400"
    }
  }

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.key.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Projects</h1>
          <p className="text-xl text-gray-300 mt-2">Manage and track all your projects</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Projects</p>
                <div className="text-3xl font-bold text-white">{mockProjects.length}</div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-500">Active</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-500/20">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Team Members</p>
                <div className="text-3xl font-bold text-white">
                  {mockProjects.reduce((acc, p) => acc + p.members, 0)}
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Contributors</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-500/20">
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Progress</p>
                <div className="text-3xl font-bold text-white">
                  {Math.round(mockProjects.reduce((acc, p) => acc + p.progress, 0) / mockProjects.length)}%
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-purple-500">Completion</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-500/20">
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Due This Month</p>
                <div className="text-3xl font-bold text-white">
                  {mockProjects.filter(p => p.dueDate && p.dueDate.getMonth() === new Date().getMonth()).length}
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-500">Deadlines</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-500/20">
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects by name, key, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Software Development">Software Development</SelectItem>
                  <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="created">Created Date</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex bg-white/10 rounded-lg p-1 border border-white/20">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                >
                  <Grid className="h-4 w-4" />
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
        </CardContent>
      </Card>

      {/* Projects Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-white/20 text-gray-300 text-xs font-mono">
                        {project.key}
                      </Badge>
                      <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                      <Link href={`/projects/${project.id}`}>
                        {project.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-sm line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-lg font-bold text-white">{project.members}</div>
                    <div className="text-xs text-gray-400">Members</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{project.issues.total}</div>
                    <div className="text-xs text-gray-400">Issues</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{project.issues.open}</div>
                    <div className="text-xs text-gray-400">Open</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={project.lead.avatar} />
                      <AvatarFallback className="bg-blue-600 text-white text-xs">
                        {project.lead.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-400">{project.lead.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Updated {formatDistanceToNow(project.updated)} ago
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredProjects.map((project, index) => (
                <div key={project.id} className={`p-6 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors ${index === 0 ? 'rounded-t-lg' : ''} ${index === filteredProjects.length - 1 ? 'rounded-b-lg' : ''}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className="border-white/20 text-gray-300 text-xs font-mono">
                          {project.key}
                        </Badge>
                        <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors">
                          <Link href={`/projects/${project.id}`}>
                            {project.name}
                          </Link>
                        </h3>
                        <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                          {project.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                          {project.priority} Priority
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-white font-medium">{project.progress}%</div>
                          <div className="text-xs text-gray-400">Progress</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{project.members}</div>
                          <div className="text-xs text-gray-400">Members</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-medium">{project.issues.total}</div>
                          <div className="text-xs text-gray-400">Issues</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.lead.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {project.lead.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="text-white">{project.lead.name}</div>
                          <div className="text-xs text-gray-400">Project Lead</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || selectedCategory !== "all" || selectedStatus !== "all" 
                ? "No projects match your search criteria. Try adjusting your filters."
                : "Get started by creating your first project."
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
