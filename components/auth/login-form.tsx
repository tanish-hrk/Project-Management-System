"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppStore } from "@/lib/store"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({})

  const { setUser } = useAppStore()
  const router = useRouter()

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}

    if (!email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!password) {
      errors.password = "Password is required"
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleDemoLogin = (role: 'admin' | 'manager' | 'member' = 'member') => {
    const demoCredentials = {
      admin: { email: "admin@demo.com", password: "demo123" },
      manager: { email: "manager@demo.com", password: "demo123" },
      member: { email: "member@demo.com", password: "demo123" }
    }
    
    const { email: demoEmail, password: demoPassword } = demoCredentials[role]
    
    setEmail(demoEmail)
    setPassword(demoPassword)
    setIsDemoMode(true)
    setError("")
    setValidationErrors({})
    
    // Auto-submit after setting demo credentials
    setTimeout(() => handleSubmit(null, demoEmail, demoPassword), 100)
  }

  const handleSubmit = async (e: React.FormEvent | null = null, loginEmail?: string, loginPassword?: string) => {
    if (e) e.preventDefault()

    const emailToUse = loginEmail || email
    const passwordToUse = loginPassword || password

    if (!emailToUse || !passwordToUse) {
      setError("Email and password are required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Bypass authentication - always navigate to dashboard
      // Set dummy user data for the application to work
      setUser({
        id: "1",
        email: emailToUse,
        name: emailToUse.split('@')[0] || "User",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "member",
      })

      // Store dummy tokens
      localStorage.setItem('authToken', 'dummy-token')
      localStorage.setItem('refreshToken', 'dummy-refresh-token')

      // Always redirect to dashboard regardless of credentials
      router.push("/dashboard")
      
    } catch (error) {
      console.error("Navigation error:", error)
      // Even if there's an error, still navigate to dashboard
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
      setIsDemoMode(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">N</div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Nexus PM</CardTitle>
          <CardDescription>Enter your credentials to access your workspace</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Demo Account Info */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/20">
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Try Demo Account</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Choose a role to test the application
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('member')}
                  className="border-blue-300 bg-transparent text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
                >
                  Demo Member
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('manager')}
                  className="border-green-300 bg-transparent text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
                >
                  Demo Manager
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="border-purple-300 bg-transparent text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900"
                >
                  Demo Admin
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (validationErrors.email) {
                    setValidationErrors((prev) => ({ ...prev, email: undefined }))
                  }
                }}
                className={`${isDemoMode ? "border-blue-300 bg-blue-50 dark:bg-blue-950/20" : ""} ${
                  validationErrors.email ? "border-red-500" : ""
                }`}
                disabled={isLoading}
                required
              />
              {validationErrors.email && <p className="text-sm text-red-600">{validationErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (validationErrors.password) {
                      setValidationErrors((prev) => ({ ...prev, password: undefined }))
                    }
                  }}
                  className={`${isDemoMode ? "border-blue-300 bg-blue-50 dark:bg-blue-950/20" : ""} ${
                    validationErrors.password ? "border-red-500" : ""
                  } pr-10`}
                  disabled={isLoading}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {validationErrors.password && <p className="text-sm text-red-600">{validationErrors.password}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="h-auto p-0 font-normal" asChild>
              <Link href="/signup">Create one here</Link>
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>© 2024 Nexus PM. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
