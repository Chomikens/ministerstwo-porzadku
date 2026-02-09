"use client"

import { Analytics } from "@vercel/analytics/next"
import { useEffect, useState } from "react"
import { canUseAnalytics } from "@/lib/cookie-consent"

export function ConditionalAnalytics() {
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    // Check initial consent
    setShowAnalytics(canUseAnalytics())

    // Listen for consent changes
    const handleConsentChange = () => {
      setShowAnalytics(canUseAnalytics())
    }

    // Listen for custom event when consent changes
    window.addEventListener("cookie-consent-changed", handleConsentChange)

    return () => {
      window.removeEventListener("cookie-consent-changed", handleConsentChange)
    }
  }, [])

  if (!showAnalytics) {
    return null
  }

  return <Analytics mode="production" />
}
