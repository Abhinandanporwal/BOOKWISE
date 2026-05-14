"use server"

import { db } from "@/lib/prisma"

interface FilterParams {
  query: string
  category: string
  status: string
  sort: string
}

export async function getFilteredBooks({ query, category, status, sort }: FilterParams) {
  const whereClause: any = {}

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { author: { contains: query, mode: "insensitive" } },
    ]
  }

  if (category !== "all") {
    whereClause.genre = category
  }

  if (status !== "all") {
    whereClause.available = status === "available"
  }

  let orderByClause: any = {}
  switch (sort) {
    case "title_asc":
      orderByClause = { title: "asc" }
      break
    case "title_desc":
      orderByClause = { title: "desc" }
      break
    case "author_asc":
      orderByClause = { author: "asc" }
      break
    case "recent":
    default:
      orderByClause = { id: "desc" } // fallback to latest inserted (assuming `id` is auto-increment)
      break
  }

  const books = await db.book.findMany({
    where: whereClause,
    orderBy: orderByClause,
    take: 100,
  })

  return books
}
