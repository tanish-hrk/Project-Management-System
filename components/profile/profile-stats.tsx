"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data - in a real app, this would come from an API
const activityData = [
  { name: "Mon", tasks: 4, comments: 2, commits: 5 },
  { name: "Tue", tasks: 3, comments: 1, commits: 7 },
  { name: "Wed", tasks: 5, comments: 3, commits: 2 },
  { name: "Thu", tasks: 7, comments: 4, commits: 4 },
  { name: "Fri", tasks: 2, comments: 6, commits: 8 },
  { name: "Sat", tasks: 1, comments: 0, commits: 3 },
  { name: "Sun", tasks: 0, comments: 1, commits: 1 },
]

const statsCards = [
  { title: "Tasks Completed", value: "127", change: "+12% from last month" },
  { title: "Projects Contributed", value: "8", change: "Same as last month" },
  { title: "Avg. Response Time", value: "2.4h", change: "-30min from last month" },
  { title: "On-time Delivery", value: "94%", change: "+2% from last month" },
]

export function ProfileStats() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Performance Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <p className="text-xs text-gray-400 mt-1">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Weekly Activity</CardTitle>
          <CardDescription className="text-gray-300">Your task completion and engagement over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              tasks: {
                label: "Tasks",
                color: "hsl(var(--chart-1))",
              },
              comments: {
                label: "Comments",
                color: "hsl(var(--chart-2))",
              },
              commits: {
                label: "Commits",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" fill="var(--color-comments)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="commits" fill="var(--color-commits)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
