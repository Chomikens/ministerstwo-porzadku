"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, X, ChevronRight, ChevronLeft, Check, Instagram, Music2, Facebook } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { sendContactEmail } from "@/app/actions/send-email"
import { useContactForm } from "@/contexts/contact-form-context"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const { isOpen: showPopup, openContactForm, closeContactForm } = useContactForm()
  const [currentStep, setCurrentStep] = useState(1)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    problems: [] as string[],
    rooms: [] as string[],
    goal: "",
    preferredDate: "",
    additionalQuestions: "",
    gdprConsent: false,
    _honeypot: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  })

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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Polish phone format: +48 XXX XXX XXX or variations
    const phoneRegex = /^(\+48)?[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/
    return phoneRegex.test(phone.trim())
  }

  const validateStep1 = (): boolean => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      location: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Imię i nazwisko jest wymagane"
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Imię i nazwisko musi mieć co najmniej 3 znaki"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email jest wymagany"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Podaj prawidłowy adres email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Numer telefonu jest wymagany"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Podaj prawidłowy numer telefonu (np. +48 123 456 789)"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Lokalizacja jest wymagana"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleOpenPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })
    openContactForm()
  }

  const handleClosePopup = () => {
    closeContactForm()
    setCurrentStep(1)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      problems: [],
      rooms: [],
      goal: "",
      preferredDate: "",
      additionalQuestions: "",
      gdprConsent: false,
      _honeypot: "",
    })
    setErrors({
      name: "",
      email: "",
      phone: "",
      location: "",
    })
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        return
      }
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check honeypot - if filled, silently reject (bot detected)
    if (formData._honeypot) {
      console.log("[v0] Bot detected via honeypot")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        problems: formData.problems,
        rooms: formData.rooms,
        goal: formData.goal,
        preferredDate: formData.preferredDate,
        additionalQuestions: formData.additionalQuestions,
      })

      if (result.success) {
        console.log("[v0] Email sent successfully")
        setCurrentStep(5) // Show success screen
      } else {
        console.error("[v0] Failed to send email:", result.error)
        setSubmitError(result.error || "Wystąpił błąd podczas wysyłania wiadomości")
      }
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      setSubmitError("Wystąpił błąd podczas wysyłania wiadomości")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name &&
          formData.email &&
          formData.phone &&
          formData.location &&
          !errors.name &&
          !errors.email &&
          !errors.phone &&
          !errors.location
        )
      case 2:
        return formData.problems.length > 0 && formData.rooms.length > 0 && formData.goal
      case 3:
        return true // Optional fields
      case 4:
        return formData.gdprConsent
      default:
        return false
    }
  }

  const handleProblemChange = (problem: string) => {
    setFormData((prev) => ({
      ...prev,
      problems: prev.problems.includes(problem)
        ? prev.problems.filter((p) => p !== problem)
        : [...prev.problems, problem],
    }))
  }

  const handleRoomChange = (room: string) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.includes(room) ? prev.rooms.filter((r) => r !== room) : [...prev.rooms, room],
    }))
  }

  return (
    <section id="kontakt" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="observe-animation opacity-0 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            {t("contact.title")}
          </h2>
          <p className="observe-animation opacity-0 stagger-1 text-lg text-foreground/70 max-w-2xl mx-auto text-pretty">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* CTA Card */}
          <div className="observe-animation opacity-0 stagger-2">
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-lg space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-foreground">{t("contact.form.intro.title")}</h3>
                <p className="text-foreground/70 text-pretty">{t("contact.form.intro.description")}</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">{t("contact.form.intro.email.label")}</p>
                    <a
                      href="mailto:Karolinap.kalinowska@gmail.com"
                      className="text-foreground hover:text-accent transition-smooth font-medium break-all"
                    >
                      Karolinap.kalinowska@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleOpenPopup}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth hover:scale-105"
              >
                {t("contact.form.cta")}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="observe-animation opacity-0 stagger-3 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-6 shadow-lg">
              <h3 className="font-serif text-2xl font-bold text-foreground">{t("contact.info.title")}</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href="mailto:Karolinap.kalinowska@gmail.com"
                      className="text-foreground/70 hover:text-accent transition-smooth break-all"
                    >
                      Karolinap.kalinowska@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{t("contact.phone")}</p>
                    <a href="tel:+48501733731" className="text-foreground/70 hover:text-accent transition-smooth">
                      +48 501 733 731
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{t("contact.location")}</p>
                    <p className="text-foreground/70">{t("contact.info.address")}</p>
                    <p className="text-sm text-foreground/60 mt-1">{t("contact.online")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </CHANGE> */}
      </div>

      {/* Multi-step Form Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            clipPath: showPopup
              ? "circle(150% at var(--click-x) var(--click-y))"
              : "circle(0% at var(--click-x) var(--click-y))",
            // @ts-ignore
            "--click-x": `${clickPosition.x}px`,
            "--click-y": `${clickPosition.y}px`,
            transition: "clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className={`bg-card border border-border rounded-3xl shadow-2xl w-full ${currentStep === 5 ? "max-w-5xl" : "max-w-2xl"} max-h-[90vh] overflow-y-auto`}
          >
            {currentStep < 5 && (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{t("contact.form.title")}</h3>
                    <p className="text-sm text-foreground/60 mt-1">
                      {t("contact.form.step")} {currentStep} {t("contact.form.of")} 4
                    </p>
                  </div>
                  <button
                    onClick={handleClosePopup}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-smooth"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-2 flex-1 rounded-full transition-all ${
                          step <= currentStep ? "bg-accent" : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={handleClosePopup}
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-smooth"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-foreground mb-4">
                      {t("contact.form.step1.title")}
                    </h4>
                    <p className="text-foreground/70 text-sm mb-6">{t("contact.form.step1.description")}</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("contact.form.name")} *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        setErrors({ ...errors, name: "" })
                      }}
                      className={`bg-background border-border placeholder:text-muted-foreground/40 ${errors.name ? "border-red-500" : ""}`}
                      placeholder="Jan Kowalski"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t("contact.form.email")} *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        setErrors({ ...errors, email: "" })
                      }}
                      className={`bg-background border-border placeholder:text-muted-foreground/40 ${errors.email ? "border-red-500" : ""}`}
                      placeholder="jan@example.com"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t("contact.form.phone")} *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        setErrors({ ...errors, phone: "" })
                      }}
                      className={`bg-background border-border placeholder:text-muted-foreground/40 ${errors.phone ? "border-red-500" : ""}`}
                      placeholder="+48 123 456 789"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-foreground">
                      {t("contact.form.location")} *
                    </label>
                    <Input
                      id="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value })
                        setErrors({ ...errors, location: "" })
                      }}
                      className={`bg-background border-border placeholder:text-muted-foreground/40 ${errors.location ? "border-red-500" : ""}`}
                      placeholder="Warszawa / Województwo mazowieckie"
                    />
                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-foreground mb-4">
                      {t("contact.form.step2.title")}
                    </h4>
                    <p className="text-foreground/70 text-sm mb-6">{t("contact.form.step2.description")}</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      {t("contact.form.problem")} *{" "}
                      <span className="text-xs text-foreground/60">(możesz wybrać kilka)</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { value: "no-place", label: t("contact.form.problem.option1") },
                        { value: "messy", label: t("contact.form.problem.option2") },
                        { value: "only-i-know", label: t("contact.form.problem.option3") },
                        { value: "things-damaged", label: t("contact.form.problem.option4") },
                        { value: "big-stocks", label: t("contact.form.problem.option5") },
                        { value: "dont-know", label: t("contact.form.problem.option6") },
                        { value: "not-pretty", label: t("contact.form.problem.option7") },
                        { value: "other", label: t("contact.form.problem.option8") },
                      ].map((problem) => (
                        <label
                          key={problem.value}
                          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-smooth ${
                            formData.problems.includes(problem.value)
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.problems.includes(problem.value)}
                            onChange={() => handleProblemChange(problem.value)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          />
                          <span className="text-sm text-foreground">{problem.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      {t("contact.form.room")} *{" "}
                      <span className="text-xs text-foreground/60">(możesz wybrać kilka)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "kitchen", label: t("contact.form.room.option1") },
                        { value: "pantry", label: t("contact.form.room.option2") },
                        { value: "wardrobe", label: t("contact.form.room.option3") },
                        { value: "living-room", label: t("contact.form.room.option4") },
                        { value: "bedroom", label: t("contact.form.room.option5") },
                        { value: "kids-room", label: t("contact.form.room.option6") },
                        { value: "bathroom", label: t("contact.form.room.option7") },
                        { value: "hallway", label: t("contact.form.room.option8") },
                        { value: "garage", label: t("contact.form.room.option9") },
                        { value: "attic", label: t("contact.form.room.option10") },
                        { value: "storage", label: t("contact.form.room.option11") },
                        { value: "other", label: t("contact.form.room.option12") },
                      ].map((room) => (
                        <label
                          key={room.value}
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-smooth ${
                            formData.rooms.includes(room.value)
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.rooms.includes(room.value)}
                            onChange={() => handleRoomChange(room.value)}
                            className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          />
                          <span className="text-sm text-foreground">{room.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goal" className="text-sm font-medium text-foreground">
                      {t("contact.form.goal")} *
                    </label>
                    <Textarea
                      id="goal"
                      required
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="bg-background border-border min-h-24 placeholder:text-muted-foreground/40"
                      placeholder="Na przykład - więcej przestrzeni"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Additional Details */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-foreground mb-4">
                      {t("contact.form.step3.title")}
                    </h4>
                    <p className="text-foreground/70 text-sm mb-6">{t("contact.form.step3.description")}</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="preferredDate" className="text-sm font-medium text-foreground">
                      {t("contact.form.preferredDate")}
                    </label>
                    <Input
                      id="preferredDate"
                      type="text"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="bg-background border-border placeholder:text-muted-foreground/40"
                      placeholder="np. Pierwsza połowa grudnia, weekendy"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="additionalQuestions" className="text-sm font-medium text-foreground">
                      {t("contact.form.additionalQuestions")}
                    </label>
                    <Textarea
                      id="additionalQuestions"
                      value={formData.additionalQuestions}
                      onChange={(e) => setFormData({ ...formData, additionalQuestions: e.target.value })}
                      className="bg-background border-border min-h-32 placeholder:text-muted-foreground/40"
                      placeholder={t("contact.form.additionalQuestions.placeholder")}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: GDPR Consent */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-foreground mb-4">
                      {t("contact.form.step4.title")}
                    </h4>
                  </div>

                  <div className="bg-secondary/50 border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="gdprConsent"
                        checked={formData.gdprConsent}
                        onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded border-border text-accent focus:ring-accent"
                      />
                      <label htmlFor="gdprConsent" className="text-sm text-foreground/80 leading-relaxed">
                        {t("contact.form.gdpr")}{" "}
                        <a
                          href="/polityka-prywatnosci"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {t("contact.form.privacyPolicy")}
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                      <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Success Screen */}
              {currentStep === 5 && (
                <div className="grid md:grid-cols-2 gap-12 animate-fade-in py-8">
                  {/* Left Column: Text Content */}
                  <div className="flex flex-col justify-center space-y-10 px-4">
                    <div className="space-y-6">
                      <h4 className="font-serif text-4xl font-bold text-foreground leading-tight">
                        {t("contact.form.success.title")}
                      </h4>
                      <p className="text-foreground/70 text-lg leading-relaxed text-pretty">
                        {t("contact.form.success.message")}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 space-y-6">
                      <p className="text-base font-semibold text-foreground">{t("contact.form.success.contact")}</p>
                      <div className="space-y-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                          <a href="tel:+48501733731" className="text-foreground/80 hover:text-accent transition-smooth">
                            +48 501 733 731
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                          <a
                            href="mailto:Karolinap.kalinowska@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/80 hover:text-accent transition-smooth break-all"
                          >
                            Karolinap.kalinowska@gmail.com
                          </a>
                        </div>
                        <div className="pt-3 border-t border-accent/20 space-y-3">
                          <div className="flex items-center gap-2">
                            <Instagram className="w-4 h-4 text-accent" />
                            <a
                              href="https://www.instagram.com/ministerstwo.porzadku/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-accent transition-smooth"
                            >
                              @ministerstwo.porzadku
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Music2 className="w-4 h-4 text-accent" />
                            <a
                              href="https://www.tiktok.com/@ministerstwo.porzadku"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-accent transition-smooth"
                            >
                              @ministerstwo.porzadku
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Facebook className="w-4 h-4 text-accent" />
                            <a
                              href="https://www.facebook.com/profile.php?id=61576931306496"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground/80 hover:text-accent transition-smooth"
                            >
                              Facebook
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={handleClosePopup}
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                    >
                      {t("contact.form.success.close")}
                    </Button>
                  </div>

                  {/* Right Column: Image */}
                  <div className="relative w-full h-full min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden">
                    <Image
                      src="/ministerstwo-porzadku-kontakt.webp"
                      alt="Karolina - Ministerstwo Porządku"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex gap-3 pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      size="lg"
                      className="flex-1 bg-transparent"
                      disabled={isSubmitting}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      {t("contact.form.back")}
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      size="lg"
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {t("contact.form.next")}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid() || isSubmitting}
                      size="lg"
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {isSubmitting ? "Wysyłanie..." : t("contact.form.submit")}
                      {!isSubmitting && <Check className="w-5 h-5 ml-2" />}
                    </Button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
