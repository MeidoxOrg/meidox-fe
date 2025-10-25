import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/home", "/work-start"];
const authPages = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/work-start", req.url));
  }

  if (authPages.some((p) => pathname.startsWith(p)) && token) {
    return NextResponse.redirect(new URL("/work-start", req.url));
  }

  if (protectedPaths.some((p) => pathname.startsWith(p)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
