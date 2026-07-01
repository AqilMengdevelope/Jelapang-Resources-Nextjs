import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Maintenance-mode switch.
 *
 * ON by default — every visitor is served the maintenance page with a 503
 * status. To bring the full site back online, set the environment variable
 * `MAINTENANCE_MODE=false` in your hosting dashboard and redeploy / restart
 * (or revert this commit). Any other value — including unset — keeps the
 * site in maintenance mode.
 */
export function proxy(request: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE !== "false";
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
