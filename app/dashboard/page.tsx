"use client"
import { useAppStore } from "@/lib/store"
import { DashboardGrid } from "@/components/dashboard/dashboard-grid"
import { KPICharts } from "@/components/dashboard/kpi-charts"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SprintProgress } from "@/components/dashboard/sprint-progress"
import { DashboardFooter } from "@/components/layout/dashboard-footer"

export default function DashboardPage() {
  const { user, currentProject } = useAppStore()

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}</h1>
            <p className="text-gray-300">Here's what's happening with your projects</p>
          </div>
          <QuickActions />
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="px-6 space-y-8">
        {/* Primary Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DashboardGrid />
          </div>
          <div className="space-y-6">
            <SprintProgress />
            <RecentActivity />
          </div>
        </div>

        {/* KPI Charts Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
            <p className="text-gray-300">Key performance indicators and data trends</p>
          </div>
          <KPICharts />
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}
