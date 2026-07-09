# Action Plan — ministerstwoporzadku.pl

Prioritized, code-level fixes. File paths are relative to the repo root.

## 🔴 Phase 1 — Critical Fixes (Week 1)

1. **Remove the fabricated review rating** *(Schema policy risk)*
   - In `app/layout.tsx`, delete the `aggregateRating` block from the `ProfessionalService`/`LocalBusiness` node **until** real reviews exist and are visible on the page.
   - Best fix: uncomment/restore `<Testimonials />` in `app/page.tsx:19` with genuine client reviews, then add matching `review` nodes to the schema.

2. **Fix the broken English hreflang** *(Indexing/international)*
   - In `app/layout.tsx`, remove `alternates.languages` (`en-US → /en`) — `/en` is a 404. Same in `app/blog/[slug]/page.tsx` (`en` alternate pointing to the Polish URL).
   - Keep only a self-referencing `canonical`.

3. **Add all indexable pages to the sitemap** *(Discovery)*
   - In `app/sitemap.ts`, append the 4 `services` slugs (`/uslugi/{slug}`) and the blog category routes (`/blog/kategoria/{slug}`). Import `services` from `lib/services-data` and categories from Sanity.

4. **De-index the Sanity Studio** *(Leak)*
   - Add `robots: { index: false, follow: false }` metadata to `app/studio/[[...tool]]` (or a `app/studio/layout.tsx`).
   - Add `Disallow: /studio` to `app/robots.ts`.

## 🟠 Phase 2 — High-Impact Improvements (Weeks 2–3)

5. **Scope global schema correctly** — move `FAQPage`, `aggregateRating`, and the homepage `BreadcrumbList` out of `app/layout.tsx` and into the homepage route (`app/page.tsx`). Give blog posts and service pages their own accurate `BreadcrumbList`.
6. **Fix the fake hero srcset** (`app/layout.tsx` preload) — render the hero through `next/image`, or generate real `?w=` width variants; today all devices download the full JPEG.
7. **Real Search Console verification** — replace `verification.google` placeholder in `app/layout.tsx`, then verify + submit the sitemap.
8. **Title/H1 tuning** — trim homepage `<title>` to ≤60 chars; add a keyword-bearing H2 ("Decluttering i organizacja przestrzeni w Warszawie") high on the page.
9. **De-duplicate the viewport meta** — remove the manual `<meta name="viewport">` in `layout.tsx` head; use Next's `export const viewport`.

## 🟡 Phase 3 — Content & Authority (Month 2)

10. **Build the blog out to 6–10 posts** targeting local + informational intent, e.g.:
    - "Ile kosztuje decluttering w Warszawie? Cennik i co wpływa na cenę"
    - "Organizacja małego mieszkania w bloku — 10 zasad"
    - "Jak przygotować się do przeprowadzki w Warszawie krok po kroku"
    - "Garderoba kapsułowa: jak zacząć decluttering szafy"
    - District landing angles: Mokotów / Śródmieście / Żoliborz.
11. **Expand `/uslugi/*` pages** with per-service FAQ, process steps, before/after photos, and visible price anchors (link them prominently from the homepage services grid).
12. **Add real testimonials + author entity** — plain-text client quotes; give Karolina a linked `Person` schema with bio and social `sameAs`.
13. **Domain email** — swap the Gmail in schema/contact for `kontakt@ministerstwoporzadku.pl`.

## 🟢 Phase 4 — Monitoring & Iteration (Ongoing)

14. Connect **Google Search Console + GA4**; watch indexation of `/uslugi/*` and CWV field data.
15. Add **`/llms.txt`** and keep FAQ/how-to content answer-first for AI citation.
16. Set `BlogPosting.dateModified` from Sanity `_updatedAt`; refresh top posts on a ~90-day cycle.
17. Build local citations (Google Business Profile, Mapy, Facebook) with NAP identical to the site; pursue reviews to legitimately restore the rating.

---

### Effort / Impact snapshot

| Fix | Impact | Effort |
|---|---|---|
| Remove fake rating | High | XS |
| Fix hreflang 404 | High | XS |
| Sitemap: add services | High | S |
| De-index /studio | Med-High | XS |
| Scope global schema | Med | M |
| Fix hero srcset | Med | M |
| Blog build-out | High (long-term) | L |
| Testimonials section | High | M |
