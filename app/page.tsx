import { redirect } from "next/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="flex h-screen">
        <main className="flex-1">{redirect("/dashboard")}</main>
      </div>
    </AuthGuard>
  )
}
