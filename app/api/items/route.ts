import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; 

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const items = await prisma.item.findMany({
    where: { userId }, 
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Inte inloggad", { status: 401 });
  }

  const { name, data } = await req.json();
  const newItem = await prisma.item.create({
    data: { name, data, userId },
  });

  return NextResponse.json(newItem);
}