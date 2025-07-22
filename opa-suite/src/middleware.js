import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("connect.sid");

  const { pathname } = request.nextUrl;
  const publicPaths = ["/login", "/register"];
  const isPublicRoot = publicPaths.includes(pathname);

  if (isPublicRoot && token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token && (pathname === "/" || pathname === "/conversation")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/conversation", "/login", "/register"],
};
