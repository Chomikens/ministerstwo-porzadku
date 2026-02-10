import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogContent } from "@/components/blog/blog-content"
import { CategoryBadge } from "@/components/blog/category-badge"
import { ReadingTime } from "@/components/blog/reading-time"
import { RelatedPosts } from "@/components/blog/related-posts"
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/sanity.queries"
import { urlFor } from "@/lib/sanity"
import { getLanguage } from "@/lib/get-language"
import { Contact } from "@/components/contact"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const postsPl = await getAllPosts("pl")
    const postsEn = await getAllPosts("en")
    const allPosts = [...postsPl, ...postsEn]
    const uniqueSlugs = [...new Set(allPosts.map((post) => post.slug))]
    return uniqueSlugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("[v0] Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const language = await getLanguage()
    const post = await getPostBySlug(slug, language)
    const baseUrl = "https://ministerstwoporzadku.pl"

    if (!post) {
      return {
        title: language === "pl" ? "Artykuł nie znaleziony" : "Article not found",
      }
    }

    const metaTitle = post.seo?.metaTitle || `${post.title} | Blog | Ministerstwo Porządku`
    const metaDescription = post.seo?.metaDescription || post.excerpt
    const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined

    return {
      title: metaTitle,
      description: metaDescription,
      alternates: {
        canonical: `${baseUrl}/blog/${slug}`,
        languages: {
          pl: `${baseUrl}/blog/${slug}`,
          en: `${baseUrl}/blog/${slug}`,
        },
      },
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: "article",
        publishedTime: post.publishedAt,
        authors: post.author?.name ? [post.author.name] : undefined,
        images: imageUrl ? [{ url: imageUrl }] : undefined,
        url: `${baseUrl}/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: imageUrl ? [imageUrl] : undefined,
      },
    }
  } catch (error) {
    console.error("[v0] Error generating metadata:", error)
    return {
      title: "Blog | Ministerstwo Porządku",
    }
  }
}

async function BlogPostContent({ slug }: { slug: string }) {
  try {
    const language = await getLanguage()
    const post = await getPostBySlug(slug, language)

    if (!post) {
      notFound()
    }

    if (!post.author) {
      console.error("[v0] Post missing author:", post._id)
      throw new Error("Post is missing author data")
    }

    if (!post.category) {
      console.error("[v0] Post missing category:", post._id)
      throw new Error("Post is missing category data")
    }

    if (!post.body) {
      console.error("[v0] Post missing body:", post._id)
      throw new Error("Post is missing body content")
    }

    const relatedPosts = await getRelatedPosts(post._id, post.category._id, language).catch((err) => {
      console.error("[v0] Error fetching related posts:", err)
      return []
    })

    const imageUrl = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(675).url()
      : "/placeholder.svg?height=675&width=1200"

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: imageUrl,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      publisher: {
        "@type": "Organization",
        name: "Ministerstwo Porządku",
        logo: {
          "@type": "ImageObject",
          url: "https://ministerstwoporzadku.pl/ministerstwo-porzadku-logo.png",
        },
      },
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

        <article className="relative">
          <div className="relative bg-gradient-to-b from-accent/5 via-background to-background overflow-hidden">
            {/* Increased pt-8 to pt-28 to account for fixed navigation header height */}
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-4">
              {/* Hero grid layout - side by side on desktop, stacked on mobile */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left side - Content */}
                <div className="space-y-8">
                  {/* Metadata badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <CategoryBadge category={post.category} />
                    {post.readingTime && <ReadingTime minutes={post.readingTime} />}
                  </div>

                  {/* Title */}
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-[1.1] tracking-tight">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{post.excerpt}</p>

                  {/* Author and date info */}
                  <div className="flex flex-wrap items-center gap-6 text-sm pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{language === "pl" ? "Autorka" : "Author"}</p>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.publishedAt}>
                        {format(new Date(post.publishedAt), "d MMMM yyyy", {
                          locale: language === "pl" ? pl : undefined,
                        })}
                      </time>
                    </div>
                  </div>
                </div>

                {/* Right side - Featured Image */}
                {post.mainImage && (
                  <div className="relative lg:order-last order-first">
                    {/* Decorative gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 rounded-3xl blur-3xl -z-10 scale-105" />

                    {/* Main image container with decorative border */}
                    <div className="relative group">
                      {/* Decorative corner accents */}
                      <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-primary rounded-tl-3xl opacity-60 hidden lg:block" />
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-accent rounded-br-3xl opacity-60 hidden lg:block" />

                      {/* Image with gradient border effect */}
                      <div className="relative p-1 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl shadow-2xl">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-background">
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            priority
                            fetchPriority="high"
                          />
                          {/* Subtle overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Decorative floating badge */}
                      <div className="absolute -bottom-4 left-6 bg-primary text-primary-foreground px-5 py-2.5 rounded-full shadow-lg text-sm font-medium">
                        {post.category.title}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-0">
            <BlogContent content={post.body} />

            {relatedPosts.length > 0 ? (
              <div className="mt-24">
                <RelatedPosts posts={relatedPosts} />
              </div>
            ) : (
              <div className="mt-24 pt-12">
                <p className="text-muted-foreground text-sm">
                  {language === "pl" ? "Brak powiązanych artykułów" : "No related articles"}
                </p>
              </div>
            )}

            <div className="mt-16 pt-8 pb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{language === "pl" ? "Powrót do bloga" : "Back to blog"}</span>
              </Link>
            </div>
          </div>
        </article>
      </>
    )
  } catch (error) {
    console.error("[v0] Error rendering blog post:", error)
    return (
      <article className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Wystąpił błąd</h1>
          <p className="text-muted-foreground mb-8">
            Nie udało się załadować artykułu. Sprawdź czy wszystkie wymagane pola są wypełnione w Sanity Studio.
          </p>
          <Link href="/blog" className="text-accent hover:underline">
            Powrót do bloga
          </Link>
        </div>
      </article>
    )
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <Suspense
          fallback={
            <div className="py-16 px-4 text-center">
              <p className="text-muted-foreground">Ładowanie artykułu...</p>
            </div>
          }
        >
          <BlogPostContent slug={slug} />
        </Suspense>
      </main>
      <Footer />
      <Contact />
    </>
  )
}
