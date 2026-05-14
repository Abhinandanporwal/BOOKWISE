"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Edit, Trash, BadgeDollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

type BorrowedBook = {
  id: number
  title: string
}

type Fine = {
  id: number
  amount: number
}

type User = {
  id: number
  name: string
  email: string
  createdAt: string
  borrowedBooks?: BorrowedBook[]
  fines?: Fine[]
}

export function UsersTable() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users")
        if (!response.ok) throw new Error("Failed to fetch users")

        const data: User[] = await response.json()
        setUsers(data)
      } catch (err) {
        console.error("Error fetching users:", err)
      }
    }

    fetchUsers()
  }, [])

  const handleAddUser = () => router.push("/admin/users/adduser")
  const handleComingSoon = () => router.push("/comingsoon")
  const handleAddFine = (userId: number) => router.push(`/admin/fines/addfine?userId=${userId}`)

  const toggleSelectUser = (id: number) =>
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]))

  const toggleSelectAll = () =>
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map((user) => user.id))

  return (
    <div className="bg-gray-800/70 border border-gray-700/50 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
        <h3 className="font-medium text-gray-100">Library Users</h3>
        <div className="flex space-x-2">
          {selectedUsers.length > 0 && (
            <Button variant="destructive" size="sm">
              <Trash className="h-4 w-4 mr-1" />
              Delete ({selectedUsers.length})
            </Button>
          )}
          <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleAddUser}>
            Add User
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
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Books Loaned</TableHead>
              <TableHead>Fines</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-gray-700/50 hover:bg-gray-800/50">
                <TableCell>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?text=${user.name.charAt(0)}`} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(user.createdAt), "dd MMM yyyy")}</TableCell>
                <TableCell>{user.borrowedBooks?.length ?? 0}</TableCell>
                <TableCell>
                  {(user.fines?.reduce((total, fine) => total + fine.amount, 0) ?? 0).toFixed(2)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={handleComingSoon}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-emerald-500" onClick={() => handleAddFine(user.id)}>
                        <BadgeDollarSign className="h-4 w-4 mr-2" />
                        Add Fine
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500" onClick={handleComingSoon}>
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
