"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Sparkles, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { services as servicesData } from "@/lib/services-data"
import Link from "next/link"

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false)

  const services = servicesData.map((s) => ({
    ...s,
    badge: t(s.badgeKey),
    title: t(s.titleKey),
    description: t(s.descriptionKey),
    features: s.featureKeys.map((k) => t(k)),
  }))

  useEffect(() => {
    setHoveredService(null)
  }, [language])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
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
  }, [language])

  const ServiceIcon = ({ icon: Icon }: { icon: React.ElementType }) => {
    return <Icon className="w-4 h-4" />
  }

  return (
    <section id="uslugi" ref={sectionRef} className="px-4 sm:px-6 lg:px-8 relative overflow-hidden py-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <div className="observe-animation opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
            <Sparkles className="w-4 h-4" />
            {t("services.badge")}
          </div>
          <h2 className="observe-animation opacity-0 stagger-1 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            {t("services.title")}
          </h2>
          <p className="observe-animation opacity-0 stagger-2 text-lg text-foreground/70 max-w-2xl mx-auto text-pretty">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-[600px]">
          {services.map((service, index) => {
            const getFlexValue = () => {
              if (!isTabletOrLarger) return 1
              if (hoveredService === null) return 1
              if (hoveredService === index) return 2.5
              return 0.8
            }

            return (
              <Link
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="observe-animation opacity-0 group relative overflow-hidden rounded-2xl hover:shadow-2xl block"
                style={{
                  flex: `${getFlexValue()} 1 0%`,
                  minWidth: isTabletOrLarger && hoveredService === index ? "400px" : "200px",
                  minHeight: "600px",
                  transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  containerType: "inline-size",
                }}
                onMouseEnter={() => isTabletOrLarger && setHoveredService(index)}
                onMouseLeave={() => isTabletOrLarger && setHoveredService(null)}
              >
                <div className="absolute inset-0">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} - ${service.description}`}
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                      service.imagePosition || "object-center"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30 transition-all duration-700 group-hover:from-primary/90 group-hover:via-primary/70" />
                </div>

                <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
                  <div className="flex items-start justify-between">
                    <div className="service-badge-fluid px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-full font-medium text-accent-foreground transition-all duration-500 group-hover:scale-110">
                      {service.badge}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/90">
                      <ServiceIcon icon={service.icon} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="service-title-fluid font-serif font-bold text-white transition-all duration-500 group-hover:text-accent text-balance">
                      {service.title}
                    </h3>

                    <p
                      className={`service-description-fluid text-white/90 transition-all duration-700 overflow-hidden ${
                        !isTabletOrLarger || hoveredService === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {service.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 transition-all duration-700 ${
                        isTabletOrLarger && hoveredService === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      {service.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`service-cta-fluid flex items-center gap-2 text-accent font-medium transition-all duration-500 ${
                        !isTabletOrLarger || hoveredService === index ? "gap-3 opacity-100" : "opacity-100"
                      }`}
                    >
                      {t("services.cta")}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-accent transition-all duration-700 ${
                    isTabletOrLarger && hoveredService === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
