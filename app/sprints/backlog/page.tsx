"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  FileText, 
  Search, 
  Plus,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Archive,
  Star,
  MessageSquare,
  Paperclip,
  Calendar,
  Users
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
import { format, formatDistanceToNow } from "date-fns"

interface BacklogItem {
  id: string
  title: string
  description: string
  type: "Story" | "Bug" | "Task" | "Epic"
  priority: "Critical" | "High" | "Medium" | "Low"
  status: "Backlog" | "Ready" | "In Progress" | "Done"
  storyPoints: number
  businessValue: number
  effort: number
  labels: string[]
  assignee?: {
    name: string
    avatar: string
    role: string
  }
  reporter: {
    name: string
    avatar: string
  }
  project: string
  sprint?: string
  createdDate: Date
  updatedDate: Date
  dueDate?: Date
  comments: number
  attachments: number
  dependencies: string[]
  acceptance: string[]
  isBlocked: boolean
  blockedReason?: string
  estimatedHours: number
  order: number
}

const backlogItems: BacklogItem[] = [
  {
    id: "STORY-001",
    title: "User Profile Customization",
    description: "Allow users to customize their profile with themes, avatars, and personal information",
    type: "Story",
    priority: "High",
    status: "Backlog",
    storyPoints: 8,
    businessValue: 85,
    effort: 60,
    labels: ["frontend", "user-experience", "profile"],
    assignee: {
      name: "Emily Johnson",
      avatar: "/placeholder-user.jpg",
      role: "Frontend Developer"
    },
    reporter: {
      name: "Product Manager",
      avatar: "/placeholder-user.jpg"
    },
    project: "User Management",
    createdDate: new Date(2024, 6, 15),
    updatedDate: new Date(2024, 6, 22),
    dueDate: new Date(2024, 7, 15),
    comments: 12,
    attachments: 4,
    dependencies: ["AUTH-002"],
    acceptance: [
      "User can upload custom avatar",
      "User can select from predefined themes",
      "Profile changes are saved automatically",
      "Changes are reflected across the application"
    ],
    isBlocked: false,
    estimatedHours: 32,
    order: 1
  },
  {
    id: "BUG-002",
    title: "Memory Leak in Dashboard Charts",
    description: "Dashboard performance degrades over time due to memory leak in chart rendering component",
    type: "Bug",
    priority: "Critical",
    status: "Ready",
    storyPoints: 13,
    businessValue: 95,
    effort: 80,
    labels: ["bug", "performance", "dashboard", "charts"],
    assignee: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg",
      role: "Senior Developer"
    },
    reporter: {
      name: "QA Team",
      avatar: "/placeholder-user.jpg"
    },
    project: "Analytics Platform",
    createdDate: new Date(2024, 6, 20),
    updatedDate: new Date(2024, 6, 23),
    comments: 8,
    attachments: 6,
    dependencies: [],
    acceptance: [
      "Memory usage remains stable over 8+ hours",
      "No performance degradation in chart rendering",
      "All chart types tested for memory leaks",
      "Performance monitoring added"
    ],
    isBlocked: false,
    estimatedHours: 48,
    order: 2
  },
  {
    id: "EPIC-001",
    title: "Mobile App Offline Support",
    description: "Implement comprehensive offline functionality for mobile application including data sync",
    type: "Epic",
    priority: "Medium",
    status: "Backlog",
    storyPoints: 34,
    businessValue: 75,
    effort: 90,
    labels: ["mobile", "offline", "sync", "epic"],
    assignee: {
      name: "Sarah Wilson",
      avatar: "/placeholder-user.jpg",
      role: "Mobile Lead"
    },
    reporter: {
      name: "Product Owner",
      avatar: "/placeholder-user.jpg"
    },
    project: "Mobile Application",
    createdDate: new Date(2024, 6, 10),
    updatedDate: new Date(2024, 6, 21),
    dueDate: new Date(2024, 8, 30),
    comments: 25,
    attachments: 12,
    dependencies: ["API-003", "SYNC-001"],
    acceptance: [
      "App functions without internet connection",
      "Data syncs when connection restored",
      "Conflict resolution implemented",
      "User receives sync status notifications"
    ],
    isBlocked: true,
    blockedReason: "Waiting for API endpoint specification",
    estimatedHours: 160,
    order: 3
  },
  {
    id: "TASK-003",
    title: "API Documentation Update",
    description: "Update API documentation to reflect recent changes and add examples",
    type: "Task",
    priority: "Low",
    status: "Backlog",
    storyPoints: 3,
    businessValue: 40,
    effort: 25,
    labels: ["documentation", "api", "maintenance"],
    assignee: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      role: "Technical Writer"
    },
    reporter: {
      name: "Development Team",
      avatar: "/placeholder-user.jpg"
    },
    project: "API Platform",
    createdDate: new Date(2024, 6, 18),
    updatedDate: new Date(2024, 6, 19),
    comments: 3,
    attachments: 1,
    dependencies: [],
    acceptance: [
      "All endpoints documented",
      "Examples provided for each endpoint",
      "Authentication section updated",
      "Error codes documented"
    ],
    isBlocked: false,
    estimatedHours: 12,
    order: 4
  },
  {
    id: "STORY-004",
    title: "Advanced Search Functionality",
    description: "Implement advanced search with filters, sorting, and saved search queries",
    type: "Story",
    priority: "Medium",
    status: "Backlog",
    storyPoints: 21,
    businessValue: 70,
    effort: 75,
    labels: ["search", "filters", "frontend", "backend"],
    assignee: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg",
      role: "Full Stack Developer"
    },
    reporter: {
      name: "User Research",
      avatar: "/placeholder-user.jpg"
    },
    project: "Core Platform",
    createdDate: new Date(2024, 6, 12),
    updatedDate: new Date(2024, 6, 20),
    dueDate: new Date(2024, 8, 1),
    comments: 15,
    attachments: 8,
    dependencies: ["SEARCH-INDEX"],
    acceptance: [
      "Advanced filters implemented",
      "Search results can be sorted",
      "Users can save search queries",
      "Search performance under 2 seconds"
    ],
    isBlocked: false,
    estimatedHours: 84,
    order: 5
  },
  {
    id: "BUG-005",
    title: "Email Notification Delivery Issues",
    description: "Some users not receiving email notifications for critical system events",
    type: "Bug",
    priority: "High",
    status: "Ready",
    storyPoints: 5,
    businessValue: 80,
    effort: 40,
    labels: ["email", "notifications", "bug", "infrastructure"],
    assignee: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg",
      role: "Backend Developer"
    },
    reporter: {
      name: "Support Team",
      avatar: "/placeholder-user.jpg"
    },
    project: "Notification Service",
    createdDate: new Date(2024, 6, 22),
    updatedDate: new Date(2024, 6, 23),
    comments: 6,
    attachments: 3,
    dependencies: [],
    acceptance: [
      "Email delivery rate above 99%",
      "Failed delivery alerts implemented",
      "Retry mechanism configured",
      "Delivery status tracking added"
    ],
    isBlocked: false,
    estimatedHours: 20,
    order: 6
  }
]

export default function SprintBacklogPage() {
  const [items, setItems] = useState(backlogItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [sortBy, setSortBy] = useState("order")

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
      case "Epic": return "text-purple-400 bg-purple-500/20"
      case "Story": return "text-blue-400 bg-blue-500/20"
      case "Bug": return "text-red-400 bg-red-500/20"
      case "Task": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Backlog": return "text-gray-400 bg-gray-500/20"
      case "Ready": return "text-blue-400 bg-blue-500/20"
      case "In Progress": return "text-yellow-400 bg-yellow-500/20"
      case "Done": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredItems = items
    .filter(item => {
      const matchesSearch = searchQuery === "" || 
                           item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = typeFilter === "all" || item.type === typeFilter
      const matchesPriority = priorityFilter === "all" || item.priority === priorityFilter
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesProject = projectFilter === "all" || item.project === projectFilter
      
      return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesProject
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { "Critical": 4, "High": 3, "Medium": 2, "Low": 1 }
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
        case "storyPoints":
          return b.storyPoints - a.storyPoints
        case "businessValue":
          return b.businessValue - a.businessValue
        case "created":
          return b.createdDate.getTime() - a.createdDate.getTime()
        default:
          return a.order - b.order
      }
    })

  const backlogStats = {
    total: items.length,
    totalStoryPoints: items.reduce((sum, item) => sum + item.storyPoints, 0),
    totalHours: items.reduce((sum, item) => sum + item.estimatedHours, 0),
    blocked: items.filter(item => item.isBlocked).length,
    ready: items.filter(item => item.status === "Ready").length
  }

  const moveItemUp = (index: number) => {
    if (index > 0) {
      const newItems = [...filteredItems]
      const [movedItem] = newItems.splice(index, 1)
      newItems.splice(index - 1, 0, movedItem)
      
      // Update the main items array
      const updatedItems = items.map(item => {
        const newIndex = newItems.findIndex(ni => ni.id === item.id)
        return newIndex >= 0 ? { ...item, order: newIndex + 1 } : item
      })
      setItems(updatedItems)
    }
  }

  const moveItemDown = (index: number) => {
    if (index < filteredItems.length - 1) {
      const newItems = [...filteredItems]
      const [movedItem] = newItems.splice(index, 1)
      newItems.splice(index + 1, 0, movedItem)
      
      // Update the main items array
      const updatedItems = items.map(item => {
        const newIndex = newItems.findIndex(ni => ni.id === item.id)
        return newIndex >= 0 ? { ...item, order: newIndex + 1 } : item
      })
      setItems(updatedItems)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Sprint Backlog</h1>
          <p className="text-xl text-gray-300 mt-2">Prioritize and manage your product backlog</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Archive className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Backlog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Items</p>
                <div className="text-3xl font-bold text-blue-400">{backlogStats.total}</div>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Story Points</p>
                <div className="text-3xl font-bold text-purple-400">{backlogStats.totalStoryPoints}</div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Estimated Hours</p>
                <div className="text-3xl font-bold text-green-400">{backlogStats.totalHours}h</div>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Ready Items</p>
                <div className="text-3xl font-bold text-yellow-400">{backlogStats.ready}</div>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Blocked Items</p>
                <div className="text-3xl font-bold text-red-400">{backlogStats.blocked}</div>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search backlog items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[100px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Epic">Epic</SelectItem>
                  <SelectItem value="Story">Story</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[110px] bg-white/10 border-white/20 text-white">
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
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[110px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="Analytics Platform">Analytics Platform</SelectItem>
                  <SelectItem value="Mobile Application">Mobile Application</SelectItem>
                  <SelectItem value="API Platform">API Platform</SelectItem>
                  <SelectItem value="Core Platform">Core Platform</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Manual Order</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="storyPoints">Story Points</SelectItem>
                  <SelectItem value="businessValue">Business Value</SelectItem>
                  <SelectItem value="created">Created Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backlog Items */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <Card 
            key={item.id}
            className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors ${
              item.isBlocked ? 'border-red-500/50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItemUp(index)}
                    disabled={index === 0}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItemDown(index)}
                    disabled={index === filteredItems.length - 1}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                          {item.id}
                        </Badge>
                        <Badge className={`text-xs ${getTypeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                        {item.isBlocked && (
                          <Badge className="text-xs bg-red-500/20 text-red-400">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Blocked
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                      {item.isBlocked && item.blockedReason && (
                        <p className="text-sm text-red-400">
                          <AlertCircle className="h-3 w-3 inline mr-1" />
                          {item.blockedReason}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          Add to Sprint
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Story Points:</span>
                        <span className="text-white font-medium">{item.storyPoints}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Business Value:</span>
                        <span className="text-white">{item.businessValue}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Effort:</span>
                        <span className="text-white">{item.effort}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Estimated:</span>
                        <span className="text-white">{item.estimatedHours}h</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Project:</span>
                        <span className="text-white text-xs">{item.project}</span>
                      </div>
                      {item.dueDate && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Due:</span>
                          <span className="text-white text-xs">
                            {format(item.dueDate, "MMM d, yyyy")}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {item.assignee && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">Assignee:</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={item.assignee.avatar} alt={item.assignee.name} />
                              <AvatarFallback className="text-xs bg-gray-700">
                                {item.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-white text-xs">{item.assignee.name}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {item.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          {item.attachments}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">
                        Created {formatDistanceToNow(item.createdDate, { addSuffix: true })}
                      </div>
                      <div className="text-xs text-gray-400">
                        Updated {formatDistanceToNow(item.updatedDate, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 flex-wrap">
                    {item.labels.slice(0, 4).map((label) => (
                      <Badge key={label} variant="outline" className="text-xs border-white/20 text-gray-300">
                        {label}
                      </Badge>
                    ))}
                    {item.labels.length > 4 && (
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                        +{item.labels.length - 4}
                      </Badge>
                    )}
                  </div>
                  
                  {item.dependencies.length > 0 && (
                    <div className="text-xs text-gray-400">
                      <span className="font-medium">Dependencies:</span> {item.dependencies.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No backlog items found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? `No items match your search for "${searchQuery}"`
                : "Start adding items to your backlog to organize your work."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Backlog Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
