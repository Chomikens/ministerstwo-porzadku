import type { MetadataRoute } from "next"
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries"
import { services } from "@/lib/services-data"
import { BASE_URL, localizedPath } from "@/lib/i18n"

type Entry = MetadataRoute.Sitemap[number]

// A page that exists in both languages → emit PL + EN URLs cross-linked via hreflang.
function bilingual(basePath: string, priority: number, changeFrequency: Entry["changeFrequency"]): Entry[] {
  const pl = `${BASE_URL}${localizedPath(basePath, "pl")}`
  const en = `${BASE_URL}${localizedPath(basePath, "en")}`
  const languages = { pl: pl, en: en }
  const base = { lastModified: new Date(), changeFrequency, priority }
  return [
    { url: pl, ...base, alternates: { languages } },
    { url: en, ...base, alternates: { languages } },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static + service pages exist in both languages (UI is fully translated).
  const core: Entry[] = [
    ...bilingual("/", 1, "weekly"),
    ...bilingual("/blog", 0.9, "weekly"),
    ...services.flatMap((s) => bilingual(`/uslugi/${s.slug}`, 0.8, "monthly")),
    ...bilingual("/polityka-prywatnosci", 0.5, "monthly"),
  ]

  // Blog posts & categories are language-native content (separate Sanity docs
  // with their own slugs), so they are listed per-language without hreflang pairs.
  const [postsPl, postsEn, categoriesPl, categoriesEn] = await Promise.all([
    getAllPosts("pl"),
    getAllPosts("en"),
    getAllCategories("pl"),
    getAllCategories("en"),
  ])

  const postUrls: Entry[] = [
    ...postsPl.map((p) => ({ url: `${BASE_URL}/blog/${p.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...postsEn.map((p) => ({ url: `${BASE_URL}/en/blog/${p.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
  ]

  const categoryUrls: Entry[] = [
    ...categoriesPl.map((c) => ({ url: `${BASE_URL}/blog/kategoria/${c.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 })),
    ...categoriesEn.map((c) => ({ url: `${BASE_URL}/en/blog/category/${c.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 })),
  ]

  return [...core, ...categoryUrls, ...postUrls]
}
