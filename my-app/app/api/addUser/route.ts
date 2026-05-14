import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Named export for POST method
export async function POST(request: Request) {
  try {
    const { id, name, email } = await request.json(); // Parse JSON from the request body
    
    // Get the current time and date
    const createdAt = new Date();

    const newUser = await db.user.create({
      data: {
        id,
        name,
        email,
        createdAt,
      },
    });

    return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 200 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ message: "Failed to add user. Please try again." }, { status: 500 });
  }
}
