import { NextRequest, NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // If on a protected route and not authenticated, redirect to login
  if (isProtectedRoute && !request.cookies.has("next-auth.session-token")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Continue to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // Trigger middleware only for these paths
};
