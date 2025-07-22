"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Filter, Users, Plus, Mail, Phone, MapPin, Calendar, Target, TrendingUp, Building } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const mockTeams = [
  {
    id: "1",
    name: "Development Team",
    description: "Core development team responsible for platform architecture and feature implementation",
    lead: { name: "Alice Brown", avatar: "/placeholder.svg", email: "alice.brown@nexuspm.com" },
    members: [
      { name: "John Doe", avatar: "/placeholder.svg", role: "Senior Developer", email: "john.doe@nexuspm.com" },
      { name: "Sarah Wilson", avatar: "/placeholder.svg", role: "Frontend Developer", email: "sarah.wilson@nexuspm.com" },
      { name: "Mike Johnson", avatar: "/placeholder.svg", role: "Backend Developer", email: "mike.johnson@nexuspm.com" },
      { name: "Emma Davis", avatar: "/placeholder.svg", role: "Full Stack Developer", email: "emma.davis@nexuspm.com" },
    ],
    projects: ["Nexus Platform", "API Gateway"],
    created: new Date(2024, 0, 10),
    status: "Active",
    department: "Engineering",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Design Team",
    description: "User experience and interface design team creating intuitive and beautiful user interfaces",
    lead: { name: "Bob Smith", avatar: "/placeholder.svg", email: "bob.smith@nexuspm.com" },
    members: [
      { name: "Lisa Chen", avatar: "/placeholder.svg", role: "Senior Designer", email: "lisa.chen@nexuspm.com" },
      { name: "David Kim", avatar: "/placeholder.svg", role: "UX Designer", email: "david.kim@nexuspm.com" },
      { name: "Maria Garcia", avatar: "/placeholder.svg", role: "UI Designer", email: "maria.garcia@nexuspm.com" },
    ],
    projects: ["Design System", "Mobile Application"],
    created: new Date(2024, 0, 15),
    status: "Active",
    department: "Design",
    location: "New York, NY",
  },
  {
    id: "3",
    name: "Mobile Team",
    description: "Specialized team focused on mobile application development and cross-platform solutions",
    lead: { name: "Tom Chen", avatar: "/placeholder.svg", email: "tom.chen@nexuspm.com" },
    members: [
      { name: "Mike Johnson", avatar: "/placeholder.svg", role: "Mobile Developer", email: "mike.johnson@nexuspm.com" },
      { name: "Emma Davis", avatar: "/placeholder.svg", role: "React Native Developer", email: "emma.davis@nexuspm.com" },
      { name: "Alex Rodriguez", avatar: "/placeholder.svg", role: "iOS Developer", email: "alex.rodriguez@nexuspm.com" },
      { name: "Nina Patel", avatar: "/placeholder.svg", role: "Android Developer", email: "nina.patel@nexuspm.com" },
    ],
    projects: ["Mobile Application"],
    created: new Date(2024, 0, 20),
    status: "Active",
    department: "Engineering",
    location: "Austin, TX",
  },
  {
    id: "4",
    name: "QA Team",
    description: "Quality assurance team ensuring high standards and reliability across all products",
    lead: { name: "Jennifer Lee", avatar: "/placeholder.svg", email: "jennifer.lee@nexuspm.com" },
    members: [
      { name: "Robert Brown", avatar: "/placeholder.svg", role: "Senior QA Engineer", email: "robert.brown@nexuspm.com" },
      { name: "Amanda White", avatar: "/placeholder.svg", role: "Automation Engineer", email: "amanda.white@nexuspm.com" },
      { name: "Carlos Silva", avatar: "/placeholder.svg", role: "QA Analyst", email: "carlos.silva@nexuspm.com" },
    ],
    projects: ["Nexus Platform", "Mobile Application", "API Gateway"],
    created: new Date(2024, 0, 25),
    status: "Active",
    department: "Quality Assurance",
    location: "Seattle, WA",
  },
]

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const { user } = useAppStore()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "Inactive": return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      case "On Hold": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Engineering": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "Design": return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "Quality Assurance": return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "Product": return "bg-green-500/20 text-green-400 border-green-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const filteredTeams = mockTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.lead.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || team.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || team.status === selectedStatus
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const totalMembers = mockTeams.reduce((acc, team) => acc + team.members.length, 0)
  const totalProjects = new Set(mockTeams.flatMap(team => team.projects)).size
  const departments = new Set(mockTeams.map(team => team.department)).size

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">Teams</h1>
          <p className="text-xl text-gray-300 mt-2">Manage teams and collaborate across departments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Total Teams</p>
                <div className="text-3xl font-bold text-white">{mockTeams.length}</div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-500">Active</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-500/20">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Team Members</p>
                <div className="text-3xl font-bold text-white">{totalMembers}</div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Contributors</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-500/20">
                <Target className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Active Projects</p>
                <div className="text-3xl font-bold text-white">{totalProjects}</div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-purple-500">In Progress</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-500/20">
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Departments</p>
                <div className="text-3xl font-bold text-white">{departments}</div>
                <div className="flex items-center space-x-1">
                  <Building className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-500">Active</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-500/20">
                <Building className="h-8 w-8 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search teams by name, description, or team lead..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[150px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors">
                      <Link href={`/teams/${team.id}`}>
                        {team.name}
                      </Link>
                    </CardTitle>
                    <Badge className={`${getStatusColor(team.status)} border text-xs`}>
                      {team.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300 text-sm line-clamp-2">
                    {team.description}
                  </CardDescription>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getDepartmentColor(team.department)} border text-xs`}>
                      {team.department}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" />
                      {team.location}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Lead */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Team Lead</h4>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={team.lead.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {team.lead.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-white font-medium">{team.lead.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {team.lead.email}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Team Members */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-300">Team Members</h4>
                  <span className="text-xs text-gray-400">{team.members.length} members</span>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {team.members.slice(0, 3).map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded bg-white/5">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{member.name}</div>
                        <div className="text-xs text-gray-400 truncate">{member.role}</div>
                      </div>
                    </div>
                  ))}
                  {team.members.length > 3 && (
                    <div className="text-center py-2">
                      <Link href={`/teams/${team.id}`} className="text-xs text-blue-400 hover:text-blue-300">
                        +{team.members.length - 3} more members
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Projects */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Active Projects</h4>
                <div className="flex flex-wrap gap-1">
                  {team.projects.slice(0, 3).map((project) => (
                    <Badge key={project} variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {project}
                    </Badge>
                  ))}
                  {team.projects.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      +{team.projects.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Created {formatDistanceToNow(team.created)} ago
                </div>
                <Link href={`/teams/${team.id}`} className="text-blue-400 hover:text-blue-300">
                  View Details →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTeams.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No teams found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || selectedDepartment !== "all" || selectedStatus !== "all"
                ? "No teams match your search criteria. Try adjusting your filters."
                : "Get started by creating your first team."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
