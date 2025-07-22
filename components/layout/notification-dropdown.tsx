"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  BellRing,
  Check,
  X,
  Settings,
  MessageSquare,
  UserPlus,
  GitPullRequest,
  AlertTriangle,
  Calendar,
  Target,
  Clock,
  MoreVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

export interface NotificationItem {
  id: string
  type: "comment" | "mention" | "assignment" | "approval" | "deadline" | "team" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  user?: {
    name: string
    avatar: string
  }
  project?: string
  actionUrl?: string
}

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    type: "comment",
    title: "New comment on your issue",
    message: "Sarah Johnson commented on 'Fix dashboard loading performance'",
    timestamp: new Date(2024, 6, 23, 16, 30),
    read: false,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg"
    },
    project: "Nexus Platform",
    actionUrl: "/issues/ISS-002"
  },
  {
    id: "n2",
    type: "assignment",
    title: "New issue assigned",
    message: "You've been assigned to 'Implement OAuth 2.0 Authentication'",
    timestamp: new Date(2024, 6, 23, 15, 45),
    read: false,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg"
    },
    project: "Nexus Platform",
    actionUrl: "/issues/ISS-001"
  },
  {
    id: "n3",
    type: "mention",
    title: "You were mentioned",
    message: "David Miller mentioned you in 'Mobile App Redesign' discussion",
    timestamp: new Date(2024, 6, 23, 14, 20),
    read: false,
    user: {
      name: "David Miller",
      avatar: "/placeholder-user.jpg"
    },
    project: "Mobile App",
    actionUrl: "/projects/MB-002"
  },
  {
    id: "n4",
    type: "deadline",
    title: "Upcoming deadline",
    message: "Task 'API Documentation' is due tomorrow",
    timestamp: new Date(2024, 6, 23, 12, 0),
    read: true,
    project: "API Gateway",
    actionUrl: "/issues/ISS-006"
  },
  {
    id: "n5",
    type: "approval",
    title: "Pull request needs review",
    message: "Jennifer Kim requested your review on PR #145",
    timestamp: new Date(2024, 6, 23, 11, 15),
    read: true,
    user: {
      name: "Jennifer Kim",
      avatar: "/placeholder-user.jpg"
    },
    project: "Design System",
    actionUrl: "/pulls/145"
  },
  {
    id: "n6",
    type: "team",
    title: "Added to project team",
    message: "You've been added to the 'Security Audit & Compliance' team",
    timestamp: new Date(2024, 6, 23, 10, 30),
    read: true,
    user: {
      name: "Robert Chen",
      avatar: "/placeholder-user.jpg"
    },
    project: "Security Audit",
    actionUrl: "/projects/SEC-005"
  },
  {
    id: "n7",
    type: "system",
    title: "System maintenance",
    message: "Scheduled maintenance window tonight from 2-4 AM EST",
    timestamp: new Date(2024, 6, 23, 9, 0),
    read: true,
    actionUrl: "/settings/maintenance"
  }
]

interface NotificationDropdownProps {
  trigger?: React.ReactNode
  align?: "start" | "center" | "end"
}

export function NotificationDropdown({ trigger, align = "end" }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "comment": return <MessageSquare className="h-4 w-4" />
      case "mention": return <MessageSquare className="h-4 w-4" />
      case "assignment": return <Target className="h-4 w-4" />
      case "approval": return <GitPullRequest className="h-4 w-4" />
      case "deadline": return <Clock className="h-4 w-4" />
      case "team": return <UserPlus className="h-4 w-4" />
      case "system": return <AlertTriangle className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: NotificationItem["type"]) => {
    switch (type) {
      case "comment": return "text-blue-400 bg-blue-500/20"
      case "mention": return "text-yellow-400 bg-yellow-500/20"
      case "assignment": return "text-green-400 bg-green-500/20"
      case "approval": return "text-purple-400 bg-purple-500/20"
      case "deadline": return "text-orange-400 bg-orange-500/20"
      case "team": return "text-pink-400 bg-pink-500/20"
      case "system": return "text-red-400 bg-red-500/20"
      default: return "text-gray-400 bg-gray-500/20"
    }
  }

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

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
      {unreadCount > 0 ? (
        <BellRing className="h-5 w-5" />
      ) : (
        <Bell className="h-5 w-5" />
      )}
      {unreadCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Button>
  )

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        className="w-96 p-0 bg-gray-900/95 backdrop-blur-sm border-white/20"
        sideOffset={5}
      >
        <Card className="border-0 bg-transparent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-white text-lg">Notifications</CardTitle>
                <CardDescription className="text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length > 0 ? (
                <div className="space-y-1 p-3 pt-0">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "group relative p-3 rounded-lg border transition-all duration-200 cursor-pointer",
                        notification.read 
                          ? "bg-white/5 border-white/10 hover:bg-white/10" 
                          : "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15"
                      )}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id)
                        }
                        if (notification.actionUrl) {
                          setIsOpen(false)
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "flex-shrink-0 p-2 rounded-full",
                          getNotificationColor(notification.type)
                        )}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              "text-sm font-medium",
                              notification.read ? "text-gray-300" : "text-white"
                            )}>
                              {notification.title}
                            </p>
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-gray-400 hover:text-white"
                                    onClick={(e) => e.stopPropagation()}
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
                                  <DropdownMenuItem 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-red-400"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500">
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
                            <span className="ml-auto">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
                  <p className="text-sm text-gray-400">
                    You're all caught up! New notifications will appear here.
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
