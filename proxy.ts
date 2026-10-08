import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

// Issue the private browser session before the planner or its API is reached.
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();

  const id = crypto.randomUUID();
  // Expose the new cookie to this same request so the first visit works.
  request.cookies.set(SESSION_COOKIE, id);
  const response = NextResponse.next({ request: { headers: request.headers } });
  response.cookies.set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  });
  return response;
}

export const config = {
  matcher: ["/plan", "/api/plan", "/api/seating", "/api/share"],
};
