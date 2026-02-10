import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServiceDetail } from "@/components/service-detail"
import { services, getServiceBySlug } from "@/lib/services-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const BASE_URL = "https://ministerstwoporzadku.pl"

// Pre-render all service pages at build time
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export const dynamicParams = false

// SEO data per service
const seoData: Record<
  string,
  {
    title: string
    description: string
    keywords: string
    ogImage: string
    priceRange: string
    serviceType: string
  }
> = {
  "projektowa-organizacja-przestrzeni": {
    title: "Projektowa organizacja przestrzeni | Ministerstwo Porz\u0105dku",
    description:
      "Funkcjonalny dom zaczyna si\u0119 od przemy\u015Blanego projektu. Profesjonalna organizacja przestrzeni w Warszawie \u2013 audyt, projekt i wdro\u017Cenie systemu organizacji.",
    keywords:
      "projektowa organizacja przestrzeni, organizacja domu warszawa, professional organizer warszawa, system organizacji, audyt przestrzeni, projekt wn\u0119trz organizacja",
    ogImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/projektowa-organizacja-przestrzeni-JdjazGwK2WbGOirv67RgGNiBxo98Z9.webp",
    priceRange: "PLN",
    serviceType: "Projektowa organizacja przestrzeni",
  },
  "decluttering-i-organizacja-przestrzeni": {
    title: "Decluttering i organizacja przestrzeni | Ministerstwo Porz\u0105dku",
    description:
      "Nowy porz\u0105dek, nowa energia, nowa przestrze\u0144. Kompleksowy decluttering i organizacja przestrzeni w Warszawie \u2013 selekcja, porz\u0105dkowanie i nowy system.",
    keywords:
      "decluttering warszawa, organizacja przestrzeni, porz\u0105dkowanie domu, selekcja rzeczy, minimalizm, professional organizer, sprz\u0105tanie g\u0142\u0119bokie",
    ogImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uslugi-organizacja-przestrzeni-HWTLyFKYiSrNHXnhYNI4QwNMRFNnVN.webp",
    priceRange: "PLN",
    serviceType: "Decluttering i organizacja przestrzeni",
  },
  "wsparcie-w-przeprowadzce": {
    title: "Wsparcie w Przeprowadzce | Ministerstwo Porz\u0105dku",
    description:
      "Tw\u00F3j nowy pocz\u0105tek w perfekcyjnie zorganizowanej przestrzeni. Kompleksowe wsparcie w przeprowadzce w Warszawie \u2013 pakowanie, organizacja i rozpakowywanie.",
    keywords:
      "wsparcie w przeprowadzce warszawa, organizacja przeprowadzki, pakowanie przeprowadzka, rozpakowywanie, professional organizer przeprowadzka, nowe mieszkanie organizacja",
    ogImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uslugi-przeprowadzki-adIf3hkNhKPxx5GbENHVLtA9HScpVV.webp",
    priceRange: "PLN",
    serviceType: "Wsparcie w Przeprowadzce",
  },
  "konsultacja-online": {
    title: "Konsultacja online / stacjonarnie | Ministerstwo Porz\u0105dku",
    description:
      "Zaplanowana przestrze\u0144, kt\u00F3r\u0105 mo\u017Cesz wdro\u017Cy\u0107 samodzielnie. Konsultacja online lub stacjonarna z professional organizerem \u2013 plan dzia\u0142ania i wsparcie.",
    keywords:
      "konsultacja online organizacja, konsultacja stacjonarna, professional organizer online, plan organizacji przestrzeni, porada organizacja domu, konsultacja decluttering",
    ogImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konsultacja-online-ministerstwo-porzadku-hIFgbW7ZOK0WXPWG6ns0GbP1EBQSfY.webp",
    priceRange: "PLN",
    serviceType: "Konsultacja online / stacjonarnie",
  },
}

// Generate metadata for each service page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  const seo = seoData[slug]

  if (!service || !seo) {
    return {
      title: "Us\u0142uga nie znaleziona | Ministerstwo Porz\u0105dku",
    }
  }

  const canonicalUrl = `${BASE_URL}/uslugi/${slug}`

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Ministerstwo Porz\u0105dku" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "pl_PL",
      siteName: "Ministerstwo Porz\u0105dku",
      url: canonicalUrl,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: seo.serviceType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
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
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  const seo = seoData[slug]

  if (!service || !seo) {
    notFound()
  }

  const canonicalUrl = `${BASE_URL}/uslugi/${slug}`

  // JSON-LD structured data: Service + BreadcrumbList
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: seo.serviceType,
        description: seo.description,
        image: seo.ogImage,
        url: canonicalUrl,
        provider: {
          "@type": ["ProfessionalService", "LocalBusiness"],
          "@id": `${BASE_URL}/#organization`,
          name: "Ministerstwo Porz\u0105dku",
          url: BASE_URL,
          telephone: "+48-501-733-731",
          email: "Karolinap.kalinowska@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Warszawa",
            addressCountry: "PL",
          },
        },
        areaServed: {
          "@type": "City",
          name: "Warszawa",
          containedInPlace: {
            "@type": "Country",
            name: "Polska",
          },
        },
        serviceType: seo.serviceType,
        offers: {
          "@type": "Offer",
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
          url: canonicalUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona g\u0142\u00F3wna",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Us\u0142ugi",
            item: `${BASE_URL}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: seo.serviceType,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: seo.title,
        description: seo.description,
        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },
        about: {
          "@id": `${canonicalUrl}#service`,
        },
        inLanguage: "pl-PL",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navigation />
      <main id="main-content" className="min-h-screen pt-20">
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </>
  )
}
