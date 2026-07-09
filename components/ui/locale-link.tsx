"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { localeFromPathname, localizedPath } from "@/lib/i18n"

type NextLinkProps = ComponentProps<typeof NextLink>

/**
 * Drop-in replacement for next/link that localizes internal hrefs.
 * Authors write locale-agnostic Polish paths (e.g. "/uslugi/konsultacja-online",
 * "/blog", "/#services"); on the English tree these become
 * "/en/services/online-consultation", "/en/blog", "/en#services".
 * External links, pure hashes, and UrlObject hrefs are passed through untouched.
 */
export default function LocaleLink({ href, ...props }: NextLinkProps) {
  const pathname = usePathname() || "/"
  const locale = localeFromPathname(pathname)

  const localizedHref = typeof href === "string" ? localize(href, locale) : href

  return <NextLink href={localizedHref} {...props} />
}

function localize(href: string, locale: "pl" | "en"): string {
  // Only internal absolute paths are localized.
  if (!href.startsWith("/")) return href
  if (locale === "pl") return href

  // Split off hash / query so only the path portion is translated.
  const hashIndex = href.search(/[#?]/)
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex)
  const suffix = hashIndex === -1 ? "" : href.slice(hashIndex)

  const basePath = path === "" ? "/" : path
  return localizedPath(basePath, locale) + suffix
}
