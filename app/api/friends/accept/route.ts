import prisma from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";
import {FriendShipStatus} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    const {id} = await request.json();

    const update = await prisma.friendShip.update({
      where: {
        id: id,
      },
      data: {
        status: FriendShipStatus.ACCEPTED,
      },
    });

    return NextResponse.json(update, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Failed to fetch friend requests"}, {status: 500});
  }
}
