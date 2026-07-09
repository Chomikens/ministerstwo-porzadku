import { getRequestLocale } from "./i18n-server"

/**
 * Server-side current language. Now derived from the URL (via the middleware
 * `x-language` header) instead of a cookie, so each locale has a distinct,
 * crawlable URL.
 */
export async function getLanguage(): Promise<"pl" | "en"> {
  return getRequestLocale()
}
