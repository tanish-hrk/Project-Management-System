"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Filter, FileText, Users, Calendar, Zap, Target, TrendingUp, Clock, Eye } from "lucide-react"
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

const mockSearchResults = [
  {
    type: "issue",
    id: "NEX-123",
    title: "Implement user authentication system",
    description: "Create a secure authentication system with JWT tokens and role-based access control",
    project: "Nexus Platform",
    projectKey: "NEX",
    status: "In Progress",
    priority: "High",
    assignee: { name: "John Doe", avatar: "/placeholder.svg" },
    created: new Date(2024, 1, 10),
    updated: new Date(2024, 1, 15),
    labels: ["authentication", "security", "backend"],
    storyPoints: 8,
  },
  {
    type: "project",
    id: "NEX",
    title: "Nexus Platform",
    description: "Next-generation project management platform with advanced analytics and team collaboration features",
    lead: { name: "Alice Brown", avatar: "/placeholder.svg" },
    category: "Software Development",
    status: "Active",
    created: new Date(2024, 0, 15),
    updated: new Date(2024, 1, 14),
    members: 12,
    issues: 45,
    progress: 68,
  },
  {
    type: "user",
    id: "john-doe",
    title: "John Doe",
    description: "Senior Full Stack Developer - Specializes in React, Node.js, and cloud architecture",
    email: "john.doe@nexuspm.com",
    role: "Developer",
    department: "Engineering",
    projects: ["Nexus Platform", "Mobile App"],
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    joined: new Date(2023, 5, 10),
  },
  {
    type: "team",
    id: "dev-team",
    title: "Development Team",
    description: "Core development team responsible for platform architecture and feature implementation",
    lead: { name: "Alice Brown", avatar: "/placeholder.svg" },
    members: 8,
    projects: ["Nexus Platform", "API Gateway"],
    department: "Engineering",
    created: new Date(2024, 0, 10),
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedProject, setSelectedProject] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")

  const { user } = useAppStore()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "issue": return <FileText className="h-4 w-4" />
      case "project": return <Target className="h-4 w-4" />
      case "user": return <Users className="h-4 w-4" />
      case "team": return <Users className="h-4 w-4" />
      default: return <Search className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "issue": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "project": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "user": return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "team": return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "text-green-400 bg-green-500/20"
      case "In Progress": return "text-blue-400 bg-blue-500/20"
      case "To Do": return "text-gray-400 bg-gray-500/20"
      case "Active": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredResults = mockSearchResults.filter(result => {
    const matchesSearch = searchQuery === "" || 
                         result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (result.type === "issue" && result.id.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "all" || result.type === selectedType
    const matchesProject = selectedProject === "all" || 
                          (result.type === "project" && result.id === selectedProject) ||
                          (result.type === "issue" && result.projectKey === selectedProject)
    
    return matchesSearch && matchesType && matchesProject
  })

  const getResultsStats = () => {
    const types = filteredResults.reduce((acc, result) => {
      acc[result.type] = (acc[result.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return types
  }

  const stats = getResultsStats()

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Global Search</h1>
          <p className="text-xl text-gray-300 mt-2">Find issues, projects, people, and resources across your workspace</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Search
          </Button>
        </div>
      </div>

      {/* Search Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Total Results</p>
                <div className="text-2xl font-bold text-white">{filteredResults.length}</div>
              </div>
              <Search className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Issues</p>
                <div className="text-2xl font-bold text-blue-400">{stats.issue || 0}</div>
              </div>
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Projects</p>
                <div className="text-2xl font-bold text-green-400">{stats.project || 0}</div>
              </div>
              <Target className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">People</p>
                <div className="text-2xl font-bold text-orange-400">{stats.user || 0}</div>
              </div>
              <Users className="h-6 w-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">Teams</p>
                <div className="text-2xl font-bold text-purple-400">{stats.team || 0}</div>
              </div>
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Interface */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search across issues, projects, people, and teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex gap-3 flex-1">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="issue">Issues</SelectItem>
                    <SelectItem value="project">Projects</SelectItem>
                    <SelectItem value="user">People</SelectItem>
                    <SelectItem value="team">Teams</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="NEX">Nexus Platform</SelectItem>
                    <SelectItem value="MOB">Mobile App</SelectItem>
                    <SelectItem value="DS">Design System</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="updated">Last Updated</SelectItem>
                    <SelectItem value="created">Created Date</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Quick Filters */}
              <div className="flex gap-2 flex-wrap">
                <Badge 
                  variant="outline" 
                  className="cursor-pointer border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                  onClick={() => setSelectedType("issue")}
                >
                  Issues
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer border-green-500/50 text-green-400 hover:bg-green-500/20"
                  onClick={() => setSelectedType("project")}
                >
                  Projects
                </Badge>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer border-orange-500/50 text-orange-400 hover:bg-orange-500/20"
                  onClick={() => setSelectedType("user")}
                >
                  People
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">
                Showing {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              <div className="text-sm text-gray-400">
                Sorted by {sortBy}
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <Card key={`${result.type}-${result.id}`} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <Badge className={`${getTypeColor(result.type)} border`}>
                            <div className="flex items-center gap-1">
                              {getTypeIcon(result.type)}
                              <span className="capitalize">{result.type}</span>
                            </div>
                          </Badge>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-lg font-semibold text-white hover:text-blue-400 cursor-pointer">
                                {result.title}
                              </h3>
                              {result.type === "issue" && 'id' in result && (
                                <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                                  {result.id}
                                </Badge>
                              )}
                              {result.type === "project" && 'id' in result && (
                                <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                                  {result.id}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-2">
                              {result.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Type-specific status/info */}
                        <div className="flex items-center gap-2">
                          {result.type === "issue" && 'status' in result && result.status && (
                            <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                              {result.status}
                            </Badge>
                          )}
                          {result.type === "project" && 'status' in result && result.status && (
                            <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                              {result.status}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        {/* Project Info */}
                        {(result.type === "issue" && 'project' in result) && (
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            <span>{result.project}</span>
                          </div>
                        )}
                        
                        {/* People Info */}
                        {result.type === "issue" && 'assignee' in result && result.assignee && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={result.assignee.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {result.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{result.assignee.name}</span>
                          </div>
                        )}
                        
                        {result.type === "project" && 'lead' in result && result.lead && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={result.lead.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {result.lead.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>Lead: {result.lead.name}</span>
                          </div>
                        )}
                        
                        {result.type === "user" && 'role' in result && 'department' in result && (
                          <div className="flex items-center gap-1">
                            <span>{result.role} • {result.department}</span>
                          </div>
                        )}
                        
                        {result.type === "team" && 'lead' in result && result.lead && (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={result.lead.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {result.lead.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>Lead: {result.lead.name}</span>
                          </div>
                        )}
                        
                        {/* Time Info */}
                        {result.updated && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Updated {formatDistanceToNow(result.updated)} ago</span>
                          </div>
                        )}
                        
                        {/* Additional Type-specific Info */}
                        {result.type === "issue" && 'storyPoints' in result && result.storyPoints && (
                          <span>{result.storyPoints} story points</span>
                        )}
                        
                        {result.type === "project" && 'members' in result && 'issues' in result && (
                          <span>{result.members} members • {result.issues} issues</span>
                        )}
                        
                        {result.type === "team" && 'members' in result && (
                          <span>{result.members} members</span>
                        )}
                      </div>

                      {/* Tags/Labels */}
                      {((result.type === "issue" && 'labels' in result && result.labels) || 
                        (result.type === "user" && 'skills' in result && result.skills)) && (
                        <div className="flex flex-wrap gap-1">
                          {((result.type === "issue" && result.labels) || 
                            (result.type === "user" && result.skills) || [])?.slice(0, 4).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                          {((result.type === "issue" && result.labels) || 
                            (result.type === "user" && result.skills) || [])?.length > 4 && (
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                              +{((result.type === "issue" && result.labels) || 
                                 (result.type === "user" && result.skills) || []).length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `No items match your search for "${searchQuery}"`
                  : "Try entering a search term to find issues, projects, people, and teams"
                }
              </p>
              <Button 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType("all")
                  setSelectedProject("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
