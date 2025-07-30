"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, setUser } = useAppStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Bypass authentication - always allow access
      const token = localStorage.getItem('authToken')
      
      // If no user is set but we're trying to access protected content, set a dummy user
      if (requireAuth && !user) {
        setUser({
          id: "1",
          email: "user@example.com",
          name: "User",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "member",
        })
        
        // Store dummy token if none exists
        if (!token) {
          localStorage.setItem('authToken', 'dummy-token')
          localStorage.setItem('refreshToken', 'dummy-refresh-token')
        }
      }

      // Always allow access regardless of authentication state
      setIsLoading(false)
    }

    checkAuth()
  }, [user, setUser, router, requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  // Always render children - no authentication checks
  return <>{children}</>
}
