import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { getPostsByCategory, getCategoryBySlug, getAllCategories } from "@/lib/sanity.queries"
import { getLanguage } from "@/lib/get-language"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const revalidate = 60

export async function generateStaticParams() {
  const categoriesPl = await getAllCategories("pl")
  const categoriesEn = await getAllCategories("en")
  const allCategories = [...categoriesPl, ...categoriesEn]
  const uniqueSlugs = [...new Set(allCategories.map((cat) => cat.slug))]
  return uniqueSlugs.map((slug) => ({ category: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category: categorySlug } = await params
  const language = await getLanguage()
  const category = await getCategoryBySlug(categorySlug, language)
  const baseUrl = "https://ministerstwoporzadku.pl"

  if (!category) {
    return {
      title: language === "pl" ? "Kategoria nie znaleziona" : "Category not found",
    }
  }

  const title = `${category.title} | Blog | Ministerstwo Porządku`
  const description =
    category.description || `${language === "pl" ? "Artykuły z kategorii" : "Articles from category"} ${category.title}`

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/blog/kategoria/${categorySlug}`,
      languages: {
        pl: `${baseUrl}/blog/kategoria/${categorySlug}`,
        en: `${baseUrl}/blog/kategoria/${categorySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/blog/kategoria/${categorySlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

async function CategoryContent({ categorySlug }: { categorySlug: string }) {
  const language = await getLanguage()
  const [category, posts] = await Promise.all([
    getCategoryBySlug(categorySlug, language),
    getPostsByCategory(categorySlug, language),
  ])

  if (!category) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: category.title },
              ]}
            />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up stagger-1">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Brak artykułów w tej kategorii.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <Suspense
          fallback={
            <div className="py-16 px-4 text-center">
              <p className="text-muted-foreground">Ładowanie kategorii...</p>
            </div>
          }
        >
          <CategoryContent categorySlug={category} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
