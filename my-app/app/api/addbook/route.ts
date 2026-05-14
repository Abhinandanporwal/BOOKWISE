import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Named export for POST method
export async function POST(request: Request) {
  try {
    const {
      title,
      author,
      genre,
      publishedYear,
      available,
      borrowDate,
      dueDate,
    } = await request.json(); // Parse JSON from the request body

    const newBook = await db.book.create({
      data: {
        title,
        author,
        genre,
        publishedYear,
        available,
        borrowDate: borrowDate ? new Date(borrowDate) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json({ message: "Book added successfully", book: newBook }, { status: 200 });
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json({ message: "Failed to add book. Please try again." }, { status: 500 });
  }
}
