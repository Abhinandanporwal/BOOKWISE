"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, ChevronRight, Library, Search, Clock } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Admin login states
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleStartChatting = () => {
    setLoading(true)
    console.log("User started chat")
    router.push("/chat")
  }

  const handleAdminLogin = async () => {
    setAdminError("")
    setLoading(true)
  
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      })
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Unknown error" }))
        setAdminError(errorData.message || "Login failed")
        setLoading(false)
        return
      }

      
      router.push("/admin")
    } catch (err) {
      setAdminError("Something went wrong")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      {/* Subtle accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && (
          <>
            <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-blue-600 to-transparent"></div>
            <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-900/5 blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-blue-900/5 blur-3xl"></div>
          </>
        )}
      </div>

      <div className="w-full max-w-5xl z-10 flex flex-col items-center space-y-10">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-900/20">
            <BookOpen className="w-6 h-6 text-gray-100" />
          </div>
          <h1 className="text-3xl font-bold text-gray-100">Bookwise</h1>
        </div>

        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight">
            Professional Library Assistant
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Your intelligent library management solution. Access information about books, manage your account, and get personalized recommendations.
          </p>
        </div>

        {/* Main section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Left Card */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-gray-100 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-500" />
                Query Examples
              </CardTitle>
              <CardDescription className="text-gray-400">
                Efficient ways to interact with your library system
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  "Do you have books on data mining?",
                  "Renew my borrowed books.",
                  "What's my fine for late returns?",
                  "Suggest trending machine learning books.",
                ].map((example, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-gray-700 rounded-md p-1 mr-3 mt-0.5 group-hover:bg-blue-600 transition-colors duration-200">
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                    </div>
                    <span className="text-gray-300 group-hover:text-gray-100 transition-colors duration-200">
                      {example}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-sm text-gray-500 border-t border-gray-700/50 pt-4">
              Powered by advanced AI and comprehensive library database.
            </CardFooter>
          </Card>

          {/* Right Section */}
          <div className="flex flex-col space-y-8">
            {/* Features */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-xl">
              <h3 className="text-xl font-medium text-gray-100 mb-4">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-600/10 rounded-lg p-2 mr-4">
                    <Library className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 font-medium">Comprehensive Catalog</h4>
                    <p className="text-gray-400 text-sm">Access our entire collection with intelligent search.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600/10 rounded-lg p-2 mr-4">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 font-medium">Efficient Management</h4>
                    <p className="text-gray-400 text-sm">Manage loans, returns, and reservations seamlessly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons & Admin */}
            <div className="flex justify-center flex-col space-y-4 items-center w-full">
              {/* Chat Button */}
              <Button
                onClick={handleStartChatting}
                disabled={loading}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 rounded-md shadow-lg shadow-blue-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/30 w-full max-w-xs"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Start Chatting
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </div>
                )}
              </Button>

              {/* Toggle Admin Login */}
              <button
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="text-sm text-blue-400 hover:text-blue-200 mt-2 transition-all"
              >
                {showAdminLogin ? "Hide Admin Login" : "Admin Login"}
              </button>

              {/* Admin Login Section */}
              {showAdminLogin && (
                <div className="w-full max-w-xs space-y-2">
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded"
                  />
                  {adminError && <p className="text-red-400 text-sm">{adminError}</p>}
                  <Button
                    onClick={handleAdminLogin}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Login as Admin
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Bookwise Library System
      </div>
    </div>
  )
}
