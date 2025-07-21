"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Eye,
  MessageSquare,
  Paperclip,
  Clock,
  User,
  Tag,
  Calendar,
  Target,
  GitBranch,
  Activity,
  Edit,
  Trash2,
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"

export function IssueSidebar() {
  const { selectedIssue, currentProject } = useAppStore()

  if (!selectedIssue) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>No Issue Selected</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">Select an issue to view details</p>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <>
      {/* Issue Overview */}
      <SidebarGroup>
        <SidebarGroupLabel>Issue Details</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-3 space-y-3">
            <div className="flex items-start gap-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-xs font-medium text-white mt-0.5"
                style={{ backgroundColor: selectedIssue.type.color }}
              >
                {selectedIssue.type.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{selectedIssue.key}</span>
                  <Badge variant="outline" className="text-xs" style={{ borderColor: selectedIssue.status.color }}>
                    {selectedIssue.status.name}
                  </Badge>
                </div>
                <h3 className="font-medium text-sm leading-tight line-clamp-2">{selectedIssue.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedIssue.priority.color }} />
              <span className="text-xs text-muted-foreground">{selectedIssue.priority.name} Priority</span>
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Issue Actions */}
      <SidebarGroup>
        <SidebarGroupLabel>Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-2 space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Edit Issue
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              Watch Issue
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Issue
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Issue Properties */}
      <SidebarGroup>
        <SidebarGroupLabel>Properties</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-3 space-y-3">
            {/* Assignee */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                Assignee
              </span>
              {selectedIssue.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                    <AvatarFallback className="text-xs">
                      {selectedIssue.assignee.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{selectedIssue.assignee}</span>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Unassigned</span>
              )}
            </div>

            {/* Reporter */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Reporter</span>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                  <AvatarFallback className="text-xs">
                    {selectedIssue.reporter.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs">{selectedIssue.reporter}</span>
              </div>
            </div>

            {/* Due Date */}
            {selectedIssue.dueDate && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Due Date
                </span>
                <span className="text-xs">{formatDistanceToNow(selectedIssue.dueDate, { addSuffix: true })}</span>
              </div>
            )}

            {/* Story Points */}
            {selectedIssue.storyPoints && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Story Points
                </span>
                <Badge variant="secondary" className="text-xs">
                  {selectedIssue.storyPoints}
                </Badge>
              </div>
            )}

            {/* Time Tracking */}
            {(selectedIssue.originalEstimate || selectedIssue.timeSpent) && (
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Time Tracking
                </span>
                <div className="text-xs space-y-1">
                  {selectedIssue.originalEstimate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated:</span>
                      <span>
                        {Math.floor(selectedIssue.originalEstimate / 60)}h {selectedIssue.originalEstimate % 60}m
                      </span>
                    </div>
                  )}
                  {selectedIssue.timeSpent && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Logged:</span>
                      <span>
                        {Math.floor(selectedIssue.timeSpent / 60)}h {selectedIssue.timeSpent % 60}m
                      </span>
                    </div>
                  )}
                  {selectedIssue.remainingEstimate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining:</span>
                      <span>
                        {Math.floor(selectedIssue.remainingEstimate / 60)}h {selectedIssue.remainingEstimate % 60}m
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Labels */}
      {selectedIssue.labels.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Labels</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3">
              <div className="flex flex-wrap gap-1">
                {selectedIssue.labels.map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Components */}
      {selectedIssue.components.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3">
              <div className="space-y-1">
                {selectedIssue.components.map((component) => (
                  <div key={component} className="flex items-center gap-2">
                    <GitBranch className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Watchers */}
      {selectedIssue.watchers.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Watchers</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {selectedIssue.watchers.slice(0, 5).map((watcher, index) => (
                    <Avatar key={index} className="h-5 w-5 border border-background">
                      <AvatarImage src={`/placeholder.svg?height=20&width=20`} />
                      <AvatarFallback className="text-xs">{watcher.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ))}
                  {selectedIssue.watchers.length > 5 && (
                    <div className="h-5 w-5 rounded-full bg-muted border border-background flex items-center justify-center">
                      <span className="text-xs">+{selectedIssue.watchers.length - 5}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{selectedIssue.watchers.length} watching</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Activity Summary */}
      <SidebarGroup>
        <SidebarGroupLabel>Activity</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                Comments
              </span>
              <span>0</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Paperclip className="h-3 w-3" />
                Attachments
              </span>
              <span>{selectedIssue.attachments.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Activity className="h-3 w-3" />
                Last Updated
              </span>
              <span>{formatDistanceToNow(selectedIssue.updatedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
