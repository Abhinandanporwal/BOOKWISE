"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BadgeDollarSign } from "lucide-react"

export default function AddFineForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userIdFromUrl = searchParams.get("userId")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fineId: "", // Fine ID will be provided by the user
    amount: "", // Fine amount
    reason: "", // Reason for the fine (optional)
    userId: "", // User's ID from URL query or default empty
  })

  // Set userId from URL when component mounts or URL changes
  useEffect(() => {
    if (userIdFromUrl) {
      setFormData((prev) => ({
        ...prev,
        userId: userIdFromUrl,
      }))
    }
  }, [userIdFromUrl])

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user makes changes
    if (error) setError(null)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate amount is a valid number
      if (isNaN(Number.parseFloat(formData.amount)) || Number.parseFloat(formData.amount) <= 0) {
        throw new Error("Please enter a valid amount greater than 0")
      }

      const response = await fetch("/api/addFine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fineId: formData.fineId,
          amount: formData.amount,
          reason: formData.reason || null,
          userId: formData.userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to add fine")
      }

      alert("Fine added successfully!")
      router.push("/admin") // Redirect back to admin page
    } catch (error) {
      console.error("Error adding fine:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-xl z-10">
        <div className="flex items-center space-x-3 mb-8 justify-center">
          <div className="bg-green-600 rounded-lg p-2 shadow-lg shadow-green-900/20">
            <BadgeDollarSign className="w-6 h-6 text-gray-100" />
          </div>
          <h1 className="text-3xl font-bold text-gray-100">Add Fine</h1>
        </div>

        <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-xl">
          <CardHeader className="border-b border-gray-700/50 pb-4">
            <CardTitle className="text-gray-100">Fine Details</CardTitle>
            <CardDescription className="text-gray-400">Enter the fine details for the user</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Fine ID Input */}
              <div className="space-y-2">
                <Label htmlFor="fineId" className="text-gray-300">
                  Fine ID
                </Label>
                <Input
                  id="fineId"
                  name="fineId"
                  value={formData.fineId}
                  onChange={handleChange}
                  required
                  placeholder="e.g. fine-uuid"
                  className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-300">
                  Amount
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="Fine amount"
                  className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              {/* Reason Input */}
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-gray-300">
                  Reason (Optional)
                </Label>
                <Input
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Reason for the fine"
                  className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              {/* User ID Input */}
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-gray-300">
                  User ID
                </Label>
                <Input
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  placeholder="User ID"
                  className={`bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500 ${userIdFromUrl ? "bg-gray-600/50" : ""}`}
                  readOnly={!!userIdFromUrl} // Make it readonly if userId was provided in URL
                />
                {userIdFromUrl && <p className="text-xs text-gray-400">User ID pre-filled from selection</p>}
              </div>
            </CardContent>

            <CardFooter className="pt-4 space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? (
                  <>
                    <span className="mr-2">Processing...</span>
                    <span className="animate-spin">⏳</span>
                  </>
                ) : (
                  "Add Fine"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
