"use client"

import { useState } from "react"
import { Camera, Edit2, Mail, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock user data - in a real app, this would come from an API or context
const mockUser = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Product Manager",
  location: "San Francisco, CA",
  joinedDate: "January 2022",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Product Manager with 5+ years of experience in agile development. Passionate about creating user-centered products and optimizing team workflows.",
  skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Sprint Planning"],
  teams: ["Core Platform", "Mobile App"],
}

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false)
  const { name, email, role, location, joinedDate, avatar, bio, skills, teams } = mockUser

  return (
    <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6">
        {/* Avatar section */}
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white/20">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-blue-600 text-white text-2xl">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change avatar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change avatar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* User info section */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">{name}</h1>
              <p className="text-gray-300">{role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-auto bg-transparent border-white/20 text-white hover:bg-white/10"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-300">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              {email}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {location}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Joined {joinedDate}
            </div>
          </div>

          <p className="text-sm text-gray-300">{bio}</p>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium mb-2 text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-blue-500/50 text-blue-400">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 text-white">Teams</h3>
              <div className="flex flex-wrap gap-2">
                {teams.map((team) => (
                  <Badge key={team} className="bg-green-500/20 text-green-400">
                    {team}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
