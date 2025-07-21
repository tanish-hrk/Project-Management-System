"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { GitCommit, MessageSquare, CheckCircle, UserPlus } from "lucide-react"

const mockActivities = [
  {
    id: "1",
    type: "issue_updated",
    user: { name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
    action: "moved",
    target: "NEX-123",
    details: "from To Do to In Progress",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=24&width=24" },
    action: "commented on",
    target: "NEX-124",
    details: "Added implementation details",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "3",
    type: "issue_completed",
    user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=24&width=24" },
    action: "completed",
    target: "NEX-122",
    details: "Fix authentication bug",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "4",
    type: "member_added",
    user: { name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24" },
    action: "joined",
    target: "Nexus Platform",
    details: "as a developer",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "5",
    type: "commit",
    user: { name: "Tom Wilson", avatar: "/placeholder.svg?height=24&width=24" },
    action: "pushed",
    target: "3 commits",
    details: "to main branch",
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "issue_updated":
    case "issue_completed":
      return <CheckCircle className="h-4 w-4" />
    case "comment":
      return <MessageSquare className="h-4 w-4" />
    case "member_added":
      return <UserPlus className="h-4 w-4" />
    case "commit":
      return <GitCommit className="h-4 w-4" />
    default:
      return <CheckCircle className="h-4 w-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "issue_completed":
      return "text-green-400"
    case "comment":
      return "text-blue-400"
    case "member_added":
      return "text-purple-400"
    case "commit":
      return "text-orange-400"
    default:
      return "text-gray-400"
  }
}

export function RecentActivity() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
        <CardDescription className="text-gray-300">Latest updates from your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {activity.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`${getActivityColor(activity.type)}`}>{getActivityIcon(activity.type)}</div>
                  <div className="text-sm flex items-center gap-2">
                    <span className="font-medium text-white">{activity.user.name}</span>{" "}
                    <span className="text-gray-300">{activity.action}</span>{" "}
                    <Badge variant="outline" className="text-xs font-mono border-white/20 text-gray-300">
                      {activity.target}
                    </Badge>
                  </div>
                </div>

                {activity.details && <p className="text-xs text-gray-400">{activity.details}</p>}

                <p className="text-xs text-gray-500">{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
