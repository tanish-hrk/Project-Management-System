"use client"

import type React from "react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Task } from "@/types"
import { MessageSquare, Paperclip, Eye, Clock, MoreHorizontal } from "lucide-react"
import { useAppStore } from "@/lib/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { IssueDetailModal } from "@/components/issues/issue-detail-modal"

interface IssueCardProps {
  issue: Task
  isDragging?: boolean
}

export function IssueCard({ issue, isDragging = false }: IssueCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false)
  const { setSelectedIssue, setSidebarContent } = useAppStore()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: issue.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on dropdown or other interactive elements
    if ((e.target as HTMLElement).closest("[data-dropdown-trigger]")) {
      return
    }

    setShowDetailModal(true)
    setSelectedIssue(issue)
    setSidebarContent("issue")
  }

  const handleWatch = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Toggle watch status
    console.log("Toggle watch for issue:", issue.key)
  }

  const isWatching = issue.watchers.includes("current-user") // Mock current user

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 group ${
          isDragging ? "shadow-lg ring-2 ring-blue-500" : ""
        }`}
        onClick={handleCardClick}
      >
        <CardContent className="p-3">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                  style={{ backgroundColor: issue.type.color }}
                  title={issue.type.name}
                >
                  {issue.type.icon}
                </div>
                <span className="text-xs text-muted-foreground font-mono">{issue.key}</span>
              </div>

              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: issue.priority.color }}
                  title={`${issue.priority.name} Priority`}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild data-dropdown-trigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={() => setShowDetailModal(true)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleWatch}>
                      <Eye className="h-4 w-4 mr-2" />
                      {isWatching ? "Unwatch" : "Watch"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Comment
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Issue</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete Issue</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Title */}
            <h4 className="text-sm font-medium leading-tight line-clamp-2 cursor-pointer">{issue.title}</h4>

            {/* Labels */}
            {issue.labels.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {issue.labels.slice(0, 2).map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
                {issue.labels.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{issue.labels.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Due Date */}
            {issue.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Due {formatDistanceToNow(issue.dueDate, { addSuffix: true })}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {/* Attachments */}
                {issue.attachments.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-3 w-3" />
                    <span>{issue.attachments.length}</span>
                  </div>
                )}

                {/* Comments */}
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>0</span> {/* Mock comment count */}
                </div>

                {/* Story Points */}
                {issue.storyPoints && (
                  <Badge variant="secondary" className="text-xs h-5">
                    {issue.storyPoints}
                  </Badge>
                )}
              </div>

              {/* Assignee */}
              {issue.assignee && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                  <AvatarFallback className="text-xs">
                    {issue.assignee
                      .split("-")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <IssueDetailModal issue={issue} open={showDetailModal} onOpenChange={setShowDetailModal} />
    </>
  )
}
