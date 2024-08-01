import {NextResponse} from "next/server";

export async function POST() {
  const response = NextResponse.json(
    {
      msg: "Logout successful",
    },
    {status: 200},
  );

  response.cookies.delete("session");

  return response;
}
