import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optional site-wide maintenance switch (dormant / OFF by default).
 *
 * The home page itself now renders the maintenance screen directly (see
 * `app/page.tsx`), so no hosting configuration is required to show it. This
 * proxy is kept only as an optional way to take EVERY route into maintenance
 * at once: set `MAINTENANCE_MODE=true` in your hosting dashboard to enable it.
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
