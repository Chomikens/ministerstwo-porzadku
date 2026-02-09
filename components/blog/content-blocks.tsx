"use client"

import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import {
  CheckCircle2,
  Lightbulb,
  Clock,
  Wrench,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ChevronLeft,
  Download,
  FileText,
  ExternalLink,
  Megaphone,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useContactForm } from "@/contexts/contact-form-context"

// 1. Quote Block - clean design without gradients
export function QuoteBlock({ value }: any) {
  return (
    <div className="my-12 relative">
      <div className="absolute -left-4 top-0 w-1 h-full bg-accent rounded-full" />
      <blockquote className="pl-8 pr-6 py-6 bg-secondary/20 rounded-2xl border border-secondary/50">
        <svg className="w-10 h-10 text-accent/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed mb-4">{value.quote}</p>
        {value.author && (
          <cite className="block text-sm font-sans font-medium text-muted-foreground not-italic">— {value.author}</cite>
        )}
      </blockquote>
    </div>
  )
}

// 2. Super Immersive Step-by-Step Process - Visual Journey
export function StepByStepBlock({ value }: any) {
  const [activeStep, setActiveStep] = useState<number>(0)
  const totalSteps = value.steps?.length || 0

  const goToStep = (index: number) => {
    setActiveStep(index)
  }

  const nextStep = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const currentStep = value.steps?.[activeStep]

  return (
    <div className="my-12">
      {/* Header */}
      {value.title && (
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-4">
            <div className="w-2 h-12 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
            {value.title}
            <div className="w-2 h-12 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
          </h3>
          <p className="text-muted-foreground text-lg">
            Krok {activeStep + 1} z {totalSteps}
          </p>
        </div>
      )}

      {/* Visual Timeline Navigation */}
      <div className="mb-12 max-w-4xl mx-auto">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-secondary/30 rounded-full" />
          <div
            className="absolute top-6 left-0 h-1 bg-gradient-to-r from-accent via-accent/80 to-accent rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
          />

          {/* Step indicators */}
          <div className="relative flex justify-between">
            {value.steps?.map((step: any, index: number) => {
              const isActive = activeStep === index
              const isPast = index < activeStep
              const isFuture = index > activeStep

              return (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`group flex flex-col items-center gap-3 transition-all duration-500 ${
                    isActive ? "scale-110" : "scale-100 hover:scale-105"
                  }`}
                  aria-label={`Przejdź do kroku ${index + 1}: ${step.title}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {/* Circle indicator */}
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-2xl shadow-accent/50 ring-4 ring-accent/20"
                        : isPast
                          ? "bg-accent/70 text-accent-foreground shadow-lg"
                          : "bg-secondary/50 text-muted-foreground group-hover:bg-secondary/70"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : <span>{index + 1}</span>}

                    {/* Active pulse effect */}
                    {isActive && <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />}
                  </div>

                  {/* Step label - only show on larger screens */}
                  <span
                    className={`hidden md:block text-xs font-medium text-center max-w-[100px] transition-all duration-300 ${
                      isActive ? "text-accent font-bold" : isPast ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Fixed width wrapper to prevent layout shift */}
        <div className="w-full min-h-[400px]">
          {currentStep && (
            <div key={activeStep} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-secondary/20 via-background to-secondary/10 rounded-3xl p-8 md:p-12 border-2 border-accent/30 shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-2xl -z-10" />

                {/* Step badge */}
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-bold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Krok {activeStep + 1} z {totalSteps}
                </div>

                {/* Title */}
                <h4 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {currentStep.title}
                </h4>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {currentStep.description}
                  </p>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-secondary/30">
                  <button
                    onClick={prevStep}
                    disabled={activeStep === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeStep === 0
                        ? "opacity-40 cursor-not-allowed bg-secondary/20 text-muted-foreground"
                        : "bg-secondary/50 hover:bg-secondary/70 text-foreground hover:scale-105 hover:shadow-lg"
                    }`}
                    aria-label="Poprzedni krok"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Poprzedni</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {value.steps?.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => goToStep(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === activeStep
                            ? "bg-accent w-8"
                            : i < activeStep
                              ? "bg-accent/50"
                              : "bg-secondary/50 hover:bg-secondary/70"
                        }`}
                        aria-label={`Przejdź do kroku ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={activeStep === totalSteps - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeStep === totalSteps - 1
                        ? "opacity-40 cursor-not-allowed bg-secondary/20 text-muted-foreground"
                        : "bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
                    }`}
                    aria-label="Następny krok"
                  >
                    <span className="hidden sm:inline">Następny</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard navigation hint */}
      <p className="text-sm text-muted-foreground mt-8 text-center italic">
        Kliknij na numery aby przejść do konkretnego kroku • Użyj przycisków nawigacji aby poruszać się między krokami
      </p>
    </div>
  )
}

// 3. Before & After Block - clean design
export function BeforeAfterBlock({ value }: any) {
  return (
    <div className="my-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground text-center">Przed</h4>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={urlFor(value.before.image).width(600).height(600).url() || "/placeholder.svg"}
              alt="Przed"
              fill
              className="object-cover"
            />
          </div>
          {value.before.description && (
            <p className="text-sm text-muted-foreground text-center">{value.before.description}</p>
          )}
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground text-center">Po</h4>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={urlFor(value.after.image).width(600).height(600).url() || "/placeholder.svg"}
              alt="Po"
              fill
              className="object-cover"
            />
          </div>
          {value.after.description && (
            <p className="text-sm text-muted-foreground text-center">{value.after.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// 4. Tip Block with website colors
export function TipBlock({ value }: any) {
  return (
    <div className="my-12 relative">
      <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="flex-1">
            {value.title && (
              <h4 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                {value.title}
                <span className="text-xs font-medium px-2 py-1 bg-accent/20 text-accent rounded-full">Wskazówka</span>
              </h4>
            )}
            <p className="text-foreground leading-relaxed">{value.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 7. Interactive Immersive Checklist with completion message
export function ChecklistBlock({ value }: any) {
  const { openContactForm } = useContactForm()
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())
  const totalItems = value.items?.length || 0
  const completedItems = checkedItems.size
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0
  const isComplete = completedItems === totalItems && totalItems > 0

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedItems(newChecked)
  }

  return (
    <div className="my-12">
      {/* Header with progress */}
      <div className="mb-6">
        {value.title && (
          <h4 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-accent rounded-full" />
            {value.title}
          </h4>
        )}

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium">
              Postęp: {completedItems} z {totalItems}
            </span>
            <span className="text-accent font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent/80 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Postęp: ${completedItems} z ${totalItems} zadań ukończonych`}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="bg-secondary/10 rounded-3xl p-6 md:p-8 border border-secondary/30 shadow-sm">
        <ul className="space-y-3" role="list">
          {value.items?.map((item: string, index: number) => {
            const isChecked = checkedItems.has(index)
            return (
              <li
                key={index}
                className={`group transition-all duration-300 ${isChecked ? "opacity-60" : "opacity-100"}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex gap-4 items-start w-full text-left p-4 rounded-xl hover:bg-secondary/20 transition-all duration-300"
                  aria-pressed={isChecked}
                  aria-label={`${isChecked ? "Odznacz" : "Zaznacz"} zadanie: ${item}`}
                >
                  <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isChecked
                          ? "bg-accent scale-110 shadow-lg shadow-accent/30"
                          : "bg-secondary/30 group-hover:bg-secondary/50 group-hover:scale-105"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 transition-all duration-300 ${
                          isChecked ? "text-white scale-100" : "text-accent/50 scale-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Item text */}
                  <span
                    className={`leading-relaxed flex-1 text-base transition-all duration-300 ${
                      isChecked
                        ? "text-muted-foreground line-through"
                        : "text-foreground font-medium group-hover:text-accent"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Completion message with Karolina's photo */}
      {isComplete && (
        <div
          className="mt-8 bg-gradient-to-br from-accent/10 via-secondary/20 to-accent/5 rounded-3xl p-6 md:p-8 border-2 border-accent/30 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500"
          role="alert"
          aria-live="polite"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-4 ring-accent/20 shadow-lg">
                <Image
                  src="/images/design-mode/karolina-kalinowska-hero-intro.jpeg"
                  alt="Karolina Kalinowska - Professional Organizer"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" aria-hidden="true" />
                <h5 className="font-serif text-2xl font-bold text-foreground">Brawo! Kolejny krok za Tobą!</h5>
                <Sparkles className="w-6 h-6 text-accent animate-pulse" aria-hidden="true" />
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Potrzebujesz pomocy w realizacji tych kroków?
              </p>
              <button
                onClick={openContactForm}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
              >
                Umów konsultację
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper text */}
      {!isComplete && (
        <p className="text-sm text-muted-foreground mt-6 text-center italic">
          Kliknij na zadania aby oznaczyć je jako wykonane
        </p>
      )}
    </div>
  )
}

// 8. Enhanced Stat Block with icons, trends, and better visual hierarchy
export function StatBlock({ value }: any) {
  // Icon mapping for different stat types
  const iconMap: { [key: string]: any } = {
    users: "👥",
    homes: "🏠",
    time: "⏰",
    satisfaction: "⭐",
    percentage: "📊",
    growth: "📈",
    default: "✨",
  }

  const icon = value.icon ? iconMap[value.icon] || iconMap.default : iconMap.default

  return (
    <div className="my-12 relative">
      <div className="bg-gradient-to-br from-accent/5 via-secondary/10 to-accent/5 rounded-3xl p-8 md:p-12 border-2 border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Icon section */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-accent/20 flex items-center justify-center text-5xl md:text-6xl shadow-lg">
              {icon}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 text-center md:text-left">
            {/* Main number with trend */}
            <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
              <div className="text-5xl md:text-7xl font-bold text-accent leading-none">{value.number}</div>
              {value.trend && (
                <div className="flex flex-col items-center gap-1">
                  <div className="text-green-600 dark:text-green-500 text-2xl font-bold">↑</div>
                  <div className="text-xs font-semibold text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    +{value.trend}
                  </div>
                </div>
              )}
            </div>

            {/* Label */}
            <div className="text-xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">{value.label}</div>

            {/* Context */}
            {value.context && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">{value.context}</p>
            )}

            {/* Additional metric */}
            {value.subtext && (
              <div className="mt-4 inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-accent">{value.subtext}</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-accent/5 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-secondary/10 rounded-full blur-xl -z-10" />
      </div>
    </div>
  )
}

// 9. Comparison Block - clean design
export function ComparisonBlock({ value }: any) {
  return (
    <div className="my-12">
      {value.title && (
        <h4 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">{value.title}</h4>
      )}
      <div className="relative grid md:grid-cols-2 gap-6">
        {/* VS Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
          <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shadow-xl border-4 border-background">
            VS
          </div>
        </div>

        <div className="bg-secondary/20 rounded-2xl p-8 border-2 border-secondary/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
          <h5 className="font-semibold text-xl text-foreground mb-6 text-center pb-4 border-b border-secondary/50">
            {value.optionA.title}
          </h5>
          <ul className="space-y-3">
            {value.optionA.points?.map((point: string, index: number) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold mt-0.5">
                  •
                </span>
                <span className="text-foreground leading-relaxed flex-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-secondary/20 rounded-2xl p-8 border-2 border-secondary/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
          <h5 className="font-semibold text-xl text-foreground mb-6 text-center pb-4 border-b border-secondary/50">
            {value.optionB.title}
          </h5>
          <ul className="space-y-3">
            {value.optionB.points?.map((point: string, index: number) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold mt-0.5">
                  •
                </span>
                <span className="text-foreground leading-relaxed flex-1">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// 10. Time & Difficulty - clean design
export function TimeDifficultyBlock({ value }: any) {
  const difficultyConfig = {
    easy: {
      color: "text-green-600 dark:text-green-500",
      bg: "bg-green-500/20",
      label: "Łatwy",
      dots: 1,
    },
    medium: {
      color: "text-yellow-600 dark:text-yellow-500",
      bg: "bg-yellow-500/20",
      label: "Średni",
      dots: 2,
    },
    hard: {
      color: "text-red-600 dark:text-red-500",
      bg: "bg-red-500/20",
      label: "Trudny",
      dots: 3,
    },
  }

  const config = difficultyConfig[value.difficulty as keyof typeof difficultyConfig] || difficultyConfig.medium

  return (
    <div className="my-12 bg-secondary/20 rounded-2xl p-8 border border-secondary/30">
      <div className="flex flex-wrap gap-8 justify-center items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
            <Clock className="w-7 h-7 text-accent" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Szacowany czas</div>
            <div className="font-bold text-xl text-foreground">{value.time}</div>
          </div>
        </div>

        <div className="w-px h-16 bg-secondary/50 hidden sm:block" />

        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl ${config.bg} flex items-center justify-center gap-1`}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i < config.dots ? config.color.replace("text-", "bg-") : "bg-muted/30"}`}
              />
            ))}
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Poziom trudności</div>
            <div className={`font-bold text-xl ${config.color}`}>{config.label}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 11. Tools Block - clean design
export function ToolsBlock({ value }: any) {
  return (
    <div className="my-12 bg-secondary/20 rounded-2xl p-8 border border-secondary/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Wrench className="w-5 h-5 text-accent" />
        </div>
        <h4 className="font-semibold text-xl text-foreground">{value.title || "Potrzebne narzędzia"}</h4>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {value.tools?.map((tool: string, index: number) => (
          <div
            key={index}
            className="flex gap-3 items-center p-3 bg-background/50 rounded-xl border border-secondary/30 hover:border-accent/30 transition-all duration-300"
          >
            <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-accent text-sm font-bold">✓</span>
            </div>
            <span className="text-foreground font-medium">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 13. Expandable FAQ Block
export function FAQBlock({ value }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="my-12">
      {value.title && (
        <h4 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">{value.title}</h4>
      )}
      <div className="space-y-4">
        {value.items?.map((item: any, index: number) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="bg-secondary/20 rounded-2xl border border-secondary/30 hover:border-accent/30 transition-all duration-300 overflow-hidden"
            >
              <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex gap-4 p-6 text-left">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-lg text-foreground leading-relaxed pr-8">{item.question}</h5>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed px-6 pb-6 ml-14">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CTABlock({ value }: any) {
  return (
    <div className="my-12 relative">
      <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Icon */}
          {value.showIcon !== false && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Megaphone className="w-8 h-8 text-white" />
            </div>
          )}

          {/* Title */}
          {value.title && (
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{value.title}</h3>
          )}

          {/* Description */}
          {value.description && (
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              {value.description}
            </p>
          )}

          {/* CTA Button */}
          {value.buttonText && (
            <Link
              href={value.buttonLink || "#kontakt"}
              className="inline-flex items-center gap-3 bg-white hover:bg-white/95 text-accent font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg group"
            >
              {value.buttonText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          {/* Optional secondary text */}
          {value.secondaryText && <p className="text-sm text-white/70 mt-6 italic">{value.secondaryText}</p>}
        </div>
      </div>
    </div>
  )
}

export function DownloadBlock({ value }: any) {
  // File type icons and colors
  const fileTypeConfig: Record<string, { icon: string; color: string; bg: string }> = {
    pdf: { icon: "📄", color: "text-red-600 dark:text-red-500", bg: "bg-red-500/10" },
    doc: { icon: "📝", color: "text-blue-600 dark:text-blue-500", bg: "bg-blue-500/10" },
    xlsx: { icon: "📊", color: "text-green-600 dark:text-green-500", bg: "bg-green-500/10" },
    zip: { icon: "📦", color: "text-purple-600 dark:text-purple-500", bg: "bg-purple-500/10" },
    default: { icon: "📎", color: "text-accent", bg: "bg-accent/10" },
  }

  const fileType = value.fileType?.toLowerCase() || "default"
  const config = fileTypeConfig[fileType] || fileTypeConfig.default

  return (
    <div className="my-12">
      <div className="bg-gradient-to-br from-secondary/20 via-background to-secondary/10 rounded-2xl p-6 md:p-8 border-2 border-secondary/30 hover:border-accent/40 transition-all duration-300 hover:shadow-lg group">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* File icon */}
          <div className="flex-shrink-0">
            <div
              className={`w-20 h-20 rounded-2xl ${config.bg} flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {config.icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Title */}
            <h4 className="font-serif text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
              {value.title}
            </h4>

            {/* Description */}
            {value.description && <p className="text-muted-foreground leading-relaxed mb-4">{value.description}</p>}

            {/* File info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {value.fileType && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium uppercase">{value.fileType}</span>
                </div>
              )}
              {value.fileSize && (
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <span>{value.fileSize}</span>
                </div>
              )}
            </div>
          </div>

          {/* Download button */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <a
              href={value.fileUrl || "#"}
              download={value.fileName}
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 w-full md:w-auto"
            >
              <Download className="w-5 h-5" />
              Pobierz
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResourceListBlock({ value }: any) {
  return (
    <div className="my-12">
      {/* Header */}
      {value.title && (
        <div className="mb-8">
          <h3 className="font-serif text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
            <div className="w-1.5 h-10 bg-accent rounded-full" />
            {value.title}
          </h3>
          {value.description && (
            <p className="text-muted-foreground text-lg leading-relaxed ml-6">{value.description}</p>
          )}
        </div>
      )}

      {/* Resources grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {value.resources?.map((resource: any, index: number) => (
          <div
            key={index}
            className="bg-secondary/20 rounded-2xl border border-secondary/30 hover:border-accent/40 transition-all duration-300 hover:shadow-lg overflow-hidden group"
          >
            {/* Image */}
            {resource.image && (
              <div className="relative aspect-video overflow-hidden bg-secondary/30">
                <Image
                  src={urlFor(resource.image).width(400).height(300).url() || "/placeholder.svg"}
                  alt={resource.name || "Resource"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Name */}
              <h4 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                {resource.name}
              </h4>

              {/* Description */}
              {resource.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {resource.description}
                </p>
              )}

              {/* Price and link */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-secondary/30">
                {resource.price && <div className="font-bold text-accent text-lg">{resource.price}</div>}

                {resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/link"
                  >
                    Zobacz
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>

              {/* Optional affiliate notice */}
              {resource.isAffiliate && <p className="text-xs text-muted-foreground mt-3 italic">* Link partnerski</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Optional footer note */}
      {value.footerNote && <p className="text-sm text-muted-foreground mt-6 text-center italic">{value.footerNote}</p>}
    </div>
  )
}
