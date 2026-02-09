"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isThemeSwitching, setIsThemeSwitching] = useState(false)
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const handleThemeToggle = () => {
    setIsThemeSwitching(true)
    toggleTheme()
    setTimeout(() => setIsThemeSwitching(false), 500)
  }

  const handleLanguageToggle = () => {
    setIsLanguageSwitching(true)
    setLanguage(language === "pl" ? "en" : "pl")
    setTimeout(() => setIsLanguageSwitching(false), 400)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)

    if (isHomePage) {
      const sectionId = href.replace("#", "")
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      const hash = href.replace("/", "")
      router.push("/")
      setTimeout(() => {
        const sectionId = hash.replace("#", "")
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  const navLinks = [
    { href: isHomePage ? "#o-mnie" : "/#o-mnie", label: t("nav.about") },
    { href: isHomePage ? "#uslugi" : "/#uslugi", label: t("nav.services") },
    { href: isHomePage ? "#transformacje" : "/#transformacje", label: t("nav.transformations") },
    { href: isHomePage ? "#kontakt" : "/#kontakt", label: t("nav.contact") },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group" aria-label="ministerstwo porządku - Strona główna">
              <Image
                src="/ministerstwo-porzadku-logo.png"
                alt="ministerstwo porządku"
                width={280}
                height={80}
                className="h-12 sm:h-16 w-auto transition-smooth group-hover:opacity-80"
                priority
                loading="eager"
              />
            </a>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleThemeToggle}
                className={`p-2 rounded-lg hover:bg-secondary/50 transition-all duration-500 cursor-pointer ${
                  isThemeSwitching ? "rotate-180 scale-110" : "rotate-0 scale-100"
                }`}
                aria-label={theme === "light" ? "Przełącz na tryb ciemny" : "Przełącz na tryb jasny"}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Sun className="w-5 h-5" aria-hidden="true" />
                )}
              </button>

              <button
                onClick={handleLanguageToggle}
                className={`p-2 rounded-lg hover:bg-secondary/50 transition-all duration-400 flex items-center gap-1 cursor-pointer ${
                  isLanguageSwitching ? "scale-110" : "scale-100"
                }`}
                aria-label={`Zmień język na ${language === "pl" ? "angielski" : "polski"}`}
              >
                <Globe
                  className={`w-5 h-5 transition-transform duration-400 ${isLanguageSwitching ? "rotate-180" : "rotate-0"}`}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium hidden sm:inline" aria-hidden="true">
                  {language.toUpperCase()}
                </span>
              </button>

              <button
                className="p-2 text-foreground z-50 relative transition-transform duration-300 hover:scale-110 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                    aria-hidden="true"
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        className={`fixed inset-0 z-40 transition-all duration-700 ease-in-out ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: isMenuOpen ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)",
        }}
      >
        <div className="absolute inset-0 bg-background/98 backdrop-blur-lg">
          <nav
            className="flex flex-col items-center justify-center h-full gap-6 lg:gap-8 px-8"
            aria-label="Mobile menu"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.isPage) {
                    setIsMenuOpen(false)
                  } else {
                    handleNavClick(e, link.href)
                  }
                }}
                className="text-3xl lg:text-5xl font-serif font-bold text-foreground hover:text-accent transition-all duration-300 hover:translate-x-4"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0) rotate(0deg)" : "translateX(-100px) rotate(-5deg)",
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`,
                }}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className="inline-block hover:scale-105 transition-transform duration-300">{link.label}</span>
              </a>
            ))}

            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4 lg:mt-8 text-lg lg:text-xl px-8 lg:px-12 py-6 lg:py-8"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0) scale(1)" : "translateY(30px) scale(0.8)",
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${navLinks.length * 0.08 + 0.1}s`,
              }}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <a
                href={isHomePage ? "#kontakt" : "/#kontakt"}
                onClick={(e) => handleNavClick(e, isHomePage ? "#kontakt" : "/#kontakt")}
              >
                {t("nav.cta")}
              </a>
            </Button>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 lg:w-16 h-1 bg-accent/30 rounded-full"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "scaleX(1)" : "scaleX(0)",
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.6 + i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
