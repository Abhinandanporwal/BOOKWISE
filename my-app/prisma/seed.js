import { PrismaClient } from '@prisma/client';
import books from './books.json'; // JSON array of book data

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany(); // Optional: clear existing data

  for (const book of books) {
    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedYear: book.publishedYear,
        available: true, // Set to false and add borrower info if needed
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
