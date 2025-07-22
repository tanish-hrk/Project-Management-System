"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
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

const assignedIssues = [
  {
    id: "ISS-001",
    title: "Implement OAuth 2.0 Authentication",
    description: "Add OAuth 2.0 authentication flow with Google and GitHub providers",
    type: "Feature",
    status: "In Progress",
    priority: "High",
    assignedDate: new Date(2024, 6, 20),
    dueDate: new Date(2024, 6, 25),
    reporter: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Product Manager"
    },
    project: "Nexus Platform",
    labels: ["authentication", "backend", "security"],
    comments: 8,
    attachments: 3,
    timeSpent: "12h 30m",
    timeEstimate: "16h",
    storyPoints: 8
  },
  {
    id: "ISS-002",
    title: "Fix Dashboard Loading Performance",
    description: "Dashboard takes too long to load with large datasets, optimize queries and add caching",
    type: "Bug",
    status: "To Do",
    priority: "Critical",
    assignedDate: new Date(2024, 6, 22),
    dueDate: new Date(2024, 6, 24),
    reporter: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      role: "Tech Lead"
    },
    project: "Nexus Platform",
    labels: ["performance", "frontend", "critical"],
    comments: 12,
    attachments: 5,
    timeSpent: "4h 15m",
    timeEstimate: "8h",
    storyPoints: 5
  },
  {
    id: "ISS-003",
    title: "Design New User Onboarding Flow",
    description: "Create wireframes and prototypes for improved user onboarding experience",
    type: "Design",
    status: "In Review",
    priority: "Medium",
    assignedDate: new Date(2024, 6, 18),
    dueDate: new Date(2024, 6, 28),
    reporter: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg",
      role: "UX Designer"
    },
    project: "Mobile App",
    labels: ["design", "ux", "onboarding"],
    comments: 6,
    attachments: 12,
    timeSpent: "18h 45m",
    timeEstimate: "24h",
    storyPoints: 13
  },
  {
    id: "ISS-004",
    title: "API Rate Limiting Implementation",
    description: "Implement rate limiting for API endpoints to prevent abuse",
    type: "Feature",
    status: "Done",
    priority: "Medium",
    assignedDate: new Date(2024, 6, 15),
    dueDate: new Date(2024, 6, 22),
    reporter: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    project: "API Gateway",
    labels: ["backend", "security", "api"],
    comments: 4,
    attachments: 2,
    timeSpent: "6h 20m",
    timeEstimate: "8h",
    storyPoints: 3
  },
  {
    id: "ISS-005",
    title: "Mobile App Crash on Android 12",
    description: "App crashes when opening notifications on Android 12 devices",
    type: "Bug",
    status: "Blocked",
    priority: "High",
    assignedDate: new Date(2024, 6, 19),
    dueDate: new Date(2024, 6, 26),
    reporter: {
      name: "Lisa Garcia",
      avatar: "/placeholder-user.jpg",
      role: "QA Engineer"
    },
    project: "Mobile App",
    labels: ["mobile", "android", "crash"],
    comments: 15,
    attachments: 8,
    timeSpent: "8h 10m",
    timeEstimate: "12h",
    storyPoints: 8
  },
  {
    id: "ISS-006",
    title: "Update Documentation for New API",
    description: "Create comprehensive documentation for the new v2 API endpoints",
    type: "Documentation",
    status: "In Progress",
    priority: "Low",
    assignedDate: new Date(2024, 6, 21),
    dueDate: new Date(2024, 6, 30),
    reporter: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg",
      role: "DevOps Engineer"
    },
    project: "Documentation",
    labels: ["documentation", "api", "v2"],
    comments: 2,
    attachments: 1,
    timeSpent: "3h 45m",
    timeEstimate: "16h",
    storyPoints: 5
  }
]

export default function AssignedIssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")

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
      case "Feature": return "text-blue-400 bg-blue-500/20"
      case "Design": return "text-purple-400 bg-purple-500/20"
      case "Documentation": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredIssues = assignedIssues.filter(issue => {
    const matchesSearch = searchQuery === "" || 
                         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesType = typeFilter === "all" || issue.type === typeFilter
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter
    const matchesProject = projectFilter === "all" || issue.project === projectFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesProject
  })

  const statusCounts = {
    total: assignedIssues.length,
    todo: assignedIssues.filter(i => i.status === "To Do").length,
    inProgress: assignedIssues.filter(i => i.status === "In Progress").length,
    done: assignedIssues.filter(i => i.status === "Done").length,
    blocked: assignedIssues.filter(i => i.status === "Blocked").length
  }

  const overdueTasks = assignedIssues.filter(i => 
    new Date() > i.dueDate && i.status !== "Done"
  ).length

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Assigned Issues</h1>
          <p className="text-xl text-gray-300 mt-2">Issues and tasks assigned to you</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Assigned</p>
                <div className="text-3xl font-bold text-blue-400">{statusCounts.total}</div>
              </div>
              <User className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">To Do</p>
                <div className="text-3xl font-bold text-gray-400">{statusCounts.todo}</div>
              </div>
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">In Progress</p>
                <div className="text-3xl font-bold text-yellow-400">{statusCounts.inProgress}</div>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completed</p>
                <div className="text-3xl font-bold text-green-400">{statusCounts.done}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Overdue</p>
                <div className="text-3xl font-bold text-red-400">{overdueTasks}</div>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
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
                placeholder="Search assigned issues..."
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
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
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
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Nexus Platform">Nexus Platform</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="API Gateway">API Gateway</SelectItem>
                  <SelectItem value="Documentation">Documentation</SelectItem>
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
                <TableHead className="text-gray-300">Project</TableHead>
                <TableHead className="text-gray-300">Reporter</TableHead>
                <TableHead className="text-gray-300">Due Date</TableHead>
                <TableHead className="text-gray-300">Progress</TableHead>
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
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-1">{issue.description}</p>
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
                      <span className="text-white text-sm">{issue.project}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={issue.reporter.avatar} alt={issue.reporter.name} />
                          <AvatarFallback className="text-xs bg-gray-700">
                            {issue.reporter.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-white">{issue.reporter.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <span className={`text-sm ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                          {format(issue.dueDate, "MMM d, yyyy")}
                        </span>
                        <p className="text-xs text-gray-400">
                          {isOverdue ? "Overdue" : formatDistanceToNow(issue.dueDate, { addSuffix: true })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>Story Points: {issue.storyPoints}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Assigned {formatDistanceToNow(issue.assignedDate, { addSuffix: true })}
                        </div>
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
                          <DropdownMenuItem>Log Time</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
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
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No assigned issues found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No issues match your search for "${searchQuery}"`
                : "No issues are currently assigned to you."
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
