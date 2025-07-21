"use client"

import type * as React from "react"
import { useState } from "react"
import { TransparentTabBar } from "./transparent-tab-bar"
import { SlidingSidebar } from "./sliding-sidebar"

interface IntegratedDashboardLayoutProps {
  children: React.ReactNode
}

export function IntegratedDashboardLayout({ children }: IntegratedDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Sliding Sidebar */}
      <SlidingSidebar direction="left" width={280} onToggle={setSidebarOpen} />

      {/* Transparent Tab Bar */}
      <TransparentTabBar onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="pt-16 transition-all duration-300">
        <div className="min-h-[calc(100vh-4rem)]">{children}</div>
      </main>
    </div>
  )
}
