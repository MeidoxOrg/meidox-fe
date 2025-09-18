import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/ai-speaking"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const kcCookie = req.cookies.get("keycloak.cookie");
  if(!kcCookie){
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/account/login?redirectUri=${process.env.NEXT_PUBLIC_URL}/ai-speaking`)
  }

  return NextResponse.next();
}