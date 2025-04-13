"use server"

import { db } from "@/lib/prisma"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function executeQuery(formData: FormData) {
  const userPrompt = formData.get("prompt") as string

  console.log("🧾 Received Prompt:", userPrompt)

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const geminiResponse = await model.generateContent(`
You are a Prisma expert.
Convert the following instruction into a Prisma Client JavaScript query.
Only return the code for the query, no explanation.

⚠️ Rules to follow:
- Use \`findUnique\` **only** if the field being queried is unique (like \`id\` or \`email\`).
- Use \`findFirst\` or \`findMany\` if the field is **not unique** (like \`title\`, \`author\`, \`genre\`, etc.).
- Return a complete Prisma query like \`prisma.book.findMany(...)\`

Instruction: "${userPrompt}"

Available Prisma models:

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  name          String?
  borrowedBooks Book[]
  fines         Fine[]
  createdAt     DateTime @default(now())
}

model Book {
  id            String   @id @default(uuid())
  title         String
  author        String
  genre         String?
  publishedYear Int?
  available     Boolean  @default(true)
  borrowerId    String?
  borrower      User?    @relation(fields: [borrowerId], references: [id])
  borrowDate    DateTime?
  dueDate       DateTime?
}

model Fine {
  id        String   @id @default(uuid())
  amount    Float
  reason    String?
  paid      Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
  `)

  const code = geminiResponse.response.text().trim()
  console.log("🧠 Gemini Output:\n", code)

  if (!code) {
    return {
      success: false,
      error: "❌ Couldn't generate a valid query. Please rephrase your request.",
    }
  }

  try {
    let cleanCode = code
    if (code.includes("```")) {
      const match = code.match(/```(?:typescript|ts|js)?\s*([\s\S]*?)```/)
      if (match && match[1]) cleanCode = match[1].trim()
    }

    cleanCode = cleanCode.replace(/^(db|prisma)\./, "")
    console.log("🧾 Cleaned Query:", cleanCode)

    const queryFunction = new Function(
      "prisma",
      `return (async () => {
        try {
          return await prisma.${cleanCode};
        } catch (error) {
          console.error("❌ Error during Prisma execution:", error);
          throw error;
        }
      })();`
    )

    const result = await queryFunction(db)
    console.log("📦 Final result returned to UI:\n", result)

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return {
        success: false,
        error: "⚠️ No results found in the database.",
      }
    }

    // ✅ Format Gemini response using raw object, NOT JSON.stringify
    const readableData = Array.isArray(result)
      ? result.map((item) => JSON.stringify(item, null, 2)).join("\n")
      : JSON.stringify(result, null, 2)

    const reformattedResponse = await model.generateContent(`
You're a helpful assistant. Convert the following data into a clear, user-friendly Markdown message. Use **bold**, bullet points, and \`code\` where appropriate:

${readableData}
    `)

    const finalAnswer = reformattedResponse.response.text().trim()

    return {
      success: true,
      query: cleanCode,
      result: finalAnswer,
    }
  } catch (err: any) {
    console.error("🔥 Runtime error:", err)
    return {
      success: false,
      error: `❌ Error executing the query: ${err.message}`,
      generated: code,
    }
  }
}
