// app/api/recent-users/route.ts
import { db } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching recent users:", error)
    return NextResponse.json({ message: "Failed to fetch recent users" }, { status: 500 })
  }
}