"use client"
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Music2 } from "lucide-react"
import { useState } from "react"
import { CookieSettingsModal } from "@/components/cookie-settings-modal"

export function Footer() {
  const { t } = useLanguage()
  const [showCookieSettings, setShowCookieSettings] = useState(false)

  return (
    <>
      <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold">ministerstwo porządku</h3>
              <p className="text-primary-foreground/95 text-sm leading-relaxed">{t("footer.tagline")}</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">{t("footer.quicklinks")}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#uslugi" className="text-primary-foreground/95 hover:text-accent transition-smooth">
                    {t("nav.services")}
                  </a>
                </li>
                <li>
                  <a href="#proces" className="text-primary-foreground/95 hover:text-accent transition-smooth">
                    {t("nav.process")}
                  </a>
                </li>
                <li>
                  <a href="#transformacje" className="text-primary-foreground/95 hover:text-accent transition-smooth">
                    {t("nav.transformations")}
                  </a>
                </li>
                <li>
                  <a href="#opinie" className="text-primary-foreground/95 hover:text-accent transition-smooth">
                    {t("nav.testimonials")}
                  </a>
                </li>
                <li>
                  <a
                    href="/polityka-prywatnosci"
                    className="text-primary-foreground/95 hover:text-accent transition-smooth"
                  >
                    {t("privacy.title")}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowCookieSettings(true)}
                    className="text-primary-foreground/95 hover:text-accent transition-smooth text-left"
                  >
                    {t("footer.manageCookies")}
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">{t("nav.services")}</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-primary-foreground/95">{t("services.home.title")}</li>
                <li className="text-primary-foreground/95">{t("services.office.title")}</li>
                <li className="text-primary-foreground/95">{t("services.moving.title")}</li>
                <li className="text-primary-foreground/95">{t("services.online.title")}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">{t("footer.contact.title")}</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="tel:+48501733731" className="text-primary-foreground/95 hover:text-accent transition-smooth">
                    {t("footer.contact.phone")}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:Karolinap.kalinowska@gmail.com"
                    className="text-primary-foreground/95 hover:text-accent transition-smooth break-all"
                  >
                    {t("footer.contact.email")}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Instagram className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://www.instagram.com/ministerstwo.porzadku/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/95 hover:text-accent transition-smooth"
                  >
                    {t("footer.contact.instagram")}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Music2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://www.tiktok.com/@ministerstwo.porzadku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/95 hover:text-accent transition-smooth"
                  >
                    {t("footer.contact.tiktok")}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Facebook className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://www.facebook.com/profile.php?id=61576931306496"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/95 hover:text-accent transition-smooth"
                  >
                    Facebook
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/95">{t("footer.contact.address")}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/90">© 2025 Ministerstwo Porządku. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>

      <CookieSettingsModal isOpen={showCookieSettings} onClose={() => setShowCookieSettings(false)} onSave={() => {}} />
    </>
  )
}
