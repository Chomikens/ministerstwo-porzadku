"use client"

export type CookieConsent = {
  necessary: boolean // Always true
  functional: boolean
  analytics: boolean
  timestamp: number
}

const COOKIE_NAME = "cookie-consent"
const COOKIE_EXPIRY_DAYS = 365

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null

  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`))

  if (!cookie) return null

  try {
    const value = cookie.split("=")[1]
    return JSON.parse(decodeURIComponent(value))
  } catch {
    return null
  }
}

export function setCookieConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return

  const value = encodeURIComponent(JSON.stringify(consent))
  const expires = new Date()
  expires.setDate(expires.getDate() + COOKIE_EXPIRY_DAYS)

  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export function hasConsent(): boolean {
  return getCookieConsent() !== null
}

export function acceptAllCookies(): void {
  setCookieConsent({
    necessary: true,
    functional: true,
    analytics: true,
    timestamp: Date.now(),
  })
}

export function acceptNecessaryOnly(): void {
  setCookieConsent({
    necessary: true,
    functional: true,
    analytics: false,
    timestamp: Date.now(),
  })
}

export function canUseAnalytics(): boolean {
  const consent = getCookieConsent()
  return consent?.analytics ?? false
}
