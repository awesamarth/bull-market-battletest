import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../prisma/client";

export async function POST(req: NextRequest, res: NextResponse) {
  const request = await req.json();

  const level = request.level;
  const address = request.walletAddress

  console.log(level)
  console.log(address)

  const user = await prisma.user.update({
    where: {
      walletAddress: address,
    },
    data:{
        level:level
    }
  });

  if (!user) {
    console.log("doesn't exist");
    await prisma.user.create({
      data: {
        walletAddress: address,
        level: 0,
      },
    });
  }

  const response = Response.json({ result: "done" });

  return response;
}
