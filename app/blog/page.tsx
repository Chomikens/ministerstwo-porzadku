import BlogPageClient from "./blog-client"
import type { Metadata } from "next"
import { getLanguage } from "@/lib/get-language"
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries"

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage()
  const baseUrl = "https://ministerstwoporzadku.pl"

  const metadata = {
    pl: {
      title: "Blog | Ministerstwo Porządku",
      description:
        "Porady, inspiracje i praktyczne wskazówki dotyczące organizacji przestrzeni, declutteringu i minimalizmu.",
    },
    en: {
      title: "Blog | Ministry of Order",
      description: "Tips, inspiration and practical advice on space organization, decluttering and minimalism.",
    },
  }

  const { title, description } = metadata[language]

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/blog`,
      languages: {
        pl: `${baseUrl}/blog`,
        en: `${baseUrl}/blog`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/blog`,
      images: [
        {
          url: `${baseUrl}/images/design-mode/karolina-kalinowska-hero-intro.jpeg`,
          width: 1200,
          height: 630,
          alt: language === "pl" ? "Blog Ministerstwa Porządku" : "Ministry of Order Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/design-mode/karolina-kalinowska-hero-intro.jpeg`],
    },
  }
}

export const revalidate = 60

export default async function BlogPage() {
  const language = await getLanguage()

  try {
    console.log("[v0] Blog page - language:", language)
    console.log("[v0] Blog page - SANITY_PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "SET" : "MISSING")
    console.log("[v0] Blog page - SANITY_DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET ? "SET" : "MISSING")
    const [posts, categories] = await Promise.all([getAllPosts(language), getAllCategories(language)])
    console.log("[v0] Blog page - posts count:", posts.length, "categories count:", categories.length)

    return <BlogPageClient posts={posts} categories={categories} />
  } catch (error) {
    console.error("[v0] Error fetching blog data:", error)
    return <BlogPageClient posts={[]} categories={[]} />
  }
}
