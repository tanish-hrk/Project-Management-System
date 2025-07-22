import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SocketProvider } from "@/components/providers/socket-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { IntegratedLayout } from "@/components/layout/integrated-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nexus PM - Next-Gen Project Management",
  description: "Advanced project management platform inspired by Jira, Linear, and ClickUp",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <SocketProvider>
              <IntegratedLayout>
                {children}
              </IntegratedLayout>
              <Toaster />
            </SocketProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
