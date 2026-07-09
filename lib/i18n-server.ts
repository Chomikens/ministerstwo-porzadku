import { headers } from "next/headers"
import type { Locale } from "./i18n"

/** Current request locale, set by middleware via the `x-language` header. */
export async function getRequestLocale(): Promise<Locale> {
  const h = await headers()
  return h.get("x-language") === "en" ? "en" : "pl"
}

/** Current locale-agnostic (internal, PL-form) pathname, set by middleware via `x-pathname`. */
export async function getBasePathname(): Promise<string> {
  const h = await headers()
  return h.get("x-pathname") || "/"
}
