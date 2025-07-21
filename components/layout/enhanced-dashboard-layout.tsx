"use client"

import type * as React from "react"
import { useState } from "react"
import { TransparentTabBar } from "./transparent-tab-bar"
import { SlidingSidebar } from "./sliding-sidebar"

interface EnhancedDashboardLayoutProps {
  children: React.ReactNode
}

export function EnhancedDashboardLayout({ children }: EnhancedDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Sliding Sidebar */}
      <SlidingSidebar direction="left" width={280} />

      {/* Transparent Tab Bar */}
      <TransparentTabBar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </main>
    </div>
  )
}
