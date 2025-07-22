"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight, Clock, Users, Target, AlertCircle, CheckCircle, Calendar as CalendarView, List, Grid } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns"

const mockEvents = [
  {
    id: "1",
    title: "Sprint Planning Meeting",
    description: "Plan tasks for the upcoming sprint",
    date: new Date(2025, 6, 24), // July 24, 2025
    time: "09:00",
    duration: "2 hours",
    type: "meeting",
    project: "Nexus Platform",
    attendees: [
      { name: "John Doe", avatar: "/placeholder.svg" },
      { name: "Alice Brown", avatar: "/placeholder.svg" },
      { name: "Bob Wilson", avatar: "/placeholder.svg" },
    ],
    status: "confirmed",
    location: "Conference Room A",
  },
  {
    id: "2",
    title: "Code Review Session",
    description: "Review pull requests and discuss improvements",
    date: new Date(2025, 6, 25), // July 25, 2025
    time: "14:00",
    duration: "1 hour",
    type: "review",
    project: "Mobile App",
    attendees: [
      { name: "Sarah Johnson", avatar: "/placeholder.svg" },
      { name: "Mike Davis", avatar: "/placeholder.svg" },
    ],
    status: "pending",
    location: "Virtual",
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present project progress to stakeholders",
    date: new Date(2025, 6, 28), // July 28, 2025
    time: "15:30",
    duration: "1.5 hours",
    type: "presentation",
    project: "Design System",
    attendees: [
      { name: "Emily Chen", avatar: "/placeholder.svg" },
      { name: "David Lee", avatar: "/placeholder.svg" },
    ],
    status: "confirmed",
    location: "Board Room",
  },
  {
    id: "4",
    title: "NEX-123 Deadline",
    description: "User authentication system implementation due",
    date: new Date(2025, 6, 30), // July 30, 2025
    time: "23:59",
    duration: "All day",
    type: "deadline",
    project: "Nexus Platform",
    attendees: [],
    status: "urgent",
    priority: "High",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewType, setViewType] = useState("month")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedEventType, setSelectedEventType] = useState("all")

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "review": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "presentation": return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "deadline": return "bg-red-500/20 text-red-400 border-red-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-green-400"
      case "pending": return "text-yellow-400"
      case "urgent": return "text-red-400"
      default: return "text-gray-400"
    }
  }

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date))
  }

  const filteredEvents = mockEvents.filter(event => {
    const matchesProject = selectedProject === "all" || event.project === selectedProject
    const matchesType = selectedEventType === "all" || event.type === selectedEventType
    return matchesProject && matchesType
  })

  const upcomingEvents = filteredEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  const todayEvents = getEventsForDate(new Date())

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Calendar</h1>
          <p className="text-xl text-gray-300 mt-2">Manage meetings, deadlines, and events</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Today's Events</p>
                <div className="text-3xl font-bold text-white">{todayEvents.length}</div>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">This Week</p>
                <div className="text-3xl font-bold text-blue-400">12</div>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Pending</p>
                <div className="text-3xl font-bold text-yellow-400">3</div>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Completed</p>
                <div className="text-3xl font-bold text-green-400">8</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Controls */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold text-white min-w-[200px] text-center">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* View Type */}
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                <Button
                  variant={viewType === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("month")}
                  className={viewType === "month" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                >
                  <CalendarView className="h-4 w-4 mr-1" />
                  Month
                </Button>
                <Button
                  variant={viewType === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewType("list")}
                  className={viewType === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="Nexus Platform">Nexus Platform</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Design System">Design System</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="review">Reviews</SelectItem>
                  <SelectItem value="presentation">Presentations</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          {viewType === "month" ? (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day) => {
                    const dayEvents = getEventsForDate(day)
                    const isCurrentMonth = isSameMonth(day, currentDate)
                    const isToday = isSameDay(day, new Date())
                    const isSelected = isSameDay(day, selectedDate)
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={`min-h-[100px] p-2 border border-white/10 rounded-lg cursor-pointer transition-all duration-200 ${
                          isCurrentMonth ? "bg-white/5" : "bg-white/2"
                        } ${isToday ? "ring-2 ring-blue-500" : ""} ${
                          isSelected ? "bg-blue-600/20" : ""
                        } hover:bg-white/10`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isCurrentMonth ? "text-white" : "text-gray-500"
                        } ${isToday ? "text-blue-400" : ""}`}>
                          {format(day, "d")}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${getEventTypeColor(event.type)} border`}>
                            {event.type}
                          </Badge>
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                          <div className={`text-sm ${getStatusColor(event.status)}`}>
                            ● {event.status}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{event.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {format(event.date, "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time} ({event.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {event.project}
                          </div>
                          {event.location && (
                            <span>{event.location}</span>
                          )}
                        </div>
                      </div>
                      {event.attendees.length > 0 && (
                        <div className="flex -space-x-2">
                          {event.attendees.slice(0, 3).map((attendee, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-gray-800">
                              <AvatarImage src={attendee.avatar} />
                              <AvatarFallback className="bg-blue-600 text-white text-xs">
                                {attendee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {event.attendees.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white">
                              +{event.attendees.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Today's Events</CardTitle>
              <CardDescription className="text-gray-300">
                {format(new Date(), "EEEE, MMMM d")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayEvents.length > 0 ? (
                todayEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                      <span className="text-sm text-gray-400">{event.time}</span>
                    </div>
                    <h4 className="text-sm font-medium text-white">{event.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{event.project}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No events today</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Upcoming</CardTitle>
              <CardDescription className="text-gray-300">Next 5 events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span>{format(event.date, "MMM d")}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
