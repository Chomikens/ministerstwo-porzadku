"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, HelpCircle, Clock, Wallet, Sparkles, Home, Package } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { SanityFaqQuestion } from "@/lib/sanity.faq-queries"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BlogContent } from "@/components/blog/blog-content"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const iconMap: Record<string, typeof HelpCircle> = {
  HelpCircle,
  Clock,
  Wallet,
  Sparkles,
  Home,
  Package,
}

interface FaqQuestionClientProps {
  slug: string
  sanityQuestion: SanityFaqQuestion
  sanityRelated?: SanityFaqQuestion[] | null
}

export function FaqQuestionClient({ slug, sanityQuestion, sanityRelated }: FaqQuestionClientProps) {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".observe-animation")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const question = sanityQuestion.question
  const categoryName = sanityQuestion.category.title
  const categoryIcon = sanityQuestion.category.icon || "HelpCircle"
  const CategoryIcon = iconMap[categoryIcon] || HelpCircle

  const hasRichAnswer = sanityQuestion.answer && sanityQuestion.answer.length > 0
  const plainAnswer = sanityQuestion.shortAnswer

  const relatedItems = sanityRelated
    ? sanityRelated.map((q) => ({
        slug: q.slug,
        question: q.question,
        categoryName: q.category.title,
        categoryIcon: q.category.icon || "HelpCircle",
      }))
    : []

  return (
    <div ref={sectionRef} className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-secondary/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl relative">
          {/* Breadcrumbs */}
          <div className="mb-8 observe-animation opacity-0">
            <Breadcrumbs
              items={[
                { label: t("faq.page.title"), href: "/faq" },
                { label: categoryName },
                { label: question },
              ]}
            />
          </div>

          {/* Category badge */}
          <div className="observe-animation opacity-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent mb-6">
              <CategoryIcon className="w-4 h-4" aria-hidden="true" />
              {categoryName}
            </div>
          </div>

          {/* Question as H1 */}
          <div className="observe-animation opacity-0 stagger-1">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
              {question}
            </h1>
          </div>
        </div>
      </section>

      {/* Answer Section */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-8">
              <div className="observe-animation opacity-0 stagger-2">
                <div className="p-8 sm:p-10 bg-card rounded-2xl border border-border shadow-sm">
                  {hasRichAnswer ? (
                    <BlogContent content={sanityQuestion.answer} />
                  ) : (
                    <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed whitespace-pre-line">
                      {plainAnswer}
                    </p>
                  )}
                </div>
              </div>

              {/* CTA below answer */}
              <div className="observe-animation opacity-0 stagger-3 mt-8 p-6 bg-accent/5 rounded-2xl border border-accent/20">
                <p className="text-foreground/70 mb-4 text-pretty">
                  {t("faq.question.cta.text")}
                </p>
                <Button
                  asChild
                  className="bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth hover:scale-105"
                >
                  <Link href="/#kontakt">
                    {t("faq.page.cta.button")}
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar - Related Questions */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="observe-animation opacity-0 stagger-3">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                    {t("faq.question.related")}
                  </h2>
                  <div className="space-y-3">
                    {relatedItems.map((rel) => {
                      const RelIcon = iconMap[rel.categoryIcon] || HelpCircle
                      return (
                        <Link
                          key={rel.slug}
                          href={`/faq/${rel.slug}`}
                          className="group block p-4 bg-card rounded-xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                              <RelIcon className="w-4 h-4 text-accent" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-snug text-pretty">
                                {rel.question}
                              </p>
                              <span className="text-xs text-muted-foreground mt-1 block">
                                {rel.categoryName}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Back to all FAQ */}
                <div className="observe-animation opacity-0 stagger-4">
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" aria-hidden="true" />
                    {t("faq.question.backToAll")}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary">
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
    </div>
  )
}
