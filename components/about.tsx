"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Phone, Calendar, HomeIcon, CheckCircle, Sparkles } from "lucide-react"

export function About() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const workingSteps = [
    {
      icon: Phone,
      title: t("process.step1.title"),
      description: t("process.step1.description"),
    },
    {
      icon: Calendar,
      title: t("process.step2.title"),
      description: t("process.step2.description"),
    },
    {
      icon: HomeIcon,
      title: t("process.step3.title"),
      description: t("process.step3.description"),
    },
    {
      icon: CheckCircle,
      title: t("process.step4.title"),
      description: t("process.step4.description"),
    },
  ]

  return (
    <section id="o-mnie" ref={sectionRef} className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30 leading-7">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}

        {/* Main content */}
        <div className="grid lg:grid-cols-2 items-center lg:gap-16">
          {/* Content side - now first in DOM, but second on mobile */}
          <div
            className={`space-y-6 order-2 lg:order-1 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-foreground mx-0 my-5">{t("about.name")}</h2>
              <p className="text-lg text-accent font-medium">{t("about.role")}</p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t("about.bio1")}</p>
              <p>{t("about.bio2")}</p>
              <p>{t("about.bio3")}</p>
            </div>

            {/* Credentials */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">{t("about.credentials")}</h3>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{t("about.credential1")}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">{t("process.title")}</h3>
              <div className="grid grid-cols-2 gap-3">
                {workingSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={index}
                      className="relative bg-accent/5 border border-accent/20 rounded-lg p-4 hover:bg-accent/10 transition-colors duration-300"
                    >
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>

                      {/* Content */}
                      <h4 className="text-sm font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Image side - now second in DOM, but first on mobile */}
          <div
            className={`relative order-1 lg:order-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{t("about.badge")}</span>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <picture>
                {/* Desktop - WebP (optimized format for large screens) */}
                <source media="(min-width: 768px)" srcSet="/karolina-kalinowska-hero-desktop.webp" type="image/webp" />
                {/* Mobile - WebP (optimized format for mobile) */}
                <source srcSet="/karolina-kalinowska-hero-mobile.webp" type="image/webp" />
                {/* Fallback - Mobile JPG (for browsers that don't support WebP or picture) */}
                <img
                  src="/karolina-kalinowska-hero-mobile.jpg"
                  alt="Karolina Kalinowska z klientką w zorganizowanej, jasnej przestrzeni"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Quote overlay */}
              
            </div>

            {/* Decorative corner element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-accent rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-primary/30 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
