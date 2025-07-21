import { io, type Socket } from "socket.io-client"
import { useAppStore } from "./store"

class SocketManager {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  connect(token: string) {
    if (this.socket?.connected) return

    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      auth: { token },
      transports: ["websocket", "polling"],
      timeout: 20000,
      forceNew: true,
    })

    this.setupEventListeners()
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.reconnectAttempts = 0
    }
  }

  private setupEventListeners() {
    if (!this.socket) return

    // Connection events
    this.socket.on("connect", () => {
      console.log("🔌 Connected to server")
      this.reconnectAttempts = 0
    })

    this.socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from server:", reason)
      if (reason === "io server disconnect") {
        this.handleReconnect()
      }
    })

    this.socket.on("connect_error", (error) => {
      console.error("🚫 Connection error:", error)
      this.handleReconnect()
    })

    // Real-time collaboration events
    this.socket.on("user_joined", (user) => {
      const { addOnlineUser } = useAppStore.getState()
      addOnlineUser(user)
      console.log("👋 User joined:", user.name)
    })

    this.socket.on("user_left", (data) => {
      const { removeOnlineUser } = useAppStore.getState()
      removeOnlineUser(data.userId)
      console.log("👋 User left:", data.userId)
    })

    this.socket.on("presence_update", (user) => {
      const { updatePresence } = useAppStore.getState()
      updatePresence(user)
    })

    // Typing indicators
    this.socket.on("typing_start", (data) => {
      const { typingUsers, setTypingUsers } = useAppStore.getState()
      const currentTyping = typingUsers[data.issueId] || []
      const updatedTyping = [...currentTyping.filter((t) => t.userId !== data.userId), data]
      setTypingUsers(data.issueId, updatedTyping)
    })

    this.socket.on("typing_stop", (data) => {
      const { typingUsers, setTypingUsers } = useAppStore.getState()
      const currentTyping = typingUsers[data.issueId] || []
      const updatedTyping = currentTyping.filter((t) => t.userId !== data.userId)
      setTypingUsers(data.issueId, updatedTyping)
    })

    // Issue events
    this.socket.on("issue_updated", (issue) => {
      const { updateIssue, addActivity } = useAppStore.getState()
      updateIssue(issue)

      // Add activity
      addActivity({
        id: Date.now().toString(),
        entityType: "issue",
        entityId: issue.id,
        action: "updated",
        actor: issue.assignee || "system",
        createdAt: new Date(),
      })

      console.log("📝 Issue updated:", issue.key)
    })

    this.socket.on("issue_created", (issue) => {
      const { addIssue, addActivity } = useAppStore.getState()
      addIssue(issue)

      addActivity({
        id: Date.now().toString(),
        entityType: "issue",
        entityId: issue.id,
        action: "created",
        actor: issue.reporter,
        createdAt: new Date(),
      })

      console.log("✨ Issue created:", issue.key)
    })

    this.socket.on("issue_deleted", (data) => {
      const { removeIssue } = useAppStore.getState()
      removeIssue(data.issueId)
      console.log("🗑️ Issue deleted:", data.issueId)
    })

    // Drag & Drop events
    this.socket.on("issue_drag_start", (data) => {
      console.log("🎯 Issue drag started:", data)
      // Visual feedback for other users
    })

    this.socket.on("issue_drag_end", (data) => {
      console.log("🎯 Issue drag ended:", data)
      // Update issue position
    })

    // Comment events
    this.socket.on("comment_added", (comment) => {
      console.log("💬 Comment added:", comment)
      // Update issue comments
    })

    this.socket.on("comment_updated", (comment) => {
      console.log("💬 Comment updated:", comment)
    })

    this.socket.on("comment_deleted", (data) => {
      console.log("💬 Comment deleted:", data.commentId)
    })

    // Notifications
    this.socket.on("notification", (notification) => {
      const { addNotification } = useAppStore.getState()
      addNotification(notification)
      console.log("🔔 Notification:", notification.title)
    })

    // Live editing
    this.socket.on("live_edit", (edit) => {
      console.log("✏️ Live edit:", edit)
      // Apply live edit changes
    })
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

      console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`)

      setTimeout(() => {
        if (this.socket && !this.socket.connected) {
          this.socket.connect()
        }
      }, delay)
    } else {
      console.error("❌ Max reconnection attempts reached")
    }
  }

  // Emit methods
  joinProject(projectId: string) {
    this.socket?.emit("join_project", { projectId })
    console.log("🏠 Joined project:", projectId)
  }

  leaveProject(projectId: string) {
    this.socket?.emit("leave_project", { projectId })
    console.log("🚪 Left project:", projectId)
  }

  startTyping(issueId: string, location: "description" | "comment" = "comment") {
    this.socket?.emit("typing_start", { issueId, location })
  }

  stopTyping(issueId: string, location: "description" | "comment" = "comment") {
    this.socket?.emit("typing_stop", { issueId, location })
  }

  updateIssue(issue: any) {
    this.socket?.emit("issue_update", issue)
  }

  dragIssueStart(issueId: string, fromStatus: string) {
    this.socket?.emit("issue_drag_start", { issueId, fromStatus })
  }

  dragIssueEnd(issueId: string, toStatus: string, position: number) {
    this.socket?.emit("issue_drag_end", { issueId, toStatus, position })
  }

  addComment(comment: any) {
    this.socket?.emit("comment_add", comment)
  }

  updatePresence(activity: string, location: string) {
    this.socket?.emit("presence_update", { activity, location })
  }

  liveEdit(edit: any) {
    this.socket?.emit("live_edit", edit)
  }

  // Getters
  get isConnected() {
    return this.socket?.connected || false
  }

  get socket() {
    return this.socket
  }
}

export const socketManager = new SocketManager()
