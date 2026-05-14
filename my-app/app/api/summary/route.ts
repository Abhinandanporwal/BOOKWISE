import { NextResponse } from "next/server"
import { db } from "@/lib/prisma" // adjust the path to your prisma instance

export async function GET() {
  try {
    const [userCount, bookCount,borrowedBooks, unpaidFines] = await Promise.all([
      db.user.count(),
      db.book.count(),
      db.book.count({
        where:{
            available:false,
        }
      }),
      db.fine.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          paid: false,
        },
      }),
    ])

    return NextResponse.json({
      users: userCount,
      books: bookCount,
      avail:borrowedBooks,
      fines: unpaidFines._sum.amount || 0,
    })
  } catch (error) {
    console.error("Error fetching summary:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
