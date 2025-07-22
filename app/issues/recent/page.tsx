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
  Grid3X3,
  List,
  Eye,
  Bookmark,
  Share,
  History
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, formatDistanceToNow } from "date-fns"

const recentIssues = [
  {
    id: "ISS-021",
    title: "Memory leak in data visualization component",
    description: "Chart component continues to consume memory after being unmounted, causing performance degradation over time",
    type: "Bug",
    status: "In Progress",
    priority: "High",
    viewedDate: new Date(2024, 6, 23, 14, 30),
    reportedDate: new Date(2024, 6, 20),
    dueDate: new Date(2024, 6, 25),
    assignee: {
      name: "Emily Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Frontend Developer"
    },
    reporter: {
      name: "You",
      avatar: "/placeholder-user.jpg"
    },
    project: "Analytics Dashboard",
    labels: ["memory-leak", "charts", "performance"],
    comments: 8,
    attachments: 3,
    timeSpent: "5h 20m",
    timeEstimate: "12h",
    storyPoints: 8,
    interaction: "commented",
    isBookmarked: true
  },
  {
    id: "ISS-022",
    title: "Add CSV export functionality to reports",
    description: "Users need ability to export report data as CSV files for external analysis and presentations",
    type: "Feature Request",
    status: "To Do",
    priority: "Medium",
    viewedDate: new Date(2024, 6, 23, 11, 15),
    reportedDate: new Date(2024, 6, 22),
    dueDate: new Date(2024, 7, 5),
    assignee: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    reporter: {
      name: "Sarah Wilson",
      avatar: "/placeholder-user.jpg"
    },
    project: "Reporting Engine",
    labels: ["export", "csv", "reports"],
    comments: 5,
    attachments: 2,
    timeSpent: "0h",
    timeEstimate: "16h",
    storyPoints: 13,
    interaction: "viewed",
    isBookmarked: false
  },
  {
    id: "ISS-023",
    title: "Login form validation error messages",
    description: "Error messages for login form are not properly displayed when validation fails",
    type: "Bug",
    status: "In Review",
    priority: "Medium",
    viewedDate: new Date(2024, 6, 23, 9, 45),
    reportedDate: new Date(2024, 6, 21),
    dueDate: new Date(2024, 6, 28),
    assignee: {
      name: "Lisa Garcia",
      avatar: "/placeholder-user.jpg",
      role: "Frontend Developer"
    },
    reporter: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg"
    },
    project: "Authentication",
    labels: ["validation", "ui", "authentication"],
    comments: 12,
    attachments: 4,
    timeSpent: "3h 45m",
    timeEstimate: "6h",
    storyPoints: 5,
    interaction: "assigned",
    isBookmarked: true
  },
  {
    id: "ISS-024",
    title: "Implement notification preferences",
    description: "Allow users to customize which notifications they receive and through which channels",
    type: "Feature Request",
    status: "Done",
    priority: "Low",
    viewedDate: new Date(2024, 6, 22, 16, 20),
    reportedDate: new Date(2024, 6, 15),
    dueDate: new Date(2024, 6, 22),
    assignee: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg",
      role: "Full Stack Developer"
    },
    reporter: {
      name: "You",
      avatar: "/placeholder-user.jpg"
    },
    project: "User Settings",
    labels: ["notifications", "preferences", "settings"],
    comments: 15,
    attachments: 6,
    timeSpent: "18h 30m",
    timeEstimate: "20h",
    storyPoints: 21,
    interaction: "reviewed",
    isBookmarked: false
  },
  {
    id: "ISS-025",
    title: "Database query optimization needed",
    description: "Complex reporting queries are taking too long to execute, need indexing and optimization",
    type: "Task",
    status: "Blocked",
    priority: "High",
    viewedDate: new Date(2024, 6, 22, 13, 10),
    reportedDate: new Date(2024, 6, 19),
    dueDate: new Date(2024, 6, 26),
    assignee: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg",
      role: "Database Administrator"
    },
    reporter: {
      name: "System Monitor",
      avatar: "/placeholder-user.jpg"
    },
    project: "Database",
    labels: ["performance", "database", "optimization"],
    comments: 20,
    attachments: 8,
    timeSpent: "12h 15m",
    timeEstimate: "24h",
    storyPoints: 13,
    interaction: "mentioned",
    isBookmarked: true
  },
  {
    id: "ISS-026",
    title: "API rate limiting headers",
    description: "Add proper rate limiting headers to API responses for better client-side handling",
    type: "Enhancement",
    status: "In Progress",
    priority: "Medium",
    viewedDate: new Date(2024, 6, 22, 10, 30),
    reportedDate: new Date(2024, 6, 18),
    dueDate: new Date(2024, 6, 30),
    assignee: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      role: "API Developer"
    },
    reporter: {
      name: "Integration Team",
      avatar: "/placeholder-user.jpg"
    },
    project: "API Gateway",
    labels: ["api", "rate-limiting", "headers"],
    comments: 7,
    attachments: 1,
    timeSpent: "8h 45m",
    timeEstimate: "12h",
    storyPoints: 8,
    interaction: "updated",
    isBookmarked: false
  }
]

export default function RecentIssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [interactionFilter, setInteractionFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
      case "Task": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getInteractionColor = (interaction: string) => {
    switch (interaction) {
      case "commented": return "text-blue-400"
      case "assigned": return "text-purple-400"
      case "reviewed": return "text-green-400"
      case "mentioned": return "text-yellow-400"
      case "updated": return "text-orange-400"
      case "viewed": return "text-gray-400"
      default: return "text-gray-400"
    }
  }

  const filteredIssues = recentIssues.filter(issue => {
    const matchesSearch = searchQuery === "" || 
                         issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter
    const matchesType = typeFilter === "all" || issue.type === typeFilter
    const matchesPriority = priorityFilter === "all" || issue.priority === priorityFilter
    const matchesProject = projectFilter === "all" || issue.project === projectFilter
    const matchesInteraction = interactionFilter === "all" || issue.interaction === interactionFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesProject && matchesInteraction
  })

  const recentStats = {
    total: recentIssues.length,
    today: recentIssues.filter(i => 
      new Date(i.viewedDate).toDateString() === new Date().toDateString()
    ).length,
    thisWeek: recentIssues.filter(i => {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return i.viewedDate > weekAgo
    }).length,
    bookmarked: recentIssues.filter(i => i.isBookmarked).length
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Recent Issues</h1>
          <p className="text-xl text-gray-300 mt-2">Issues you've recently viewed or interacted with</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Recent</p>
                <div className="text-3xl font-bold text-blue-400">{recentStats.total}</div>
              </div>
              <History className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Viewed Today</p>
                <div className="text-3xl font-bold text-green-400">{recentStats.today}</div>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">This Week</p>
                <div className="text-3xl font-bold text-purple-400">{recentStats.thisWeek}</div>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Bookmarked</p>
                <div className="text-3xl font-bold text-yellow-400">{recentStats.bookmarked}</div>
              </div>
              <Bookmark className="h-8 w-8 text-yellow-400" />
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
                placeholder="Search recent issues..."
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
                  <SelectItem value="Task">Task</SelectItem>
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
              
              <Select value={interactionFilter} onValueChange={setInteractionFilter}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Interaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interactions</SelectItem>
                  <SelectItem value="commented">Commented</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="mentioned">Mentioned</SelectItem>
                  <SelectItem value="updated">Updated</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Analytics Dashboard">Analytics Dashboard</SelectItem>
                  <SelectItem value="Reporting Engine">Reporting Engine</SelectItem>
                  <SelectItem value="Authentication">Authentication</SelectItem>
                  <SelectItem value="User Settings">User Settings</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="API Gateway">API Gateway</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                        {issue.id}
                      </Badge>
                      {issue.isBookmarked && (
                        <Bookmark className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <CardTitle className="text-lg text-white line-clamp-2">
                      {issue.title}
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-gray-400 line-clamp-2">
                  {issue.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={`text-xs ${getStatusColor(issue.status)}`}>
                    {getStatusIcon(issue.status)}
                    <span className="ml-1">{issue.status}</span>
                  </Badge>
                  <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                    {issue.priority}
                  </Badge>
                  <Badge className={`text-xs ${getTypeColor(issue.type)}`}>
                    {issue.type}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Project:</span>
                    <span className="text-white">{issue.project}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Assignee:</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
                        <AvatarFallback className="text-xs bg-gray-700">
                          {issue.assignee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-white">{issue.assignee.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Last interaction:</span>
                    <span className={`capitalize ${getInteractionColor(issue.interaction)}`}>
                      {issue.interaction}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {issue.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Paperclip className="h-3 w-3" />
                      {issue.attachments}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {issue.storyPoints} SP
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    Viewed {formatDistanceToNow(issue.viewedDate, { addSuffix: true })}
                  </div>
                </div>
                
                <div className="flex gap-1 flex-wrap">
                  {issue.labels.slice(0, 2).map((label) => (
                    <Badge key={label} variant="outline" className="text-xs border-white/20 text-gray-300">
                      {label}
                    </Badge>
                  ))}
                  {issue.labels.length > 2 && (
                    <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                      +{issue.labels.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredIssues.map((issue, index) => (
                <div 
                  key={issue.id} 
                  className={`p-6 hover:bg-white/5 transition-colors ${
                    index !== filteredIssues.length - 1 ? 'border-b border-white/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                              {issue.id}
                            </Badge>
                            {issue.isBookmarked && (
                              <Bookmark className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                            )}
                            <span className={`text-xs capitalize ${getInteractionColor(issue.interaction)}`}>
                              {issue.interaction}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
                          <p className="text-sm text-gray-400 line-clamp-2">{issue.description}</p>
                        </div>
                        <div className="text-xs text-gray-400 text-right">
                          Viewed {formatDistanceToNow(issue.viewedDate, { addSuffix: true })}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <Badge className={`text-xs ${getStatusColor(issue.status)}`}>
                          {getStatusIcon(issue.status)}
                          <span className="ml-1">{issue.status}</span>
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </Badge>
                        <Badge className={`text-xs ${getTypeColor(issue.type)}`}>
                          {issue.type}
                        </Badge>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={issue.assignee.avatar} alt={issue.assignee.name} />
                            <AvatarFallback className="text-xs bg-gray-700">
                              {issue.assignee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white">{issue.assignee.name}</span>
                        </div>
                        
                        <span className="text-sm text-gray-400">{issue.project}</span>
                        
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
                            <Target className="h-3 w-3" />
                            {issue.storyPoints} SP
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1 flex-wrap">
                        {issue.labels.slice(0, 4).map((label) => (
                          <Badge key={label} variant="outline" className="text-xs border-white/20 text-gray-300">
                            {label}
                          </Badge>
                        ))}
                        {issue.labels.length > 4 && (
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                            +{issue.labels.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredIssues.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No recent issues found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No issues match your search for "${searchQuery}"`
                : "You haven't viewed any issues recently."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Browse All Issues
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
