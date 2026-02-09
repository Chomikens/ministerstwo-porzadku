"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

const transformations = [
  {
    photos: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-2-UX1Lu4LIrLjQmTuUf6s03uz2fQemLg.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-1-qAOMVKiIJnboTKWKEYVESo64s3FG16.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-4-lzaVGF9mVTvbiTCnqW0nLRli76QCTh.webp",
    ],
    titleKey: "transformation.kitchen1.title",
    locationKey: "transformation.kitchen1.location",
    descriptionKey: "transformation.kitchen1.description",
    detailsKey: "transformation.kitchen1.details",
  },
  {
    photos: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-5-VIiFNkub0bNQNRaf2cg2y0EQdJBdas.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-6-6noH5pWxOf8rhEKz3CrEb54NE268Fy.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-7-mGWUX4dEwbSd9AS5uoblMP78dWZf7r.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-9-6aJZ2s9kEeJYVeM9EIxQJGOM899YKF.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kuchnia-8-2Btc4tQG0lvsmGr9VwmQsmmSaiIpKv.webp",
    ],
    titleKey: "transformation.kitchen2.title",
    locationKey: "transformation.kitchen2.location",
    descriptionKey: "transformation.kitchen2.description",
    detailsKey: "transformation.kitchen2.details",
  },
  {
    photos: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garderoba-1-r80wB9eJxO0TBA5r95wiMZO4DVO8XL.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garderoba-2-n8vz0Ls1vNU59eK3v5DaMbIKB2r9K7.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garderoba-3-Mc5nK2r6mZnOAPPeCMRPTdLQ7eOyyb.webp",
    ],
    titleKey: "transformation.wardrobe.title",
    locationKey: "transformation.wardrobe.location",
    descriptionKey: "transformation.wardrobe.description",
    detailsKey: "transformation.wardrobe.details",
  },
]

export function Transformation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isProjectTransitioning, setIsProjectTransitioning] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [photoTouchStart, setPhotoTouchStart] = useState<number | null>(null)
  const [photoTouchEnd, setPhotoTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

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

  const nextSlide = () => {
    setIsProjectTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % transformations.length)
      setCurrentPhotoIndex(0)
      setIsProjectTransitioning(false)
    }, 600)
  }

  const prevSlide = () => {
    setIsProjectTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length)
      setCurrentPhotoIndex(0)
      setIsProjectTransitioning(false)
    }, 600)
  }

  const nextPhoto = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % currentTransformation.photos.length)
      setIsTransitioning(false)
    }, 600)
  }

  const prevPhoto = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhotoIndex(
        (prev) => (prev - 1 + currentTransformation.photos.length) % currentTransformation.photos.length,
      )
      setIsTransitioning(false)
    }, 600)
  }

  const currentTransformation = transformations[currentSlide]

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const onPhotoTouchStart = (e: React.TouchEvent) => {
    setPhotoTouchEnd(null)
    setPhotoTouchStart(e.targetTouches[0].clientX)
  }

  const onPhotoTouchMove = (e: React.TouchEvent) => {
    setPhotoTouchEnd(e.targetTouches[0].clientX)
  }

  const onPhotoTouchEnd = () => {
    if (!photoTouchStart || !photoTouchEnd) return

    const distance = photoTouchStart - photoTouchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextPhoto()
    } else if (isRightSwipe) {
      prevPhoto()
    }
  }

  return (
    <section id="transformacje" ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 observe-animation opacity-0">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            {t("transformation.title")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-pretty">{t("transformation.subtitle")}</p>
        </div>

        <div
          className="observe-animation opacity-0 stagger-2 relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="transition-all duration-600 ease-in-out"
            style={{
              opacity: isProjectTransitioning ? 0 : 1,
              transform: isProjectTransitioning ? "scale(0.95)" : "scale(1)",
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 order-1 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                    {t("transformation.badge")}
                  </span>
                </div>

                <h3 className="font-serif text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                  {t(currentTransformation.titleKey)}
                </h3>
                <p className="text-lg lg:text-xl text-foreground/60 font-medium -mt-2">
                  {t(currentTransformation.locationKey)}
                </p>

                <p className="text-xl lg:text-2xl text-accent font-medium leading-relaxed">
                  {t(currentTransformation.descriptionKey)}
                </p>

                <div className="flex items-center gap-3 py-2">
                  <div className="h-px w-12 bg-accent/40" />
                  <div className="h-1 w-1 rounded-full bg-accent/40" />
                  <div className="h-px w-12 bg-accent/40" />
                </div>

                <p className="text-base lg:text-lg text-foreground/70 leading-relaxed max-w-xl">
                  {t(currentTransformation.detailsKey)}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={prevSlide}
                    disabled={isProjectTransitioning}
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground transition-all duration-300 hover:scale-110 border border-foreground/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={t("transformation.previous")}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-2">
                    {transformations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isProjectTransitioning) {
                            setIsProjectTransitioning(true)
                            setTimeout(() => {
                              setCurrentSlide(index)
                              setCurrentPhotoIndex(0)
                              setIsProjectTransitioning(false)
                            }, 600)
                          }
                        }}
                        disabled={isProjectTransitioning}
                        className={`h-2 rounded-full transition-all duration-500 cursor-pointer disabled:cursor-not-allowed ${
                          index === currentSlide ? "w-12 bg-accent" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                        }`}
                        aria-label={`${t("transformation.goTo")} ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    disabled={isProjectTransitioning}
                    className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground transition-all duration-300 hover:scale-110 border border-foreground/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={t("transformation.next")}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="order-2">
                <div className="space-y-4">
                  <div
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                    onTouchStart={onPhotoTouchStart}
                    onTouchMove={onPhotoTouchMove}
                    onTouchEnd={onPhotoTouchEnd}
                  >
                    <img
                      src={currentTransformation.photos[currentPhotoIndex] || "/placeholder.svg"}
                      alt={`${t(currentTransformation.titleKey)} - ${t("transformation.photoAlt")} ${currentPhotoIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                      style={{
                        clipPath: isTransitioning ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
                        transform: isTransitioning ? "scale(1.1)" : "scale(1)",
                      }}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={prevPhoto}
                      disabled={isTransitioning}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground transition-all duration-300 hover:scale-110 border border-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex gap-2">
                      {currentTransformation.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (!isTransitioning) {
                              setIsTransitioning(true)
                              setTimeout(() => {
                                setCurrentPhotoIndex(index)
                                setIsTransitioning(false)
                              }, 600)
                            }
                          }}
                          disabled={isTransitioning}
                          className={`h-1.5 rounded-full transition-all duration-300 disabled:cursor-not-allowed cursor-pointer ${
                            index === currentPhotoIndex
                              ? "w-8 bg-accent"
                              : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                          }`}
                          aria-label={`Photo ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextPhoto}
                      disabled={isTransitioning}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-foreground transition-all duration-300 hover:scale-110 border border-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-center text-sm text-foreground/60">
                    {currentPhotoIndex + 1} / {currentTransformation.photos.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
