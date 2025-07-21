"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlidingSidebar } from "./sliding-sidebar"
import { ArrowLeft, ArrowRight, Settings, Palette } from "lucide-react"

export function SidebarDemo() {
  const [direction, setDirection] = useState<"left" | "right">("left")
  const [width, setWidth] = useState(280)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sliding Sidebar */}
      <SlidingSidebar direction={direction} width={width} />

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sliding Sidebar Demo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a smooth, responsive sliding sidebar that overlays content without affecting layout. Perfect
              for modern dashboard interfaces.
            </p>
          </div>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Sidebar Controls
              </CardTitle>
              <CardDescription>Customize the sidebar behavior and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Direction</label>
                  <div className="flex gap-2">
                    <Button
                      variant={direction === "left" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDirection("left")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Left
                    </Button>
                    <Button
                      variant={direction === "right" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDirection("right")}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Right
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Width</label>
                  <div className="flex gap-2">
                    {[240, 280, 320, 360].map((w) => (
                      <Button
                        key={w}
                        variant={width === w ? "default" : "outline"}
                        size="sm"
                        onClick={() => setWidth(w)}
                      >
                        {w}px
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline">⌘B - Toggle Sidebar</Badge>
                <Badge variant="outline">ESC - Close Sidebar</Badge>
                <Badge variant="outline">Click Outside - Close (Mobile)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smooth Animations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Buttery smooth slide animations with CSS transforms and transitions for optimal performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Responsive Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Adapts to different screen sizes with mobile-optimized behavior and touch-friendly interactions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overlay Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Slides over content without affecting layout, maintaining your main content's positioning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Full keyboard support with customizable shortcuts for power users and accessibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auto-Close</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Smart auto-close behavior on mobile devices when clicking outside or navigating.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configurable width, direction, and styling to match your application's design system.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sample Content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Sample Dashboard Content</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Metric {i + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000)}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.random() > 0.5 ? "↗" : "↘"} {Math.floor(Math.random() * 20)}% from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                How to Use
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800 dark:text-blue-200 space-y-2">
              <p>• Click the menu button (☰) in the top corner to toggle the sidebar</p>
              <p>
                • Use keyboard shortcut{" "}
                <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">⌘B</kbd> to quickly toggle
              </p>
              <p>
                • Press <kbd className="px-1 py-0.5 bg-blue-200 dark:bg-blue-800 rounded text-xs">ESC</kbd> to close the
                sidebar
              </p>
              <p>• On mobile, tap outside the sidebar to close it</p>
              <p>• Try changing the direction and width using the controls above</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
