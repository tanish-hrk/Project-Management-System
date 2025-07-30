"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { TransparentTabBar } from "./transparent-tab-bar"
import { BlackSidebar } from "./black-sidebar"
import { AnimatedBackground } from "./animated-background"

interface IntegratedLayoutProps {
  children: React.ReactNode
}

export function IntegratedLayout({ children }: IntegratedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Check if we're on an auth page (login, signup, etc.)
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.includes('auth')

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Animated Grid Background */}
      <AnimatedBackground />

      {/* Only show sidebar and tab bar when NOT on auth pages */}
      {!isAuthPage && (
        <>
          {/* Black Sidebar */}
          <BlackSidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />

          {/* Transparent Tab Bar */}
          <TransparentTabBar onSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
        </>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 relative z-10 w-full ${!isAuthPage ? 'pt-16' : ''}`}>
        <div className={`w-full ${!isAuthPage ? 'min-h-[calc(100vh-4rem)]' : 'min-h-screen'}`}>{children}</div>
      </main>
    </div>
  )
}
