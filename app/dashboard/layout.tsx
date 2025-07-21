import type React from "react"
import { IntegratedLayout } from "@/components/layout/integrated-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <IntegratedLayout>{children}</IntegratedLayout>
}
