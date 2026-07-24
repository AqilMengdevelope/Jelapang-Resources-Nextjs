import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const DEFAULT_PATHS = [
  "/",
  "/about",
  "/services",
  "/military",
  "/railway",
  "/it",
  "/contact",
  "/activities",
  "/projects",
];

function normalizePath(path: unknown): string | null {
  if (typeof path !== "string" || !path.startsWith("/")) {
    return null;
  }

  if (path.includes("://") || path.includes("..")) {
    return null;
  }

  return path;
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured" }, { status: 500 });
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { paths?: unknown[] } | null;
  const requestedPaths = Array.isArray(body?.paths)
    ? body.paths.map(normalizePath).filter((path): path is string => Boolean(path))
    : [];
  const paths = Array.from(new Set([...DEFAULT_PATHS, ...requestedPaths]));

  revalidateTag("wordpress", "max");
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}
