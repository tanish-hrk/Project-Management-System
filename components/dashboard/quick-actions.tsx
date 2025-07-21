"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, FileText, FolderPlus, Users, Calendar } from "lucide-react"
import { CreateIssueDialog } from "@/components/issues/create-issue-dialog"

export function QuickActions() {
  const [showCreateIssue, setShowCreateIssue] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-sm border-white/20">
          <DropdownMenuItem onClick={() => setShowCreateIssue(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Issue
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderPlus className="h-4 w-4 mr-2" />
            Project
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className="h-4 w-4 mr-2" />
            Team
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="h-4 w-4 mr-2" />
            Sprint
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateIssueDialog open={showCreateIssue} onOpenChange={setShowCreateIssue} />
    </>
  )
}
