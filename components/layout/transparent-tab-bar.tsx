"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GlobalSearch } from "./global-search"
import { QuickProjectBar } from "./quick-project-bar"
import { Menu, Bell, Settings, User, LogOut, ChevronDown, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface TransparentTabBarProps {
  onSidebarToggle: () => void
  sidebarOpen: boolean
}

export function TransparentTabBar({ onSidebarToggle, sidebarOpen }: TransparentTabBarProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            onSidebarToggle()
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onSidebarToggle])

  if (!mounted) return null

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 h-16 transition-all duration-300 ease-in-out",
        sidebarOpen ? "z-40" : "z-50",
      )}
    >
      <div
        className={cn("h-full backdrop-blur-md border-b transition-all duration-300", "bg-black/70 border-white/20")}
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Quick Project Bar */}
            <QuickProjectBar />
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8">
            <GlobalSearch />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 relative"
            >
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>

            {/* Quick Actions */}
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10">
              <Zap className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 text-white/90 hover:text-white hover:bg-white/10">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">John Doe</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/95 border-gray-700 text-white">
                <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="focus:bg-gray-800 cursor-pointer" onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-800 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="focus:bg-gray-800 cursor-pointer text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
