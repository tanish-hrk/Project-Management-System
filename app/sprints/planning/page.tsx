"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  Clock, 
  Search, 
  Plus,
  Target,
  Users,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Settings,
  Zap,
  Trophy,
  Timer,
  PlayCircle,
  Edit,
  Trash2,
  Copy
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
import { format, addDays, differenceInDays } from "date-fns"

const planningSprints = [
  {
    id: "SPRINT-005",
    name: "User Experience Improvements",
    description: "Focus on enhancing user interface and overall user experience across the platform",
    status: "Planning",
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 7, 14),
    duration: 14,
    capacity: 120,
    plannedStoryPoints: 85,
    currentStoryPoints: 0,
    plannedIssues: 15,
    currentIssues: 0,
    team: {
      name: "Frontend Team",
      members: [
        { name: "Emily Johnson", avatar: "/placeholder-user.jpg", role: "Lead Developer" },
        { name: "David Miller", avatar: "/placeholder-user.jpg", role: "Frontend Developer" },
        { name: "Lisa Garcia", avatar: "/placeholder-user.jpg", role: "UI/UX Designer" },
        { name: "Sarah Wilson", avatar: "/placeholder-user.jpg", role: "Frontend Developer" }
      ]
    },
    goals: [
      "Improve dashboard loading performance",
      "Enhance mobile responsiveness",
      "Implement new component library",
      "Add accessibility features"
    ],
    risks: [
      { description: "Component library integration complexity", severity: "Medium" },
      { description: "Browser compatibility issues", severity: "Low" }
    ],
    project: "Nexus Platform",
    velocity: 78,
    confidence: 85
  },
  {
    id: "SPRINT-006",
    name: "API Performance Optimization",
    description: "Optimize backend APIs and improve database query performance for better system throughput",
    status: "Planning",
    startDate: new Date(2024, 7, 15),
    endDate: new Date(2024, 7, 28),
    duration: 14,
    capacity: 112,
    plannedStoryPoints: 95,
    currentStoryPoints: 0,
    plannedIssues: 12,
    currentIssues: 0,
    team: {
      name: "Backend Team",
      members: [
        { name: "Michael Chen", avatar: "/placeholder-user.jpg", role: "Senior Backend Developer" },
        { name: "Jennifer Kim", avatar: "/placeholder-user.jpg", role: "Backend Developer" },
        { name: "Robert Chen", avatar: "/placeholder-user.jpg", role: "Database Administrator" },
        { name: "Alex Rodriguez", avatar: "/placeholder-user.jpg", role: "API Developer" }
      ]
    },
    goals: [
      "Reduce API response times by 40%",
      "Optimize database queries",
      "Implement Redis caching",
      "Add API monitoring"
    ],
    risks: [
      { description: "Database migration complexity", severity: "High" },
      { description: "Caching layer implementation", severity: "Medium" },
      { description: "Performance testing timeline", severity: "Low" }
    ],
    project: "API Infrastructure",
    velocity: 68,
    confidence: 72
  },
  {
    id: "SPRINT-007",
    name: "Mobile App Feature Release",
    description: "Deliver new features for mobile application including offline support and push notifications",
    status: "Planning",
    startDate: new Date(2024, 8, 1),
    endDate: new Date(2024, 8, 14),
    duration: 14,
    capacity: 98,
    plannedStoryPoints: 110,
    currentStoryPoints: 0,
    plannedIssues: 18,
    currentIssues: 0,
    team: {
      name: "Mobile Team",
      members: [
        { name: "Sarah Wilson", avatar: "/placeholder-user.jpg", role: "Mobile Lead" },
        { name: "James Thompson", avatar: "/placeholder-user.jpg", role: "iOS Developer" },
        { name: "Maria Garcia", avatar: "/placeholder-user.jpg", role: "Android Developer" },
        { name: "Kevin Liu", avatar: "/placeholder-user.jpg", role: "React Native Developer" }
      ]
    },
    goals: [
      "Implement offline data sync",
      "Add push notification system",
      "Improve app startup time",
      "Add biometric authentication"
    ],
    risks: [
      { description: "App store approval timeline", severity: "Medium" },
      { description: "iOS/Android compatibility", severity: "Medium" },
      { description: "Offline sync complexity", severity: "High" }
    ],
    project: "Mobile App",
    velocity: 89,
    confidence: 68
  },
  {
    id: "SPRINT-008",
    name: "Security & Compliance Updates",
    description: "Implement security enhancements and ensure compliance with latest industry standards",
    status: "Planning",
    startDate: new Date(2024, 8, 15),
    endDate: new Date(2024, 8, 28),
    duration: 14,
    capacity: 84,
    plannedStoryPoints: 75,
    currentStoryPoints: 0,
    plannedIssues: 10,
    currentIssues: 0,
    team: {
      name: "Security Team",
      members: [
        { name: "Robert Chen", avatar: "/placeholder-user.jpg", role: "Security Lead" },
        { name: "Jennifer Kim", avatar: "/placeholder-user.jpg", role: "Backend Developer" },
        { name: "Alex Rodriguez", avatar: "/placeholder-user.jpg", role: "DevOps Engineer" }
      ]
    },
    goals: [
      "Implement OAuth 2.0 PKCE",
      "Add audit logging",
      "Update encryption standards",
      "Perform security audit"
    ],
    risks: [
      { description: "Compliance requirements changes", severity: "Medium" },
      { description: "Third-party integration issues", severity: "Low" }
    ],
    project: "Security Infrastructure",
    velocity: 72,
    confidence: 90
  }
]

export default function SprintPlanningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "text-blue-400 bg-blue-500/20"
      case "Ready": return "text-green-400 bg-green-500/20"
      case "Draft": return "text-gray-400 bg-gray-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case "High": return "text-red-400 bg-red-500/20"
      case "Medium": return "text-yellow-400 bg-yellow-500/20"
      case "Low": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400"
    if (confidence >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const filteredSprints = planningSprints.filter(sprint => {
    const matchesSearch = searchQuery === "" || 
                         sprint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sprint.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || sprint.status === statusFilter
    const matchesTeam = teamFilter === "all" || sprint.team.name === teamFilter
    const matchesProject = projectFilter === "all" || sprint.project === projectFilter
    
    return matchesSearch && matchesStatus && matchesTeam && matchesProject
  })

  const planningStats = {
    total: planningSprints.length,
    totalCapacity: planningSprints.reduce((sum, sprint) => sum + sprint.capacity, 0),
    totalStoryPoints: planningSprints.reduce((sum, sprint) => sum + sprint.plannedStoryPoints, 0),
    averageVelocity: Math.round(planningSprints.reduce((sum, sprint) => sum + sprint.velocity, 0) / planningSprints.length),
    averageConfidence: Math.round(planningSprints.reduce((sum, sprint) => sum + sprint.confidence, 0) / planningSprints.length)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Sprint Planning</h1>
          <p className="text-xl text-gray-300 mt-2">Plan and organize upcoming sprints</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Planning Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Sprint
          </Button>
        </div>
      </div>

      {/* Planning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Sprints</p>
                <div className="text-3xl font-bold text-blue-400">{planningStats.total}</div>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Capacity</p>
                <div className="text-3xl font-bold text-green-400">{planningStats.totalCapacity}h</div>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Story Points</p>
                <div className="text-3xl font-bold text-purple-400">{planningStats.totalStoryPoints}</div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Velocity</p>
                <div className="text-3xl font-bold text-orange-400">{planningStats.averageVelocity}</div>
              </div>
              <Zap className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Confidence</p>
                <div className="text-3xl font-bold text-yellow-400">{planningStats.averageConfidence}%</div>
              </div>
              <Trophy className="h-8 w-8 text-yellow-400" />
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
                placeholder="Search sprint plans..."
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
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="Frontend Team">Frontend Team</SelectItem>
                  <SelectItem value="Backend Team">Backend Team</SelectItem>
                  <SelectItem value="Mobile Team">Mobile Team</SelectItem>
                  <SelectItem value="Security Team">Security Team</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Nexus Platform">Nexus Platform</SelectItem>
                  <SelectItem value="API Infrastructure">API Infrastructure</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Security Infrastructure">Security Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Planning Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredSprints.map((sprint) => (
          <Card key={sprint.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                      {sprint.id}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(sprint.status)}`}>
                      {sprint.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{sprint.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {sprint.description}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Sprint
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate Sprint
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start Sprint
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Sprint
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sprint Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Project:</span>
                    <span className="text-white font-medium">{sprint.project}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{sprint.duration} days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Start Date:</span>
                    <span className="text-white">{format(sprint.startDate, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">End Date:</span>
                    <span className="text-white">{format(sprint.endDate, "MMM d, yyyy")}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-white">{sprint.capacity}h</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Story Points:</span>
                    <span className="text-white">{sprint.plannedStoryPoints}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Velocity:</span>
                    <span className="text-white">{sprint.velocity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Confidence:</span>
                    <span className={`font-medium ${getConfidenceColor(sprint.confidence)}`}>
                      {sprint.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">Team: {sprint.team.name}</h4>
                  <span className="text-xs text-gray-400">{sprint.team.members.length} members</span>
                </div>
                <div className="flex items-center gap-2">
                  {sprint.team.members.slice(0, 4).map((member) => (
                    <Avatar key={member.name} className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs bg-gray-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {sprint.team.members.length > 4 && (
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300">
                      +{sprint.team.members.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Sprint Goals</h4>
                <div className="space-y-2">
                  {sprint.goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Target className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Identified Risks</h4>
                <div className="space-y-2">
                  {sprint.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <AlertCircle className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-gray-300">{risk.description}</span>
                        <Badge className={`ml-2 text-xs ${getRiskColor(risk.severity)}`}>
                          {risk.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">Planning Progress</h4>
                  <span className="text-xs text-gray-400">
                    {sprint.currentIssues} / {sprint.plannedIssues} issues planned
                  </span>
                </div>
                <Progress 
                  value={(sprint.currentIssues / sprint.plannedIssues) * 100} 
                  className="h-2 bg-gray-700"
                />
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{sprint.currentStoryPoints} / {sprint.plannedStoryPoints} story points</span>
                  <span>{Math.round((sprint.currentIssues / sprint.plannedIssues) * 100)}% complete</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Plan Issues
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Burndown
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Sprint
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSprints.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No sprint plans found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No sprint plans match your search for "${searchQuery}"`
                : "Start planning your first sprint to organize upcoming work."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Sprint Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
