// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma' 
// Handle GET requests
export async function GET() {
  try {
   
    const users = await db.user.findMany({
      include: {
        fines: true, 
      },
    })
    
    return NextResponse.json(users) // Respond with the fetched users and their fines
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
