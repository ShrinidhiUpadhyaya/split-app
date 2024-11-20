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

    const {email} = await request.json();

    if (user.emailAddresses[0].emailAddress === email) {
      return NextResponse.json(
        {
          error: "You can't add yourself",
        },
        {status: 400},
      );
    }

    const friend = await prisma.user.findUnique({where: {email: email}});

    if (!friend) {
      return NextResponse.json(
        {
          error: "Email not found",
        },
        {status: 400},
      );
    }

    const requester = await prisma.user.findUnique({
      where: {email: user.emailAddresses[0].emailAddress},
    });

    if (!requester) {
      return NextResponse.json({error: "Requester details not found"}, {status: 404});
    }

    const {id: requesterId} = requester;
    const {id: friendId} = friend;

    const existingFriendship = await prisma.friendShip.findFirst({
      where: {
        requesterId,
        accepterId: friendId,
        status: {
          in: [FriendShipStatus.ACCEPTED, FriendShipStatus.PENDING, FriendShipStatus.BLOCKED],
        },
      },
    });

    if (existingFriendship) {
      const statusMessage = {
        [FriendShipStatus.ACCEPTED]: "Friendship already exists",
        [FriendShipStatus.PENDING]: "Friend request already sent",
        [FriendShipStatus.BLOCKED]: "Cannot send request",
      };

      return NextResponse.json({error: statusMessage[existingFriendship.status]}, {status: 400});
    }

    await prisma.friendShip.create({
      data: {
        requesterId: requester.id,
        accepterId: friend.id,
      },
    });

    return NextResponse.json(
      {
        message: "Friend request sent",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Add friends error", error);
    return NextResponse.json(
      {error: error.message},
      {
        status: 400,
      },
    );
  }
}
