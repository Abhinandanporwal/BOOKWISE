"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, BookOpen, Receipt, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Books", href: "/admin/books", icon: BookOpen },
  { title: "Fines", href: "/admin/fines", icon: Receipt },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing auth token/cookie/session)
    // Example: localStorage.removeItem("token")

    router.push("/") // Redirect to homepage
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900/90 backdrop-blur-sm border-r border-gray-700/50 transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-900/20">
                <BookOpen className="w-5 h-5 text-gray-100" />
              </div>
              <h1 className="text-xl font-bold text-gray-100">Bookwise Admin</h1>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800/70 hover:text-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-700/50">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-gray-800/70 hover:text-gray-100 rounded-md w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
