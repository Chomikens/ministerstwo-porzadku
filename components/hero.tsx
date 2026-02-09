"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

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

    const elements = heroRef.current?.querySelectorAll(".observe-animation")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="observe-animation opacity-0 stagger-2 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/design-mode/karolina-kalinowska-hero-intro.jpeg"
                alt="Karolina Kalinowska - Założycielka Ministerstwa Porządku"
                fill
                className="object-cover transition-smooth hover:scale-105"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px"
                quality={80}
                loading="eager"
                fetchPriority="high"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden="true" />
            </div>
            <figure className="absolute -bottom-6 -right-6 bg-card/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border-2 border-border/50 max-w-xs lg:max-w-xs sm:max-w-[280px] mx-0 mt-8 sm:mt-11 px-4 sm:px-6 z-10">
              <blockquote className="text-sm font-medium text-foreground italic">"{t("hero.testimonial")}"</blockquote>
              <figcaption className="text-xs text-foreground/60 mt-2">— {t("hero.testimonial.author")}</figcaption>
            </figure>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6 text-center lg:text-left order-1 lg:order-2">
            <div
              className="observe-animation opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium text-foreground"
              aria-label="Badge"
            >
              <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
              {t("hero.badge")}
            </div>

            <h1 className="observe-animation opacity-0 stagger-1 font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {t("hero.title")}
            </h1>

            <p className="observe-animation opacity-0 stagger-2 text-base sm:text-lg text-foreground/70 leading-normal max-w-2xl mx-auto lg:mx-0 text-pretty">
              <strong>{t("hero.description.brand")}</strong> {t("hero.description.rest")}
            </p>

            <p className="observe-animation opacity-0 stagger-2 text-base sm:text-lg text-foreground/70 leading-normal max-w-2xl mx-auto lg:mx-0 text-pretty">
              {t("hero.description2")}
            </p>

            <div className="observe-animation opacity-0 stagger-2">
              <div className="relative overflow-hidden">
                <div
                  className={`transition-all duration-700 ease-in-out ${
                    isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <div className="pt-3 pb-4 space-y-3">
                    <p className="text-base text-foreground/80 leading-normal max-w-2xl mx-auto lg:mx-0 text-pretty">
                      {t("hero.company.description")}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium mt-2"
                aria-expanded={isExpanded}
                aria-controls="company-description"
                aria-label={isExpanded ? t("hero.company.seeLess") : t("hero.company.seeMore")}
              >
                <span>{isExpanded ? t("hero.company.seeLess") : t("hero.company.seeMore")}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 -z-10 bg-accent/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            </div>

            <div className="observe-animation opacity-0 stagger-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6 transition-smooth hover:scale-105"
              >
                <a href="#kontakt" aria-label={t("hero.cta.primary")}>
                  {t("hero.cta.primary")}
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8 py-6 transition-smooth bg-transparent"
              >
                <a href="#uslugi" aria-label={t("hero.cta.secondary")}>
                  {t("hero.cta.secondary")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
