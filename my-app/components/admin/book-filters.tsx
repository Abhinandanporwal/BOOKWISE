"use client"

import { useState, useEffect, useTransition } from "react"
import { getFilteredBooks } from "@/actions/getbooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface Book {
  id: string
  title: string
  author: string
  category: string
  status: "available" | "loaned"
}

export function BookFilters() {
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("all")
  const [status, setStatus] = useState<string>("all")
  const [sort, setSort] = useState<string>("recent")
  const [books, setBooks] = useState<Book[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      try {
        const result = await getFilteredBooks({ query: search, category, status, sort })
        setBooks(result || [])
      } catch (error) {
        console.error("Error fetching books:", error)
        setBooks([])
      }
    })
  }, [search, category, status, sort])

  const handleClearFilters = () => {
    setSearch("")
    setCategory("all")
    setStatus("all")
    setSort("recent")
  }

  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg p-4 mb-6 space-y-4">
      {/* Header with Clear Filters */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-100">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-gray-400 hover:text-black"
          onClick={handleClearFilters}
        >
          <X className="h-4 w-4 mr-1" />
          Clear filters
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-gray-900/50 border-gray-700 text-gray-100"
          />
        </div>

        {/* Category Filter */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="fiction">Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="science-fiction">Science Fiction</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="loaned">Loaned</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="bg-gray-900/50 border-gray-700 text-gray-100">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
            <SelectItem value="title_asc">Title (A-Z)</SelectItem>
            <SelectItem value="title_desc">Title (Z-A)</SelectItem>
            <SelectItem value="author_asc">Author (A-Z)</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading Indicator */}
      {isPending && <p className="text-sm text-gray-400 mt-4">Loading books...</p>}

      {/* Book List */}
      <div className="mt-4 space-y-2">
        {books.length === 0 && !isPending ? (
          <p className="text-gray-400 text-sm">No books found.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="text-gray-200">
              {book.title} <span className="text-gray-400">by {book.author}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
