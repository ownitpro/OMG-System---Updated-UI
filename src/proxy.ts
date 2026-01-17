import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Role } from "./generated/prisma";

export default auth((req) => {
  const token = req.auth;
  const path = req.nextUrl.pathname;

  // Redirect unauthenticated users from protected routes
  if (!token && (path.startsWith("/dashboard") || path.startsWith("/admin") || path.startsWith("/portal"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Enforce RBAC for /dashboard routes (CLIENT role)
  if (path.startsWith("/dashboard")) {
    const userRole = (token as any)?.role as Role;
    if (!userRole || userRole === Role.VENDOR) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Enforce RBAC for /admin routes (ADMIN, STAFF, OWNER roles)
  if (path.startsWith("/admin")) {
    const userRole = (token as any)?.role as Role;
    if (!userRole || ![Role.ADMIN, Role.STAFF, Role.OWNER].includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/portal/:path*", "/login"],
};
