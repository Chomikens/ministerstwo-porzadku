// Pure, client-safe i18n helpers (NO next/headers import — usable in client components).
// Server-only request helpers live in `lib/i18n-server.ts`.

export type Locale = "pl" | "en"

export const LOCALES: Locale[] = ["pl", "en"]
export const DEFAULT_LOCALE: Locale = "pl"
export const BASE_URL = "https://ministerstwoporzadku.pl"

export const OG_LOCALE: Record<Locale, string> = { pl: "pl_PL", en: "en_US" }
export const HREFLANG: Record<Locale, string> = { pl: "pl-PL", en: "en-US" }

// --- Localized path segments -------------------------------------------------
// Internal routes are Polish (app/uslugi, app/blog/kategoria). The English tree
// is served under /en with translated segments and translated service slugs.

// First-level segment: internal(PL) -> english public
const SEGMENT_PL_TO_EN: Record<string, string> = { uslugi: "services", kategoria: "category" }
const SEGMENT_EN_TO_PL: Record<string, string> = { services: "uslugi", category: "kategoria" }

// Service slug: internal(PL) <-> english public
export const SERVICE_SLUG_PL_TO_EN: Record<string, string> = {
  "projektowa-organizacja-przestrzeni": "space-organization-design",
  "decluttering-i-organizacja-przestrzeni": "decluttering-and-organization",
  "wsparcie-w-przeprowadzce": "moving-support",
  "konsultacja-online": "online-consultation",
}
const SERVICE_SLUG_EN_TO_PL: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_SLUG_PL_TO_EN).map(([pl, en]) => [en, pl]),
)

/** Detect whether a browser pathname belongs to the English tree. */
export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pl"
}

/**
 * Translate a public English path (already stripped of the `/en` prefix) into the
 * internal Polish route, e.g. "/services/online-consultation" -> "/uslugi/konsultacja-online".
 */
export function enPublicToInternal(path: string): string {
  const parts = path.split("/").filter(Boolean) // e.g. ["services","online-consultation"]
  if (parts.length === 0) return "/"

  // /services/<slug> -> /uslugi/<pl-slug>
  if (parts[0] === "services") {
    const plSlug = parts[1] ? SERVICE_SLUG_EN_TO_PL[parts[1]] ?? parts[1] : undefined
    return "/" + ["uslugi", ...(plSlug ? [plSlug] : [])].join("/")
  }
  // /blog/category/<slug> -> /blog/kategoria/<slug>
  if (parts[0] === "blog" && parts[1] === "category") {
    return "/" + ["blog", "kategoria", ...parts.slice(2)].join("/")
  }
  return "/" + parts.join("/")
}

/**
 * Translate an internal Polish base path into a public path for the given locale.
 * PL is identity; EN translates segments/slugs and prefixes `/en`.
 * e.g. ("/uslugi/konsultacja-online", "en") -> "/en/services/online-consultation".
 */
export function localizedPath(basePath: string, locale: Locale): string {
  if (locale === "pl") return basePath || "/"

  const parts = basePath.split("/").filter(Boolean)
  const translated = parts.map((seg, i) => {
    if (i === 0 && SEGMENT_PL_TO_EN[seg]) return SEGMENT_PL_TO_EN[seg]
    if (i === 1 && parts[0] === "blog" && SEGMENT_PL_TO_EN[seg]) return SEGMENT_PL_TO_EN[seg]
    if (i === 1 && parts[0] === "uslugi" && SERVICE_SLUG_PL_TO_EN[seg]) return SERVICE_SLUG_PL_TO_EN[seg]
    return seg
  })
  return "/en" + (translated.length ? "/" + translated.join("/") : "")
}

/** True for blog article/category paths, where cross-language slugs are content-native (Sanity) and not auto-derivable. */
export function isBlogContentPath(basePath: string): boolean {
  return /^\/blog\/(?!$)/.test(basePath) // /blog/<slug> or /blog/kategoria/<slug>, but not /blog itself
}

/**
 * Build Next.js `alternates` metadata for an internal base path.
 * For blog content paths the PL/EN slugs differ per document, so we emit a
 * self-referencing canonical only (no misleading cross-language pair).
 */
export function buildAlternates(basePath: string, locale: Locale) {
  const selfUrl = `${BASE_URL}${localizedPath(basePath, locale)}`

  if (isBlogContentPath(basePath)) {
    return { canonical: selfUrl }
  }

  const plUrl = `${BASE_URL}${localizedPath(basePath, "pl")}`
  const enUrl = `${BASE_URL}${localizedPath(basePath, "en")}`
  return {
    canonical: selfUrl,
    languages: {
      "pl-PL": plUrl,
      "en-US": enUrl,
      "x-default": plUrl,
    },
  }
}
