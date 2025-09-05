import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const files = await prisma.file.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ files });
}