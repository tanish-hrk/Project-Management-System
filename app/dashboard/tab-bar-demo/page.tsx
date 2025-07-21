"use client"

import { TransparentTabBar } from "@/components/layout/transparent-tab-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function TabBarDemoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <TransparentTabBar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transparent Tab Bar Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the glassmorphism design with interactive elements
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Design Features
                  <Badge variant="secondary">Glassmorphism</Badge>
                </CardTitle>
                <CardDescription>Beautiful transparent design with blur effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Medium opacity background (60-80%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Dynamic backdrop blur effects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm">Subtle blush gradient tinting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-sm">Scroll-responsive opacity</span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⚡ Interactive Elements
                  <Badge variant="secondary">Responsive</Badge>
                </CardTitle>
                <CardDescription>Fully functional components with smooth animations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Sidebar toggle with animations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Search bar with keyboard shortcuts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Notification badges with pulse</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-sm">Profile dropdown with glassmorphism</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-white/20">
            <CardHeader>
              <CardTitle>🎮 Try These Features</CardTitle>
              <CardDescription>Test the interactive elements and responsive behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="backdrop-blur-sm bg-white/20 border-white/30">
                  Press ⌘K for Search
                </Button>
                <Button variant="outline" className="backdrop-blur-sm bg-white/20 border-white/30">
                  Press ⌘B for Sidebar
                </Button>
                <Button variant="outline" className="backdrop-blur-sm bg-white/20 border-white/30">
                  Scroll to See Effects
                </Button>
                <Button variant="outline" className="backdrop-blur-sm bg-white/20 border-white/30">
                  Resize Window
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Spacer content to enable scrolling */}
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Sample Content {i + 1}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Scroll down to see the tab bar opacity and blur effects change dynamically.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
