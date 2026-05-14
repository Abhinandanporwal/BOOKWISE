import { NextResponse } from 'next/server';
import { createUserIfNotExists } from '@/actions/createuser';

export async function POST() {
  try {
    await createUserIfNotExists();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Create user error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
