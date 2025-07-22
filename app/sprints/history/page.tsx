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
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Archive,
  Download,
  Eye,
  Award,
  Users,
  Zap,
  Activity,
  Timer,
  Minus
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, differenceInDays } from "date-fns"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const sprintHistory = [
  {
    id: "SPRINT-001",
    name: "Authentication & Security",
    description: "Implement user authentication and basic security features",
    status: "Completed",
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 14),
    actualEndDate: new Date(2024, 4, 15),
    duration: 14,
    actualDuration: 15,
    plannedStoryPoints: 65,
    completedStoryPoints: 58,
    plannedIssues: 12,
    completedIssues: 10,
    carryOverIssues: 2,
    team: {
      name: "Security Team",
      members: [
        { name: "Robert Chen", avatar: "/placeholder-user.jpg", role: "Security Lead" },
        { name: "Jennifer Kim", avatar: "/placeholder-user.jpg", role: "Backend Developer" },
        { name: "Alex Rodriguez", avatar: "/placeholder-user.jpg", role: "DevOps Engineer" }
      ]
    },
    goals: [
      { text: "Implement OAuth 2.0", completed: true },
      { text: "Add user session management", completed: true },
      { text: "Setup audit logging", completed: false },
      { text: "Security testing", completed: true }
    ],
    velocity: 58,
    burndownData: [
      { day: 0, planned: 65, actual: 65 },
      { day: 3, planned: 55, actual: 60 },
      { day: 6, planned: 45, actual: 52 },
      { day: 9, planned: 35, actual: 40 },
      { day: 12, planned: 25, actual: 28 },
      { day: 15, planned: 0, actual: 7 }
    ],
    project: "Security Infrastructure",
    retrospective: {
      went_well: ["Team collaboration", "Security implementation"],
      improvements: ["Better estimation", "Earlier testing"],
      action_items: ["Improve story point estimation", "Add automated security tests"]
    },
    sprintRating: 4,
    teamSatisfaction: 85
  },
  {
    id: "SPRINT-002",
    name: "Dashboard Redesign",
    description: "Redesign main dashboard with improved UX and performance",
    status: "Completed",
    startDate: new Date(2024, 4, 15),
    endDate: new Date(2024, 4, 28),
    actualEndDate: new Date(2024, 4, 28),
    duration: 14,
    actualDuration: 14,
    plannedStoryPoints: 78,
    completedStoryPoints: 78,
    plannedIssues: 15,
    completedIssues: 15,
    carryOverIssues: 0,
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
      { text: "Redesign dashboard layout", completed: true },
      { text: "Improve loading performance", completed: true },
      { text: "Add responsive design", completed: true },
      { text: "User testing and feedback", completed: true }
    ],
    velocity: 78,
    burndownData: [
      { day: 0, planned: 78, actual: 78 },
      { day: 3, planned: 68, actual: 70 },
      { day: 6, planned: 58, actual: 60 },
      { day: 9, planned: 48, actual: 45 },
      { day: 12, planned: 25, actual: 20 },
      { day: 14, planned: 0, actual: 0 }
    ],
    project: "Frontend Platform",
    retrospective: {
      went_well: ["Great design collaboration", "Performance improvements achieved"],
      improvements: ["More user testing earlier", "Better cross-browser testing"],
      action_items: ["Include user testing in sprint", "Automated visual regression tests"]
    },
    sprintRating: 5,
    teamSatisfaction: 92
  },
  {
    id: "SPRINT-003",
    name: "API Performance Optimization",
    description: "Optimize backend APIs and improve database performance",
    status: "Completed",
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 5, 14),
    actualEndDate: new Date(2024, 5, 16),
    duration: 14,
    actualDuration: 16,
    plannedStoryPoints: 89,
    completedStoryPoints: 76,
    plannedIssues: 11,
    completedIssues: 9,
    carryOverIssues: 2,
    team: {
      name: "Backend Team",
      members: [
        { name: "Michael Chen", avatar: "/placeholder-user.jpg", role: "Senior Backend Developer" },
        { name: "Jennifer Kim", avatar: "/placeholder-user.jpg", role: "Backend Developer" },
        { name: "Robert Chen", avatar: "/placeholder-user.jpg", role: "Database Administrator" }
      ]
    },
    goals: [
      { text: "Reduce API response times by 40%", completed: true },
      { text: "Implement Redis caching", completed: true },
      { text: "Database query optimization", completed: false },
      { text: "Add performance monitoring", completed: true }
    ],
    velocity: 76,
    burndownData: [
      { day: 0, planned: 89, actual: 89 },
      { day: 3, planned: 78, actual: 85 },
      { day: 6, planned: 67, actual: 75 },
      { day: 9, planned: 56, actual: 65 },
      { day: 12, planned: 30, actual: 40 },
      { day: 16, planned: 0, actual: 13 }
    ],
    project: "Backend Infrastructure",
    retrospective: {
      went_well: ["Significant performance gains", "Good caching implementation"],
      improvements: ["Database optimization complexity underestimated", "Need more testing time"],
      action_items: ["Add database expert to planning", "Include performance testing in DoD"]
    },
    sprintRating: 3,
    teamSatisfaction: 75
  },
  {
    id: "SPRINT-004",
    name: "Mobile App Features",
    description: "Deliver new mobile features including push notifications",
    status: "Completed",
    startDate: new Date(2024, 5, 15),
    endDate: new Date(2024, 5, 28),
    actualEndDate: new Date(2024, 5, 29),
    duration: 14,
    actualDuration: 15,
    plannedStoryPoints: 95,
    completedStoryPoints: 88,
    plannedIssues: 18,
    completedIssues: 16,
    carryOverIssues: 2,
    team: {
      name: "Mobile Team",
      members: [
        { name: "Sarah Wilson", avatar: "/placeholder-user.jpg", role: "Mobile Lead" },
        { name: "James Thompson", avatar: "/placeholder-user.jpg", role: "iOS Developer" },
        { name: "Maria Garcia", avatar: "/placeholder-user.jpg", role: "Android Developer" }
      ]
    },
    goals: [
      { text: "Implement push notifications", completed: true },
      { text: "Add offline data sync", completed: true },
      { text: "Improve app startup time", completed: false },
      { text: "App store submission", completed: true }
    ],
    velocity: 88,
    burndownData: [
      { day: 0, planned: 95, actual: 95 },
      { day: 3, planned: 85, actual: 88 },
      { day: 6, planned: 75, actual: 78 },
      { day: 9, planned: 60, actual: 65 },
      { day: 12, planned: 35, actual: 30 },
      { day: 15, planned: 0, actual: 7 }
    ],
    project: "Mobile Application",
    retrospective: {
      went_well: ["Push notifications working well", "Great cross-platform collaboration"],
      improvements: ["Startup performance still needs work", "Better device testing"],
      action_items: ["Focus on performance optimization", "Expand device testing lab"]
    },
    sprintRating: 4,
    teamSatisfaction: 88
  }
]

export default function SprintHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [teamFilter, setTeamFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredSprints = sprintHistory.filter(sprint => {
    const matchesSearch = searchQuery === "" || 
                         sprint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sprint.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTeam = teamFilter === "all" || sprint.team.name === teamFilter
    const matchesProject = projectFilter === "all" || sprint.project === projectFilter
    
    return matchesSearch && matchesTeam && matchesProject
  })

  const historyStats = {
    totalSprints: sprintHistory.length,
    averageVelocity: Math.round(sprintHistory.reduce((sum, sprint) => sum + sprint.velocity, 0) / sprintHistory.length),
    averageSatisfaction: Math.round(sprintHistory.reduce((sum, sprint) => sum + sprint.teamSatisfaction, 0) / sprintHistory.length),
    totalStoryPoints: sprintHistory.reduce((sum, sprint) => sum + sprint.completedStoryPoints, 0),
    onTimeDelivery: Math.round((sprintHistory.filter(s => s.actualDuration <= s.duration).length / sprintHistory.length) * 100)
  }

  const velocityData = sprintHistory.map(sprint => ({
    name: sprint.name.substring(0, 15) + "...",
    planned: sprint.plannedStoryPoints,
    completed: sprint.completedStoryPoints,
    velocity: sprint.velocity
  }))

  const satisfactionData = sprintHistory.map(sprint => ({
    name: sprint.name.substring(0, 10) + "...",
    satisfaction: sprint.teamSatisfaction,
    rating: sprint.sprintRating * 20 // Convert 1-5 rating to percentage
  }))

  const sprintOutcomes = [
    { name: "Successful", value: sprintHistory.filter(s => s.sprintRating >= 4).length, color: "#4ade80" },
    { name: "Partially Successful", value: sprintHistory.filter(s => s.sprintRating === 3).length, color: "#facc15" },
    { name: "Needs Improvement", value: sprintHistory.filter(s => s.sprintRating < 3).length, color: "#f87171" }
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Sprint History</h1>
          <p className="text-xl text-gray-300 mt-2">Review past sprint performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* History Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Sprints</p>
                <div className="text-3xl font-bold text-blue-400">{historyStats.totalSprints}</div>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Velocity</p>
                <div className="text-3xl font-bold text-green-400">{historyStats.averageVelocity}</div>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Story Points</p>
                <div className="text-3xl font-bold text-purple-400">{historyStats.totalStoryPoints}</div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">On-Time Delivery</p>
                <div className="text-3xl font-bold text-yellow-400">{historyStats.onTimeDelivery}%</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Team Satisfaction</p>
                <div className="text-3xl font-bold text-orange-400">{historyStats.averageSatisfaction}%</div>
              </div>
              <Award className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Velocity Trends</CardTitle>
            <CardDescription className="text-gray-400">
              Planned vs completed story points over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="planned" fill="#3b82f6" name="Planned" />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Team Satisfaction</CardTitle>
            <CardDescription className="text-gray-400">
              Sprint ratings and team satisfaction over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" name="Team Satisfaction %" strokeWidth={2} />
                <Line type="monotone" dataKey="rating" stroke="#8b5cf6" name="Sprint Rating %" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sprint Outcomes</CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of sprint success ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sprintOutcomes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sprintOutcomes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {sprintOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: outcome.color }}></div>
                    <span className="text-sm text-gray-300">{outcome.name}</span>
                  </div>
                  <span className="text-sm text-white">{outcome.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search sprints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filter by team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="Security Team">Security Team</SelectItem>
                  <SelectItem value="Frontend Team">Frontend Team</SelectItem>
                  <SelectItem value="Backend Team">Backend Team</SelectItem>
                  <SelectItem value="Mobile Team">Mobile Team</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Security Infrastructure">Security Infrastructure</SelectItem>
                  <SelectItem value="Frontend Platform">Frontend Platform</SelectItem>
                  <SelectItem value="Backend Infrastructure">Backend Infrastructure</SelectItem>
                  <SelectItem value="Mobile Application">Mobile Application</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sprint History Cards */}
      <div className="space-y-6">
        {filteredSprints.map((sprint) => (
          <Card key={sprint.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                      {sprint.id}
                    </Badge>
                    <Badge className="text-xs bg-green-500/20 text-green-400">
                      {sprint.status}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Award 
                          key={i} 
                          className={`h-3 w-3 ${
                            i < sprint.sprintRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{sprint.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {sprint.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white">Sprint Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">
                        {sprint.actualDuration} / {sprint.duration} days
                        {sprint.actualDuration > sprint.duration ? (
                          <TrendingUp className="h-3 w-3 text-red-400 inline ml-1" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-green-400 inline ml-1" />
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Project:</span>
                      <span className="text-white text-xs">{sprint.project}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Team:</span>
                      <span className="text-white text-xs">{sprint.team.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Velocity:</span>
                      <span className="text-white">{sprint.velocity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Story Points:</span>
                      <span className="text-white">
                        {sprint.completedStoryPoints} / {sprint.plannedStoryPoints}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Issues:</span>
                      <span className="text-white">
                        {sprint.completedIssues} / {sprint.plannedIssues}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Carry Over:</span>
                      <span className="text-white">{sprint.carryOverIssues}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white">Sprint Goals</h4>
                  <div className="space-y-2">
                    {sprint.goals.map((goal, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        {goal.completed ? (
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Minus className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={goal.completed ? "text-gray-300" : "text-gray-400 line-through"}>
                          {goal.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white">Team Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Satisfaction:</span>
                      <span className="text-white">{sprint.teamSatisfaction}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Members:</span>
                      <span className="text-white">{sprint.team.members.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Sprint Rating:</span>
                      <span className="text-white">{sprint.sprintRating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Progress</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Story Points Completion</span>
                    <span className="text-white">
                      {Math.round((sprint.completedStoryPoints / sprint.plannedStoryPoints) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(sprint.completedStoryPoints / sprint.plannedStoryPoints) * 100} 
                    className="h-2 bg-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Team Members</h4>
                <div className="flex items-center gap-2">
                  {sprint.team.members.map((member) => (
                    <Avatar key={member.name} className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs bg-gray-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Retrospective Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <h5 className="text-green-400 font-medium">What Went Well</h5>
                    {sprint.retrospective.went_well.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-yellow-400 font-medium">Improvements</h5>
                    {sprint.retrospective.improvements.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-blue-400 font-medium">Action Items</h5>
                    {sprint.retrospective.action_items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Target className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Burndown
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Activity className="h-4 w-4 mr-2" />
                  Retrospective
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSprints.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No sprint history found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No sprints match your search for "${searchQuery}"`
                : "Complete your first sprint to see historical data and insights."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
