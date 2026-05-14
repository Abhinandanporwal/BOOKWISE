"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash, CheckCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

// Fine type definition
interface Fine {
  id: string
  paid: boolean
  amount: number
  user: {
    name: string
    email: string
  }
  reason: string
  createdAt: string
}

// Fetch fines from API
const fetchFines = async (): Promise<Fine[]> => {
  const response = await fetch("/api/fines")
  if (!response.ok) throw new Error("Failed to fetch fines")
  return response.json()
}

export function FinesTable() {
  const router = useRouter()
  const [selectedFines, setSelectedFines] = useState<string[]>([])
  const [fines, setFines] = useState<Fine[]>([])

  useEffect(() => {
    const getFines = async () => {
      try {
        const data = await fetchFines()
        setFines(data)
      } catch (error) {
        console.error("Error fetching fines:", error)
        toast.error("Failed to load fines")
      }
    }
    getFines()
  }, [])

  const handleAddFine = () => router.push("fines/addfine")

  const toggleSelectFine = (id: string) => {
    setSelectedFines((prev) =>
      prev.includes(id) ? prev.filter((fineId) => fineId !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    setSelectedFines(selectedFines.length === fines.length ? [] : fines.map((fine) => fine.id))
  }

  const handleEdit = () => router.push("comingsoon")

  const handleMarkPaid = async (fineId: string) => {
    try {
      const res = await fetch(`/api/fines/${fineId}/pay`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid: true }),
      })

      if (!res.ok) throw new Error("Failed to mark fine as paid")

      setFines((prev) =>
        prev.map((fine) => (fine.id === fineId ? { ...fine, paid: true } : fine))
      )

      toast.success("Fine marked as paid")
      router.refresh()
    } catch (err) {
      console.error("Error marking fine as paid:", err)
      toast.error("Failed to mark fine as paid")
    }
  }

  const FineRow = ({ fine }: { fine: Fine }) => (
    <TableRow className="border-gray-700/50 hover:bg-gray-800/50">
      <TableCell>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
          checked={selectedFines.includes(fine.id)}
          onChange={() => toggleSelectFine(fine.id)}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${fine.user.name.charAt(0)}`} />
            <AvatarFallback>{fine.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-100">{fine.user.name}</p>
            <p className="text-xs text-gray-400">{fine.user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>{fine.reason || "No reason provided"}</TableCell>
      <TableCell className="font-medium">{fine.amount}</TableCell>
      <TableCell>
        <Badge variant={fine.paid ? "success" : "warning"}>
          {fine.paid ? "Paid" : "Pending"}
        </Badge>
      </TableCell>
      <TableCell>{fine.createdAt}</TableCell>
      <TableCell>{fine.createdAt}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            {!fine.paid && (
              <DropdownMenuItem
                className="text-emerald-500"
                onClick={() => handleMarkPaid(fine.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Paid
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-500">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )

  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
        <h3 className="font-medium text-gray-100">Overdue Fines</h3>
        <div className="flex space-x-2">
          {selectedFines.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-600 text-emerald-500 hover:bg-emerald-900/20 hover:text-emerald-400"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark Paid ({selectedFines.length})
              </Button>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-1" />
                Delete ({selectedFines.length})
              </Button>
            </>
          )}
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleAddFine}
          >
            Add Fine
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
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                  checked={selectedFines.length === fines.length && fines.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fines.length > 0 ? (
              fines.map((fine) => <FineRow key={fine.id} fine={fine} />)
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-400 py-4">
                  No fines found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
