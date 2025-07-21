"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target, TrendingUp } from "lucide-react"
import { formatDistanceToNow, differenceInDays } from "date-fns"

const mockSprint = {
  id: "1",
  name: "Sprint 12",
  goal: "Implement user authentication and dashboard improvements",
  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
  status: "active" as const,
  totalStoryPoints: 42,
  completedStoryPoints: 28,
  totalIssues: 15,
  completedIssues: 9,
  burndownData: [
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), remaining: 42, ideal: 42 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), remaining: 38, ideal: 36 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), remaining: 35, ideal: 30 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), remaining: 30, ideal: 24 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), remaining: 25, ideal: 18 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), remaining: 20, ideal: 12 },
    { date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), remaining: 16, ideal: 6 },
    { date: new Date(), remaining: 14, ideal: 0 },
  ],
}

export function SprintProgress() {
  const progressPercentage = (mockSprint.completedStoryPoints / mockSprint.totalStoryPoints) * 100
  const daysRemaining = differenceInDays(mockSprint.endDate, new Date())
  const isOnTrack = mockSprint.completedStoryPoints >= mockSprint.totalStoryPoints * 0.5

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5" />
              {mockSprint.name}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-300">{mockSprint.goal}</CardDescription>
          </div>
          <Badge variant={mockSprint.status === "active" ? "default" : "secondary"} className="bg-green-600 text-white">
            {mockSprint.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sprint Timeline */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar className="h-4 w-4" />
          <span>{daysRemaining > 0 ? `${daysRemaining} days remaining` : "Sprint ended"}</span>
          <span>•</span>
          <span>Ends {formatDistanceToNow(mockSprint.endDate, { addSuffix: true })}</span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Story Points</span>
            <span className="text-white">
              {mockSprint.completedStoryPoints}/{mockSprint.totalStoryPoints}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Issues Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Issues</span>
            <span className="text-white">
              {mockSprint.completedIssues}/{mockSprint.totalIssues}
            </span>
          </div>
          <Progress value={(mockSprint.completedIssues / mockSprint.totalIssues) * 100} className="h-2" />
        </div>

        {/* Sprint Health */}
        <div className="flex items-center justify-between pt-2 border-t border-white/20">
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${isOnTrack ? "text-green-400" : "text-yellow-400"}`} />
            <span className="text-sm font-medium text-white">{isOnTrack ? "On Track" : "At Risk"}</span>
          </div>
          <Badge
            variant={isOnTrack ? "default" : "secondary"}
            className={`text-xs ${isOnTrack ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}`}
          >
            {Math.round(progressPercentage)}% Complete
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
