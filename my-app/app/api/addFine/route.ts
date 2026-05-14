import { db } from "@/lib/prisma"
import { NextResponse } from "next/server"

// Named export for POST method
export async function POST(request: Request) {
  try {
    // Parse JSON from the request body
    const { fineId, userId, amount, reason } = await request.json()

    // Get the current time and date
    const createdAt = new Date()
    const paid = false

    // Create the fine record in the database
    const newFine = await db.fine.create({
      data: {
        id: fineId,
        amount: Number.parseFloat(amount),
        reason: reason || null,
        paid,
        userId,
        createdAt,
      },
    })

    return NextResponse.json({ message: "Fine added successfully", fine: newFine }, { status: 201 })
  } catch (error) {
    console.error("Error adding fine:", error)
    return NextResponse.json(
      { message: "Failed to add fine. Please try again.", error: String(error) },
      { status: 500 },
    )
  }
}

// Named export for GET method to fetch all fines
export async function GET() {
  try {
    const fines = await db.fine.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(fines)
  } catch (error) {
    console.error("Error fetching fines:", error)
    return NextResponse.json({ message: "Failed to fetch fines." }, { status: 500 })
  }
}
