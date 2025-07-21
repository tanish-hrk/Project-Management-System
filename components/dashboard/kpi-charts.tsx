"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, Target, Users, Clock } from "lucide-react"

// Mock data for charts
const velocityData = [
  { sprint: "Sprint 1", planned: 45, completed: 42, date: "2024-01-15" },
  { sprint: "Sprint 2", planned: 50, completed: 48, date: "2024-01-29" },
  { sprint: "Sprint 3", planned: 55, completed: 52, date: "2024-02-12" },
  { sprint: "Sprint 4", planned: 48, completed: 51, date: "2024-02-26" },
  { sprint: "Sprint 5", planned: 52, completed: 49, date: "2024-03-11" },
  { sprint: "Sprint 6", planned: 58, completed: 56, date: "2024-03-25" },
]

const burndownData = [
  { day: "Day 1", remaining: 120, ideal: 120 },
  { day: "Day 2", remaining: 115, ideal: 108 },
  { day: "Day 3", remaining: 108, ideal: 96 },
  { day: "Day 4", remaining: 102, ideal: 84 },
  { day: "Day 5", remaining: 95, ideal: 72 },
  { day: "Day 6", remaining: 88, ideal: 60 },
  { day: "Day 7", remaining: 82, ideal: 48 },
  { day: "Day 8", remaining: 75, ideal: 36 },
  { day: "Day 9", remaining: 68, ideal: 24 },
  { day: "Day 10", remaining: 58, ideal: 12 },
  { day: "Day 11", remaining: 45, ideal: 0 },
]

const issueTypeData = [
  { name: "Story", value: 45, color: "#3b82f6" },
  { name: "Bug", value: 23, color: "#ef4444" },
  { name: "Task", value: 18, color: "#10b981" },
  { name: "Epic", value: 8, color: "#8b5cf6" },
  { name: "Subtask", value: 6, color: "#f59e0b" },
]

const teamProductivityData = [
  { member: "Alice", completed: 12, inProgress: 3, todo: 2 },
  { member: "Bob", completed: 8, inProgress: 4, todo: 3 },
  { member: "Carol", completed: 15, inProgress: 2, todo: 1 },
  { member: "David", completed: 10, inProgress: 5, todo: 2 },
  { member: "Emma", completed: 11, inProgress: 3, todo: 4 },
]

const kpiMetrics = [
  {
    title: "Sprint Velocity",
    value: "52.3",
    unit: "SP",
    change: "+8.2%",
    trend: "up",
    icon: Activity,
    description: "Average story points per sprint",
  },
  {
    title: "Cycle Time",
    value: "4.2",
    unit: "days",
    change: "-12%",
    trend: "down",
    icon: Clock,
    description: "Average time from start to done",
  },
  {
    title: "Team Capacity",
    value: "87%",
    unit: "",
    change: "+5%",
    trend: "up",
    icon: Users,
    description: "Current sprint capacity utilization",
  },
  {
    title: "Goal Achievement",
    value: "94%",
    unit: "",
    change: "+2%",
    trend: "up",
    icon: Target,
    description: "Sprint goals successfully completed",
  },
]

export function KPICharts() {
  return (
    <div className="space-y-6">
      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {metric.value}
                <span className="text-sm font-normal text-gray-300 ml-1">{metric.unit}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={`text-xs ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sprint Velocity</CardTitle>
            <CardDescription className="text-gray-300">Planned vs Completed Story Points</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                planned: {
                  label: "Planned",
                  color: "hsl(var(--chart-1))",
                },
                completed: {
                  label: "Completed",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="sprint" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="planned" fill="#3b82f6" name="Planned" />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Burndown Chart */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sprint Burndown</CardTitle>
            <CardDescription className="text-gray-300">Remaining work vs Ideal burndown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                remaining: {
                  label: "Remaining",
                  color: "hsl(var(--chart-1))",
                },
                ideal: {
                  label: "Ideal",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={burndownData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="remaining" stroke="#ef4444" strokeWidth={2} name="Remaining" />
                  <Line
                    type="monotone"
                    dataKey="ideal"
                    stroke="#6b7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Ideal"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Issue Type Distribution */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Issue Distribution</CardTitle>
            <CardDescription className="text-gray-300">Breakdown by issue type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Issues",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Team Productivity */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Team Productivity</CardTitle>
            <CardDescription className="text-gray-300">Individual member performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                completed: {
                  label: "Completed",
                  color: "hsl(var(--chart-1))",
                },
                inProgress: {
                  label: "In Progress",
                  color: "hsl(var(--chart-2))",
                },
                todo: {
                  label: "To Do",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamProductivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="member" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                  <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="In Progress" />
                  <Bar dataKey="todo" stackId="a" fill="#6b7280" name="To Do" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
