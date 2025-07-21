"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Save, X, Paperclip, Tag, Eye, EyeOff, Plus, Smile, Send } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { socketManager } from "@/lib/socket"
import type { Task, Comment } from "@/types"
import { formatDistanceToNow } from "date-fns"

interface IssueDetailModalProps {
  issue: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockComments: Comment[] = [
  {
    id: "1",
    issueId: "1",
    author: "john-doe",
    content: "I've started working on this. The drag and drop implementation looks straightforward with @dnd-kit.",
    mentions: [],
    reactions: [
      { emoji: "👍", users: ["sarah-wilson"], count: 1 },
      { emoji: "🚀", users: ["mike-johnson", "alice-brown"], count: 2 },
    ],
    attachments: [],
    edited: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    issueId: "1",
    author: "sarah-wilson",
    content:
      "Great! Make sure to handle the edge cases for dropping items outside valid zones. Also, we should add visual feedback during drag operations.",
    mentions: ["john-doe"],
    reactions: [{ emoji: "💯", users: ["john-doe"], count: 1 }],
    attachments: [],
    edited: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15),
  },
]

const priorities = [
  { id: "lowest", name: "Lowest", color: "#607D8B" },
  { id: "low", name: "Low", color: "#4CAF50" },
  { id: "medium", name: "Medium", color: "#FF9800" },
  { id: "high", name: "High", color: "#F44336" },
  { id: "highest", name: "Highest", color: "#E91E63" },
]

const statuses = [
  { id: "todo", name: "To Do", category: "todo", color: "#6B7280" },
  { id: "in-progress", name: "In Progress", category: "in-progress", color: "#3B82F6" },
  { id: "review", name: "In Review", category: "in-progress", color: "#F59E0B" },
  { id: "done", name: "Done", category: "done", color: "#10B981" },
]

export function IssueDetailModal({ issue, open, onOpenChange }: IssueDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [isWatching, setIsWatching] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])

  const { updateIssue, user } = useAppStore()

  useEffect(() => {
    if (issue) {
      setEditedTitle(issue.title)
      setEditedDescription(issue.description || "")
      setIsWatching(issue.watchers.includes(user?.id || ""))
    }
  }, [issue, user])

  useEffect(() => {
    let typingTimer: NodeJS.Timeout

    if (newComment.trim()) {
      socketManager.startTyping(issue?.id || "", "comment")

      typingTimer = setTimeout(() => {
        socketManager.stopTyping(issue?.id || "", "comment")
      }, 1000)
    } else {
      socketManager.stopTyping(issue?.id || "", "comment")
    }

    return () => {
      if (typingTimer) clearTimeout(typingTimer)
      socketManager.stopTyping(issue?.id || "", "comment")
    }
  }, [newComment, issue?.id])

  if (!issue) return null

  const handleSave = async () => {
    const updatedIssue = {
      ...issue,
      title: editedTitle,
      description: editedDescription,
      updatedAt: new Date(),
    }

    updateIssue(updatedIssue)
    socketManager.updateIssue(updatedIssue)
    setIsEditing(false)
  }

  const handleStatusChange = (newStatusId: string) => {
    const newStatus = statuses.find((s) => s.id === newStatusId)
    if (newStatus) {
      const updatedIssue = {
        ...issue,
        status: newStatus,
        updatedAt: new Date(),
      }
      updateIssue(updatedIssue)
      socketManager.updateIssue(updatedIssue)
    }
  }

  const handlePriorityChange = (newPriorityId: string) => {
    const newPriority = priorities.find((p) => p.id === newPriorityId)
    if (newPriority) {
      const updatedIssue = {
        ...issue,
        priority: {
          ...newPriority,
          icon: "🔴",
          order: priorities.findIndex((p) => p.id === newPriorityId) + 1,
        },
        updatedAt: new Date(),
      }
      updateIssue(updatedIssue)
      socketManager.updateIssue(updatedIssue)
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      issueId: issue.id,
      author: user?.id || "current-user",
      content: newComment,
      mentions: [],
      reactions: [],
      attachments: [],
      edited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setComments([...comments, comment])
    socketManager.addComment(comment)
    setNewComment("")
  }

  const handleWatchToggle = () => {
    const newWatchers = isWatching
      ? issue.watchers.filter((w) => w !== user?.id)
      : [...issue.watchers, user?.id || "current-user"]

    const updatedIssue = {
      ...issue,
      watchers: newWatchers,
      updatedAt: new Date(),
    }

    updateIssue(updatedIssue)
    setIsWatching(!isWatching)
  }

  const addReaction = (commentId: string, emoji: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const existingReaction = comment.reactions.find((r) => r.emoji === emoji)
          if (existingReaction) {
            if (existingReaction.users.includes(user?.id || "current-user")) {
              // Remove reaction
              return {
                ...comment,
                reactions: comment.reactions
                  .map((r) =>
                    r.emoji === emoji ? { ...r, users: r.users.filter((u) => u !== user?.id), count: r.count - 1 } : r,
                  )
                  .filter((r) => r.count > 0),
              }
            } else {
              // Add reaction
              return {
                ...comment,
                reactions: comment.reactions.map((r) =>
                  r.emoji === emoji ? { ...r, users: [...r.users, user?.id || "current-user"], count: r.count + 1 } : r,
                ),
              }
            }
          } else {
            // New reaction
            return {
              ...comment,
              reactions: [...comment.reactions, { emoji, users: [user?.id || "current-user"], count: 1 }],
            }
          }
        }
        return comment
      }),
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-sm font-medium text-white"
                    style={{ backgroundColor: issue.type.color }}
                  >
                    {issue.type.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">{issue.key}</span>
                      <Badge variant="outline" style={{ borderColor: issue.status.color }}>
                        {issue.status.name}
                      </Badge>
                    </div>
                    {isEditing ? (
                      <Input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="text-lg font-semibold"
                      />
                    ) : (
                      <DialogTitle className="text-lg font-semibold leading-tight">{issue.title}</DialogTitle>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleWatchToggle}>
                    {isWatching ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {isWatching ? "Unwatch" : "Watch"}
                  </Button>

                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="details" className="h-full flex flex-col">
                <div className="px-6">
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="comments" className="relative">
                      Comments
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {comments.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="attachments">
                      Attachments
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {issue.attachments.length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="details" className="h-full m-0 p-6 pt-4">
                    <ScrollArea className="h-full">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-sm font-medium">Description</Label>
                          {isEditing ? (
                            <Textarea
                              value={editedDescription}
                              onChange={(e) => setEditedDescription(e.target.value)}
                              placeholder="Add a description..."
                              className="mt-2 min-h-[120px]"
                            />
                          ) : (
                            <div className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                              {issue.description || "No description provided."}
                            </div>
                          )}
                        </div>

                        {issue.labels.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium">Labels</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {issue.labels.map((label) => (
                                <Badge key={label} variant="outline">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {issue.components.length > 0 && (
                          <div>
                            <Label className="text-sm font-medium">Components</Label>
                            <div className="space-y-1 mt-2">
                              {issue.components.map((component) => (
                                <div key={component} className="text-sm">
                                  {component}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="comments" className="h-full m-0 p-6 pt-4">
                    <div className="flex flex-col h-full">
                      <ScrollArea className="flex-1 mb-4">
                        <div className="space-y-4">
                          {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                <AvatarFallback className="text-xs">
                                  {comment.author.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <div className="bg-muted rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium">
                                      {comment.author.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                                    </span>
                                  </div>
                                  <div className="text-sm whitespace-pre-wrap">{comment.content}</div>
                                </div>

                                {comment.reactions.length > 0 && (
                                  <div className="flex gap-1">
                                    {comment.reactions.map((reaction) => (
                                      <Button
                                        key={reaction.emoji}
                                        variant="outline"
                                        size="sm"
                                        className="h-6 px-2 text-xs bg-transparent"
                                        onClick={() => addReaction(comment.id, reaction.emoji)}
                                      >
                                        {reaction.emoji} {reaction.count}
                                      </Button>
                                    ))}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2"
                                      onClick={() => addReaction(comment.id, "👍")}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                          {typingUsers.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                              <span>Someone is typing...</span>
                            </div>
                          )}
                        </div>
                      </ScrollArea>

                      <div className="border-t pt-4">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.avatar || "/placeholder.svg?height=32&width=32"} />
                            <AvatarFallback className="text-xs">
                              {user?.name.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <Textarea
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="min-h-[80px] resize-none"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                  e.preventDefault()
                                  handleAddComment()
                                }
                              }}
                            />
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Paperclip className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Smile className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground">Cmd+Enter to send</span>
                                <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                                  <Send className="h-4 w-4 mr-2" />
                                  Comment
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="h-full m-0 p-6 pt-4">
                    <ScrollArea className="h-full">
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground text-center py-8">
                          Activity timeline will be implemented here
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="attachments" className="h-full m-0 p-6 pt-4">
                    <ScrollArea className="h-full">
                      <div className="space-y-4">
                        {issue.attachments.length > 0 ? (
                          issue.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <div className="flex-1">
                                <div className="font-medium">{attachment.filename}</div>
                                <div className="text-sm text-muted-foreground">
                                  {(attachment.size / 1024).toFixed(1)} KB • Uploaded{" "}
                                  {formatDistanceToNow(attachment.uploadedAt, { addSuffix: true })}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Download
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground text-center py-8">No attachments yet</div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l bg-muted/20">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={issue.status.id} onValueChange={handleStatusChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.id} value={status.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                            {status.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Select value={issue.priority.id} onValueChange={handlePriorityChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.id} value={priority.id}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: priority.color }} />
                            {priority.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Assignee</span>
                    {issue.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                          <AvatarFallback className="text-xs">
                            {issue.assignee.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {issue.assignee.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reporter</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                        <AvatarFallback className="text-xs">{issue.reporter.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {issue.reporter.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                  </div>

                  {issue.storyPoints && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Story Points</span>
                      <Badge variant="secondary">{issue.storyPoints}</Badge>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm">{formatDistanceToNow(issue.createdAt, { addSuffix: true })}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Updated</span>
                    <span className="text-sm">{formatDistanceToNow(issue.updatedAt, { addSuffix: true })}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Watchers</span>
                    <span className="text-sm text-muted-foreground">{issue.watchers.length}</span>
                  </div>
                  <div className="flex -space-x-1">
                    {issue.watchers.slice(0, 5).map((watcher, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                        <AvatarFallback className="text-xs">{watcher.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ))}
                    {issue.watchers.length > 5 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs">+{issue.watchers.length - 5}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
