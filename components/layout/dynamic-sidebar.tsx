"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useAppStore } from "@/lib/store"
import { ProjectSwitcher } from "./project-switcher"
import { UserNav } from "./user-nav"
import { NavigationSidebar } from "./navigation-sidebar"
import { ProjectSidebar } from "./project-sidebar"
import { IssueSidebar } from "./issue-sidebar"
import { SearchSidebar } from "./search-sidebar"

export function DynamicSidebar() {
  const { sidebarContent, setSidebarContent, currentProject, selectedIssue } = useAppStore()
  const pathname = usePathname()

  // Auto-update sidebar content based on current route
  useEffect(() => {
    if (pathname.includes("/projects/") && pathname.includes("/board")) {
      setSidebarContent("project")
    } else if (pathname.includes("/issues/") && selectedIssue) {
      setSidebarContent("issue")
    } else if (pathname.includes("/search")) {
      setSidebarContent("search")
    } else {
      setSidebarContent("navigation")
    }
  }, [pathname, selectedIssue, setSidebarContent])

  const renderSidebarContent = () => {
    switch (sidebarContent) {
      case "project":
        return <ProjectSidebar />
      case "issue":
        return <IssueSidebar />
      case "search":
        return <SearchSidebar />
      default:
        return <NavigationSidebar />
    }
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <ProjectSwitcher />
      </SidebarHeader>

      <SidebarContent>{renderSidebarContent()}</SidebarContent>

      <SidebarFooter>
        <UserNav />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
