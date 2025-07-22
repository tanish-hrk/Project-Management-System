"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, CheckCircle2, GitCommit, Clock, AlertCircle, FileText, ArrowRight } from "lucide-react"

// Mock data - in a real app, this would come from an API
const mockActivities = [
  {
    id: "a1",
    type: "comment",
    project: "Mobile App Redesign",
    task: "Implement new onboarding flow",
    content: "I think we should consider adding a skip button for returning users.",
    timestamp: "2 hours ago",
    icon: <MessageSquare className="h-4 w-4" />,
    iconColor: "text-blue-500 bg-blue-100 dark:bg-blue-900",
  },
  {
    id: "a2",
    type: "status",
    project: "Dashboard Analytics",
    task: "Create chart components",
    content: "Moved from 'In Progress' to 'Review'",
    timestamp: "Yesterday",
    icon: <ArrowRight className="h-4 w-4" />,
    iconColor: "text-purple-500 bg-purple-100 dark:bg-purple-900",
  },
  {
    id: "a3",
    type: "completion",
    project: "API Integration",
    task: "Implement payment gateway",
    content: "Marked task as complete",
    timestamp: "Yesterday",
    icon: <CheckCircle2 className="h-4 w-4" />,
    iconColor: "text-green-500 bg-green-100 dark:bg-green-900",
  },
  {
    id: "a4",
    type: "commit",
    project: "API Integration",
    task: "Fix authentication bug",
    content: "Pushed 3 commits to feature/auth-fix",
    timestamp: "2 days ago",
    icon: <GitCommit className="h-4 w-4" />,
    iconColor: "text-gray-500 bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "a5",
    type: "deadline",
    project: "Marketing Website",
    task: "Design homepage mockups",
    content: "Task deadline is approaching (Due in 2 days)",
    timestamp: "2 days ago",
    icon: <Clock className="h-4 w-4" />,
    iconColor: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: "a6",
    type: "issue",
    project: "Mobile App Redesign",
    task: "Fix navigation drawer",
    content: "Reported a bug: 'Navigation drawer doesn't close on Android'",
    timestamp: "3 days ago",
    icon: <AlertCircle className="h-4 w-4" />,
    iconColor: "text-red-500 bg-red-100 dark:bg-red-900",
  },
  {
    id: "a7",
    type: "document",
    project: "User Documentation",
    task: "Write API documentation",
    content: "Created new document: 'Authentication API Guide'",
    timestamp: "4 days ago",
    icon: <FileText className="h-4 w-4" />,
    iconColor: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900",
  },
]

interface ProfileActivityProps {
  limit?: number
}

export function ProfileActivity({ limit }: ProfileActivityProps) {
  const [activities] = useState(mockActivities)
  const displayActivities = limit ? activities.slice(0, limit) : activities

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Recent Activity</CardTitle>
        {limit && (
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative pl-6 ml-6 border-l border-white/20">
          {displayActivities.map((activity, index) => (
            <div key={activity.id} className={`relative pb-8 ${index === displayActivities.length - 1 ? "" : ""}`}>
              <div className="absolute -left-10 mt-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <div className={`p-1 rounded-full ${activity.iconColor}`}>{activity.icon}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">
                    {activity.project} / {activity.task}
                  </div>
                  <p className="text-sm text-gray-300 mt-0.5">{activity.content}</p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">{activity.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
