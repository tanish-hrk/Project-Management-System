"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Calendar,
  FolderKanban,
  Home,
  Search,
  Settings,
  Users,
  Zap,
  ChevronRight,
  Target,
  Clock,
  Bell,
  User,
  X,
  Plus,
  Filter,
  Archive,
  History,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { CreateIssueDialog } from "@/components/issues/create-issue-dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { SearchSidebar } from "@/components/layout/search-sidebar"
import { useAppStore } from "@/lib/store"

interface BlackSidebarProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function BlackSidebar({ isOpen, onToggle, className }: BlackSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["Projects", "Issues"])
  const [isMobile, setIsMobile] = useState(false)
  const [createIssueOpen, setCreateIssueOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const router = useRouter();
  const { user, projects, issues } = useAppStore();

  // Dynamic badge counts
  const allProjectsCount = projects.length;
  const myProjectsCount = projects.filter((p) => p.members.some((m) => m.id === user?.id)).length;
  const allIssuesCount = issues.length;
  const myIssuesCount = issues.filter((i) => i.assignee?.id === user?.id).length;
  const assignedIssuesCount = issues.filter((i) => i.assignee?.id === user?.id).length;
  const reportedIssuesCount = issues.filter((i) => i.reporter.id === user?.id).length;
  // Sprints and other counts can be added similarly if available in store

  const navigation = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      badge: null,
    },
    {
      title: "Projects",
      icon: FolderKanban,
      badge: allProjectsCount > 0 ? String(allProjectsCount) : null,
      items: [
        { title: "All Projects", url: "/projects", badge: allProjectsCount > 0 ? String(allProjectsCount) : null },
        { title: "My Projects", url: "/projects/mine", badge: myProjectsCount > 0 ? String(myProjectsCount) : null },
        { title: "Recent", url: "/projects/recent" },
        { title: "Archived", url: "/projects/archived", icon: Archive },
      ],
    },
    {
      title: "Issues",
      icon: Zap,
      badge: allIssuesCount > 0 ? String(allIssuesCount) : null,
      items: [
        { title: "My Issues", url: "/issues/mine", badge: myIssuesCount > 0 ? String(myIssuesCount) : null },
        { title: "Assigned to me", url: "/issues/assigned", badge: assignedIssuesCount > 0 ? String(assignedIssuesCount) : null },
        { title: "Reported by me", url: "/issues/reported", badge: reportedIssuesCount > 0 ? String(reportedIssuesCount) : null },
        { title: "Recently viewed", url: "/issues/recent" },
        { title: "All Issues", url: "/issues", icon: Filter },
      ],
    },
    {
      title: "Sprints",
      icon: Target,
      badge: null, // Add dynamic count if you have sprints in store
      items: [
        { title: "Active Sprints", url: "/sprints/active" },
        { title: "Sprint Planning", url: "/sprints/planning" },
        { title: "Backlog", url: "/sprints/backlog" },
        { title: "Sprint History", url: "/sprints/history", icon: History },
      ],
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
      badge: null,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
      badge: null,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
      badge: null,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Users,
      badge: null,
    },
    {
      title: "Time Tracking",
      url: "/time-tracking",
      icon: Clock,
      badge: null,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      badge: null,
    },
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isOpen || !isMobile) return

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("black-sidebar")
      if (sidebar && !sidebar.contains(event.target as Node)) {
        onToggle()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, isMobile, onToggle])

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobile, isOpen])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleNavClick = (url?: string) => {
    if (url) {
      router.push(url);
      if (isMobile) {
        onToggle();
      }
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-45 transition-opacity duration-300" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <div
        id="black-sidebar"
        className={cn(
          "fixed top-0 left-0 h-full bg-black text-white shadow-2xl z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "w-80",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h2 className="font-bold text-xl text-white">Nexus PM</h2>
                  <p className="text-gray-400 text-sm">Project Management</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setCreateIssueOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Issue
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                onClick={() => setFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-10 px-3 text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => toggleExpanded(item.title)}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs h-5 bg-gray-700 text-gray-300">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            expandedItems.includes(item.title) && "rotate-90",
                          )}
                        />
                      </Button>
                      {expandedItems.includes(item.title) && (
                        <div className="ml-8 mt-2 space-y-1">
                          {item.items.map((subItem) => (
                            <Button
                              key={subItem.title}
                              variant="ghost"
                              className="w-full justify-start h-8 px-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                              onClick={() => handleNavClick(subItem.url)}
                            >
                              {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="outline" className="ml-auto text-xs h-4 border-gray-600 text-gray-400">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-3 text-gray-300 hover:text-white hover:bg-gray-800"
                      onClick={() => handleNavClick(item.url)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="text-sm font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs h-5 bg-gray-700 text-gray-300">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator className="bg-gray-800" />

          {/* Footer */}
          <div className="p-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Bell className="h-4 w-4 mr-3" />
                Notifications
                <Badge variant="destructive" className="ml-auto text-xs h-4">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => handleNavClick("/profile")}
              >
                <User className="h-4 w-4 mr-3" />
                Profile
              </Button>
            </div>
          </div>
        </div>
        <CreateIssueDialog open={createIssueOpen} onOpenChange={setCreateIssueOpen} />
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetContent side="right" className="max-w-md w-full p-0">
            <SearchSidebar />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
