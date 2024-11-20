import prisma from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";
import {FriendShipStatus} from "@prisma/client";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    const dbUser = await prisma.user.findUnique({
      where: {email: user.emailAddresses[0].emailAddress},
    });

    const friendships = await prisma.friendShip.findMany({
      where: {
        accepterId: dbUser.id,
        status: FriendShipStatus.PENDING,
      },
      include: {
        request: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(friendships, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Failed to fetch friend requests"}, {status: 500});
  }
}
