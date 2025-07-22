"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  FileText, 
  Calendar, 
  Clock, 
  Search, 
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle,
  Pause,
  Target,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Plus
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format, formatDistanceToNow } from "date-fns"

const reportedIssues = [
  {
    id: "ISS-007",
    title: "Dashboard Performance Degradation",
    description: "Dashboard loading times have increased significantly with large datasets, affecting user experience",
    type: "Bug",
    status: "In Progress",
    priority: "High",
    reportedDate: new Date(2024, 6, 20),
    dueDate: new Date(2024, 6, 25),
    assignee: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg",
      role: "Frontend Developer"
    },
    project: "Nexus Platform",
    labels: ["performance", "frontend", "dashboard"],
    comments: 15,
    attachments: 4,
    timeSpent: "8h 30m",
    timeEstimate: "16h",
    storyPoints: 8,
    reproduced: true,
    severity: "Major"
  },
  {
    id: "ISS-008",
    title: "Mobile App Crashes on Login",
    description: "Users are experiencing crashes when attempting to log in on iOS devices running version 16.4+",
    type: "Bug",
    status: "To Do",
    priority: "Critical",
    reportedDate: new Date(2024, 6, 22),
    dueDate: new Date(2024, 6, 24),
    assignee: {
      name: "Sarah Wilson",
      avatar: "/placeholder-user.jpg",
      role: "Mobile Developer"
    },
    project: "Mobile App",
    labels: ["mobile", "ios", "authentication", "crash"],
    comments: 8,
    attachments: 6,
    timeSpent: "2h 15m",
    timeEstimate: "12h",
    storyPoints: 13,
    reproduced: true,
    severity: "Critical"
  },
  {
    id: "ISS-009",
    title: "API Rate Limiting Too Aggressive",
    description: "Current API rate limits are preventing legitimate usage patterns, need to adjust thresholds",
    type: "Bug",
    status: "In Review",
    priority: "Medium",
    reportedDate: new Date(2024, 6, 18),
    dueDate: new Date(2024, 6, 28),
    assignee: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    project: "API Gateway",
    labels: ["api", "backend", "rate-limiting"],
    comments: 12,
    attachments: 3,
    timeSpent: "6h 45m",
    timeEstimate: "8h",
    storyPoints: 5,
    reproduced: false,
    severity: "Minor"
  },
  {
    id: "ISS-010",
    title: "Email Notifications Not Sending",
    description: "System email notifications are not being sent for critical events like password resets",
    type: "Bug",
    status: "Done",
    priority: "High",
    reportedDate: new Date(2024, 6, 15),
    dueDate: new Date(2024, 6, 22),
    assignee: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    project: "Notification Service",
    labels: ["email", "notifications", "backend"],
    comments: 9,
    attachments: 2,
    timeSpent: "4h 20m",
    timeEstimate: "6h",
    storyPoints: 3,
    reproduced: true,
    severity: "Major"
  },
  {
    id: "REQ-001",
    title: "Dark Mode Theme Support",
    description: "Users are requesting dark mode theme option for better accessibility and user preference",
    type: "Feature Request",
    status: "Blocked",
    priority: "Low",
    reportedDate: new Date(2024, 6, 19),
    dueDate: new Date(2024, 7, 15),
    assignee: {
      name: "Lisa Garcia",
      avatar: "/placeholder-user.jpg",
      role: "UI/UX Designer"
    },
    project: "Design System",
    labels: ["ui", "theme", "accessibility"],
    comments: 25,
    attachments: 8,
    timeSpent: "12h 10m",
    timeEstimate: "40h",
    storyPoints: 21,
    reproduced: false,
    severity: "Enhancement"
  },
  {
    id: "ISS-011",
    title: "Database Connection Pool Exhaustion",
    description: "Application experiencing connection pool exhaustion during peak hours, causing service degradation",
    type: "Bug",
    status: "In Progress",
    priority: "Critical",
    reportedDate: new Date(2024, 6, 21),
    dueDate: new Date(2024, 6, 26),
    assignee: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg",
      role: "DevOps Engineer"
    },
    project: "Infrastructure",
    labels: ["database", "infrastructure", "performance"],
    comments: 18,
    attachments: 7,
    timeSpent: "15h 30m",
    timeEstimate: "24h",
    storyPoints: 13,
    reproduced: true,
    severity: "Critical"
  }
]

export default function ReportedIssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "text-gray-400 bg-gray-500/20"
      case "In Progress": return "text-blue-400 bg-blue-500/20"
      case "In Review": return "text-yellow-400 bg-yellow-500/20"
      case "Done": return "text-green-400 bg-green-500/20"
      case "Blocked": return "text-red-400 bg-red-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "To Do": return <Clock className="h-3 w-3" />
      case "In Progress": return <AlertCircle className="h-3 w-3" />
      case "In Review": return <Pause className="h-3 w-3" />
      case "Done": return <CheckCircle className="h-3 w-3" />
      case "Blocked": return <XCircle className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bug": return "text-red-400 bg-red-500/20"
      case "Feature Request": return "text-blue-400 bg-blue-500/20"
      case "Enhancement": return "text-purple-400 bg-purple-500/20"
      case "Documentation": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "text-red-400 bg-red-500/20"
      case "Major": return "text-orange-400 bg-orange-500/20"
      case "Minor": return "text-yellow-400 bg-yellow-500/20"
      case "Enhancement": return "text-blue-400 bg-blue-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredIssues = reportedIssues.filter(issue => {
    const matchesSearch = searchQuery === "" || 
                         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesType = typeFilter === "all" || issue.type === typeFilter
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter
    const matchesProject = projectFilter === "all" || issue.project === projectFilter
    const matchesSeverity = severityFilter === "all" || issue.severity === severityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesProject && matchesSeverity
  })

  const statusCounts = {
    total: reportedIssues.length,
    bugs: reportedIssues.filter(i => i.type === "Bug").length,
    features: reportedIssues.filter(i => i.type === "Feature Request").length,
    inProgress: reportedIssues.filter(i => i.status === "In Progress").length,
    resolved: reportedIssues.filter(i => i.status === "Done").length
  }

  const averageResolutionTime = "3.2 days" // This would be calculated from real data

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Reported Issues</h1>
          <p className="text-xl text-gray-300 mt-2">Issues and requests you've reported</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Reported</p>
                <div className="text-3xl font-bold text-blue-400">{statusCounts.total}</div>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Bugs</p>
                <div className="text-3xl font-bold text-red-400">{statusCounts.bugs}</div>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Features</p>
                <div className="text-3xl font-bold text-purple-400">{statusCounts.features}</div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Resolved</p>
                <div className="text-3xl font-bold text-green-400">{statusCounts.resolved}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Avg Resolution</p>
                <div className="text-3xl font-bold text-orange-400">{averageResolutionTime}</div>
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
                placeholder="Search reported issues..."
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
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Feature Request">Feature Request</SelectItem>
                  <SelectItem value="Enhancement">Enhancement</SelectItem>
                  <SelectItem value="Documentation">Documentation</SelectItem>
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
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                  <SelectItem value="Minor">Minor</SelectItem>
                  <SelectItem value="Enhancement">Enhancement</SelectItem>
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
                  <SelectItem value="API Gateway">API Gateway</SelectItem>
                  <SelectItem value="Design System">Design System</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-gray-300">Issue</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Priority</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Severity</TableHead>
                <TableHead className="text-gray-300">Assignee</TableHead>
                <TableHead className="text-gray-300">Project</TableHead>
                <TableHead className="text-gray-300">Reported</TableHead>
                <TableHead className="text-gray-300"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => {
                const isOverdue = new Date() > issue.dueDate && issue.status !== "Done"
                
                return (
                  <TableRow key={issue.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{issue.title}</span>
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                            {issue.id}
                          </Badge>
                          {issue.reproduced && (
                            <Badge className="text-xs bg-orange-500/20 text-orange-400">
                              Reproduced
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">{issue.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {issue.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Paperclip className="h-3 w-3" />
                            {issue.attachments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {issue.timeSpent} / {issue.timeEstimate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {issue.storyPoints} SP
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {issue.labels.slice(0, 3).map((label) => (
                            <Badge key={label} variant="outline" className="text-xs border-white/20 text-gray-300">
                              {label}
                            </Badge>
                          ))}
                          {issue.labels.length > 3 && (
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                              +{issue.labels.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(issue.status)}`}>
                        {getStatusIcon(issue.status)}
                        <span className="ml-1">{issue.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getTypeColor(issue.type)}`}>
                        {issue.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
                          <AvatarFallback className="text-xs bg-gray-700">
                            {issue.assignee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-white">{issue.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-white text-sm">{issue.project}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="text-sm text-white">
                          {format(issue.reportedDate, "MMM d, yyyy")}
                        </span>
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(issue.reportedDate, { addSuffix: true })}
                        </p>
                        {isOverdue && (
                          <p className="text-xs text-red-400">
                            Due {formatDistanceToNow(issue.dueDate, { addSuffix: true })}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Issue</DropdownMenuItem>
                          <DropdownMenuItem>Add Comment</DropdownMenuItem>
                          <DropdownMenuItem>Close Issue</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredIssues.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No reported issues found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No issues match your search for "${searchQuery}"`
                : "You haven't reported any issues yet."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
