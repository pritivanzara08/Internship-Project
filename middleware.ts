import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || "token";

// helper: decode token from cookies
export function parseToken(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}

// helper: check if request is from admin
export function isAdmin(req: NextRequest): boolean {
  const payload = parseToken(req);
  return !!payload && payload.role === "admin";
}

// middleware to guard /admin routes
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!isAdmin(req)) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // applies only to admin routes
};
