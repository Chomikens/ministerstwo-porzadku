"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CookieSettingsModal } from "@/components/cookie-settings-modal"
import { hasConsent, acceptAllCookies, acceptNecessaryOnly } from "@/lib/cookie-consent"
import { useLanguage } from "@/contexts/language-context"

export function CookieConsentBanner() {
  const { t } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Delay banner display so it doesn't become the LCP element
    const show = () => {
      if (!hasConsent()) setShowBanner(true)
    }
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(show, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(show, 2000)
      return () => clearTimeout(id)
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setShowBanner(false)
    // Reload to enable analytics
    window.location.reload()
  }

  const handleRejectAll = () => {
    acceptNecessaryOnly()
    setShowBanner(false)
  }

  const handleSettingsSaved = () => {
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Content */}
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-lg">{t("cookies.banner.title")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("cookies.banner.description")}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)} className="whitespace-nowrap">
                {t("cookies.banner.settings")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="whitespace-nowrap bg-transparent"
              >
                {t("cookies.banner.rejectAll")}
              </Button>
              <Button size="sm" onClick={handleAcceptAll} className="whitespace-nowrap">
                {t("cookies.banner.acceptAll")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CookieSettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} onSave={handleSettingsSaved} />
    </>
  )
}
