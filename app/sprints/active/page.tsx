"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Play, 
  Pause, 
  Plus,
  Users,
  Activity,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"
import { formatDistanceToNow, format, differenceInDays } from "date-fns"

const activeSprint = {
  id: "SP-24-03",
  name: "Sprint 24.3 - Authentication & Security",
  goal: "Implement user authentication system and enhance security features across the platform",
  status: "Active",
  startDate: new Date(2025, 6, 15), // July 15, 2025
  endDate: new Date(2025, 6, 29), // July 29, 2025
  project: "Nexus Platform",
  team: "Development Team",
  capacity: 40, // story points
  committed: 38, // story points
  completed: 24, // story points
  inProgress: 10,
  todo: 4,
  totalIssues: 12,
  completedIssues: 6,
  bugs: 2,
  stories: 8,
  tasks: 2,
}

const sprintIssues = [
  {
    id: "NEX-123",
    title: "Implement JWT authentication",
    type: "Story",
    status: "Done",
    priority: "High",
    storyPoints: 8,
    assignee: { name: "John Doe", avatar: "/placeholder.svg" },
    timeSpent: "12h 30m",
    timeRemaining: "0h",
  },
  {
    id: "NEX-124",
    title: "Add role-based access control",
    type: "Story",
    status: "In Progress",
    priority: "High",
    storyPoints: 5,
    assignee: { name: "Alice Brown", avatar: "/placeholder.svg" },
    timeSpent: "8h 15m",
    timeRemaining: "4h",
  },
  {
    id: "NEX-125",
    title: "Implement password reset flow",
    type: "Story",
    status: "Done",
    priority: "Medium",
    storyPoints: 3,
    assignee: { name: "Bob Wilson", avatar: "/placeholder.svg" },
    timeSpent: "6h 45m",
    timeRemaining: "0h",
  },
  {
    id: "NEX-126",
    title: "Add two-factor authentication",
    type: "Story",
    status: "In Progress",
    priority: "Medium",
    storyPoints: 5,
    assignee: { name: "Carol Davis", avatar: "/placeholder.svg" },
    timeSpent: "4h 20m",
    timeRemaining: "8h",
  },
  {
    id: "NEX-127",
    title: "Fix login validation bug",
    type: "Bug",
    status: "Done",
    priority: "High",
    storyPoints: 2,
    assignee: { name: "David Lee", avatar: "/placeholder.svg" },
    timeSpent: "3h 10m",
    timeRemaining: "0h",
  },
  {
    id: "NEX-128",
    title: "Update security documentation",
    type: "Task",
    status: "To Do",
    priority: "Low",
    storyPoints: 2,
    assignee: { name: "Emily Chen", avatar: "/placeholder.svg" },
    timeSpent: "0h",
    timeRemaining: "4h",
  },
]

const burndownData = [
  { day: "Day 1", remaining: 38, ideal: 38 },
  { day: "Day 2", remaining: 36, ideal: 35.5 },
  { day: "Day 3", remaining: 33, ideal: 33 },
  { day: "Day 4", remaining: 30, ideal: 30.5 },
  { day: "Day 5", remaining: 28, ideal: 28 },
  { day: "Day 6", remaining: 24, ideal: 25.5 },
  { day: "Day 7", remaining: 20, ideal: 23 },
  { day: "Day 8", remaining: 18, ideal: 20.5 },
  { day: "Day 9", remaining: 14, ideal: 18 },
]

const velocityData = [
  { sprint: "SP-24-01", committed: 32, completed: 28 },
  { sprint: "SP-24-02", committed: 35, completed: 33 },
  { sprint: "SP-24-03", committed: 38, completed: 24 }, // Current sprint (in progress)
]

export default function ActiveSprintPage() {
  const [selectedView, setSelectedView] = useState("board")

  const daysRemaining = differenceInDays(activeSprint.endDate, new Date())
  const totalDays = differenceInDays(activeSprint.endDate, activeSprint.startDate)
  const progressPercentage = Math.round((activeSprint.completed / activeSprint.committed) * 100)
  const velocityPercentage = Math.round((activeSprint.completed / activeSprint.capacity) * 100)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "text-green-400 bg-green-500/20"
      case "In Progress": return "text-blue-400 bg-blue-500/20"
      case "To Do": return "text-gray-400 bg-gray-500/20"
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bug": return "text-red-400 bg-red-500/20 border-red-500/50"
      case "Story": return "text-green-400 bg-green-500/20 border-green-500/50"
      case "Task": return "text-blue-400 bg-blue-500/20 border-blue-500/50"
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white">{activeSprint.name}</h1>
            <Badge className="bg-green-500/20 text-green-400">
              <Play className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
          <p className="text-xl text-gray-300 mt-2">{activeSprint.goal}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <span>{format(activeSprint.startDate, "MMM d")} - {format(activeSprint.endDate, "MMM d, yyyy")}</span>
            <span>•</span>
            <span>{daysRemaining} days remaining</span>
            <span>•</span>
            <span>{activeSprint.project}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Pause className="h-4 w-4 mr-2" />
            Complete Sprint
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Issue
          </Button>
        </div>
      </div>

      {/* Sprint Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-400">Story Points</p>
                <div className="text-2xl font-bold text-white">
                  {activeSprint.completed}/{activeSprint.committed}
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <Progress value={progressPercentage} className="bg-gray-700" />
            <p className="text-xs text-gray-400 mt-2">{progressPercentage}% completed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Issues</p>
                <div className="text-2xl font-bold text-white">
                  {activeSprint.completedIssues}/{activeSprint.totalIssues}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">{Math.round((activeSprint.completedIssues / activeSprint.totalIssues) * 100)}% done</span>
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
                <p className="text-sm text-gray-400">Velocity</p>
                <div className="text-2xl font-bold text-purple-400">{velocityPercentage}%</div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-400">On track</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Time Remaining</p>
                <div className="text-2xl font-bold text-orange-400">{daysRemaining}d</div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-400">of {totalDays} days</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Burndown Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sprint Burndown</CardTitle>
            <CardDescription className="text-gray-300">
              Story points remaining vs ideal burndown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={burndownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ideal" 
                  stroke="#6B7280" 
                  strokeDasharray="5 5"
                  name="Ideal Burndown"
                />
                <Line 
                  type="monotone" 
                  dataKey="remaining" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Actual Remaining"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Velocity */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Team Velocity</CardTitle>
            <CardDescription className="text-gray-300">
              Committed vs completed story points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="sprint" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="committed" fill="#6B7280" name="Committed" />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sprint Issues */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Sprint Issues</CardTitle>
          <CardDescription className="text-gray-300">
            All issues in the current sprint
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* To Do */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">To Do</h3>
                <Badge className="bg-gray-500/20 text-gray-400">
                  {sprintIssues.filter(i => i.status === "To Do").length}
                </Badge>
              </div>
              <div className="space-y-3">
                {sprintIssues.filter(issue => issue.status === "To Do").map((issue) => (
                  <Card key={issue.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                            {issue.id}
                          </Badge>
                          <Badge className={`text-xs border ${getTypeColor(issue.type)}`}>
                            {issue.type}
                          </Badge>
                        </div>
                        <h4 className="text-white font-medium text-sm">{issue.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={issue.assignee.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {issue.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-400">{issue.assignee.name}</span>
                          </div>
                          <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-blue-400">{issue.storyPoints} SP</span>
                          <span className="text-gray-400">{issue.timeRemaining} remaining</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">In Progress</h3>
                <Badge className="bg-blue-500/20 text-blue-400">
                  {sprintIssues.filter(i => i.status === "In Progress").length}
                </Badge>
              </div>
              <div className="space-y-3">
                {sprintIssues.filter(issue => issue.status === "In Progress").map((issue) => (
                  <Card key={issue.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                            {issue.id}
                          </Badge>
                          <Badge className={`text-xs border ${getTypeColor(issue.type)}`}>
                            {issue.type}
                          </Badge>
                        </div>
                        <h4 className="text-white font-medium text-sm">{issue.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={issue.assignee.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {issue.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-400">{issue.assignee.name}</span>
                          </div>
                          <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-blue-400">{issue.storyPoints} SP</span>
                          <div className="text-right">
                            <div className="text-gray-300">{issue.timeSpent} spent</div>
                            <div className="text-gray-400">{issue.timeRemaining} remaining</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Done */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">Done</h3>
                <Badge className="bg-green-500/20 text-green-400">
                  {sprintIssues.filter(i => i.status === "Done").length}
                </Badge>
              </div>
              <div className="space-y-3">
                {sprintIssues.filter(issue => issue.status === "Done").map((issue) => (
                  <Card key={issue.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer opacity-75">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                            {issue.id}
                          </Badge>
                          <Badge className={`text-xs border ${getTypeColor(issue.type)}`}>
                            {issue.type}
                          </Badge>
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        </div>
                        <h4 className="text-white font-medium text-sm line-through">{issue.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={issue.assignee.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {issue.assignee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-400">{issue.assignee.name}</span>
                          </div>
                          <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                            {issue.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-blue-400">{issue.storyPoints} SP</span>
                          <span className="text-gray-400">{issue.timeSpent} total</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
