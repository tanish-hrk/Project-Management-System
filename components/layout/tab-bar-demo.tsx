"use client"

import { TransparentTabBar } from "./transparent-tab-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function TabBarDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      <TransparentTabBar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Integrated Tab Bar
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Clean interface without redundant navigation</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Streamlined Design
                  <Badge variant="secondary">Optimized</Badge>
                </CardTitle>
                <CardDescription>Navigation moved to sidebar for cleaner interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Sidebar toggle for navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Search bar for quick access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-sm">Action buttons for utilities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-sm">Glassmorphism visual effects</span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📱 Responsive Layout
                  <Badge variant="secondary">Mobile-First</Badge>
                </CardTitle>
                <CardDescription>Adapts perfectly to all screen sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Mobile-optimized search button</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Touch-friendly button sizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Adaptive spacing and layout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-sm">Consistent visual hierarchy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
