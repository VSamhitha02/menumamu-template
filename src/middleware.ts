import { NextRequest, NextResponse } from "next/server";
 
export function middleware(req: NextRequest) {
  const token = req.cookies.get("payload-token");
 
  const pathname = req.nextUrl.pathname;
 
  // Routes that never require auth
  const publicRoutes = [
    "/login",
    "/admin",
    "/api",
    "/_next",
  ];
 
  const isExplicitPublic = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
 
  // Only gate specific protected areas (e.g. a dashboard),
  // everything else — including all restaurant/menu pages — is public.
  const protectedRoutes = [
    "/dashboard",
    // add other genuinely private routes here
  ];
 
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
 
  if (isExplicitPublic || !isProtected) {
    return NextResponse.next();
  }
 
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}
 
export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};