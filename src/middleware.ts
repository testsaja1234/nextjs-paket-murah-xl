import { authRoutes, protectedRoutes } from "@/router/router";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const pacakgeID = request.cookies.get("package_id")?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete("currentUser");
    request.cookies.delete("package_id");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");
    request.cookies.delete("package_id");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (protectedRoutes.includes(request.nextUrl.pathname) && !pacakgeID) {
    return NextResponse.redirect(new URL("/admin/package", request.url));
  }
}
