"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Home, Briefcase, Package, Sparkles, X, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t, language } = useLanguage()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false)

  const services = [
    {
      icon: Home,
      badge: t("services.home.badge"),
      title: t("services.home.title"),
      description: t("services.home.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/projektowa-organizacja-przestrzeni-JdjazGwK2WbGOirv67RgGNiBxo98Z9.webp",
      features: [
        t("services.home.feature1"),
        t("services.home.feature2"),
        t("services.home.feature3"),
        t("services.home.feature4"),
      ],
      details: t("services.home.details"),
      price: t("services.home.price"),
    },
    {
      icon: Briefcase,
      badge: t("services.office.badge"),
      title: t("services.office.title"),
      description: t("services.office.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uslugi-organizacja-przestrzeni-HWTLyFKYiSrNHXnhYNI4QwNMRFNnVN.webp",
      features: [
        t("services.office.feature1"),
        t("services.office.feature2"),
        t("services.office.feature3"),
        t("services.office.feature4"),
      ],
      details: t("services.office.details"),
      price: t("services.office.price"),
    },
    {
      icon: Package,
      badge: t("services.moving.badge"),
      title: t("services.moving.title"),
      description: t("services.moving.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uslugi-przeprowadzki-adIf3hkNhKPxx5GbENHVLtA9HScpVV.webp",
      features: [
        t("services.moving.feature1"),
        t("services.moving.feature2"),
        t("services.moving.feature3"),
        t("services.moving.feature4"),
      ],
      details: t("services.moving.details"),
      price: t("services.moving.price"),
    },
    {
      icon: Sparkles,
      badge: t("services.online.badge"),
      title: t("services.online.title"),
      description: t("services.online.description"),
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konsultacja-online-ministerstwo-porzadku-hIFgbW7ZOK0WXPWG6ns0GbP1EBQSfY.webp",
      features: [
        t("services.online.feature1"),
        t("services.online.feature2"),
        t("services.online.feature3"),
        t("services.online.feature4"),
      ],
      details: t("services.online.details"),
      price: t("services.online.price"),
    },
  ]

  useEffect(() => {
    setHoveredService(null)
    setSelectedService(null)
  }, [language])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsTabletOrLarger(window.innerWidth >= 768) // md breakpoint
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
  }, [language])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null)
    }
    window.addEventListener("keydown", handleEscape)

    if (selectedService !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [selectedService])

  const handleServiceClick = (index: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    setSelectedService(index)
  }

  const handleBookConsultation = () => {
    setSelectedService(null)
    setTimeout(() => {
      const contactSection = document.getElementById("kontakt")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  const ServiceIcon = ({ icon: Icon }: { icon: React.ElementType }) => {
    return <Icon className="w-4 h-4" />
  }

  return (
    <>
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
                <div
                  key={service.title}
                  className="observe-animation opacity-0 group relative overflow-hidden rounded-2xl cursor-pointer hover:shadow-2xl"
                  style={{
                    flex: `${getFlexValue()} 1 0%`,
                    minWidth: isTabletOrLarger && hoveredService === index ? "400px" : "200px",
                    minHeight: "600px",
                    transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                    containerType: "inline-size",
                  }}
                  onMouseEnter={() => isTabletOrLarger && setHoveredService(index)}
                  onMouseLeave={() => isTabletOrLarger && setHoveredService(null)}
                  onClick={(e) => handleServiceClick(index, e)}
                >
                  <div className="absolute inset-0">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={`${service.title} - ${service.description}`}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        index === 1 ? "object-top" : "object-center"
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
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {selectedService !== null && (
        <div
          className="fixed inset-0 z-50 bg-background"
          style={
            {
              clipPath: "circle(150% at var(--click-x) var(--click-y))",
              "--click-x": `${clickPosition.x}px`,
              "--click-y": `${clickPosition.y}px`,
              animation: "clipPathExpand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            } as React.CSSProperties
          }
        >
          <button
            onClick={() => setSelectedService(null)}
            className="fixed top-8 right-8 z-20 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:scale-110 transition-smooth shadow-xl"
            style={{ animation: "fadeIn 0.6s ease-out 0.4s both" }}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="h-full overflow-y-auto">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5 space-y-6" style={{ animation: "slideInLeft 0.8s ease-out 0.2s both" }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent">
                    <ServiceIcon icon={services[selectedService].icon} />
                    {services[selectedService].badge}
                  </div>

                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={services[selectedService].image || "/placeholder.svg"}
                      alt={`${services[selectedService].title} - ${services[selectedService].description}`}
                      className={`w-full h-full object-cover ${selectedService === 1 ? "object-top" : "object-center"}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-foreground">Cena</h3>
                    <div className="p-5 bg-accent/5 rounded-2xl border-2 border-accent/20">
                      <p className="text-2xl sm:text-3xl font-bold text-accent">{services[selectedService].price}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20">
                    <Button
                      onClick={handleBookConsultation}
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth hover:scale-105"
                    >
                      {t("services.book")}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8" style={{ animation: "slideInRight 0.8s ease-out 0.3s both" }}>
                  <div className="space-y-4">
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                      {services[selectedService].title}
                    </h2>
                    <p className="text-xl text-foreground/70 leading-relaxed text-pretty">
                      {services[selectedService].description}
                    </p>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-foreground">{t("services.details")}</h3>
                    <p className="text-lg text-foreground/70 leading-relaxed">{services[selectedService].details}</p>
                  </div>

                  <div className="h-px bg-border" />

                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-foreground">{t("services.includes")}</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services[selectedService].features.map((feature, idx) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-smooth"
                          style={{ animation: `fadeInUp 0.6s ease-out ${0.5 + idx * 0.1}s both` }}
                        >
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <span className="text-foreground/80 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 bg-accent/20 rounded-full"
                        style={{
                          flex: i === 1 ? 2 : 1,
                          animation: `scaleInWidth 0.6s ease-out ${0.8 + i * 0.1}s both`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
