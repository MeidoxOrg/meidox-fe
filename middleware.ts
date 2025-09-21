import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/identity/home"];
const authPages = ["/identity/login", "/identity/register", "/identity/enable-2fa"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (authPages.some(p => pathname.startsWith(p)) && token) {
    return NextResponse.redirect(new URL("/identity/home", req.url));
  }

  if (protectedPaths.some(p => pathname.startsWith(p)) && !token) {
    return NextResponse.redirect(new URL("/identity/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
