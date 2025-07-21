"use client"

import { useState } from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, X, Clock, Bookmark, Save } from "lucide-react"
import { useAppStore } from "@/lib/store"

const savedSearches = [
  { id: "1", name: "My Open Issues", query: "assignee = currentUser() AND status != Done", count: 8 },
  { id: "2", name: "High Priority Bugs", query: "type = Bug AND priority = High", count: 3 },
  { id: "3", name: "This Sprint", query: "sprint = currentSprint()", count: 15 },
  { id: "4", name: "Overdue Issues", query: "dueDate < now() AND status != Done", count: 5 },
]

const recentSearches = [
  "assignee = john AND status = 'In Progress'",
  "project = NEX AND type = Story",
  "labels = frontend",
  "reporter = sarah",
]

const quickFilters = [
  { label: "Assigned to me", field: "assignee", value: "currentUser()", count: 12 },
  { label: "Reported by me", field: "reporter", value: "currentUser()", count: 5 },
  { label: "Watching", field: "watcher", value: "currentUser()", count: 8 },
  { label: "High Priority", field: "priority", value: "High", count: 7 },
  { label: "Bugs", field: "type", value: "Bug", count: 15 },
  { label: "Due this week", field: "dueDate", value: "endOfWeek()", count: 4 },
]

export function SearchSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { searchFilters, setSearchFilters } = useAppStore()

  const handleQuickFilter = (filter: any) => {
    const filterId = `${filter.field}:${filter.value}`
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter((f) => f !== filterId))
    } else {
      setActiveFilters([...activeFilters, filterId])
    }
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
    setSearchFilters({})
  }

  return (
    <div className="max-h-[100vh] overflow-y-auto p-2">
      {/* Search Input */}
      <SidebarGroup>
        <SidebarGroupLabel>Search</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {(activeFilters.length > 0 || searchQuery) && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{activeFilters.length} filters active</span>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              </div>
            )}

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {activeFilters.map((filterId) => {
                  const [field, value] = filterId.split(":")
                  return (
                    <Badge key={filterId} variant="secondary" className="text-xs">
                      {field}: {value}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                        onClick={() => setActiveFilters(activeFilters.filter((f) => f !== filterId))}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Quick Filters */}
      <SidebarGroup>
        <SidebarGroupLabel>Quick Filters</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-2 space-y-1">
            {quickFilters.map((filter) => {
              const filterId = `${filter.field}:${filter.value}`
              const isActive = activeFilters.includes(filterId)

              return (
                <div
                  key={filterId}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleQuickFilter(filter)}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox checked={isActive} />
                    <span className="text-sm">{filter.label}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {filter.count}
                  </Badge>
                </div>
              )
            })}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Saved Searches */}
      <SidebarGroup>
        <SidebarGroupLabel>Saved Searches</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {savedSearches.map((search) => (
              <SidebarMenuItem key={search.id}>
                <SidebarMenuButton className="justify-between">
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    <span className="truncate">{search.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {search.count}
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <div className="p-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Save className="h-4 w-4 mr-2" />
              Save Current Search
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Recent Searches */}
      <SidebarGroup>
        <SidebarGroupLabel>Recent Searches</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-2 space-y-1">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={() => setSearchQuery(search)}
              >
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-mono truncate">{search}</span>
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Advanced Search */}
      <SidebarGroup>
        <SidebarGroupLabel>Advanced</SidebarGroupLabel>
        <SidebarGroupContent>
          <div className="p-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  )
}
