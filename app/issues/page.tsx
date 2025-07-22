"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, FileText, User, Calendar, Target, TrendingUp, Clock, AlertTriangle } from "lucide-react"
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
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const mockIssues = [
  {
    id: "NEX-123",
    title: "Implement user authentication system",
    description: "Create a secure authentication system with JWT tokens and role-based access control",
    type: "Story",
    status: "In Progress",
    priority: "High",
    assignee: { name: "John Doe", avatar: "/placeholder.svg" },
    reporter: { name: "Sarah Wilson", avatar: "/placeholder.svg" },
    project: { key: "NEX", name: "Nexus Platform" },
    created: new Date(2024, 1, 10),
    updated: new Date(2024, 1, 15),
    dueDate: new Date(2024, 1, 25),
    storyPoints: 8,
    labels: ["authentication", "security", "backend"],
  },
  {
    id: "MOB-45",
    title: "Add offline support for mobile app",
    description: "Implement offline data synchronization and caching for improved user experience",
    type: "Feature",
    status: "To Do",
    priority: "Medium",
    assignee: { name: "Mike Johnson", avatar: "/placeholder.svg" },
    reporter: { name: "Emma Davis", avatar: "/placeholder.svg" },
    project: { key: "MOB", name: "Mobile Application" },
    created: new Date(2024, 1, 5),
    updated: new Date(2024, 1, 14),
    dueDate: new Date(2024, 2, 1),
    storyPoints: 13,
    labels: ["mobile", "offline", "performance"],
  },
  {
    id: "DS-91",
    title: "Update component documentation",
    description: "Create comprehensive documentation for all design system components with examples",
    type: "Task",
    status: "In Review",
    priority: "Low",
    assignee: { name: "Alice Brown", avatar: "/placeholder.svg" },
    reporter: { name: "Bob Smith", avatar: "/placeholder.svg" },
    project: { key: "DS", name: "Design System" },
    created: new Date(2024, 1, 12),
    updated: new Date(2024, 1, 16),
    dueDate: new Date(2024, 1, 28),
    storyPoints: 3,
    labels: ["documentation", "components"],
  },
  {
    id: "NEX-124",
    title: "Fix login button styling issues",
    description: "Resolve styling inconsistencies in the login button across different browsers",
    type: "Bug",
    status: "Done",
    priority: "Medium",
    assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg" },
    reporter: { name: "John Doe", avatar: "/placeholder.svg" },
    project: { key: "NEX", name: "Nexus Platform" },
    created: new Date(2024, 1, 8),
    updated: new Date(2024, 1, 13),
    dueDate: new Date(2024, 1, 18),
    storyPoints: 2,
    labels: ["ui", "styling", "bug"],
  },
]

export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const { user } = useAppStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      case "In Progress": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "In Review": return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "Done": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Blocked": return "bg-red-500/20 text-red-400 border-red-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-400"
      case "Medium": return "text-yellow-400"
      case "Low": return "text-green-400"
      default: return "text-gray-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Story": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Bug": return "bg-red-500/20 text-red-400 border-red-500/50"
      case "Feature": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "Task": return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProject = selectedProject === "all" || issue.project.key === selectedProject
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || issue.priority === selectedPriority
    const matchesType = selectedType === "all" || issue.type === selectedType
    
    return matchesSearch && matchesProject && matchesStatus && matchesPriority && matchesType
  })

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Issues</h1>
          <p className="text-xl text-gray-300 mt-2">Track and manage all project issues</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Issues</p>
                <div className="text-3xl font-bold text-white">{mockIssues.length}</div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-500">All projects</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-500/20">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">In Progress</p>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.filter(i => i.status === "In Progress").length}
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-purple-500">Active</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-500/20">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">High Priority</p>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.filter(i => i.priority === "High").length}
                </div>
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">Urgent</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completed</p>
                <div className="text-3xl font-bold text-white">
                  {mockIssues.filter(i => i.status === "Done").length}
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Resolved</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-500/20">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search issues by title, ID, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="NEX">Nexus Platform</SelectItem>
                  <SelectItem value="MOB">Mobile App</SelectItem>
                  <SelectItem value="DS">Design System</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[110px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[100px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Story">Story</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
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
                  <TableHead className="text-gray-300 font-semibold">Issue</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Type</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Status</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Priority</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Assignee</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Project</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Due Date</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <Link href={`/issues/${issue.id}`} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                          {issue.id}
                        </Link>
                        <div className="text-sm text-white font-medium">{issue.title}</div>
                        <div className="text-xs text-gray-400 line-clamp-1">{issue.description}</div>
                        {issue.storyPoints && (
                          <div className="text-xs text-gray-500">{issue.storyPoints} story points</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getTypeColor(issue.type)} border text-xs`}>
                        {issue.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(issue.status)} border text-xs`}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={issue.assignee.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {issue.assignee.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-white">{issue.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                          {issue.project.key}
                        </Badge>
                        <span className="text-sm text-gray-400 hidden lg:inline">{issue.project.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-300">
                        {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : "No due date"}
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

      {/* Empty State */}
      {filteredIssues.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No issues found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || selectedProject !== "all" || selectedStatus !== "all" || selectedPriority !== "all" || selectedType !== "all"
                ? "No issues match your search criteria. Try adjusting your filters."
                : "Get started by creating your first issue."
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
