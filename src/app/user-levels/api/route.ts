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

export async function GET(req: NextRequest, res: NextResponse) {
    const request = await req.json();
    console.log("get request hai bosh")
    const level = request.level;
    const address = request.walletAddress
  
    console.log(level)
    console.log(address)
  
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: address,
      },
    });
    
    if(user!.level<level-1){
        return Response.json({result:0});

    }
    else{
        return Response.json({result:1});
    }

  
  }
