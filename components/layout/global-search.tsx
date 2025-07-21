"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, Users, FolderOpen, Hash, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  type: "issue" | "project" | "user" | "page"
  title: string
  subtitle?: string
  avatar?: string
  badge?: string
  url: string
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    type: "issue",
    title: "Implement user authentication system",
    subtitle: "NPM-123 • In Progress",
    badge: "High Priority",
    url: "/issues/npm-123",
  },
  {
    id: "2",
    type: "project",
    title: "Nexus PM",
    subtitle: "12 members • 23 open issues",
    avatar: "/placeholder.svg?height=32&width=32",
    url: "/projects/nexus-pm",
  },
  {
    id: "3",
    type: "user",
    title: "John Doe",
    subtitle: "Product Manager",
    avatar: "/placeholder.svg?height=32&width=32",
    url: "/users/john-doe",
  },
  {
    id: "4",
    type: "issue",
    title: "Fix dashboard loading performance",
    subtitle: "NPM-124 • Open",
    badge: "Bug",
    url: "/issues/npm-124",
  },
  {
    id: "5",
    type: "page",
    title: "Sprint Planning Guide",
    subtitle: "Documentation",
    url: "/docs/sprint-planning",
  },
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Open search with Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle search
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle?.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults(mockResults.slice(0, 5))
      setSelectedIndex(0)
    }
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % results.length)
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex])

  const handleResultClick = (result: SearchResult) => {
    console.log("Navigate to:", result.url)
    setIsOpen(false)
    setQuery("")
  }

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "issue":
        return <Hash className="h-4 w-4 text-blue-400" />
      case "project":
        return <FolderOpen className="h-4 w-4 text-green-400" />
      case "user":
        return <Users className="h-4 w-4 text-purple-400" />
      case "page":
        return <FileText className="h-4 w-4 text-orange-400" />
      default:
        return <Search className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className={cn(
          "w-full justify-start text-left font-normal h-9",
          "bg-white/5 border border-white/20 text-white/70 hover:text-white hover:bg-white/10",
        )}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Search everything...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-xs font-medium text-white/70 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 bg-black/95 border-gray-700 text-white">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="sr-only">Global Search</DialogTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search issues, projects, people..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                autoFocus
              />
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-96">
            <div className="p-2">
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                        index === selectedIndex ? "bg-gray-800" : "hover:bg-gray-800/50",
                      )}
                    >
                      {result.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={result.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-700 text-white text-xs">
                            {result.title.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800">
                          {getResultIcon(result.type)}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white truncate">{result.title}</p>
                          {result.badge && (
                            <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                              {result.badge}
                            </Badge>
                          )}
                        </div>
                        {result.subtitle && <p className="text-sm text-gray-400 truncate">{result.subtitle}</p>}
                      </div>

                      <ArrowRight className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No results found for "{query}"</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-700 p-3">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-xs">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-xs">↵</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-xs">esc</kbd>
                  <span>Close</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Recent searches</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
