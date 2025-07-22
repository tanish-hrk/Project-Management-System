"use client"

import type React from "react"

import { useState } from "react"
import { TransparentTabBar } from "./transparent-tab-bar"
import { BlackSidebar } from "./black-sidebar"
import { AnimatedBackground } from "./animated-background"

interface IntegratedLayoutProps {
  children: React.ReactNode
}

export function IntegratedLayout({ children }: IntegratedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Animated Grid Background */}
      <AnimatedBackground />

      {/* Black Sidebar */}
      <BlackSidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />

      {/* Transparent Tab Bar */}
      <TransparentTabBar onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main className="pt-16 transition-all duration-300 relative z-10 w-full">
        <div className="min-h-[calc(100vh-4rem)] w-full">{children}</div>
      </main>
    </div>
  )
}
