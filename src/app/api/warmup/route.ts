import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "warm" });
  } catch (error) {
    console.error("DB warmup failed:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}