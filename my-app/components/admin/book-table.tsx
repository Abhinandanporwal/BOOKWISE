"use client"

import { useEffect, useState } from "react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  MoreHorizontal, Edit, Trash, BookOpen, Download,
} from "lucide-react"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
type Book = {
  id: string
  title: string
  author: string
  genre?: string
  publishedYear?: number
  available: boolean
  borrowerId?: string
  borrowDate?: string
  dueDate?: string
}

export function BooksTable() {
  const router = useRouter();

  const handleadd = () => {
    router.push("books/addbook");
  };
  const commingsoon = () => {
    router.push("comingsoon")
  }
  
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBooks, setSelectedBooks] = useState<string[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books")
        const data = await res.json()
        if (Array.isArray(data)) {
          setBooks(data)
        } else {
          console.error("Unexpected data format", data)
          setBooks([])
        }
      } catch (err) {
        console.error("Failed to fetch books", err)
        setBooks([])
      }
    }
  
    fetchBooks()
  }, [])
  

  const toggleSelectBook = (id: string) => {
    setSelectedBooks((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([])
    } else {
      setSelectedBooks(books.map((book) => book.id))
    }
  }


  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
        <h3 className="font-medium text-gray-100">Book Collection</h3>
        <div className="flex space-x-2">
          {selectedBooks.length > 0 && (
            <Button variant="destructive" size="sm">
              <Trash className="h-4 w-4 mr-1" />
              Delete ({selectedBooks.length})
            </Button>
          )}
          <Button variant="outline" size="sm" className=" text-black">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleadd}>

            Add Book
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700/50 hover:bg-gray-800/50">
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedBooks.length === books.length && books.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                />
              </TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Borrowed On</TableHead>
              <TableHead>Due</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} className="border-gray-700/50 hover:bg-gray-800/50">
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book.id)}
                    onChange={() => toggleSelectBook(book.id)}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-700 rounded-md h-10 w-10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">{book.title}</p>
                      <p className="text-xs text-gray-400">{book.author}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{book.genre ?? "-"}</TableCell>
                <TableCell>{book.publishedYear ?? "-"}</TableCell>
                <TableCell>
                  <Badge variant={book.available ? "success" : "warning"}>
                    {book.available ? "available" : "loaned"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {book.borrowDate ? format(new Date(book.borrowDate), "dd MMM yyyy") : "-"}
                </TableCell>
                <TableCell>
                  {book.dueDate ? format(new Date(book.dueDate), "dd MMM yyyy") : "-"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40" onClick={commingsoon}>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500" onClick={commingsoon}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
