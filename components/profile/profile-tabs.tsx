"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileTabsProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
}

export function ProfileTabs({ tabs }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="border-b border-white/20">
        <TabsList className="h-10 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:shadow-none rounded-none px-4 text-gray-300 data-[state=active]:text-blue"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="pt-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
