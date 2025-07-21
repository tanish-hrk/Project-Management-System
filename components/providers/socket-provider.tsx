"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useAppStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  connectionStatus: "connecting" | "connected" | "disconnected" | "error"
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectionStatus: "disconnected",
})

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">(
    "disconnected",
  )
  const { user, token, addNotification, updateIssue, addIssue, removeIssue } = useAppStore()

  useEffect(() => {
    if (!user || !token) return

    setConnectionStatus("connecting")

    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      auth: {
        token: token,
        userId: user.id,
      },
      transports: ["websocket", "polling"],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("🔌 Connected to server")
      setIsConnected(true)
      setConnectionStatus("connected")

      toast({
        title: "Connected",
        description: "Real-time updates are now active",
        duration: 2000,
      })
    })

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Disconnected from server:", reason)
      setIsConnected(false)
      setConnectionStatus("disconnected")

      if (reason === "io server disconnect") {
        toast({
          title: "Connection Lost",
          description: "Attempting to reconnect...",
          variant: "destructive",
        })
      }
    })

    socketInstance.on("connect_error", (error) => {
      console.error("🚫 Connection error:", error)
      setIsConnected(false)
      setConnectionStatus("error")

      toast({
        title: "Connection Error",
        description: "Unable to connect to real-time services",
        variant: "destructive",
      })
    })

    socketInstance.on("reconnect", (attemptNumber) => {
      console.log("🔄 Reconnected after", attemptNumber, "attempts")
      toast({
        title: "Reconnected",
        description: "Real-time updates restored",
      })
    })

    // Real-time collaboration events
    socketInstance.on("user_joined", (user) => {
      console.log("👋 User joined:", user.name)
      toast({
        title: "User Joined",
        description: `${user.name} joined the project`,
        duration: 3000,
      })
    })

    socketInstance.on("user_left", (data) => {
      console.log("👋 User left:", data.userId)
    })

    // Issue events
    socketInstance.on("issue_updated", (issue) => {
      console.log("📝 Issue updated:", issue.key)
      updateIssue(issue)

      toast({
        title: "Issue Updated",
        description: `${issue.key} has been updated`,
        duration: 3000,
      })
    })

    socketInstance.on("issue_created", (issue) => {
      console.log("✨ Issue created:", issue.key)
      addIssue(issue)

      toast({
        title: "New Issue Created",
        description: `${issue.key}: ${issue.title}`,
        duration: 4000,
      })
    })

    socketInstance.on("issue_deleted", (data) => {
      console.log("🗑️ Issue deleted:", data.issueId)
      removeIssue(data.issueId)

      toast({
        title: "Issue Deleted",
        description: `Issue ${data.issueKey} has been deleted`,
        duration: 3000,
      })
    })

    // Comment events
    socketInstance.on("comment_added", (comment) => {
      console.log("💬 Comment added:", comment)
      toast({
        title: "New Comment",
        description: `${comment.author} commented on ${comment.issueKey}`,
        duration: 4000,
      })
    })

    // Notifications
    socketInstance.on("notification", (notification) => {
      console.log("🔔 Notification:", notification.title)
      addNotification(notification)

      toast({
        title: notification.title,
        description: notification.message,
        duration: 5000,
      })
    })

    // Drag & Drop events
    socketInstance.on("issue_drag_start", (data) => {
      console.log("🎯 Issue drag started:", data)
      // Could show visual feedback for other users
    })

    socketInstance.on("issue_drag_end", (data) => {
      console.log("🎯 Issue drag ended:", data)
      // Update issue position in real-time
    })

    // Typing indicators
    socketInstance.on("typing_start", (data) => {
      console.log("⌨️ User started typing:", data)
      // Show typing indicator
    })

    socketInstance.on("typing_stop", (data) => {
      console.log("⌨️ User stopped typing:", data)
      // Hide typing indicator
    })

    setSocket(socketInstance)

    return () => {
      console.log("🔌 Cleaning up socket connection")
      socketInstance.disconnect()
      setSocket(null)
      setIsConnected(false)
      setConnectionStatus("disconnected")
    }
  }, [user, token, addNotification, updateIssue, addIssue, removeIssue])

  const contextValue: SocketContextType = {
    socket,
    isConnected,
    connectionStatus,
  }

  return (
    <SocketContext.Provider value={contextValue}>
      {children}

      {/* Connection Status Indicator */}
      {connectionStatus === "connecting" && (
        <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-800">Connecting...</span>
          </div>
        </div>
      )}

      {connectionStatus === "error" && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-300 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span className="text-sm text-red-800">Connection Error</span>
          </div>
        </div>
      )}
    </SocketContext.Provider>
  )
}
