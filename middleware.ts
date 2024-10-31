// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Check if the user is authenticated
    const isAuth = req.nextauth.token;

    // Redirect to home if not authenticated and trying to access a protected route
    if (!isAuth && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow access if authenticated or if accessing a public route
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Allow middleware to handle authorization
    },
  }
);
