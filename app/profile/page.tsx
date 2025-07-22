import type { Metadata } from "next"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileProjects } from "@/components/profile/profile-projects"
import { ProfileActivity } from "@/components/profile/profile-activity"
import { ProfileSettings } from "@/components/profile/profile-settings"

export const metadata: Metadata = {
  title: "User Profile | Project Management Platform",
  description: "View and manage your profile, activities, and settings",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8 max-w-7xl">
      <ProfileHeader />
      <ProfileTabs
        tabs={[
          { id: "overview", label: "Overview", content: <ProfileOverview /> },
          { id: "projects", label: "Projects", content: <ProfileProjects /> },
          { id: "activity", label: "Activity", content: <ProfileActivity /> },
          { id: "settings", label: "Settings", content: <ProfileSettings /> },
        ]}
      />
    </div>
  )
}

function ProfileOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <ProfileStats />
        <ProfileActivity limit={5} />
      </div>
      <div className="space-y-6">
        <ProfileProjects limit={5} />
      </div>
    </div>
  )
}
