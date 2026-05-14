// /api/recent-fines.ts

import { db } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const fines = await db.fine.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: true, // 👈 This line populates user info from DB
      },
    })

    return NextResponse.json(fines)
  } catch (error) {
    console.error("Failed to fetch fines", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
