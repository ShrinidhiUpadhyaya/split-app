import prisma from "@/lib/db";
import {NextResponse, type NextRequest} from "next/server";

interface RouteParams {
  params: {
    userId: string;
  };
}

export async function PUT(request: NextRequest, {params}: RouteParams) {
  const {avatar} = await request.json();
  const {userId} = params;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        avatar: avatar,
      },
    });

    return NextResponse.json(updatedUser, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Failed to update avatar"}, {status: 500});
  }
}
