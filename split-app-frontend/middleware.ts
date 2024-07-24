import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasCookie } from "cookies-next";

const protectedRoutes = ["/welcome"];
const authRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const isAuthenticated = hasCookie("user-id", { req });

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isAuthenticated && authRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
