# Technical SEO — Findings

**Score: 72/100.** Strong engineering; a few indexing/hreflang gaps.

## What works
- HTTPS enforced; `http→https` and `www→non-www` both **308** permanent redirects.
- Security headers: HSTS (2y), tight CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Server-rendered (`X-Nextjs-Prerender: 1`, `is_spa:false`) — crawlable without JS. Vercel edge cache `HIT`, Brotli.
- Clean `robots.txt` (disallows `/api/`, `/_next/`, `/admin/`) + sitemap reference. Real `404` on unknown URLs. `<html lang="pl">`.

## 🔴 T1 — Service & category pages missing from sitemap (HIGH)
`app/sitemap.ts` lists only `/`, `/blog`, `/polityka-prywatnosci` + blog posts. Live check: all four `/uslugi/{slug}` return **200** (statically generated, `dynamicParams:false`); `/blog/kategoria/porzadki` returns **200**. None are in the sitemap.
**Fix:** import `services` from `lib/services-data` and Sanity categories; append them.

## 🔴 T2 — hreflang en-US → 404 (HIGH)
Rendered: `<link rel="alternate" hrefLang="en-US" href="https://ministerstwoporzadku.pl/en"/>`. `/en` returns **404**. `alternates.languages` in `app/layout.tsx` advertises a non-existent English site.
**Fix:** remove `alternates.languages` until `/en` exists.

## 🟠 T3 — Sanity Studio indexable (MED)
`/studio` → **200** with `<meta name="robots" content="index, follow">`.
**Fix:** `robots:{ index:false, follow:false }` on `app/studio` + `Disallow: /studio` in `app/robots.ts`.

## 🟡 T4 — Placeholder GSC verification (LOW)
`<meta name="google-site-verification" content="your-google-verification-code">` is live. Insert real token or remove.

## 🟡 T5 — Duplicate viewport meta (LOW)
Two `<meta name="viewport">` render — manual one in `layout.tsx` head (`maximum-scale=5`) + Next default. Use `export const viewport`.

## 🟡 T6 — Canonical trailing-slash inconsistency (LOW)
Canonical `https://ministerstwoporzadku.pl` vs served `/`. Harmless; standardize.
