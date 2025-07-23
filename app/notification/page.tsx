"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  BellRing,
  Check,
  CheckCheck,
  X,
  Settings,
  MessageSquare,
  UserPlus,
  GitPullRequest,
  AlertTriangle,
  Calendar,
  Target,
  Clock,
  MoreVertical,
  Filter,
  Search,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Volume2,
  VolumeX
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface NotificationItem {
  id: string
  type: "comment" | "mention" | "assignment" | "approval" | "deadline" | "team" | "system" | "release" | "security"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high" | "urgent"
  user?: {
    name: string
    avatar: string
  }
  project?: string
  actionUrl?: string
  category: "work" | "system" | "social" | "updates"
}

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    type: "comment",
    title: "New comment on your issue",
    message: "Sarah Johnson commented on 'Fix dashboard loading performance': 'I've identified the root cause. The issue is with the async data fetching in the chart component.'",
    timestamp: new Date(2024, 6, 23, 16, 30),
    read: false,
    priority: "medium",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg"
    },
    project: "Nexus Platform",
    actionUrl: "/issues/ISS-002",
    category: "work"
  },
  {
    id: "n2",
    type: "assignment",
    title: "New issue assigned",
    message: "You've been assigned to 'Implement OAuth 2.0 Authentication' by Michael Chen. This is a high-priority security enhancement.",
    timestamp: new Date(2024, 6, 23, 15, 45),
    read: false,
    priority: "high",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg"
    },
    project: "Security Module",
    actionUrl: "/issues/ISS-001",
    category: "work"
  },
  {
    id: "n3",
    type: "mention",
    title: "You were mentioned in a discussion",
    message: "David Miller mentioned you in 'Mobile App Redesign' discussion: '@john what are your thoughts on the new navigation pattern?'",
    timestamp: new Date(2024, 6, 23, 14, 20),
    read: false,
    priority: "medium",
    user: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg"
    },
    project: "Mobile App",
    actionUrl: "/projects/MB-002",
    category: "social"
  },
  {
    id: "n4",
    type: "deadline",
    title: "Approaching deadline",
    message: "Task 'API Documentation Update' is due tomorrow at 5:00 PM. Please ensure all endpoints are documented.",
    timestamp: new Date(2024, 6, 23, 12, 0),
    read: true,
    priority: "urgent",
    project: "API Gateway",
    actionUrl: "/issues/ISS-006",
    category: "work"
  },
  {
    id: "n5",
    type: "approval",
    title: "Pull request needs review",
    message: "Jennifer Kim requested your review on PR #145 'Add user authentication flow'. The PR includes security improvements and bug fixes.",
    timestamp: new Date(2024, 6, 23, 11, 15),
    read: true,
    priority: "medium",
    user: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg"
    },
    project: "Design System",
    actionUrl: "/pulls/145",
    category: "work"
  },
  {
    id: "n6",
    type: "team",
    title: "Added to project team",
    message: "You've been added to the 'Security Audit & Compliance' team by Robert Chen. Welcome to the team!",
    timestamp: new Date(2024, 6, 23, 10, 30),
    read: true,
    priority: "low",
    user: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg"
    },
    project: "Security Audit",
    actionUrl: "/projects/SEC-005",
    category: "social"
  },
  {
    id: "n7",
    type: "system",
    title: "System maintenance scheduled",
    message: "Scheduled maintenance window tonight from 2:00-4:00 AM EST. All services will be temporarily unavailable.",
    timestamp: new Date(2024, 6, 23, 9, 0),
    read: true,
    priority: "medium",
    actionUrl: "/settings/maintenance",
    category: "system"
  },
  {
    id: "n8",
    type: "release",
    title: "New platform version released",
    message: "Nexus PM v2.1.0 is now available with performance improvements, new dark theme, and enhanced collaboration features.",
    timestamp: new Date(2024, 6, 22, 18, 0),
    read: true,
    priority: "low",
    actionUrl: "/changelog",
    category: "updates"
  },
  {
    id: "n9",
    type: "security",
    title: "Security alert",
    message: "Unusual login activity detected from a new device in San Francisco, CA. If this wasn't you, please review your account security.",
    timestamp: new Date(2024, 6, 22, 14, 30),
    read: false,
    priority: "urgent",
    actionUrl: "/security",
    category: "system"
  },
  {
    id: "n10",
    type: "comment",
    title: "New comment on sprint retrospective",
    message: "Lisa Garcia added feedback to Sprint 15 Retrospective: 'Great work on the performance improvements this sprint!'",
    timestamp: new Date(2024, 6, 22, 10, 15),
    read: true,
    priority: "low",
    user: {
      name: "Lisa Garcia",
      avatar: "/placeholder-user.jpg"
    },
    project: "Sprint Management",
    actionUrl: "/sprints/15/retrospective",
    category: "work"
  }
]

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "comment": return <MessageSquare className="h-4 w-4" />
      case "mention": return <MessageSquare className="h-4 w-4" />
      case "assignment": return <Target className="h-4 w-4" />
      case "approval": return <GitPullRequest className="h-4 w-4" />
      case "deadline": return <Clock className="h-4 w-4" />
      case "team": return <UserPlus className="h-4 w-4" />
      case "system": return <AlertTriangle className="h-4 w-4" />
      case "release": return <Bell className="h-4 w-4" />
      case "security": return <AlertTriangle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: NotificationItem["type"], priority: NotificationItem["priority"]) => {
    if (priority === "urgent") return "text-red-400 bg-red-500/20 border-red-500/30"
    
    switch (type) {
      case "comment": return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "mention": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "assignment": return "text-green-400 bg-green-500/20 border-green-500/30"
      case "approval": return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      case "deadline": return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "team": return "text-pink-400 bg-pink-500/20 border-pink-500/30"
      case "system": return "text-gray-400 bg-gray-500/20 border-gray-500/30"
      case "release": return "text-indigo-400 bg-indigo-500/20 border-indigo-500/30"
      case "security": return "text-red-400 bg-red-500/20 border-red-500/30"
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: NotificationItem["priority"]) => {
    switch (priority) {
      case "urgent": return "text-red-400 bg-red-500/20"
      case "high": return "text-orange-400 bg-orange-500/20"
      case "medium": return "text-yellow-400 bg-yellow-500/20"
      case "low": return "text-green-400 bg-green-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchQuery === "" || 
                         notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === "all" || notification.type === filterType
    const matchesCategory = filterCategory === "all" || notification.category === filterCategory
    const matchesRead = filterRead === "all" || 
                       (filterRead === "read" && notification.read) ||
                       (filterRead === "unread" && !notification.read)
    
    const matchesTab = activeTab === "all" || notification.category === activeTab
    
    return matchesSearch && matchesType && matchesCategory && matchesRead && matchesTab
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const urgentCount = notifications.filter(n => n.priority === "urgent" && !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(notification => !selectedNotifications.includes(notification.id)))
    setSelectedNotifications([])
  }

  const markSelectedAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => 
        selectedNotifications.includes(notification.id)
          ? { ...notification, read: true }
          : notification
      )
    )
    setSelectedNotifications([])
  }

  const toggleSelection = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id))
  }

  const deselectAll = () => {
    setSelectedNotifications([])
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Notifications</h1>
          <p className="text-xl text-gray-300 mt-2">
            Stay updated with your latest activities and alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedNotifications.length > 0 && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={markSelectedAsRead}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Read ({selectedNotifications.length})
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={deleteSelected}
                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedNotifications.length})
              </Button>
            </>
          )}
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total</p>
                <div className="text-3xl font-bold text-blue-400">{notifications.length}</div>
              </div>
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Unread</p>
                <div className="text-3xl font-bold text-yellow-400">{unreadCount}</div>
              </div>
              <BellRing className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Urgent</p>
                <div className="text-3xl font-bold text-red-400">{urgentCount}</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">This Week</p>
                <div className="text-3xl font-bold text-green-400">
                  {notifications.filter(n => {
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return n.timestamp > weekAgo
                  }).length}
                </div>
              </div>
              <Calendar className="h-8 w-8 text-green-400" />
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
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="comment">Comments</SelectItem>
                  <SelectItem value="mention">Mentions</SelectItem>
                  <SelectItem value="assignment">Assignments</SelectItem>
                  <SelectItem value="approval">Approvals</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterRead} onValueChange={setFilterRead}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedNotifications.length === 0 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAll}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Select All
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={deselectAll}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Deselect All
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs and Notifications */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/10 border-white/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="work" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Work ({notifications.filter(n => n.category === "work").length})
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Social ({notifications.filter(n => n.category === "social").length})
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            System ({notifications.filter(n => n.category === "system").length})
          </TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Updates ({notifications.filter(n => n.category === "updates").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={cn(
                    "bg-white/10 backdrop-blur-sm border-white/20 transition-all duration-200 hover:bg-white/15",
                    !notification.read && "border-l-4 border-l-blue-500",
                    selectedNotifications.includes(notification.id) && "bg-blue-500/10 border-blue-500/30"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelection(notification.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <div className={cn(
                          "flex-shrink-0 p-2 rounded-full border",
                          getNotificationColor(notification.type, notification.priority)
                        )}>
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className={cn(
                                "text-sm font-medium",
                                notification.read ? "text-gray-300" : "text-white"
                              )}>
                                {notification.title}
                              </h3>
                              <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              {!notification.read && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => deleteNotification(notification.id)}
                                className="text-red-400"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            {notification.user && (
                              <div className="flex items-center gap-1">
                                <Avatar className="h-4 w-4">
                                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                                  <AvatarFallback className="text-xs bg-gray-700">
                                    {notification.user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{notification.user.name}</span>
                              </div>
                            )}
                            {notification.project && (
                              <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                                {notification.project}
                              </Badge>
                            )}
                          </div>
                          <span>
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No notifications found</h3>
                  <p className="text-gray-400">
                    {searchQuery 
                      ? `No notifications match your search for "${searchQuery}"`
                      : "You're all caught up! New notifications will appear here."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription className="text-gray-400">
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-white">Email Notifications</p>
                  <p className="text-xs text-gray-400">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">Push Notifications</p>
                  <p className="text-xs text-gray-400">Browser push notifications</p>
                </div>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-purple-400" />
                ) : (
                  <VolumeX className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-white">Sound Alerts</p>
                  <p className="text-xs text-gray-400">Play sound for notifications</p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
