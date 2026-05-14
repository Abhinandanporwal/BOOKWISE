'use server';

import { currentUser } from '@clerk/nextjs/server';
import { db } from '../lib/prisma'; 

export async function createUserIfNotExists() {
  const user = await currentUser();
  if (!user) return;

  const email = user.emailAddresses?.[0]?.emailAddress;
  if (!email) return;

  // Check if user already exists in DB
  const existing = await db.user.findUnique({
    where: { email },
  });

  if (existing) return;

  // Create new user
  await db.user.create({
    data: {
      id: user.id,
      email,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || "Unnamed User",
    },
  });
}
