// app/api/fines/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const fines = await db.fine.findMany({
      include: {
        user: true, // Include associated user details
      },
    });

    return NextResponse.json(fines, { status: 200 });
  } catch (error) {
    console.error("[API: /api/fines] Error fetching fines:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
