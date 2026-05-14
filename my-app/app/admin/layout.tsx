import type React from "react"
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with fixed width and no shrink */}
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        {/* Main content takes up remaining space */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
