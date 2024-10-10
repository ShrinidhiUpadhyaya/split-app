import admin from "@/lib/firebase/admin";
import {connectToDB} from "@/lib/mongo";
import jwt from "jsonwebtoken";
import {NextRequest, NextResponse} from "next/server";
import User from "../../../models/User";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
connectToDB();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {token} = body;

  console.log("Token signup", token);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const {uid, email, name, picture} = decodedToken;

    const existingUser = await User.findOne({uid});

    if (existingUser) {
      return NextResponse.json({error: "User exists"}, {status: 409});
    }

    const newUser = new User({uid, email, name, picture});
    const savedUser = await newUser.save();
    const jwtToken = jwt.sign({uid}, JWT_SECRET, {expiresIn: "1h"});

    const response = NextResponse.json(
      {
        name: savedUser.name,
        email: savedUser.email,
        _id: savedUser._id,
      },
      {status: 200},
    );

    response.cookies.set("session", jwtToken, {
      httpOnly: true,
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Signup Error", error);

    return NextResponse.json({error: "Error signing up user"}, {status: 500});
  }
}
