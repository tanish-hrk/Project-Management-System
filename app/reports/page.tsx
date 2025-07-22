"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts"
import { Download, Filter, TrendingUp, TrendingDown, Activity, Target, Users, Clock, Calendar, FileText } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const productivityData = [
  { month: "Jan", completed: 45, inProgress: 23, todo: 12 },
  { month: "Feb", completed: 52, inProgress: 18, todo: 15 },
  { month: "Mar", completed: 38, inProgress: 28, todo: 18 },
  { month: "Apr", completed: 61, inProgress: 22, todo: 10 },
  { month: "May", completed: 55, inProgress: 25, todo: 14 },
  { month: "Jun", completed: 67, inProgress: 20, todo: 8 },
  { month: "Jul", completed: 48, inProgress: 30, todo: 16 },
]

const teamPerformanceData = [
  { name: "Development", efficiency: 85, velocity: 92, satisfaction: 78 },
  { name: "Design", efficiency: 78, velocity: 85, satisfaction: 88 },
  { name: "QA", efficiency: 92, velocity: 76, satisfaction: 82 },
  { name: "DevOps", efficiency: 88, velocity: 95, satisfaction: 85 },
]

const projectStatusData = [
  { name: "Completed", value: 35, color: "#22C55E" },
  { name: "In Progress", value: 45, color: "#3B82F6" },
  { name: "On Hold", value: 12, color: "#F59E0B" },
  { name: "Cancelled", value: 8, color: "#EF4444" },
]

const burndownData = [
  { day: "Day 1", planned: 100, actual: 100 },
  { day: "Day 2", planned: 95, actual: 98 },
  { day: "Day 3", planned: 90, actual: 92 },
  { day: "Day 4", planned: 85, actual: 88 },
  { day: "Day 5", planned: 80, actual: 82 },
  { day: "Day 6", planned: 75, actual: 78 },
  { day: "Day 7", planned: 70, actual: 72 },
  { day: "Day 8", planned: 65, actual: 68 },
  { day: "Day 9", planned: 60, actual: 62 },
  { day: "Day 10", planned: 55, actual: 58 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedTeam, setSelectedTeam] = useState("all")

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-xl text-gray-300 mt-2">Insights into team performance and project progress</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-3 flex-1">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 months</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="nexus">Nexus Platform</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="design">Design System</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="dev">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="qa">QA</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completion Rate</p>
                <div className="text-3xl font-bold text-green-400">87%</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5% from last month
                </div>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Team Velocity</p>
                <div className="text-3xl font-bold text-blue-400">42</div>
                <div className="flex items-center text-sm text-blue-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8% from last sprint
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg. Cycle Time</p>
                <div className="text-3xl font-bold text-orange-400">3.2d</div>
                <div className="flex items-center text-sm text-red-400">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -12% from last month
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Active Members</p>
                <div className="text-3xl font-bold text-purple-400">28</div>
                <div className="flex items-center text-sm text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +3 new this month
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Trends */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Productivity Trends</CardTitle>
            <CardDescription className="text-gray-300">
              Monthly task completion overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="completed" stackId="a" fill="#22C55E" name="Completed" />
                <Bar dataKey="inProgress" stackId="a" fill="#3B82F6" name="In Progress" />
                <Bar dataKey="todo" stackId="a" fill="#6B7280" name="To Do" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Project Status Distribution</CardTitle>
            <CardDescription className="text-gray-300">
              Current project status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {projectStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-300">{item.name}</span>
                  <span className="text-sm text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Team Performance</CardTitle>
            <CardDescription className="text-gray-300">
              Efficiency, velocity, and satisfaction metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" width={80} stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="efficiency" fill="#3B82F6" name="Efficiency %" />
                <Bar dataKey="velocity" fill="#10B981" name="Velocity %" />
                <Bar dataKey="satisfaction" fill="#F59E0B" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sprint Burndown */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sprint Burndown</CardTitle>
            <CardDescription className="text-gray-300">
              Current sprint progress vs planned
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
                  dataKey="planned" 
                  stroke="#6B7280" 
                  strokeDasharray="5 5"
                  name="Planned"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performers */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Top Performers</CardTitle>
            <CardDescription className="text-gray-300">
              This month's standout contributors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Alice Brown", tasks: 24, efficiency: 95, role: "Lead Developer" },
              { name: "John Doe", tasks: 22, efficiency: 92, role: "Full Stack Developer" },
              { name: "Sarah Johnson", tasks: 20, efficiency: 88, role: "Frontend Developer" },
              { name: "Mike Davis", tasks: 18, efficiency: 85, role: "Backend Developer" },
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">{performer.name}</h4>
                  <p className="text-sm text-gray-400">{performer.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-400">{performer.tasks} tasks</div>
                  <div className="text-xs text-gray-400">{performer.efficiency}% efficiency</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Critical Issues</CardTitle>
            <CardDescription className="text-gray-300">
              Issues requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "NEX-456", title: "Performance degradation", priority: "Critical", age: "2 days" },
              { id: "MOB-123", title: "Login failure on iOS", priority: "High", age: "1 day" },
              { id: "DS-789", title: "Color contrast issues", priority: "Medium", age: "5 days" },
              { id: "NEX-234", title: "Memory leak in dashboard", priority: "High", age: "3 days" },
            ].map((issue, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                      {issue.id}
                    </Badge>
                    <Badge className={`text-xs ${
                      issue.priority === "Critical" ? "bg-red-500/20 text-red-400" :
                      issue.priority === "High" ? "bg-orange-500/20 text-orange-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {issue.priority}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-white mt-1">{issue.title}</h4>
                  <p className="text-sm text-gray-400">{issue.age} ago</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Project Health */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Project Health</CardTitle>
            <CardDescription className="text-gray-300">
              Overall project status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Nexus Platform", health: 85, status: "On Track", issues: 12 },
              { name: "Mobile App", health: 72, status: "At Risk", issues: 8 },
              { name: "Design System", health: 94, status: "Excellent", issues: 3 },
              { name: "API Gateway", health: 68, status: "Delayed", issues: 15 },
            ].map((project, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{project.name}</h4>
                  <Badge className={`text-xs ${
                    project.health >= 90 ? "bg-green-500/20 text-green-400" :
                    project.health >= 75 ? "bg-blue-500/20 text-blue-400" :
                    project.health >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Health Score</span>
                  <span className={`font-medium ${
                    project.health >= 75 ? "text-green-400" :
                    project.health >= 60 ? "text-yellow-400" :
                    "text-red-400"
                  }`}>
                    {project.health}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      project.health >= 75 ? "bg-green-500" :
                      project.health >= 60 ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                    style={{ width: `${project.health}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{project.issues} open issues</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
