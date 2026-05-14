import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"
import csv from "csv-parser"

const prisma = new PrismaClient()

// Define a type for the CSV row based on your actual CSV structure
interface BookRow {
  title: string
  author: string
  rating?: string
  isbn?: string
  isbn13?: string
  language?: string
  pages?: string
  ratings_count?: string
  reviews_count?: string
  publication_date?: string
  publisher?: string
}

// Seed the users first
const users = [
  { email: "user1@example.com", name: "User One" },
  { email: "user2@example.com", name: "User Two" },
  // Add more users as needed
]

// Predefined list of genres
const genres = [
  "Fiction",
  "Non-Fiction",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Biography",
  "Romance",
  "Historical",
  "Thriller",
  "Self-Help",
]

async function seedUsers() {
  console.log("Seeding users...")
  return Promise.all(
    users.map(async (user) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      })
      if (!existingUser) {
        return prisma.user.create({
          data: user,
        })
      }
      return existingUser
    }),
  )
}

async function main() {
  try {
    // Seed the users
    const seededUsers = await seedUsers()
    console.log(`Seeded ${seededUsers.length} users`)

    // Check if books.csv exists
    const csvPath = path.join(process.cwd(), "books.csv")
    if (!fs.existsSync(csvPath)) {
      console.error(`CSV file not found at ${csvPath}`)
      return
    }

    // Create a list to hold book data
    const books: any[] = []

    // Read and process the CSV file
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(
          csv({
            headers: [
              "bookno",
              "title",
              "author",
              "isbn",
              "isbn13",
              "language",
              "pages",
              "ratings_count",
              "reviews_count",
              "publication_date",
              "publisher",
            ],
            skipLines: 1,
          }),
        )
        .on("data", (row: BookRow) => {
          if (row.title && row.author) {
            let publishedYear = null
            if (row.publication_date) {
              const dateMatch = row.publication_date.match(/(\d{4})/)
              if (dateMatch) {
                publishedYear = Number.parseInt(dateMatch[1])
              }
            }

            const genre = genres[Math.floor(Math.random() * genres.length)]
            const isBorrowed = Math.random() > 0.5

            books.push({
              title: row.title.trim(),
              author: row.author.trim(),
              genre: genre,
              publishedYear: publishedYear,
              available: !isBorrowed,
              borrowerId: isBorrowed
                ? seededUsers[Math.floor(Math.random() * seededUsers.length)].id
                : null,
              borrowDate: isBorrowed ? new Date() : null,
              dueDate: isBorrowed
                ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                : null,
            })
          }
        })
        .on("end", () => {
          console.log(`Processed ${books.length} books from CSV`)
          resolve()
        })
        .on("error", (error) => {
          reject(error)
        })
    })

    // Insert the books into the database
    console.log("Inserting books into database...")
    for (let i = 0; i < Math.min(1000, books.length); i++) {
      try {
        await prisma.book.create({
          data: books[i],
        })
        if (i % 10 === 0) {
          console.log(`Inserted ${i + 1} books...`)
        }
      } catch (error) {
        console.error(`Error inserting book ${i}:`, books[i].title)
        console.error(error)
      }
    }

    console.log("Database has been seeded successfully.")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
