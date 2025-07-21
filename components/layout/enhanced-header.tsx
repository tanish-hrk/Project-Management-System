"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Bell, Command, Menu, X } from "lucide-react"
import { NotificationDropdown } from "./notification-dropdown"
import { CreateIssueDialog } from "@/components/issues/create-issue-dialog"
import { GlobalSearch } from "./global-search"
import { useAppStore } from "@/lib/store"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface EnhancedHeaderProps {
  onSidebarToggle?: () => void
  sidebarOpen?: boolean
}

export function EnhancedHeader({ onSidebarToggle, sidebarOpen = false }: EnhancedHeaderProps) {
  const [showCreateIssue, setShowCreateIssue] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { currentProject, selectedIssue, unreadCount } = useAppStore()
  const pathname = usePathname()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global search (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setShowSearch(true)
      }

      // Create issue (Cmd/Ctrl + I)
      if ((e.metaKey || e.ctrlKey) && e.key === "i") {
        e.preventDefault()
        setShowCreateIssue(true)
      }

      // Toggle sidebar (Cmd/Ctrl + B)
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault()
        onSidebarToggle?.()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onSidebarToggle])

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    if (segments[0] === "dashboard") {
      breadcrumbs.push({ label: "Dashboard", href: "/dashboard", isLast: segments.length === 1 })
    }

    if (segments[0] === "projects" && segments[1]) {
      breadcrumbs.push({ label: "Projects", href: "/projects", isLast: false })
      if (currentProject) {
        breadcrumbs.push({
          label: currentProject.name,
          href: `/projects/${segments[1]}`,
          isLast: segments.length === 2,
        })
      }

      if (segments[2] === "board") {
        breadcrumbs.push({ label: "Board", href: pathname, isLast: true })
      } else if (segments[2] === "backlog") {
        breadcrumbs.push({ label: "Backlog", href: pathname, isLast: true })
      } else if (segments[2] === "reports") {
        breadcrumbs.push({ label: "Reports", href: pathname, isLast: true })
      }
    }

    if (segments[0] === "issues") {
      breadcrumbs.push({ label: "Issues", href: "/issues", isLast: segments.length === 1 })
      if (segments[1] && selectedIssue) {
        breadcrumbs.push({
          label: selectedIssue.key,
          href: pathname,
          isLast: true,
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  const handleSearchFocus = () => {
    setShowSearch(true)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearch(true)
    }
  }

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
        {/* Sidebar Toggle */}
        {onSidebarToggle && (
          <Button variant="ghost" size="sm" onClick={onSidebarToggle} className="h-8 w-8 p-0">
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <>
            <div className="h-4 w-px bg-border" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.isLast ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}

        <div className="flex flex-1 items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search issues, projects, people..."
              className="pl-10 pr-20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Badge variant="outline" className="text-xs font-mono px-1.5 py-0.5">
                <Command className="h-2.5 w-2.5 mr-1" />K
              </Badge>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={() => setShowCreateIssue(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create
            <Badge variant="secondary" className="ml-2 text-xs font-mono px-1.5 py-0.5">
              <Command className="h-2.5 w-2.5 mr-1" />I
            </Badge>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </Button>

          <NotificationDropdown />
        </div>
      </header>

      {/* Dialogs */}
      <CreateIssueDialog open={showCreateIssue} onOpenChange={setShowCreateIssue} />
      <GlobalSearch open={showSearch} onOpenChange={setShowSearch} initialQuery={searchQuery} />
    </>
  )
}
