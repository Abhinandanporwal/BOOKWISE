"use client"

import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { PageHeader } from "@/components/admin/page-header"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const openChatbot = () => {
    router.push("/admin/bot") 
  }

  return (
    <>
      <div className="p-6 space-y-6">
        <PageHeader title="Dashboard" description="Overview of your library system" icon="LayoutDashboard" />

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity title="Recent Users" type="users" />
          <RecentActivity title="Recent Fines" type="fines" />
        </div>
      </div>

      {/* 🌟 Fixed Chatbot Button in Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          onClick={openChatbot}
          className="h-15 w-100 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="h-6 w-6 text-white" /> Chatbot
        </Button>
      </div>
    </>
  )
}
