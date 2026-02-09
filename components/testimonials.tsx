"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Home, Briefcase, Package, Video, Tag, Sparkles, X, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type ServiceType = "all" | "home" | "office" | "moving" | "online"

const testimonials = [
  {
    nameKey: "testimonials.client1.name",
    locationKey: "testimonials.client1.location",
    textKey: "testimonials.client1.text",
    rating: 5,
    service: "home" as ServiceType,
    featured: true, // Added featured flag for larger cards
  },
  {
    nameKey: "testimonials.client2.name",
    locationKey: "testimonials.client2.location",
    textKey: "testimonials.client2.text",
    rating: 5,
    service: "office" as ServiceType,
    featured: false,
  },
  {
    nameKey: "testimonials.client3.name",
    locationKey: "testimonials.client3.location",
    textKey: "testimonials.client3.text",
    rating: 5,
    service: "moving" as ServiceType,
    featured: true, // Featured testimonial
  },
  {
    nameKey: "testimonials.client4.name",
    locationKey: "testimonials.client4.location",
    textKey: "testimonials.client4.text",
    rating: 5,
    service: "home" as ServiceType,
    featured: false,
  },
  {
    nameKey: "testimonials.client5.name",
    locationKey: "testimonials.client5.location",
    textKey: "testimonials.client5.text",
    rating: 5,
    service: "online" as ServiceType,
    featured: false,
  },
  {
    nameKey: "testimonials.client6.name",
    locationKey: "testimonials.client6.location",
    textKey: "testimonials.client6.text",
    rating: 5,
    service: "office" as ServiceType,
    featured: false,
  },
]

const filterOptions = [
  { value: "all" as ServiceType, label: "Wszystkie", labelEn: "All", icon: Tag, color: "from-accent/20 to-accent/10" },
  { value: "home" as ServiceType, label: "Dom", labelEn: "Home", icon: Home, color: "from-[#F6E5D4] to-[#DECEAC]" },
  {
    value: "office" as ServiceType,
    label: "Biuro",
    labelEn: "Office",
    icon: Briefcase,
    color: "from-[#9B9883] to-[#656348]",
  },
  {
    value: "moving" as ServiceType,
    label: "Przeprowadzki",
    labelEn: "Moving",
    icon: Package,
    color: "from-[#EF9C6C] to-accent",
  },
  {
    value: "online" as ServiceType,
    label: "Online",
    labelEn: "Online",
    icon: Video,
    color: "from-accent to-[#EF9C6C]",
  },
]

const getServiceColor = (service: ServiceType) => {
  return filterOptions.find((f) => f.value === service)?.color || "from-accent/20 to-accent/10"
}

export function Testimonials() {
  const [activeFilter, setActiveFilter] = useState<ServiceType>("all")
  const [isOrganizing, setIsOrganizing] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<(typeof testimonials)[0] | null>(null)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()

  const filteredTestimonials =
    activeFilter === "all" ? testimonials : testimonials.filter((t) => t.service === activeFilter)

  const handleFilterChange = (filter: ServiceType) => {
    if (filter === activeFilter) return
    setIsOrganizing(true)
    setTimeout(() => {
      setActiveFilter(filter)
      setTimeout(() => setIsOrganizing(false), 50)
    }, 300)
  }

  const handleTestimonialClick = (testimonial: (typeof testimonials)[0], event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setSelectedTestimonial(testimonial)
    document.body.style.overflow = "hidden"
  }

  const closePopup = () => {
    setSelectedTestimonial(null)
    document.body.style.overflow = "unset"
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0")
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

  return (
    <section
      id="opinie"
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-3">
          <div className="observe-animation opacity-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-sm font-semibold mb-4 border border-accent/20">
            <Sparkles className="w-4 h-4" />
            {language === "pl" ? "Zorganizowane opinie" : "Organized Reviews"}
          </div>
          <h2 className="observe-animation opacity-0 stagger-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t("testimonials.title")}
          </h2>
          <p className="observe-animation opacity-0 stagger-2 text-base text-foreground/70 max-w-2xl mx-auto text-pretty">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="observe-animation opacity-0 stagger-3 flex flex-wrap justify-center gap-3 mb-10">
          {filterOptions.map((option) => {
            const Icon = option.icon
            const isActive = activeFilter === option.value
            return (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`
                  group relative px-6 py-3.5 rounded-2xl font-semibold transition-all duration-500
                  flex items-center gap-3 overflow-hidden border-2
                  ${
                    isActive
                      ? "bg-gradient-to-r " + option.color + " text-foreground shadow-xl scale-105 border-accent/30"
                      : "bg-card text-foreground/60 hover:text-foreground hover:shadow-lg hover:scale-105 border-border/50 hover:border-accent/30"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span className="text-sm">{language === "pl" ? option.label : option.labelEn}</span>
                <span
                  className={`
                  text-xs px-2.5 py-1 rounded-full font-bold transition-all duration-500
                  ${isActive ? "bg-white/30 text-foreground" : "bg-muted text-foreground/60 group-hover:bg-accent/20"}
                `}
                >
                  {option.value === "all"
                    ? testimonials.length
                    : testimonials.filter((t) => t.service === option.value).length}
                </span>
              </button>
            )
          })}
        </div>

        <div
          className={`
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500
          ${isOrganizing ? "opacity-0 scale-95" : "opacity-100 scale-100"}
        `}
        >
          {filteredTestimonials.map((testimonial, index) => {
            const serviceOption = filterOptions.find((f) => f.value === testimonial.service)
            const Icon = serviceOption?.icon || Tag

            return (
              <Card
                key={testimonial.nameKey}
                onClick={(e) => handleTestimonialClick(testimonial, e)}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
                className={`
                  group relative border-2 border-border/50 hover:border-accent/30
                  bg-card hover:shadow-xl transition-all duration-500 hover:-translate-y-1
                  overflow-hidden rounded-2xl cursor-pointer
                  ${!isOrganizing ? "animate-organize-in" : ""}
                `}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${serviceOption?.color} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="relative p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${serviceOption?.color} backdrop-blur-sm border border-white/20 shadow-md`}
                    >
                      <Icon className="w-4 h-4 text-foreground" />
                      <span className="font-semibold text-xs text-foreground">
                        {language === "pl" ? serviceOption?.label : serviceOption?.labelEn}
                      </span>
                    </div>

                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "fill-accent text-accent" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-serif font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-500">
                      {t(testimonial.nameKey)}
                    </p>
                    <p className="text-xs text-foreground/60 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {t(testimonial.locationKey)}
                    </p>
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{t(testimonial.textKey)}</p>

                  <div className="flex items-center gap-2 text-xs text-accent font-semibold pt-2">
                    <span>{language === "pl" ? "Czytaj więcej" : "Read more"}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </CardContent>

                <div
                  className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${serviceOption?.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-tl-[60px]`}
                />
              </Card>
            )
          })}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-base">
              {language === "pl" ? "Brak opinii w tej kategorii" : "No testimonials in this category"}
            </p>
          </div>
        )}
      </div>

      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={
            {
              clipPath: "circle(150% at var(--click-x) var(--click-y))",
              "--click-x": `${clickPosition.x}px`,
              "--click-y": `${clickPosition.y}px`,
              animation: "clipPathExpand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            } as React.CSSProperties
          }
        >
          <div className="absolute inset-0 bg-background/98 backdrop-blur-xl" onClick={closePopup} />

          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-2xl border-2 border-accent/20 animate-fade-in">
            <button
              onClick={closePopup}
              className="sticky top-4 right-4 float-right z-10 p-3 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-all duration-300 hover:rotate-90 hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12 space-y-8">
              {(() => {
                const serviceOption = filterOptions.find((f) => f.value === selectedTestimonial.service)
                const Icon = serviceOption?.icon || Tag

                return (
                  <>
                    <div className="space-y-6">
                      <div
                        className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${serviceOption?.color} backdrop-blur-sm border border-white/20 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-foreground" />
                        <span className="font-bold text-base text-foreground">
                          {language === "pl" ? serviceOption?.label : serviceOption?.labelEn}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-8 h-8 fill-accent text-accent animate-fade-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="relative py-8">
                      <Quote className="absolute -left-2 -top-2 w-16 h-16 text-accent/10" />
                      <p className="relative text-xl md:text-2xl text-foreground/90 leading-relaxed font-light px-8">
                        {t(selectedTestimonial.textKey)}
                      </p>
                      <Quote className="absolute -right-2 -bottom-2 w-16 h-16 text-accent/10 rotate-180" />
                    </div>

                    <div className="flex gap-3 py-6">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full bg-gradient-to-r ${serviceOption?.color} animate-fade-in`}
                          style={{
                            width: i === 0 ? "30%" : i === 1 ? "25%" : i === 2 ? "20%" : i === 3 ? "15%" : "10%",
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t-2 border-border/50">
                      <p className="font-serif font-bold text-3xl text-accent">{t(selectedTestimonial.nameKey)}</p>
                      <p className="text-base text-foreground/70 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        {t(selectedTestimonial.locationKey)}
                      </p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
