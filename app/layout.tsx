import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import { ConditionalAnalytics } from "@/components/conditional-analytics"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { ContactFormProvider } from "@/contexts/contact-form-context"
import { BackToTop } from "@/components/back-to-top"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "Ministerstwo Porządku | Decluttering Warszawa | Organizacja Przestrzeni Dom i Biuro",
  description:
    "Profesjonalny decluttering i organizacja przestrzeni w Warszawie. Przywróć porządek w domu i biurze. Konsultacje, przeprowadzki, projektowanie. Umów darmową konsultację!",
  keywords:
    "decluttering warszawa, organizacja przestrzeni warszawa, porządek w domu, professional organizer, minimalizm, organizacja biura, sprzątanie, porządkowanie, przeprowadzka warszawa, decluttering mokotów, decluttering śródmieście",
  authors: [{ name: "Ministerstwo Porządku" }],
  openGraph: {
    title: "Ministerstwo Porządku | Decluttering Warszawa",
    description:
      "Profesjonalny decluttering i organizacja przestrzeni w Warszawie. Przywróć porządek w domu i biurze. Umów darmową konsultację!",
    type: "website",
    locale: "pl_PL",
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
    title: "Ministerstwo Porządku | Decluttering Warszawa",
    description:
      "Profesjonalny decluttering i organizacja przestrzeni w Warszawie. Przywróć porządek w domu i biurze. Umów darmową konsultację!",
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
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://ministerstwoporzadku.pl",
    languages: {
      "pl-PL": "https://ministerstwoporzadku.pl",
      "en-US": "https://ministerstwoporzadku.pl/en",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "24",
          bestRating: "5",
          worstRating: "1",
        },
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: "https://ministerstwoporzadku.pl",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "O mnie",
            item: "https://ministerstwoporzadku.pl#about",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Usługi",
            item: "https://ministerstwoporzadku.pl#services",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Realizacje",
            item: "https://ministerstwoporzadku.pl#transformations",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Kontakt",
            item: "https://ministerstwoporzadku.pl#contact",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://ministerstwoporzadku.pl/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Czym jest decluttering?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Decluttering to proces usuwania zbędnych przedmiotów z przestrzeni życiowej, który pomaga stworzyć bardziej funkcjonalny i harmonijny dom. Pomagamy Ci zdecydować, co zachować, a co można oddać lub wyrzucić.",
            },
          },
          {
            "@type": "Question",
            name: "Jak wygląda współpraca z Professional Organizer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Współpraca zaczyna się od bezpłatnej konsultacji, podczas której omawiamy Twoje potrzeby i cele. Następnie tworzymy plan działania i realizujemy go wspólnie, krok po kroku, aż do osiągnięcia wymarzonej przestrzeni.",
            },
          },
          {
            "@type": "Question",
            name: "Jak długo trwa organizacja przestrzeni?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Czas realizacji zależy od wielkości przestrzeni i zakresu prac. Mała szafa może zająć 2-3 godziny, podczas gdy pełna organizacja domu to kilka dni pracy. Wszystko ustalimy podczas wstępnej konsultacji.",
            },
          },
          {
            "@type": "Question",
            name: "Czy obsługujecie całą Warszawę?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tak, obsługujemy całą Warszawę i okolice do 50km, w tym dzielnice: Mokotów, Śródmieście, Ochota, Wola, Żoliborz, Praga i inne.",
            },
          },
          {
            "@type": "Question",
            name: "Czy potrzebuję być obecny podczas organizacji przestrzeni?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tak, Twoja obecność jest ważna, szczególnie podczas declutteringu. Wspólnie podejmujemy decyzje o tym, co zachować. Możemy jednak pracować samodzielnie przy organizowaniu już posegregowanych rzeczy, jeśli wolisz.",
            },
          },
        ],
      },
    ],
  }

  return (
    <html lang="pl" className={`${playfairDisplay.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link
          rel="preload"
          as="image"
          href="/images/design-mode/karolina-kalinowska-hero-intro.jpeg"
          fetchPriority="high"
          imageSrcSet="/images/design-mode/karolina-kalinowska-hero-intro.jpeg?w=640 640w, /images/design-mode/karolina-kalinowska-hero-intro.jpeg?w=750 750w, /images/design-mode/karolina-kalinowska-hero-intro.jpeg?w=828 828w"
          imageSizes="(max-width: 768px) 100vw, 50vw"
        />
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
