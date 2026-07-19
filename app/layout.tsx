import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import { buildAlternates, OG_LOCALE, type Locale } from "@/lib/i18n"
import { getRequestLocale, getBasePathname } from "@/lib/i18n-server"
import { ConditionalAnalytics } from "@/components/conditional-analytics"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { ContactFormProvider } from "@/contexts/contact-form-context"
import { BackToTop } from "@/components/back-to-top"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import "./globals.css"

// Single source of truth for the viewport meta (replaces a manual <meta> that
// duplicated Next's default). maximum-scale=5 keeps pinch-zoom available.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
  weight: ["700"], // Only load bold weight for headings
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: true, // Improves CLS by matching fallback font metrics
})

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "500", "600", "700"], // Only load weights we actually use
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true, // Improves CLS by matching fallback font metrics
})

const META_BY_LOCALE: Record<Locale, { title: string; description: string; ogTitle: string }> = {
  pl: {
    title: "Decluttering i organizacja przestrzeni — Warszawa",
    description:
      "Profesjonalny decluttering i organizacja przestrzeni w Warszawie. Przywróć porządek w domu i biurze. Konsultacje, przeprowadzki, projektowanie. Umów darmową konsultację!",
    ogTitle: "Ministerstwo Porządku | Decluttering Warszawa",
  },
  en: {
    title: "Decluttering & space organization — Warsaw",
    description:
      "Professional decluttering and space organization in Warsaw. Bring order back to your home and office. Consultations, moving, design. Book a free consultation!",
    ogTitle: "Ministry of Order | Decluttering Warsaw",
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const basePath = await getBasePathname()
  const meta = META_BY_LOCALE[locale]

  return {
    title: meta.title,
    description: meta.description,
    keywords:
      "decluttering warszawa, organizacja przestrzeni warszawa, porządek w domu, professional organizer, minimalizm, organizacja biura, sprzątanie, porządkowanie, przeprowadzka warszawa, decluttering mokotów, decluttering śródmieście",
    authors: [{ name: "Ministerstwo Porządku" }],
    metadataBase: new URL("https://ministerstwoporzadku.pl"),
    openGraph: {
      title: meta.ogTitle,
      description: meta.description,
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: "Ministerstwo Porządku",
      images: [
        {
          url: "/ministerstwo-porzadku-logo.png",
          width: 1200,
          height: 630,
          alt: "Ministerstwo Porządku - Profesjonalna organizacja przestrzeni",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.description,
      images: ["/ministerstwo-porzadku-logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // Canonical + hreflang are derived from the current locale and the internal
    // base path (set by middleware), so every page self-references correctly and
    // service/static pages emit proper PL↔EN pairs. Pages may still override.
    alternates: buildAlternates(basePath, locale),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": "https://ministerstwoporzadku.pl/#organization",
        name: "Ministerstwo Porządku",
        alternateName: "Ministry of Order",
        description:
          "Profesjonalne usługi declutteringu i organizacji przestrzeni dla domu i biura w Warszawie. Certified Professional Organizer.",
        slogan: "Przekształcamy chaos w harmonię",
        url: "https://ministerstwoporzadku.pl",
        logo: {
          "@type": "ImageObject",
          url: "https://ministerstwoporzadku.pl/ministerstwo-porzadku-logo.png",
        },
        image: "https://ministerstwoporzadku.pl/organized-minimalist-living-space-with-natural-lig.jpg",
        telephone: "+48-501-733-731",
        email: "Karolinap.kalinowska@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Warszawa",
          addressCountry: "PL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "52.2297",
          longitude: "21.0122",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Warszawa",
            containedInPlace: {
              "@type": "Country",
              name: "Polska",
            },
          },
          {
            "@type": "Place",
            name: "Mokotów, Warszawa",
          },
          {
            "@type": "Place",
            name: "Śródmieście, Warszawa",
          },
          {
            "@type": "Place",
            name: "Ochota, Warszawa",
          },
          {
            "@type": "Place",
            name: "Wola, Warszawa",
          },
          {
            "@type": "Place",
            name: "Żoliborz, Warszawa",
          },
          {
            "@type": "Place",
            name: "Praga, Warszawa",
          },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: "52.2297",
            longitude: "21.0122",
          },
          geoRadius: "50000",
          description: "Warszawa i okolice do 50km",
        },
        currenciesAccepted: "PLN",
        paymentAccepted: "Gotówka, Przelew",
        // aggregateRating usunięte NA STAŁE — nie przywracać:
        // 1) polityka review snippet wymaga opinii first-party — kopiowanie ocen z GBP/Facebooka
        //    do własnej schemy to naruszenie;
        // 2) od 09.2019 Google ignoruje "self-serving" aggregateRating/review na
        //    LocalBusiness/Organization (podmiot oceniany = właściciel strony) — gwiazdki
        //    w SERP i tak się nie pojawią. Testimonials pokazywać bez markupu ratingu.
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "14:00",
          },
        ],
        sameAs: ["https://www.instagram.com/ministerstwo.porzadku", "https://www.tiktok.com/@ministerstwo.porzadku"],
        founder: {
          "@type": "Person",
          name: "Karolina Kalinowska",
          jobTitle: "Założycielka i Professional Organizer",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Usługi organizacji przestrzeni",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Projektowa organizacja przestrzeni",
                description:
                  "Funkcjonalny dom zaczyna się od przemyślanego projektu. Kompleksowa usługa projektowania organizacji przestrzeni.",
                provider: {
                  "@id": "https://ministerstwoporzadku.pl/#organization",
                },
                areaServed: "Warszawa i okolice",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Decluttering i organizacja przestrzeni",
                description: "Kompleksowa usługa łącząca decluttering po pełną organizację w nowym domu.",
                provider: {
                  "@id": "https://ministerstwoporzadku.pl/#organization",
                },
                areaServed: "Warszawa i okolice",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wsparcie w Przeprowadzce",
                description:
                  "Kompleksowa organizacja przeprowadzki od declutteringu po pełną organizację w nowym domu.",
                provider: {
                  "@id": "https://ministerstwoporzadku.pl/#organization",
                },
                areaServed: "Warszawa i okolice",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Konsultacja online / stacjonarnie",
                description: "Zaplanowana przestrzeń z profesjonalnym wsparciem - online lub stacjonarnie.",
                provider: {
                  "@id": "https://ministerstwoporzadku.pl/#organization",
                },
                areaServed: "Polska",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ministerstwoporzadku.pl/#website",
        url: "https://ministerstwoporzadku.pl",
        name: "Ministerstwo Porządku",
        description: "Profesjonalny decluttering i organizacja przestrzeni",
        publisher: {
          "@id": "https://ministerstwoporzadku.pl/#organization",
        },
        inLanguage: ["pl-PL", "en-US"],
      },
    ],
  }

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* Hero image preload is handled automatically by next/image `priority` in the
            homepage <Hero>. A manual srcset here pointed at a static file with ?w= params
            that don't resize, and preloaded on every route — removed. */}
        <link rel="preload" as="image" href="/ministerstwo-porzadku-logo.png" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" sizes="180x180" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-1/2 focus:-translate-x-1/2 focus:z-[9999] focus:px-8 focus:py-4 focus:text-lg focus:font-bold focus:bg-primary focus:text-primary-foreground focus:rounded-2xl focus:shadow-2xl focus:outline focus:outline-[6px] focus:outline-primary/40 focus:outline-offset-4 focus:min-h-[44px] focus:min-w-[200px] focus:text-center transition-all duration-200"
        >
          Przejdź do głównej treści
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <ContactFormProvider>
              {children}
              <BackToTop />
              <CookieConsentBanner />
              <ConditionalAnalytics />
              <SpeedInsights />
            </ContactFormProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
