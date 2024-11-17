import prisma from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    const {email} = await request.json();

    if (user.emailAddresses[0].emailAddress !== email) {
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
