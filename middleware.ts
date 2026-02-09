import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const CSP_POLICY = [
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
].join("; ")

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // Skip CSP entirely for Sanity Studio - it needs full access to CDN, APIs, etc.
  if (pathname.startsWith("/studio")) {
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    return response
  }

  // Apply strict CSP for all other routes
  response.headers.set("Content-Security-Policy", CSP_POLICY)
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon|.*\\.(?:jpg|jpeg|png|gif|webp|avif|ico|svg|css|js|woff|woff2)).*)",
  ],
}
