import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/sanity.queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ministerstwoporzadku.pl"

  const postsPl = await getAllPosts("pl")
  const postsEn = await getAllPosts("en")

  // Language is determined by user preference (cookies), not URL
  const allPosts = [...postsPl, ...postsEn]
  const uniqueSlugs = [...new Set(allPosts.map((post) => post.slug))]

  const blogUrls = uniqueSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogUrls,
  ]
}
