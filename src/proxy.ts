import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./generated/prisma";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function proxy(req: NextRequest & { nextauth: { token: any } }) {
    const token = req.nextauth?.token;
    const path = req.nextUrl.pathname;

    // Redirect unauthenticated users from protected routes
    if (!token && (path.startsWith("/dashboard") || path.startsWith("/admin"))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Enforce RBAC for /dashboard routes (CLIENT role)
    if (path.startsWith("/dashboard")) {
      const userRole = token?.role as Role;
      if (!userRole || userRole === Role.VENDOR) { // Only CLIENT, STAFF, ADMIN, OWNER can access dashboard
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Enforce RBAC for /admin routes (ADMIN, STAFF, OWNER roles)
    if (path.startsWith("/admin")) {
      const userRole = token?.role as Role;
      if (!userRole || ![Role.ADMIN, Role.STAFF, Role.OWNER].includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow authenticated users
    },
    pages: {
      signIn: "/login", // Redirect to custom login page
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

