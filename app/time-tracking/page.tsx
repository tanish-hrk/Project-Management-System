"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Calendar, 
  TrendingUp,
  Timer,
  BarChart3,
  Filter,
  Search,
  Plus,
  PieChart,
  Target
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, differenceInHours, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from "recharts"

const timeEntries = [
  {
    id: "TE-001",
    task: "Authentication System Implementation",
    project: "Nexus Platform",
    description: "Working on OAuth integration and JWT token management",
    startTime: new Date(2024, 6, 23, 9, 0),
    endTime: new Date(2024, 6, 23, 12, 30),
    duration: 3.5,
    status: "completed",
    tags: ["development", "backend", "security"]
  },
  {
    id: "TE-002", 
    task: "Dashboard UI Improvements",
    project: "Nexus Platform",
    description: "Refactoring dashboard components and improving responsiveness",
    startTime: new Date(2024, 6, 23, 14, 0),
    endTime: new Date(2024, 6, 23, 17, 0),
    duration: 3,
    status: "completed",
    tags: ["frontend", "ui/ux", "react"]
  },
  {
    id: "TE-003",
    task: "API Documentation",
    project: "Mobile App",
    description: "Writing comprehensive API documentation for mobile endpoints",
    startTime: new Date(2024, 6, 22, 10, 0),
    endTime: new Date(2024, 6, 22, 13, 0),
    duration: 3,
    status: "completed",
    tags: ["documentation", "api"]
  },
  {
    id: "TE-004",
    task: "Bug Fixes",
    project: "Nexus Platform",
    description: "Fixing critical bugs in user registration flow",
    startTime: new Date(2024, 6, 21, 15, 30),
    endTime: new Date(2024, 6, 21, 18, 0),
    duration: 2.5,
    status: "completed",
    tags: ["bugfix", "frontend"]
  },
  {
    id: "TE-005",
    task: "Database Optimization",
    project: "Backend Services", 
    description: "Currently optimizing database queries for better performance",
    startTime: new Date(2024, 6, 23, 15, 0),
    endTime: null,
    duration: 0,
    status: "running",
    tags: ["database", "optimization", "backend"]
  }
]

const weeklyData = [
  { day: "Mon", hours: 8.5 },
  { day: "Tue", hours: 7.2 },
  { day: "Wed", hours: 9.1 },
  { day: "Thu", hours: 6.8 },
  { day: "Fri", hours: 8.0 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 2.0 }
]

const projectData = [
  { name: "Nexus Platform", hours: 24.5, color: "#3b82f6" },
  { name: "Mobile App", hours: 12.3, color: "#10b981" },
  { name: "Backend Services", hours: 8.7, color: "#f59e0b" },
  { name: "Documentation", hours: 4.2, color: "#8b5cf6" }
]

export default function TimeTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentTimer, setCurrentTimer] = useState<string | null>("TE-005")

  const runningEntry = timeEntries.find(entry => entry.status === "running")
  const totalHoursToday = timeEntries
    .filter(entry => entry.status === "completed" && 
            format(entry.startTime, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"))
    .reduce((sum, entry) => sum + entry.duration, 0)
  
  const totalHoursWeek = weeklyData.reduce((sum, day) => sum + day.hours, 0)
  const avgHoursPerDay = totalHoursWeek / 7

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-green-400 bg-green-500/20"
      case "completed": return "text-blue-400 bg-blue-500/20"
      case "paused": return "text-yellow-400 bg-yellow-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredEntries = timeEntries.filter(entry => {
    const matchesSearch = searchQuery === "" || 
                         entry.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProject = projectFilter === "all" || entry.project === projectFilter
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    
    return matchesSearch && matchesProject && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Time Tracking</h1>
          <p className="text-xl text-gray-300 mt-2">Track and manage your work time efficiently</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Start Timer
          </Button>
        </div>
      </div>

      {/* Active Timer */}
      {runningEntry && (
        <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border-green-400/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-green-400 animate-pulse" />
                  <span className="text-lg font-semibold text-white">Timer Running</span>
                </div>
                <h3 className="text-xl font-bold text-white">{runningEntry.task}</h3>
                <p className="text-gray-300">{runningEntry.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Started: {format(runningEntry.startTime, "HH:mm")}</span>
                  <span>Project: {runningEntry.project}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-3xl font-mono font-bold text-green-400">
                    {format(new Date(), "HH:mm:ss")}
                  </div>
                  <p className="text-sm text-gray-400">Current time</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Today</p>
                <div className="text-3xl font-bold text-blue-400">{totalHoursToday.toFixed(1)}h</div>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">This Week</p>
                <div className="text-3xl font-bold text-green-400">{totalHoursWeek.toFixed(1)}h</div>
              </div>
              <Calendar className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Daily Average</p>
                <div className="text-3xl font-bold text-purple-400">{avgHoursPerDay.toFixed(1)}h</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Entries</p>
                <div className="text-3xl font-bold text-orange-400">{timeEntries.length}</div>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Weekly Hours</CardTitle>
            <CardDescription className="text-gray-300">Hours tracked per day this week</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Distribution */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Project Distribution</CardTitle>
            <CardDescription className="text-gray-300">Time spent per project this week</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="hours"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {projectData.map((project, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: project.color }}
                  />
                  <span className="text-sm text-gray-300">{project.name}</span>
                  <span className="text-sm text-white font-medium">{project.hours}h</span>
                </div>
              ))}
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
                placeholder="Search time entries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Nexus Platform">Nexus Platform</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Backend Services">Backend Services</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Recent Time Entries</h2>
        
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{entry.task}</h3>
                    <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                      {entry.status === "running" && <Timer className="h-3 w-3 mr-1 animate-pulse" />}
                      {entry.status === "completed" && <Clock className="h-3 w-3 mr-1" />}
                      {entry.status === "paused" && <Pause className="h-3 w-3 mr-1" />}
                      {entry.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300">{entry.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {entry.project}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(entry.startTime, "MMM d, HH:mm")}
                      {entry.endTime && ` - ${format(entry.endTime, "HH:mm")}`}
                    </span>
                    {entry.status === "completed" && (
                      <span className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {entry.duration}h
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-white/20 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {entry.status === "running" && (
                    <>
                      <Button variant="light" size="sm" className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="light" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        <Square className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {entry.status === "completed" && (
                    <Button variant="light" size="sm" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Timer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No time entries found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No entries match your search for "${searchQuery}"`
                : "Start tracking your time to see entries here."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Start Timer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
