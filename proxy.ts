import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Site-wide maintenance switch — OFF by default.
 *
 * Set `MAINTENANCE_MODE=true` in `.env.local` (or hosting env) to serve the
 * maintenance page on every route. Any other value, or leaving it unset, keeps
 * the full site online. Preview the page anytime at `/maintenance`.
 */
export function proxy(request: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  // Let everything through when maintenance is off, or when the request is
  // already for the maintenance page itself.
  if (!maintenance || pathname.startsWith("/maintenance")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url, { status: 503 });
}

export const config = {
  // Run on all page routes, but skip Next internals, API routes and any
  // request for a static file (anything with a dot / file extension, which
  // covers every asset in /public).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
