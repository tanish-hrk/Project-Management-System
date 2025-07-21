"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Calendar,
  FolderKanban,
  Home,
  Search,
  Settings,
  Users,
  Zap,
  Clock,
  Target,
  GitBranch,
  Activity,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"

const mainNavigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    icon: FolderKanban,
    items: [
      { title: "All Projects", url: "/projects", badge: "12" },
      { title: "My Projects", url: "/projects/mine", badge: "5" },
      { title: "Recent", url: "/projects/recent" },
      { title: "Archived", url: "/projects/archived" },
    ],
  },
  {
    title: "Issues",
    icon: Zap,
    items: [
      { title: "My Issues", url: "/issues/mine", badge: "8" },
      { title: "Assigned to me", url: "/issues/assigned", badge: "15" },
      { title: "Reported by me", url: "/issues/reported", badge: "3" },
      { title: "Recently viewed", url: "/issues/recent" },
      { title: "All Issues", url: "/issues" },
    ],
  },
  {
    title: "Sprints",
    icon: Target,
    items: [
      { title: "Active Sprints", url: "/sprints/active", badge: "2" },
      { title: "Sprint Planning", url: "/sprints/planning" },
      { title: "Backlog", url: "/sprints/backlog" },
      { title: "Sprint History", url: "/sprints/history" },
    ],
  },
]

const toolsNavigation = [
  {
    title: "Search",
    url: "/search",
    icon: Search,
    shortcut: "⌘K",
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Timeline",
    url: "/timeline",
    icon: GitBranch,
  },
  {
    title: "Activity",
    url: "/activity",
    icon: Activity,
  },
]

const reportsNavigation = [
  {
    title: "Reports",
    icon: BarChart3,
    items: [
      { title: "Burndown Chart", url: "/reports/burndown" },
      { title: "Velocity Chart", url: "/reports/velocity" },
      { title: "Control Chart", url: "/reports/control" },
      { title: "Time Tracking", url: "/reports/time" },
      { title: "Workload", url: "/reports/workload" },
    ],
  },
]

const managementNavigation = [
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Time Tracking",
    url: "/time-tracking",
    icon: Clock,
  },
  {
    title: "Documentation",
    url: "/docs",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function NavigationSidebar() {
  const pathname = usePathname()
  const { unreadCount } = useAppStore()

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(url)
  }

  return (
    <>
      {/* Main Navigation */}
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {mainNavigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </>
                ) : (
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.title === "Dashboard" && unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-auto text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Tools */}
      <SidebarGroup>
        <SidebarGroupLabel>Tools</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {toolsNavigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                    {item.shortcut && (
                      <Badge variant="outline" className="ml-auto text-xs font-mono">
                        {item.shortcut}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Reports */}
      <SidebarGroup>
        <SidebarGroupLabel>Analytics</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {reportsNavigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Management */}
      <SidebarGroup>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {managementNavigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive(item.url)}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
