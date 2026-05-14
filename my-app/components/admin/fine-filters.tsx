"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

export function FineFilters() {
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
            placeholder="Search fines..."
            className="pl-9 bg-gray-900/50 border-gray-700 text-gray-100 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
          />
        </div>

        <Select>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100 focus:ring-blue-600 focus:ring-offset-0 [&>span]:text-gray-400">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100 focus:ring-blue-600 focus:ring-offset-0 [&>span]:text-gray-400">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="all">All Amounts</SelectItem>
            <SelectItem value="low">Low ($0-$5)</SelectItem>
            <SelectItem value="medium">Medium ($5-$10)</SelectItem>
            <SelectItem value="high">High ($10+)</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100 focus:ring-blue-600 focus:ring-offset-0 [&>span]:text-gray-400">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="due_date_asc">Due Date (Earliest)</SelectItem>
            <SelectItem value="due_date_desc">Due Date (Latest)</SelectItem>
            <SelectItem value="amount_asc">Amount (Low to High)</SelectItem>
            <SelectItem value="amount_desc">Amount (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
