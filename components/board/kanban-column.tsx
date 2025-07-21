"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IssueCard } from "./issue-card"
import type { Status, Task } from "@/types"
import { Plus, MoreHorizontal, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface KanbanColumnProps {
  status: Status
  issues: Task[]
  wipLimit?: number
}

export function KanbanColumn({ status, issues, wipLimit }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: `column-${status.id}`,
  })

  const isOverWipLimit = wipLimit && issues.length > wipLimit
  const isNearWipLimit = wipLimit && issues.length === wipLimit

  const getColumnColor = () => {
    if (isOverWipLimit) return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
    if (isNearWipLimit) return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20"
    return "border-border bg-card"
  }

  return (
    <Card className={`w-80 flex-shrink-0 ${getColumnColor()}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
            <span>{status.name}</span>
            <Badge variant="secondary" className="text-xs">
              {issues.length}
            </Badge>
            {isOverWipLimit && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </div>

          <div className="flex items-center gap-1">
            {wipLimit && (
              <Badge
                variant={isOverWipLimit ? "destructive" : isNearWipLimit ? "secondary" : "outline"}
                className="text-xs"
              >
                WIP: {wipLimit}
              </Badge>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Set WIP Limit</DropdownMenuItem>
                <DropdownMenuItem>Column Settings</DropdownMenuItem>
                <DropdownMenuItem>Clear Column</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>

        {isOverWipLimit && (
          <div className="text-xs text-red-600 dark:text-red-400">
            ⚠️ WIP limit exceeded! Consider moving issues to other columns.
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div ref={setNodeRef} className="space-y-3 min-h-[200px] pb-3">
          <SortableContext items={issues.map((issue) => issue.id)} strategy={verticalListSortingStrategy}>
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </SortableContext>

          {/* Add Issue Button */}
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground border-2 border-dashed border-muted hover:border-border"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create issue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
