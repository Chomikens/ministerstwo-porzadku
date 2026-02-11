"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Search, X, HelpCircle, Clock, Wallet, Sparkles, Home, Package, ArrowRight } from "lucide-react"
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

function FaqQuestionLink({
  question,
  answer,
  slug,
  index,
}: {
  question: string
  answer: string
  slug: string
  index: number
}) {
  return (
    <Link
      href={`/faq/${slug}`}
      className="group flex items-start gap-4 py-5 px-6 text-left transition-all duration-300 hover:bg-secondary/30 border-b border-border/60 last:border-b-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center text-sm font-semibold text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent transition-colors mt-0.5">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg font-bold text-foreground leading-snug pr-4 text-pretty group-hover:text-accent transition-colors">
          {question}
        </h3>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
          {answer}
        </p>
      </div>
      <ArrowRight
        className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-1.5 transition-all duration-300 group-hover:text-accent group-hover:translate-x-1"
        aria-hidden="true"
      />
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
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.05 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

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

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl relative">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: t("faq.page.title") },
              ]}
            />
          </div>

          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
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
        </div>
      </section>

      {/* FAQ Content */}
      <section ref={sectionRef} className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Category Sidebar */}
            <nav
              className={`lg:w-56 flex-shrink-0 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              aria-label="FAQ categories"
            >
              <div className="lg:sticky lg:top-28">
                <ul className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                  <li>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 w-full ${
                        activeCategory === null
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{t("faq.page.all")}</span>
                    </button>
                  </li>
                  {faqCategories.map((category) => {
                    const Icon = iconMap[category.iconName]
                    return (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 w-full ${
                            activeCategory === category.id
                              ? "bg-accent text-accent-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                          <span>{t(category.labelKey)}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </nav>

            {/* FAQ Items */}
            <div
              className={`flex-1 min-w-0 transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {filteredCategories.length === 0 || totalResults === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg">{t("faq.page.no.results")}</p>
                </div>
              ) : (
                <div className="space-y-10">
                  {filteredCategories.map((category) => {
                    const Icon = iconMap[category.iconName]
                    return (
                      <div key={category.id}>
                        {/* Category header */}
                        {(activeCategory === null || searchQuery) && (
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                            </div>
                            <h2 className="font-serif text-xl font-bold text-foreground">
                              {t(category.labelKey)}
                            </h2>
                            <div className="flex-1 h-px bg-border/60" aria-hidden="true" />
                          </div>
                        )}
                        <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
                          {category.items.map((item, itemIndex) => (
                            <FaqQuestionLink
                              key={item.slug}
                              question={t(item.questionKey)}
                              answer={t(item.answerKey)}
                              slug={item.slug}
                              index={itemIndex}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
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
