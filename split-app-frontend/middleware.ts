import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const protectedRoutes = new Set(["/welcome", "/user"]);
const authRoutes = new Set(["/login", "/signup"]);

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = cookies().get("session")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token && protectedRoutes.has(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  try {
    await jwtVerify(token, SECRET_KEY);
    if (authRoutes.has(pathname)) {
      return NextResponse.redirect(new URL("/user", req.nextUrl));
    }
  } catch (err) {
    if (protectedRoutes.has(pathname))
      return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
