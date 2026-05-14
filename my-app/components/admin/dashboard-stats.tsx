"use client"
import { Users, BookOpen, Receipt, Clock } from "lucide-react"
import { useEffect, useState } from "react"

const fetchSummary = async () => {
  const response = await fetch("/api/summary")
  if (!response.ok) {
    throw new Error("Failed to fetch summary data")
  }
  return await response.json()
}

export function DashboardStats() {
  const [summary, setSummary] = useState({
    users: 0,
    books: 0,
    avail:0,
    fines: 0,
    activeLoans: 0, // Optional: add this if you track it separately
  })

  useEffect(() => {
    const getSummary = async () => {
      try {
        const data = await fetchSummary()
        setSummary(data)
      } catch (error) {
        console.error("Error fetching summary:", error)
      }
    }

    getSummary()
  }, [])

  const stats = [
    {
      title: "Total Users",
      value: summary.users.toLocaleString(),
      change: "+12%",
      icon: Users,
      color: "bg-blue-600",
    },
    {
      title: "Books Collection",
      value: summary.books.toLocaleString(),
      change: "+8%",
      icon: BookOpen,
      color: "bg-emerald-600",
    },
    {
      title: "Active Loans",
      value: summary.avail.toLocaleString(),
      change: "+5%",
      icon: Clock,
      color: "bg-amber-600",
    },
    {
      title: "Pending Fines",
      value: `$${summary.fines.toLocaleString()}`,
      change: "-3%",
      icon: Receipt,
      color: "bg-rose-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-gray-800/70 border border-gray-700/50 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-100 mt-1">{stat.value}</h3>
              <p className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`${stat.color} rounded-lg p-2 shadow-lg`}>
              <stat.icon className="w-5 h-5 text-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
