"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, Calendar, HomeIcon, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const steps = [
    {
      icon: Phone,
      number: "01",
      title: t("process.step1.title"),
      description: t("process.step1.description"),
      image: "/professional-organizer-on-phone-consultation-smili.jpg",
    },
    {
      icon: Calendar,
      number: "02",
      title: t("process.step2.title"),
      description: t("process.step2.description"),
      image: "/professional-organizer-creating-organization-plan-.jpg",
    },
    {
      icon: HomeIcon,
      number: "03",
      title: t("process.step3.title"),
      description: t("process.step3.description"),
      image: "/professional-organizer-organizing-closet-with-clie.jpg",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: t("process.step4.title"),
      description: t("process.step4.description"),
      image: "/professional-organizer-showing-organized-space-to-.jpg",
    },
  ]

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
    <section id="proces" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="observe-animation opacity-0 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            {t("process.title")}
          </h2>
          <p className="observe-animation opacity-0 stagger-1 text-lg text-foreground/70 max-w-2xl mx-auto text-pretty">
            {t("process.subtitle")}
          </p>
        </div>

        <div className="observe-animation opacity-0 stagger-2 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side: 4 step tiles */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`group relative overflow-hidden rounded-2xl bg-card border transition-all duration-500 cursor-pointer ${
                    activeStep === index
                      ? "border-accent shadow-2xl scale-[1.02]"
                      : "border-border hover:border-accent/50 hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent transition-opacity duration-500 ${
                      activeStep === index ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative p-6 flex items-center gap-6">
                    {/* Icon and number */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          activeStep === index
                            ? "bg-accent scale-110"
                            : "bg-accent/10 group-hover:bg-accent/20 group-hover:scale-105"
                        }`}
                      >
                        <Icon
                          className={`w-8 h-8 transition-colors duration-500 ${
                            activeStep === index ? "text-accent-foreground" : "text-accent"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`font-serif text-sm font-bold transition-colors duration-500 ${
                            activeStep === index ? "text-accent" : "text-foreground/30"
                          }`}
                        >
                          {step.number}
                        </span>
                        <h3
                          className={`font-serif text-xl lg:text-2xl font-bold transition-colors duration-500 ${
                            activeStep === index ? "text-accent" : "text-foreground"
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className={`text-sm lg:text-base leading-relaxed transition-all duration-500 ${
                          activeStep === index ? "text-foreground" : "text-foreground/60"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Progress indicator */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-500 ${
                        activeStep === index ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right side: Owner photo and description */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {t("process.seeHowIWork")}
                </span>
              </div>

              {/* Image container with transition */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-secondary/20 shadow-2xl">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      activeStep === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={step.image || "/placeholder.svg"}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                ))}

                {/* Description overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-5xl font-bold text-accent">{steps[activeStep].number}</span>
                    <div className="h-px flex-1 bg-accent/30" />
                  </div>

                  <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
                    {steps[activeStep].title}
                  </h3>

                  <p className="text-base lg:text-lg text-foreground/80 leading-relaxed">
                    {steps[activeStep].description}
                  </p>

                  {/* Decorative organized lines */}
                  <div className="flex gap-2 pt-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full bg-accent transition-all duration-500 ${
                          i === activeStep ? "w-12" : "w-8 opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
