import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"
import { getSessionCookie } from "better-auth/cookies"

import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const sessionCookie = getSessionCookie(request)

  // Remove the locale from the pathname.
  // Example: /en/dashboard → /dashboard
  const pathnameWithoutLocale =
    "/" + pathname.split("/").slice(2).join("/")

  const isDashboard = pathnameWithoutLocale === "/dashboard"
  const isLogin = pathnameWithoutLocale === "/login"

  // Not authenticated → cannot access dashboard
  if (isDashboard && !sessionCookie) {
    const loginUrl = new URL(
      `/${pathname.split("/")[1]}/login`,
      request.url
    )

    return NextResponse.redirect(loginUrl)
  }

  // Already authenticated → don't show login again
  if (isLogin && sessionCookie) {
    const dashboardUrl = new URL(
      `/${pathname.split("/")[1]}/dashboard`,
      request.url
    )

    return NextResponse.redirect(dashboardUrl)
  }

  // Let next-intl handle locale routing
  return intlMiddleware(request)
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}