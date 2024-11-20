import prisma from "@/lib/db";
import {currentUser} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({error: "User not found"}, {status: 404});
    }

    const profile = await prisma.user.findUnique({where: {userId: user.id}});

    if (profile) return NextResponse.json({profile, newUser: false}, {status: 200});

    const newProfile = await prisma.user.create({
      data: {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName}  ${user.lastName}`,
      },
    });

    return NextResponse.json({profile: newProfile, newUser: true}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Failed to fetch users"}, {status: 500});
  }
}
