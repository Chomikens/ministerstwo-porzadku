"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Search, X, HelpCircle, Clock, Wallet, Sparkles, Home, Package, ArrowRight, LayoutGrid } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { faqCategories, type FaqCategory } from "@/lib/faq-data"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const iconMap: Record<FaqCategory["iconName"], typeof HelpCircle> = {
  HelpCircle,
  Clock,
  Wallet,
  Sparkles,
  Home,
  Package,
}

// Bento card size patterns per category - creates visual variety
const bentoPatterns: Record<string, string[]> = {
  general: ["lg:col-span-2 lg:row-span-2", "lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1"],
  process: ["lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1", "lg:col-span-2 lg:row-span-1"],
  pricing: ["lg:col-span-1 lg:row-span-2", "lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-1"],
  services: ["lg:col-span-1 lg:row-span-1", "lg:col-span-2 lg:row-span-1", "lg:col-span-1 lg:row-span-1"],
  practical: ["lg:col-span-2 lg:row-span-1", "lg:col-span-1 lg:row-span-1", "lg:col-span-1 lg:row-span-2"],
}

function BentoQuestionCard({
  question,
  answer,
  slug,
  bentoClass,
  categoryIcon: CategoryIcon,
  categoryLabel,
  delay,
}: {
  question: string
  answer: string
  slug: string
  bentoClass: string
  categoryIcon: typeof HelpCircle
  categoryLabel: string
  delay: number
}) {
  const isLarge = bentoClass.includes("col-span-2") || bentoClass.includes("row-span-2")

  return (
    <Link
      href={`/faq/${slug}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 lg:p-8 transition-all duration-500 hover:shadow-xl hover:border-accent/30 hover:-translate-y-1 ${bentoClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative corner element -- like an organizing label/tab */}
      <div className="absolute top-0 right-0 w-20 h-20 -z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-full h-full bg-accent/5 rounded-bl-[3rem] transition-all duration-500 group-hover:bg-accent/10" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Category tag */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-accent/20">
            <CategoryIcon className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {categoryLabel}
          </span>
        </div>

        {/* Question */}
        <h3 className={`font-serif font-bold text-foreground leading-snug text-pretty group-hover:text-accent transition-colors duration-300 mb-3 ${isLarge ? "text-xl lg:text-2xl" : "text-lg"}`}>
          {question}
        </h3>

        {/* Answer preview */}
        <p className={`text-muted-foreground leading-relaxed flex-1 ${isLarge ? "text-base line-clamp-4" : "text-sm line-clamp-2"}`}>
          {answer}
        </p>

        {/* Read more */}
        <div className="flex items-center gap-2 mt-4 text-sm font-medium text-accent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span>{isLarge ? "Czytaj odpowiedź" : "Czytaj"}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
    </Link>
  )
}

export function FaqClient() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      if (activeCategory === null) return faqCategories
      return faqCategories.filter((c) => c.id === activeCategory)
    }

    const query = searchQuery.toLowerCase()
    return faqCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            t(item.questionKey).toLowerCase().includes(query) ||
            t(item.answerKey).toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [searchQuery, activeCategory, t])

  const totalResults = filteredCategories.reduce((sum, c) => sum + c.items.length, 0)

  // Flatten items for "all" view bento grid
  const allItems = useMemo(() => {
    return filteredCategories.flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category,
      }))
    )
  }, [filteredCategories])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl relative">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: t("faq.page.title") }]} />
          </div>

          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              {t("faq.page.badge")}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              {t("faq.page.title")}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-pretty leading-relaxed">
              {t("faq.page.subtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder={t("faq.page.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-card border border-border shadow-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-base"
                aria-label={t("faq.page.search")}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-card border border-border/60 text-muted-foreground hover:border-accent/30 hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              {t("faq.page.all")}
            </button>
            {faqCategories.map((category) => {
              const Icon = iconMap[category.iconName]
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-card border border-border/60 text-muted-foreground hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {t(category.labelKey)}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Bento Grid */}
      <section ref={sectionRef} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {totalResults === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-secondary/60 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">{t("faq.page.no.results")}</p>
            </div>
          ) : activeCategory === null && !searchQuery ? (
            // All categories view -- each category as a "shelf" section with bento cards
            <div className={`space-y-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {filteredCategories.map((category, catIndex) => {
                const Icon = iconMap[category.iconName]
                const patterns = bentoPatterns[category.id] || bentoPatterns.general

                return (
                  <div key={category.id}>
                    {/* Category "shelf" header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground">
                          {t(category.labelKey)}
                        </h2>
                      </div>
                      <div className="flex-1 h-px bg-border/40" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground font-medium">
                        {category.items.length} {category.items.length === 1 ? "pytanie" : category.items.length < 5 ? "pytania" : "pytań"}
                      </span>
                    </div>

                    {/* Bento grid for this category */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <BentoQuestionCard
                          key={item.slug}
                          question={t(item.questionKey)}
                          answer={t(item.answerKey)}
                          slug={item.slug}
                          bentoClass={patterns[itemIndex] || ""}
                          categoryIcon={Icon}
                          categoryLabel={t(category.labelKey)}
                          delay={catIndex * 200 + itemIndex * 80}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // Filtered/search view -- flat bento grid
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {filteredCategories.map((category) => {
                const Icon = iconMap[category.iconName]
                const patterns = bentoPatterns[category.id] || bentoPatterns.general

                return (
                  <div key={category.id} className="mb-12 last:mb-0">
                    {/* Category header when searching */}
                    {searchQuery && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                        </div>
                        <h2 className="font-serif text-xl font-bold text-foreground">
                          {t(category.labelKey)}
                        </h2>
                        <div className="flex-1 h-px bg-border/40" aria-hidden="true" />
                      </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {category.items.map((item, itemIndex) => (
                        <BentoQuestionCard
                          key={item.slug}
                          question={t(item.questionKey)}
                          answer={t(item.answerKey)}
                          slug={item.slug}
                          bentoClass={patterns[itemIndex] || ""}
                          categoryIcon={Icon}
                          categoryLabel={t(category.labelKey)}
                          delay={itemIndex * 80}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-foreground text-balance">
            {t("faq.page.cta.title")}
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto text-pretty leading-relaxed">
            {t("faq.page.cta.description")}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6 transition-smooth hover:scale-105"
          >
            <Link href="/#kontakt">
              {t("faq.page.cta.button")}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
