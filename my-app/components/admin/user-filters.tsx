"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function UserFilters() {
  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg p-4 mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-100">Filters</h3>
        <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-gray-100">
          <X className="h-4 w-4 mr-1" />
          Clear filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-9 bg-gray-900/50 border-gray-700 text-gray-100 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
          />
        </div>

        <Select>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100 focus:ring-blue-600 focus:ring-offset-0 [&>span]:text-gray-400">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100 focus:ring-blue-600 focus:ring-offset-0 [&>span]:text-gray-400">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="faculty">Faculty</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100 focus:ring-blue-600 focus:ring-offset-0 [&>span]:text-gray-400">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
