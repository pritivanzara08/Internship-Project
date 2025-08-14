import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'dev-secret';
const COOKIE_NAME = (process.env.JWT_COOKIE_NAME || 'token') as string;

export function parseTokenFromCookies(req: NextRequest) {
const cookie = req.headers.get('cookie') || '';
const tokenMatch = cookie.split(`${COOKIE_NAME}=`)[1];
if (!tokenMatch) return null;
try {
const decoded = jwt.verify(tokenMatch, SECRET);
return decoded as { userId: string; role: string };
} catch {
return null;
}
}

export function isAdmin(req: NextRequest): boolean {
const payload = parseTokenFromCookies(req);
return !!payload && payload.role === 'admin';
}

export function middleware(req: NextRequest) {
// Protect /admin routes
const { pathname } = req.nextUrl;
if (pathname.startsWith('/admin')) {
const payload = parseTokenFromCookies(req);
if (!payload || payload.role !== 'admin') {
// Redirect to login or show 403
const url = req.nextUrl.clone();
url.pathname = '/login';
return NextResponse.redirect(url);
}
}
// Allow other routes
return NextResponse.next();
}

export const config = {
matcher: ['/admin/:path*'], // adjust if you want to guard more routes
};