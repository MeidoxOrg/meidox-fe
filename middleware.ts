import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { REFRESH_TOKEN_ERROR } from "./utils/constants";

const protectedPaths = [
  "/home",
  "/work-start",
  "/normal-production/setup-start",
  "/normal-production/setup-progress",
  "/production-start",
  "/production-start-progress",
  "/daily-summary",
  "/introduction",
];
const authPages = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token?.error === REFRESH_TOKEN_ERROR) {
    const csrfTokenValue =
      req.cookies.get("next-auth.csrf-token")?.value?.split("|")[0] ??
      req.cookies.get("__Host-next-auth.csrf-token")?.value?.split("|")[0] ??
      "";
    const html = `
      <html>
        <body>
          <form method="POST" action="${process.env.NEXTAUTH_URL}/api/auth/signout">
            <input type="hidden" name="callbackUrl" value="/login" />
            <input type="hidden" name="csrfToken" value="${csrfTokenValue}" />
          </form>
          <script>document.forms[0].submit();</script>
        </body>
      </html>
    `;
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/introduction", req.url));
  }

  if (authPages.some((p) => pathname.startsWith(p)) && token) {
    return NextResponse.redirect(new URL("/introduction", req.url));
  }

  if (protectedPaths.some((p) => pathname.startsWith(p)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
