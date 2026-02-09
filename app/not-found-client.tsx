"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, Mail } from "lucide-react"

export default function NotFoundClient() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
        {/* 404 Code */}
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] lg:text-[250px] font-serif font-bold text-secondary/20 leading-none select-none">
            {t("notFound.code")}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-accent/10 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 -mt-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground">
            {t("notFound.title")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">{t("notFound.subtitle")}</p>
          <p className="text-base text-muted-foreground/80 max-w-lg mx-auto leading-relaxed">
            {t("notFound.description")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              {t("notFound.home")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent">
            <Link href="/#uslugi">
              <Briefcase className="w-5 h-5" />
              {t("notFound.services")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent">
            <Link href="/#kontakt">
              <Mail className="w-5 h-5" />
              {t("notFound.contact")}
            </Link>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="pt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  )
}
