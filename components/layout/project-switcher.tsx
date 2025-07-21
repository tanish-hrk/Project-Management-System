"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store"

const mockProjects = [
  {
    id: "1",
    name: "Nexus Platform",
    key: "NEX",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Mobile App",
    key: "MOB",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Design System",
    key: "DS",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function ProjectSwitcher() {
  const [open, setOpen] = useState(false)
  const { currentProject, setCurrentProject } = useAppStore()

  const selectedProject = currentProject || mockProjects[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={selectedProject.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedProject.key}</AvatarFallback>
            </Avatar>
            <span className="truncate">{selectedProject.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {mockProjects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={() => {
                    setCurrentProject(project as any)
                    setOpen(false)
                  }}
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage src={project.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{project.key}</AvatarFallback>
                  </Avatar>
                  {project.name}
                  <Check
                    className={`ml-auto h-4 w-4 ${selectedProject.id === project.id ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
