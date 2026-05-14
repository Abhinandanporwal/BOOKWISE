"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, ChevronLeft } from "lucide-react"

export default function AddUserForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = { ...formData }

      console.log("Submitting user:", payload)

      const response = await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        alert("User added successfully!")
        setFormData({
          id: "",
          email: "",
          name: "",
        })
      } else {
        alert("Failed to add user. Please try again.")
      }
    } catch (error) {
      console.error("Error adding user:", error)
      alert("Failed to add user. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients and shapes */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-blue-600 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-900/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-blue-900/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-xl z-10">
        <div className="flex items-center space-x-3 mb-8 justify-center">
          <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-900/20">
            <UserPlus className="w-6 h-6 text-gray-100" />
          </div>
          <h1 className="text-3xl font-bold text-gray-100">Add New User</h1>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl">
          <CardHeader className="border-b border-gray-700/50 pb-4">
            <CardTitle className="text-gray-100">User Details</CardTitle>
            <CardDescription className="text-gray-400">
              Enter user details to register them in the system
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              {/* ID Field */}
              <div className="space-y-2">
                <Label htmlFor="id" className="text-gray-300">ID</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-gray-700/50 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Adding...
                  </div>
                ) : "Add User"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Bookwise Library System
        </div>
      </div>
    </div>
  )
}
