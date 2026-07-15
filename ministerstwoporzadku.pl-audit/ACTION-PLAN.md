# Action Plan — ministerstwoporzadku.pl

Prioritized, code-level fixes. File paths are relative to the repo root.

> **Status review: 2026-07-15** — verified against the codebase and the deployed `origin/main`.
> Legend: ✅ done · 🟡 partial · ⬜ not started · 🔄 in progress · 🔵 external (off-repo)
> "pending deploy" = fixed in branch `feature/blog-hreflang-and-statblock` but **not yet merged to `main`**.

**Snapshot:** Phase 1 (critical) is fully done. Phase 2 is mixed — schema scoping, GSC placeholder and viewport are done; hero srcset, title/H1 still open. Phase 3–4 are largely business/content tasks (real reviews, domain email, GA4, GBP) that need off-repo assets or decisions.

## 🔴 Phase 1 — Critical Fixes (Week 1)

1. **Remove the fabricated review rating** *(Schema policy risk)* — ✅ **DONE** (commit `4ee1eb2`, live on `main`). No `aggregateRating`/`ratingValue`/`reviewCount`/`review` anywhere; `app/layout.tsx` carries a comment documenting the deliberate removal.
   - In `app/layout.tsx`, delete the `aggregateRating` block from the `ProfessionalService`/`LocalBusiness` node **until** real reviews exist and are visible on the page.
   - Best fix: uncomment/restore `<Testimonials />` in `app/page.tsx:19` with genuine client reviews, then add matching `review` nodes to the schema. — ⬜ **still pending: no genuine client reviews yet** (confirmed 2026-07-15). `<Testimonials />` remains commented out; do NOT re-add rating/review markup until real, on-page reviews exist.

2. **Fix the broken English hreflang** *(Indexing/international)* — ✅ **DONE + extended.** `/en` now exists (middleware rewrite), `buildAlternates` emits valid `pl-PL`/`en-US`/`x-default` for static & service pages, and blog articles now emit a reciprocal hreflang pair via the shared `translationId` (metadata + sitemap). Blog-list alternates fixed too (pending deploy).
   - In `app/layout.tsx`, remove `alternates.languages` (`en-US → /en`) — `/en` is a 404. Same in `app/blog/[slug]/page.tsx` (`en` alternate pointing to the Polish URL).
   - Keep only a self-referencing `canonical`.

3. **Add all indexable pages to the sitemap** *(Discovery)* — ✅ **DONE** (live on `main`). `app/sitemap.ts` emits the `services` slugs (`/uslugi/{slug}`) and blog category routes (PL + EN); paired blog posts also carry hreflang.
   - In `app/sitemap.ts`, append the 4 `services` slugs (`/uslugi/{slug}`) and the blog category routes (`/blog/kategoria/{slug}`). Import `services` from `lib/services-data` and categories from Sanity.

4. **De-index the Sanity Studio** *(Leak)* — ✅ **DONE.** `app/studio/layout.tsx` sets `robots: { index:false, follow:false }` and `app/robots.ts` disallows `/studio/`.
   - Add `robots: { index: false, follow: false }` metadata to `app/studio/[[...tool]]` (or a `app/studio/layout.tsx`).
   - Add `Disallow: /studio` to `app/robots.ts`.

## 🟠 Phase 2 — High-Impact Improvements (Weeks 2–3)

5. **Scope global schema correctly** — ✅ **DONE.** `FAQPage` + homepage `BreadcrumbList` now live in `app/page.tsx`; `aggregateRating` removed (see #1); service pages emit their own `Service` + `BreadcrumbList`. *Minor optional:* blog articles don't yet emit their own `BreadcrumbList` JSON-LD (visible breadcrumbs exist).
6. **Fix the fake hero srcset** (`app/layout.tsx` preload) — 🟡 **PARTIAL / still effectively open.** A preload `imageSrcSet` with `?w=640/750/828` descriptors was added, but they point to a **static** `/images/...jpeg` where query params are ignored — so every candidate serves the full JPEG. Real fix: render the hero via `next/image` or pre-generate actual width files.
7. **Real Search Console verification** — ✅ **DONE (via domain).** No `verification.google` placeholder remains in `app/layout.tsx`; GSC is verified through the **domain property** (`sc-domain:ministerstwoporzadku.pl`), so a meta tag isn't required.
8. **Title/H1 tuning** — ⬜ **NOT DONE.** Homepage `<title>` is still ~82 chars (`"Ministerstwo Porządku | Decluttering Warszawa | Organizacja Przestrzeni Dom i Biuro"`) — trim to ≤60. No dedicated keyword H2 ("Decluttering i organizacja przestrzeni w Warszawie") on the page (hero has only the H1).
9. **De-duplicate the viewport meta** — ✅ **DONE (pending deploy).** Manual `<meta name="viewport">` removed; single `export const viewport` (with `maximum-scale=5`) in `app/layout.tsx`. Verified 1 tag in rendered HTML. Sits in the unmerged branch.

*(Also fixed alongside Phase 2, from the findings list: **T6 canonical trailing-slash** — root canonical normalized to no trailing slash. ✅ pending deploy.)*

## 🟡 Phase 3 — Content & Authority (Month 2)

10. **Build the blog out to 6–10 posts** — 🔄 **IN PROGRESS.** 10 PL + 10 EN documents exist; 4 PL and 4 EN currently published (rest are `hidden` drafts). Suggested angles still to cover:
    - "Ile kosztuje decluttering w Warszawie? Cennik i co wpływa na cenę"
    - "Organizacja małego mieszkania w bloku — 10 zasad"
    - "Jak przygotować się do przeprowadzki w Warszawie krok po kroku"
    - "Garderoba kapsułowa: jak zacząć decluttering szafy"
    - District landing angles: Mokotów / Śródmieście / Żoliborz.
11. **Expand `/uslugi/*` pages** — 🟡 **PARTIAL.** Pages carry `Service` schema + `priceRange`/price anchors. Still missing: per-service FAQ, process steps, before/after photos.
12. **Add real testimonials + author entity** — 🟡 **PARTIAL.** Author `Person` entity with `sameAs` (Instagram, TikTok) is present in the org schema and in `BlogPosting`. Plain-text testimonials + `review` nodes ⬜ not done (no genuine reviews yet — see #1).
13. **Domain email** — ⬜ **NOT DONE.** Still `Karolinap.kalinowska@gmail.com` in `app/layout.tsx` schema and across `components/contact.tsx`. Needs a real `kontakt@ministerstwoporzadku.pl` mailbox first, then swap everywhere.

## 🟢 Phase 4 — Monitoring & Iteration (Ongoing)

14. **Connect Google Search Console + GA4** — 🟡 **PARTIAL.** GSC ✅ (domain property, used by the SEO tooling). Vercel Analytics ✅ (consent-gated) + Speed Insights. **GA4 not wired** (no `gtag`/`G-…` in the code).
15. **Add `/llms.txt`** — ✅ **DONE** (`public/llms.txt`, commit `2a83b2f`). Keep FAQ/how-to content answer-first for AI citation.
16. **Set `BlogPosting.dateModified` from Sanity `_updatedAt`** — 🟡 **PARTIAL.** `dateModified` is emitted but hard-wired to `publishedAt` (`app/blog/[slug]/page.tsx`), not `_updatedAt`. Since articles are being actively edited, switch it to `_updatedAt` for a real freshness signal. Refresh top posts on a ~90-day cycle.
17. **Build local citations** (Google Business Profile, Mapy, Facebook) with NAP identical to the site; pursue reviews to legitimately restore the rating. — 🔵 **EXTERNAL** (off-repo task; can't verify from code).

---

### Effort / Impact snapshot

| Fix | Impact | Effort | Status |
|---|---|---|---|
| Remove fake rating | High | XS | ✅ done |
| Fix hreflang 404 | High | XS | ✅ done (extended) |
| Sitemap: add services | High | S | ✅ done |
| De-index /studio | Med-High | XS | ✅ done |
| Scope global schema | Med | M | ✅ done |
| Fix hero srcset | Med | M | 🟡 partial (query-param srcset doesn't resize) |
| De-dup viewport / canonical | Low | XS | ✅ done (pending deploy) |
| Homepage title/H1 | Med | S | ⬜ not done |
| Domain email | Low | XS | ⬜ needs mailbox |
| GA4 wiring | Med | S | ⬜ not done |
| `dateModified` → `_updatedAt` | Low-Med | XS | 🟡 partial |
| Blog build-out | High (long-term) | L | 🔄 in progress |
| Testimonials section | High | M | ⬜ blocked on real reviews |

### Quick wins still open (low effort, in-repo)
- **#16** `dateModified` → `_updatedAt` (XS).
- **#8** trim homepage `<title>` to ≤60 chars + add a local-keyword H2 (S).
- **#6** hero: real `next/image` or generated width files (M).
- **#13** swap Gmail → domain email once the mailbox exists (XS).
