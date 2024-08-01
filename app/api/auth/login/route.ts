import {connectToDB} from "@/lib/mongo";
import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";
import User from "../../../models/User";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {uid} = body; // Ensure `uid` is also included in the body

    console.log("uid", uid);

    if (!uid) {
      return NextResponse.json({error: "UID is required"}, {status: 400});
    }

    await connectToDB();

    const existingUser = await User.findOne({uid});

    if (!existingUser) {
      return NextResponse.json({error: "User does not exist"}, {status: 409});
    }

    const jwtToken = jwt.sign({uid}, JWT_SECRET, {expiresIn: "1h"});

    const response = NextResponse.json(
      {
        email: existingUser.email,
        name: existingUser.name,
        _id: existingUser._id,
      },
      {status: 200},
    );

    response.cookies.set("session", jwtToken, {
      httpOnly: true,
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }
}
