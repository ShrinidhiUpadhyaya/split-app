import prisma from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";
import {FriendShipStatus} from "@prisma/client";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({error: "User not found"}), {
        status: 404,
      });
    }

    const dbUser = await prisma.user.findUnique({
      where: {email: user.emailAddresses[0].emailAddress},
    });

    const friends = await prisma.friendShip.findMany({
      where: {
        OR: [{requesterId: dbUser?.id}, {accepterId: dbUser?.id}],
        status: FriendShipStatus.ACCEPTED,
      },
      include: {
        request: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(friends, {status: 200});
  } catch (error) {
    console.log("Get friends error", error);
    return NextResponse.json(
      {error: error.message},
      {
        status: 500,
      },
    );
  }
}
