# Full SEO Audit — ministerstwoporzadku.pl

**Audited:** 2026-07-09
**Site:** https://ministerstwoporzadku.pl
**Business type:** Local Service — Professional Organizer / Decluttering (Service-Area Business, Warsaw)
**Stack:** Next.js (App Router) on Vercel, Sanity CMS, server-rendered (not SPA)
**Method:** Live crawl + rendered-HTML inspection + full source-code review (audit run inside the site's own repository)

---

## Executive Summary

### SEO Health Score: **70 / 100** — "Good foundation, fixable trust & indexing gaps"

The site is technically well-built: modern framework, server-side rendering, strong security headers, clean robots.txt, valid sitemap, single H1, complete image alt text, and thoughtful font/CLS optimization. E-E-A-T fundamentals are present (named founder, first-person expertise, real photo).

However, **three issues do real damage** and should be fixed first: (1) the site markets a **fake `aggregateRating` (5.0 / 24 reviews) on every page while showing no reviews at all** — a Google structured-data policy violation; (2) a **broken `hreflang` pointing to a 404 `/en` page**; and (3) **four commercial "usługi" (services) pages are indexable but missing from the sitemap**, plus the Sanity Studio is publicly indexable.

| Category | Score | Weight |
|---|---|---|
| Technical SEO | 72 | 22% |
| Content Quality | 68 | 23% |
| On-Page SEO | 74 | 20% |
| Schema / Structured Data | 55 | 10% |
| Performance (CWV, lab) | 78 | 10% |
| AI Search Readiness (GEO) | 62 | 10% |
| Images | 80 | 5% |
| **Weighted total** | **70** | 100% |

### Top 5 Critical / High Issues
1. **Fabricated `aggregateRating` (5.0, 24 reviews) with no reviews on the page** — the `<Testimonials />` section is commented out in `app/page.tsx`, but the rating markup ships site-wide. Policy risk (manual action for spammy structured data). *[High]*
2. **`hreflang="en-US"` points to `https://ministerstwoporzadku.pl/en`, which returns 404.** Declares a language version that doesn't exist. *[High]*
3. **Four `/uslugi/*` service pages (the money pages) are indexable but absent from `sitemap.xml`.** Blog category pages are missing too. *[High]*
4. **Sanity Studio (`/studio`) is publicly reachable and set to `index, follow`.** CMS admin should never be indexable. *[Medium-High]*
5. **Global schema leakage:** `FAQPage`, `aggregateRating`, and a homepage-oriented `BreadcrumbList` are injected on *every* URL (blog posts, service pages) from `app/layout.tsx`, creating context mismatches. *[Medium]*

### Top 5 Quick Wins
1. Replace the placeholder `google: "your-google-verification-code"` in `app/layout.tsx` (or remove it) and verify the domain in Search Console.
2. Add `/uslugi/*` and `/blog/kategoria/*` URLs to `app/sitemap.ts`.
3. Either restore a real reviews section or remove `aggregateRating` from the schema until reviews exist. *(Correction 2026-07-16: removal is permanent — GBP reviews can't be copied into schema, and self-serving `aggregateRating` on `LocalBusiness` is ignored by Google since 09.2019. See findings/schema.md S1.)*
4. Fix/remove the `en-US → /en` hreflang and `alternates.languages` block until an English site exists.
5. Add `robots: { index: false }` to the `/studio` route and `Disallow: /studio` to robots.

---

## 1. Technical SEO — 72/100

**What works**
- HTTPS enforced; `http→https` and `www→non-www` both return **308** (correct permanent redirects).
- Strong security header set: `Strict-Transport-Security` (2 yr), tight `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- `robots.txt` is clean and points to the sitemap; disallows `/api/`, `/_next/`, `/admin/`.
- Server-side rendered (`is_spa: false`, `X-Nextjs-Prerender: 1`) — fully crawlable without JS execution.
- Valid `sitemap.xml`, proper soft-404 handling (unknown URLs return real **404**), Vercel edge cache `HIT`, Brotli compression.
- `<html lang="pl">` set correctly.

**Issues**
| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| T1 | High | Service pages missing from sitemap | `sitemap.ts` outputs only `/`, `/blog`, `/polityka-prywatnosci` + blog posts. `/uslugi/{4 slugs}` all return 200 and are `dynamicParams:false` statically generated | Add all `services` slugs + blog category slugs to `sitemap.ts` |
| T2 | High | `hreflang` en-US → 404 | Rendered `<link rel="alternate" hrefLang="en-US" href=".../en"/>`; `/en` returns **404** | Remove `alternates.languages` in `layout.tsx` until `/en` exists |
| T3 | Med-High | Sanity Studio indexable | `/studio` → HTTP 200 with `<meta name="robots" content="index, follow">` | Add `export const metadata = { robots:{ index:false } }` to `app/studio` layout + `Disallow: /studio` |
| T4 | Low | Placeholder GSC verification live | `<meta name="google-site-verification" content="your-google-verification-code">` | Insert real token or remove |
| T5 | Low | Duplicate `<meta name="viewport">` | Two viewport tags render (one manual in `layout.tsx` head with `maximum-scale=5`, one from Next metadata) | Remove the manual one; set viewport via Next `export const viewport` |
| T6 | Low | Canonical omits trailing slash | Canonical `https://ministerstwoporzadku.pl` while site serves `/`. Not harmful (Google normalizes) but inconsistent | Standardize on one form |

---

## 2. Content Quality & E-E-A-T — 68/100

**What works**
- Clear **Experience/Expertise**: named founder Karolina Kalinowska, real photo, first-person practitioner voice ("Często słyszę od klientów…"), stated specialization (decluttering / professional organizer).
- The single blog post (`…planowanie-przed-remontem`) is **~1,100 words, genuinely in-depth**, with a logical H2/H3 outline, author bio, publish date, and internal links to service/consultation pages.
- Homepage covers About → Process (4 steps) → Services → Portfolio → Contact — a coherent local-service narrative.

**Issues**
| # | Severity | Finding | Fix |
|---|---|---|---|
| C1 | High | **No visible social proof.** Testimonials are coded but commented out (`app/page.tsx:19`). This is the #1 conversion + trust + E-E-A-T gap for a local service, and it's what makes the schema rating fraudulent | Ship a real testimonials/reviews section; embed Google reviews if available |
| C2 | Med | **Thin content library — only 1 blog article.** `/blog` exists as a hub with almost nothing to rank | Publish 6–10 articles targeting local intent (see Action Plan) |
| C3 | Med | Trust signals: business email in schema is a personal Gmail (`Karolinap.kalinowska@gmail.com`); no visible pricing despite "Cennik" nav label | Use a domain email; add at least "od X zł" price anchors |
| C4 | Low | No dedicated `/o-mnie` or per-service long-form pages beyond the `/uslugi` templates | Consider expanding service pages with FAQs, process, local proof |

---

## 3. On-Page SEO — 74/100

**What works**
- Unique, keyword-targeted `<title>` and `meta description` on home, each service page, and blog posts.
- Exactly **one `<h1>`** per page; blog post heading hierarchy is clean.
- Keyword-rich metadata with clear local intent ("decluttering warszawa", district names).

**Issues**
| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| O1 | Med | Homepage `<title>` too long (~84 chars) — truncates in SERP | "Ministerstwo Porządku \| Decluttering Warszawa \| Organizacja Przestrzeni Dom i Biuro" | Trim to ≤60 chars, lead with primary keyword |
| O2 | Med | H1 is a slogan with no keyword | `<h1>Twój spokój zaczyna się tutaj.</h1>` | Keep the emotional hook but add a keyword-bearing H2 near the top, or blend keyword into H1 |
| O3 | Low | Blog metaTitle drops brand & reads awkwardly | "Organizacja przestrzeni zaplanuj wnętrze przed zabudową" | Add "\| Ministerstwo Porządku" suffix; smooth grammar |
| O4 | Low | Blog `alternates.languages` sets `en` → the same Polish URL | `layout` blog metadata | Remove until EN exists |

---

## 4. Schema / Structured Data — 55/100

**What works**
- Ambitious, mostly well-formed `@graph`: `ProfessionalService`+`LocalBusiness` with geo, `areaServed`, `openingHours`, `hasOfferCatalog`; `WebSite`; `Service` + `Offer` on each service page; `BlogPosting` on posts; `sameAs` to Instagram/TikTok.

**Issues**
| # | Severity | Finding | Fix |
|---|---|---|---|
| S1 | **High** | `aggregateRating` (ratingValue 5.0, reviewCount 24) is declared **with zero reviews rendered on the page** and no `review` nodes. Violates Google's [review snippet policy](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) → risk of manual action / ignored markup | Remove `aggregateRating` **permanently** (correction 2026-07-16): first-party-only policy forbids copying GBP reviews into schema, and self-serving ratings on `LocalBusiness` are ignored for rich results since 09.2019. Show testimonials without rating markup |
| S2 | Med | `FAQPage`, `aggregateRating`, and homepage `BreadcrumbList` are in the **global layout**, so they render on blog posts and service pages where they don't belong (breadcrumb points to homepage sections regardless of the actual page) | Move `FAQPage`/`aggregateRating`/breadcrumb into the homepage route only; give each route its own correct breadcrumb |
| S3 | Low | `BlogPosting.dateModified` is hard-set equal to `datePublished` | Set `dateModified` from Sanity `_updatedAt` |
| S4 | Low | `BlogPosting.author` is a bare `Person` name — no `@id`/`url`/`sameAs`, weakening author E-E-A-T | Link author to a real Person entity with bio + profiles |
| S5 | Low | Breadcrumb items use fragment anchors (`/#services`) rather than URLs | Point breadcrumbs at real pages (e.g. `/uslugi/...`) |
| S6 | Info | `FAQPage` rich results are largely deprecated for non-authoritative sites — harmless but won't earn SERP real estate | Keep for AI/GEO value only |

---

## 5. Performance (Core Web Vitals — lab signals) — 78/100

> No field (CrUX/GSC) data was available; this is a static/lab assessment.

**What works**
- Next.js prerender + Vercel edge cache `HIT` → fast TTFB.
- Font strategy is strong for CLS: `display:swap`, subset to `latin`/`latin-ext`, only used weights loaded, `adjustFontFallback:true`, explicit fallbacks.
- LCP hero image and logo are **preloaded** with `fetchPriority="high"`; `preconnect`/`dns-prefetch` for Google Fonts; Brotli.

**Issues**
| # | Severity | Finding | Fix |
|---|---|---|---|
| P1 | Med | Hero preload uses a **fake responsive srcset**: `karolina-kalinowska-hero-intro.jpeg?w=640 640w …` points at a static `/public` file — query params don't resize it, so every device downloads the full JPEG | Serve the hero via `next/image` (or pre-generate real width variants) so the srcset actually delivers smaller images |
| P2 | Low | Hero is JPEG, OG/logo is PNG — no next-gen formats | Convert key raster images to WebP/AVIF |
| P3 | Info | Verify no layout shift from the animated `observe-animation opacity-0` hero (starts at opacity 0) | Confirm CLS in field data once GSC is connected |

---

## 6. Images — 80/100

**What works**
- **100% alt-text coverage** across home, blog, and service pages (8/8, 3/3, 2/2 sampled).
- Hero preloaded; file sizes reasonable (hero JPEG ~45 KB).

**Issues**
| # | Severity | Finding | Fix |
|---|---|---|---|
| I1 | Low | OG/Twitter share image is the **logo PNG**, not a compelling photo (declared 1200×630 but it's a logo) | Design a proper 1200×630 social card with a real space/portrait photo for better share CTR |
| I2 | Low | Raster images served as JPEG/PNG rather than WebP/AVIF | Adopt next-gen formats via `next/image` |

---

## 7. AI Search Readiness (GEO) — 62/100

**What works**
- Content is **server-rendered** → readable by ChatGPT/Perplexity/Google AI crawlers without JS.
- Clear entity definition (`LocalBusiness` with `areaServed`, `sameAs`), FAQ content, and a well-structured, answer-first blog article — all citation-friendly.

**Issues**
| # | Severity | Finding | Fix |
|---|---|---|---|
| G1 | Med | No `llms.txt` at the root | Add `/llms.txt` summarizing services, area, and key pages |
| G2 | Med | Very small corpus (1 article) limits citable passages and topical authority | Expand content cluster around Warsaw home-organization intents |
| G3 | Med | The fabricated rating undermines trust signals that LLMs increasingly weigh | Fix per S1 |
| G4 | Low | No visible, extractable review/quote text for AI to cite | Ship real testimonials with plain-text quotes |

---

## Appendix — Site Map (discovered)

| Route | In sitemap.xml? | Indexable | Note |
|---|---|---|---|
| `/` | ✅ | ✅ | Homepage |
| `/blog` | ✅ | ✅ | Hub, 1 post |
| `/blog/[slug]` (1 live) | ✅ | ✅ | Good article |
| `/blog/kategoria/[category]` | ❌ | ✅ | Missing from sitemap |
| `/uslugi/projektowa-organizacja-przestrzeni` | ❌ | ✅ | **Money page, missing** |
| `/uslugi/decluttering-i-organizacja-przestrzeni` | ❌ | ✅ | **Money page, missing** |
| `/uslugi/wsparcie-w-przeprowadzce` | ❌ | ✅ | **Money page, missing** |
| `/uslugi/konsultacja-online` | ❌ | ✅ | **Money page, missing** |
| `/polityka-prywatnosci` | ✅ | ✅ | Privacy |
| `/studio` | ❌ | ⚠️ **Yes (should be no)** | Sanity CMS admin |

See `ACTION-PLAN.md` for prioritized fixes and `audit-data.json` for the structured envelope.
