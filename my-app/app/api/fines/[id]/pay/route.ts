// pages/api/fines/[id]/pay.ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const fineId = params.id;

  try {
    await db.fine.update({
      where: { id: fineId },
      data: { paid: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark fine as paid" }, { status: 500 });
  }
}
