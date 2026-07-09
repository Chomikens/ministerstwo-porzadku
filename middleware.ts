import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { enPublicToInternal } from "@/lib/i18n"

function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vercel.live https://vitals.vercel-insights.com https://*.sanity.io wss://*.sanity.io https://*.sanity.network",
      "frame-src 'self' https://vercel.live https://www.youtube.com https://player.vimeo.com",
      "media-src 'self' https: data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Sanity Studio: relaxed headers, no locale handling
  if (pathname.startsWith("/studio")) {
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    return response
  }

  const isEn = pathname === "/en" || pathname.startsWith("/en/")
  const locale = isEn ? "en" : "pl"

  // Internal (PL-form) locale-agnostic path used by the physical routes.
  const enPublicPath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname
  const internalPath = isEn ? enPublicToInternal(enPublicPath) : pathname

  // Propagate locale + internal base path to server components / metadata.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-language", locale)
  requestHeaders.set("x-pathname", internalPath)

  let response: NextResponse
  if (isEn) {
    const url = request.nextUrl.clone()
    url.pathname = internalPath
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } })
  }

  applySecurityHeaders(response)
  return response
}

export const config = {
  matcher: ["/((?!_next|favicon|.*\\.(?:jpg|jpeg|png|gif|webp|avif|ico|svg|css|js|woff|woff2)).*)"],
}
