# Schema / Structured Data — Findings

**Score: 55/100.** Ambitious markup undermined by one policy violation and broad context leakage.

## 🔴 S1 — aggregateRating with no reviews (HIGH, policy risk)
`app/layout.tsx` injects, on the `ProfessionalService`/`LocalBusiness` node:
```json
"aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "24", "bestRating": "5", "worstRating": "1" }
```
But `<Testimonials />` is commented out (`app/page.tsx:19`) and **no reviews render anywhere**. Google's review-snippet policy requires the rated content to be visible on the page; self-serving invisible ratings can trigger a *spammy structured markup* manual action or simply be ignored.
**Fix:** delete `aggregateRating` until real reviews are shown, then add matching `review` nodes.

## 🟠 S2 — Global schema leakage (MEDIUM)
`FAQPage`, `aggregateRating`, and a homepage-oriented `BreadcrumbList` live in the root layout `@graph`, so they render on **every** URL. Confirmed live: `FAQPage` and `aggregateRating` appear in the HTML of both a blog post and a service page. Blog/service pages therefore carry a breadcrumb pointing at homepage sections (`/#about`, `/#services`).
**Fix:** move `FAQPage`, `aggregateRating`, and the homepage breadcrumb into `app/page.tsx`; emit route-specific `BreadcrumbList` on blog/service pages (the service page already has a correct one — the layout one duplicates/conflicts).

## 🟡 S3 — dateModified == datePublished (LOW)
`app/blog/[slug]/page.tsx` sets `dateModified: post.publishedAt`. Never reflects edits. Use Sanity `_updatedAt`.

## 🟡 S4 — Thin author entity (LOW)
`BlogPosting.author` is `{ "@type":"Person", "name": ... }` only. Add `@id`, `url`, `sameAs`, and link to a Person node with bio for author E-E-A-T.

## 🟡 S5 — Fragment breadcrumb items (LOW)
Breadcrumb `item` values use `/#services` etc. Prefer real page URLs.

## ℹ️ S6 — FAQPage rich results (INFO)
FAQ rich results are deprecated for non-authoritative sites; keep the markup for AI/GEO value, not SERP features.
