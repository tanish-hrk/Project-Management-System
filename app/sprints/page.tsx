"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Target, 
  Calendar, 
  TrendingUp,
  Users,
  BarChart3
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, differenceInDays } from "date-fns"
import Link from "next/link"

const allSprints = [
  {
    id: "SP-24-03",
    name: "Sprint 24.3 - Authentication & Security",
    goal: "Implement user authentication system and enhance security features",
    status: "Active",
    startDate: new Date(2025, 6, 15),
    endDate: new Date(2025, 6, 29),
    project: "Nexus Platform",
    team: "Development Team",
    capacity: 40,
    committed: 38,
    completed: 24,
    totalIssues: 12,
    completedIssues: 6,
  },
  {
    id: "SP-24-02",
    name: "Sprint 24.2 - Dashboard Improvements",
    goal: "Enhance dashboard performance and add new analytics features",
    status: "Completed",
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 6, 14),
    project: "Nexus Platform",
    team: "Development Team",
    capacity: 35,
    committed: 33,
    completed: 33,
    totalIssues: 10,
    completedIssues: 10,
  },
  {
    id: "SP-24-01",
    name: "Sprint 24.1 - Mobile Optimization",
    goal: "Optimize mobile app performance and fix critical bugs",
    status: "Completed",
    startDate: new Date(2025, 5, 17),
    endDate: new Date(2025, 5, 31),
    project: "Mobile App",
    team: "Mobile Team",
    capacity: 32,
    committed: 28,
    completed: 28,
    totalIssues: 8,
    completedIssues: 8,
  },
  {
    id: "SP-23-08",
    name: "Sprint 23.8 - Design System",
    goal: "Create comprehensive design system and component library",
    status: "Completed",
    startDate: new Date(2025, 5, 3),
    endDate: new Date(2025, 5, 16),
    project: "Design System",
    team: "Design Team",
    capacity: 25,
    committed: 22,
    completed: 20,
    totalIssues: 6,
    completedIssues: 5,
  },
  {
    id: "SP-25-01",
    name: "Sprint 25.1 - API Gateway",
    goal: "Plan and initiate API gateway implementation",
    status: "Planning",
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 7, 15),
    project: "API Gateway",
    team: "Backend Team",
    capacity: 30,
    committed: 0,
    completed: 0,
    totalIssues: 0,
    completedIssues: 0,
  },
]

export default function SprintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-400 bg-green-500/20"
      case "Completed": return "text-blue-400 bg-blue-500/20"
      case "Planning": return "text-yellow-400 bg-yellow-500/20"
      case "On Hold": return "text-orange-400 bg-orange-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <Play className="h-3 w-3" />
      case "Completed": return <CheckCircle className="h-3 w-3" />
      case "Planning": return <Clock className="h-3 w-3" />
      case "On Hold": return <Pause className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  const filteredSprints = allSprints.filter(sprint => {
    const matchesSearch = searchQuery === "" || 
                         sprint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sprint.goal.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || sprint.status === statusFilter
    const matchesProject = projectFilter === "all" || sprint.project === projectFilter
    const matchesTeam = teamFilter === "all" || sprint.team === teamFilter
    
    return matchesSearch && matchesStatus && matchesProject && matchesTeam
  })

  // Stats calculations
  const activeSprints = allSprints.filter(s => s.status === "Active").length
  const completedSprints = allSprints.filter(s => s.status === "Completed").length
  const planningSprints = allSprints.filter(s => s.status === "Planning").length
  const totalStoryPoints = allSprints.reduce((sum, s) => sum + s.completed, 0)

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Sprints</h1>
          <p className="text-xl text-gray-300 mt-2">Manage and track all sprint activities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Sprint
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Active Sprints</p>
                <div className="text-3xl font-bold text-green-400">{activeSprints}</div>
              </div>
              <Play className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completed</p>
                <div className="text-3xl font-bold text-blue-400">{completedSprints}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">In Planning</p>
                <div className="text-3xl font-bold text-yellow-400">{planningSprints}</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Story Points</p>
                <div className="text-3xl font-bold text-purple-400">{totalStoryPoints}</div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
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
                placeholder="Search sprints..."
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
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Nexus Platform">Nexus Platform</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Design System">Design System</SelectItem>
                  <SelectItem value="API Gateway">API Gateway</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="Development Team">Development Team</SelectItem>
                  <SelectItem value="Mobile Team">Mobile Team</SelectItem>
                  <SelectItem value="Design Team">Design Team</SelectItem>
                  <SelectItem value="Backend Team">Backend Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSprints.map((sprint) => {
          const daysRemaining = sprint.status === "Active" ? differenceInDays(sprint.endDate, new Date()) : 0
          const totalDays = differenceInDays(sprint.endDate, sprint.startDate)
          const progressPercentage = sprint.committed > 0 ? Math.round((sprint.completed / sprint.committed) * 100) : 0
          
          return (
            <Card key={sprint.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-white text-lg">{sprint.name}</CardTitle>
                      <Badge className={`text-xs ${getStatusColor(sprint.status)}`}>
                        {getStatusIcon(sprint.status)}
                        <span className="ml-1">{sprint.status}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300">
                      {sprint.goal}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(sprint.startDate, "MMM d")} - {format(sprint.endDate, "MMM d, yyyy")}
                  </div>
                  {sprint.status === "Active" && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {daysRemaining} days remaining
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                {sprint.committed > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Story Points Progress</span>
                      <span className="text-white font-medium">
                        {sprint.completed}/{sprint.committed} ({progressPercentage}%)
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="bg-gray-700" />
                  </div>
                )}

                {/* Sprint Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-400">Project</p>
                    <p className="text-white font-medium">{sprint.project}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Team</p>
                    <p className="text-white font-medium">{sprint.team}</p>
                  </div>
                  {sprint.totalIssues > 0 && (
                    <>
                      <div className="space-y-1">
                        <p className="text-gray-400">Issues</p>
                        <p className="text-white font-medium">
                          {sprint.completedIssues}/{sprint.totalIssues}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400">Capacity</p>
                        <p className="text-white font-medium">{sprint.capacity} SP</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {sprint.status === "Active" && (
                    <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href={`/sprints/active`}>
                        View Sprint
                      </Link>
                    </Button>
                  )}
                  {sprint.status === "Completed" && (
                    <Button asChild variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                      <Link href={`/sprints/${sprint.id}`}>
                        View Report
                      </Link>
                    </Button>
                  )}
                  {sprint.status === "Planning" && (
                    <Button asChild variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                      <Link href={`/sprints/${sprint.id}/plan`}>
                        Plan Sprint
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Target className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredSprints.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No sprints found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No sprints match your search for "${searchQuery}"`
                : "No sprints available. Create your first sprint to get started."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Sprint
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
