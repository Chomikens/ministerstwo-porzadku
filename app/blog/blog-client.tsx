"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { Search, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { BlogPost, Category } from "@/lib/sanity.queries"
import { useState, useMemo, useRef, useEffect } from "react"

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: Category[]
}

export default function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const uniquePosts = useMemo(() => {
    const seen = new Set<string>()
    return posts.filter((post) => {
      if (seen.has(post._id)) {
        return false
      }
      seen.add(post._id)
      return true
    })
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return uniquePosts

    const query = searchQuery.toLowerCase().trim()
    return uniquePosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query)
      const excerptMatch = post.excerpt?.toLowerCase().includes(query)
      const categoryMatch = post.category?.title.toLowerCase().includes(query)
      return titleMatch || excerptMatch || categoryMatch
    })
  }, [uniquePosts, searchQuery])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      // ESC to clear search
      if (e.key === "Escape" && searchQuery) {
        setSearchQuery("")
        searchInputRef.current?.blur()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchQuery])

  const handleClearSearch = () => {
    setSearchQuery("")
    searchInputRef.current?.focus()
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30 overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-7xl relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="space-y-6 animate-fade-in-up">
                <div className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium">
                  {t("blog.badge")}
                </div>
                <div className="space-y-3">
                  <p className="text-xl md:text-2xl font-serif font-semibold text-foreground/70">{t("blog.title")}</p>
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                    <span className="italic text-primary">{t("hero.tagline")}</span>
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
                  {t("blog.subtitle")}
                </p>

                <div className="pt-4">
                  <div className="relative max-w-md group">
                    <label htmlFor="blog-search" className="sr-only">
                      {t("blog.search.placeholder")}
                    </label>
                    <Search
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        isFocused ? "text-primary" : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    <input
                      ref={searchInputRef}
                      id="blog-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder={t("blog.search.placeholder")}
                      className={`w-full pl-12 pr-12 py-3 bg-background border-2 rounded-full focus:outline-none transition-all ${
                        isFocused
                          ? "border-primary shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      aria-label="Wyszukaj artykuły na blogu"
                      aria-describedby="search-results-count"
                      autoComplete="off"
                    />
                    {searchQuery && (
                      <button
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
                        aria-label="Wyczyść wyszukiwanie"
                        type="button"
                      >
                        <X className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      </button>
                    )}
                    {/* Keyboard shortcut hint */}
                    {!isFocused && !searchQuery && (
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground"
                        aria-hidden="true"
                      >
                        <kbd className="px-2 py-1 bg-secondary border border-border rounded text-xs font-mono">⌘K</kbd>
                      </div>
                    )}
                  </div>
                  {/* Search results count */}
                  {searchQuery && (
                    <p
                      id="search-results-count"
                      className="mt-2 text-sm text-muted-foreground"
                      role="status"
                      aria-live="polite"
                    >
                      {filteredPosts.length === 0
                        ? "Nie znaleziono artykułów"
                        : `Znaleziono ${filteredPosts.length} ${filteredPosts.length === 1 ? "artykuł" : filteredPosts.length < 5 ? "artykuły" : "artykułów"}`}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="relative animate-fade-in-up stagger-1 hidden lg:block">
                <div className="relative aspect-square">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-2xl" />

                  <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                    <img
                      src="/images/design-mode/uslugi-konsutlacje-online.webp"
                      alt="Karolina - Ministerstwo Porządku"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating stats card */}
                  <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-lg p-6 border border-border z-20 max-w-xs">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        <p className="text-sm font-medium">{t("blog.tagline")}</p>
                      </div>
                      <p className="text-foreground font-serif text-lg leading-snug">{t("blog.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Category Filter */}
            {categories.length > 0 && !searchQuery && (
              <div className="flex flex-wrap gap-3 mb-12" role="navigation" aria-label="Filtruj według kategorii">
                <Link
                  href="/blog"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Wszystkie
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog/kategoria/${category.slug}`}
                    className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="text-xl text-muted-foreground mb-2">
                  {searchQuery ? "Nie znaleziono artykułów" : "Wkrótce pojawią się tutaj artykuły."}
                </p>
                {searchQuery && (
                  <p className="text-sm text-muted-foreground">
                    Spróbuj użyć innych słów kluczowych lub{" "}
                    <button onClick={handleClearSearch} className="text-primary hover:underline">
                      wyczyść wyszukiwanie
                    </button>
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
