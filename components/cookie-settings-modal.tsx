"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCookieConsent, setCookieConsent, type CookieConsent } from "@/lib/cookie-consent"
import { useLanguage } from "@/contexts/language-context"

interface CookieSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function CookieSettingsModal({ isOpen, onClose, onSave }: CookieSettingsModalProps) {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<CookieConsent>({
    necessary: true,
    functional: true,
    analytics: true,
    timestamp: Date.now(),
  })

  useEffect(() => {
    const consent = getCookieConsent()
    if (consent) {
      setSettings(consent)
    }
  }, [isOpen])

  const handleSave = () => {
    setCookieConsent(settings)
    onSave()
    onClose()
  }

  const handleAcceptAll = () => {
    const newSettings = {
      necessary: true,
      functional: true,
      analytics: true,
      timestamp: Date.now(),
    }
    setSettings(newSettings)
    setCookieConsent(newSettings)
    onSave()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-lg shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">{t("cookies.settings.title")}</h2>
              <p className="text-sm text-muted-foreground">{t("cookies.settings.description")}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cookie Categories */}
          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("cookies.necessary.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.necessary.description")}</p>
                </div>
                <div className="ml-4 flex items-center">
                  <span className="text-sm text-muted-foreground">{t("cookies.alwaysActive")}</span>
                </div>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("cookies.functional.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.functional.description")}</p>
                </div>
                <div className="ml-4 flex items-center">
                  <span className="text-sm text-muted-foreground">{t("cookies.alwaysActive")}</span>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{t("cookies.analytics.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cookies.analytics.description")}</p>
                </div>
                <label className="ml-4 relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              {t("cookies.settings.cancel")}
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {t("cookies.settings.save")}
            </Button>
            <Button onClick={handleAcceptAll} className="flex-1">
              {t("cookies.settings.acceptAll")}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
