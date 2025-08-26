import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DASHBOARD_PATH = "/admin/dashboard";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const feSession = req.cookies.get("fe_session");
  const isAuthed = Boolean(feSession?.value);

  // If already authenticated, prevent accessing /login
  if (pathname === "/login" && isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = DASHBOARD_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin") && !isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const nextParam = encodeURIComponent(pathname + (search || ""));
    url.search = `?next=${nextParam}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on all routes except static assets and images
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|public).*)",
  ],
};
