"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, Clock, AlertCircle, CheckCircle, User, Target, TrendingUp } from "lucide-react"
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
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const myIssues = [
  {
    id: "NEX-123",
    title: "Implement user authentication system",
    description: "Create a secure authentication system with JWT tokens and role-based access control",
    status: "In Progress",
    priority: "High",
    type: "Feature",
    project: "Nexus Platform",
    projectKey: "NEX",
    assignee: "John Doe",
    reporter: "Alice Brown",
    created: new Date(2024, 1, 10),
    updated: new Date(2024, 1, 15),
    dueDate: new Date(2024, 2, 1),
    labels: ["authentication", "security", "backend"],
    storyPoints: 8,
    timeSpent: "12h 30m",
    timeRemaining: "4h",
  },
  {
    id: "MOB-456",
    title: "Fix login screen navigation bug",
    description: "Users are unable to navigate back from the login screen on iOS devices",
    status: "To Do",
    priority: "Critical",
    type: "Bug",
    project: "Mobile App",
    projectKey: "MOB",
    assignee: "John Doe",
    reporter: "Sarah Johnson",
    created: new Date(2024, 1, 12),
    updated: new Date(2024, 1, 12),
    dueDate: new Date(2024, 1, 20),
    labels: ["mobile", "ios", "navigation"],
    storyPoints: 3,
    timeSpent: "0h",
    timeRemaining: "6h",
  },
  {
    id: "NEX-789",
    title: "Add dark mode support",
    description: "Implement dark mode theme throughout the application with user preference storage",
    status: "In Review",
    priority: "Medium",
    type: "Feature",
    project: "Nexus Platform",
    projectKey: "NEX",
    assignee: "John Doe",
    reporter: "Bob Wilson",
    created: new Date(2024, 1, 8),
    updated: new Date(2024, 1, 14),
    dueDate: new Date(2024, 1, 25),
    labels: ["ui", "theme", "frontend"],
    storyPoints: 5,
    timeSpent: "8h 15m",
    timeRemaining: "2h",
  },
  {
    id: "DS-234",
    title: "Update button component styles",
    description: "Modernize button components to match new design system guidelines",
    status: "Done",
    priority: "Low",
    type: "Task",
    project: "Design System",
    projectKey: "DS",
    assignee: "John Doe",
    reporter: "Emily Chen",
    created: new Date(2024, 1, 5),
    updated: new Date(2024, 1, 13),
    dueDate: new Date(2024, 1, 18),
    labels: ["design-system", "components", "ui"],
    storyPoints: 2,
    timeSpent: "4h 45m",
    timeRemaining: "0h",
  },
  {
    id: "API-567",
    title: "Optimize database queries",
    description: "Improve performance of user data queries by adding proper indexing and caching",
    status: "In Progress",
    priority: "High",
    type: "Task",
    project: "API Gateway",
    projectKey: "API",
    assignee: "John Doe",
    reporter: "Mike Davis",
    created: new Date(2024, 1, 7),
    updated: new Date(2024, 1, 16),
    dueDate: new Date(2024, 1, 28),
    labels: ["backend", "performance", "database"],
    storyPoints: 6,
    timeSpent: "6h 20m",
    timeRemaining: "8h",
  },
]

export default function MyIssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [sortBy, setSortBy] = useState("updated")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "text-green-400 bg-green-500/20"
      case "In Progress": return "text-blue-400 bg-blue-500/20"
      case "In Review": return "text-purple-400 bg-purple-500/20"
      case "To Do": return "text-gray-400 bg-gray-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-red-500 bg-red-500/20"
      case "High": return "text-red-400 bg-red-500/20"
      case "Medium": return "text-yellow-400 bg-yellow-500/20"
      case "Low": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bug": return "text-red-400 bg-red-500/20 border-red-500/50"
      case "Feature": return "text-blue-400 bg-blue-500/20 border-blue-500/50"
      case "Task": return "text-green-400 bg-green-500/20 border-green-500/50"
      case "Story": return "text-purple-400 bg-purple-500/20 border-purple-500/50"
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  const filteredIssues = myIssues.filter(issue => {
    const matchesSearch = searchQuery === "" || 
                         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter
    const matchesProject = projectFilter === "all" || issue.projectKey === projectFilter
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject
  })

  // Stats calculations
  const totalIssues = myIssues.length
  const inProgressIssues = myIssues.filter(i => i.status === "In Progress").length
  const todoIssues = myIssues.filter(i => i.status === "To Do").length
  const completedIssues = myIssues.filter(i => i.status === "Done").length
  const criticalIssues = myIssues.filter(i => i.priority === "Critical").length

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">My Issues</h1>
          <p className="text-xl text-gray-300 mt-2">Issues assigned to you</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Issues</p>
                <div className="text-3xl font-bold text-white">{totalIssues}</div>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">To Do</p>
                <div className="text-3xl font-bold text-gray-400">{todoIssues}</div>
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
                <div className="text-3xl font-bold text-blue-400">{inProgressIssues}</div>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completed</p>
                <div className="text-3xl font-bold text-green-400">{completedIssues}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Critical</p>
                <div className="text-3xl font-bold text-red-400">{criticalIssues}</div>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
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
                placeholder="Search my issues..."
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
                  <SelectItem value="NEX">Nexus Platform</SelectItem>
                  <SelectItem value="MOB">Mobile App</SelectItem>
                  <SelectItem value="DS">Design System</SelectItem>
                  <SelectItem value="API">API Gateway</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-gray-300">Issue</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Priority</TableHead>
                  <TableHead className="text-gray-300">Project</TableHead>
                  <TableHead className="text-gray-300">Due Date</TableHead>
                  <TableHead className="text-gray-300">Time Tracking</TableHead>
                  <TableHead className="text-gray-300">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id} className="border-white/20 hover:bg-white/5 cursor-pointer">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                            {issue.id}
                          </Badge>
                          <Badge className={`text-xs border ${getTypeColor(issue.type)}`}>
                            {issue.type}
                          </Badge>
                        </div>
                        <Link href={`/issues/${issue.id}`} className="text-white font-medium hover:text-blue-400 transition-colors">
                          {issue.title}
                        </Link>
                        <p className="text-sm text-gray-400 line-clamp-1">{issue.description}</p>
                        {issue.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {issue.labels.slice(0, 2).map((label, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                {label}
                              </Badge>
                            ))}
                            {issue.labels.length > 2 && (
                              <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                +{issue.labels.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                          {issue.projectKey}
                        </Badge>
                        <span className="text-sm text-gray-300">{issue.project}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-300">
                        {issue.dueDate.toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="text-gray-300">Spent: {issue.timeSpent}</div>
                        <div className="text-gray-400">Remaining: {issue.timeRemaining}</div>
                        {issue.storyPoints && (
                          <div className="text-blue-400">{issue.storyPoints} SP</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-400">
                        {formatDistanceToNow(issue.updated)} ago
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredIssues.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No issues found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No issues match your search for "${searchQuery}"`
                : "You don't have any assigned issues yet."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Issue
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
