"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import type { ServiceData } from "@/lib/services-data"
import Link from "next/link"

function ServiceIcon({ icon: Icon }: { icon: React.ElementType }) {
  return <Icon className="w-4 h-4" />
}

export function ServiceDetail({ service }: { service: ServiceData }) {
  const { t } = useLanguage()
  const router = useRouter()
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

  const handleBookConsultation = () => {
    router.push("/#kontakt")
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Back button */}
        <div className="mb-8 observe-animation opacity-0">
          <Link
            href="/#uslugi"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-smooth group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">{t("services.title")}</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column - Image, price, CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="observe-animation opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
              <ServiceIcon icon={service.icon} />
              {t(service.badgeKey)}
            </div>

            <div className="observe-animation opacity-0 stagger-1 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={service.image || "/placeholder.svg"}
                alt={`${t(service.titleKey)} - ${t(service.descriptionKey)}`}
                className={`w-full h-full object-cover ${service.imagePosition || "object-center"}`}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>

            <div className="observe-animation opacity-0 stagger-2 space-y-3">
              <h3 className="font-serif text-xl font-bold text-foreground">{t("services.starting")}</h3>
              <div className="p-5 bg-accent/5 rounded-2xl border-2 border-accent/20">
                <p className="text-2xl sm:text-3xl font-bold text-accent">{t(service.priceKey)}</p>
              </div>
            </div>

            <div className="observe-animation opacity-0 stagger-3 p-6 bg-accent/5 rounded-2xl border border-accent/20">
              <Button
                onClick={handleBookConsultation}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth hover:scale-105 cursor-pointer"
              >
                {t("services.book")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="observe-animation opacity-0 space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                {t(service.titleKey)}
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed text-pretty">
                {t(service.descriptionKey)}
              </p>
            </div>

            <div className="h-px bg-border" />

            <div className="observe-animation opacity-0 stagger-1 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">{t("services.details")}</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">{t(service.detailsKey)}</p>
            </div>

            {service.forWhomKey && (
              <>
                <div className="h-px bg-border" />
                <div className="observe-animation opacity-0 stagger-2 space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    {t("services.forWhom")}
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed">{t(service.forWhomKey)}</p>
                </div>
              </>
            )}

            <div className="h-px bg-border" />

            <div className="observe-animation opacity-0 stagger-3 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-foreground">{t("services.includes")}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.featureKeys.map((featureKey, idx) => (
                  <div
                    key={featureKey}
                    className="observe-animation opacity-0 flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-smooth"
                    style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground/80 leading-relaxed">{t(featureKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="observe-animation opacity-0 h-1 bg-accent/20 rounded-full"
                  style={{
                    flex: i === 1 ? 2 : 1,
                    animationDelay: `${0.5 + i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
