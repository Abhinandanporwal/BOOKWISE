import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ message: "Invalid password" }, { status: 401 })
}
