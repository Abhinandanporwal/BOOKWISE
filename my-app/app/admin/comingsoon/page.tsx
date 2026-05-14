"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ComingSoon() {
    const router=useRouter();
    const returnhome = () => {
        router.push("/admin");
      };
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <div className="bg-gray-800/70 border border-gray-700/50 rounded-xl shadow-lg p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-700 rounded-full p-4">
            <Sparkles className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-100 mb-2">Coming Soon 🚀</h1>
        <p className="text-gray-400 text-sm mb-6">
          We’re working hard on something amazing. Stay tuned for updates!
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={returnhome}>Back to Home</Button>
      </div>
    </div>
  )
}
