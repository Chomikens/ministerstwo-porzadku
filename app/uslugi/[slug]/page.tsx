import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServiceDetail } from "@/components/service-detail"
import { services, getServiceBySlug } from "@/lib/services-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// Pre-render all service pages at build time
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

// Generate metadata for each service page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: "Usluga nie znaleziona | Ministerstwo Porzadku",
    }
  }

  const titleMap: Record<string, string> = {
    "projektowa-organizacja-przestrzeni":
      "Projektowa organizacja przestrzeni | Ministerstwo Porzadku",
    "decluttering-i-organizacja-przestrzeni":
      "Decluttering i organizacja przestrzeni | Ministerstwo Porzadku",
    "wsparcie-w-przeprowadzce":
      "Wsparcie w Przeprowadzce | Ministerstwo Porzadku",
    "konsultacja-online":
      "Konsultacja online / stacjonarnie | Ministerstwo Porzadku",
  }

  const descriptionMap: Record<string, string> = {
    "projektowa-organizacja-przestrzeni":
      "Funkcjonalny dom zaczyna sie od przemyslanego projektu. Profesjonalna organizacja przestrzeni w Warszawie.",
    "decluttering-i-organizacja-przestrzeni":
      "Nowy porzadek, nowa energia, nowa przestrzen. Kompleksowy decluttering i organizacja przestrzeni.",
    "wsparcie-w-przeprowadzce":
      "Twoj nowy poczatek w perfekcyjnie zorganizowanej przestrzeni. Kompleksowe wsparcie w przeprowadzce.",
    "konsultacja-online":
      "Zaplanowana przestrzen, ktora mozesz wdrozyc samodzielnie. Konsultacja online lub stacjonarna.",
  }

  return {
    title: titleMap[slug] || "Usluga | Ministerstwo Porzadku",
    description: descriptionMap[slug] || "Profesjonalne uslugi organizacji przestrzeni.",
    openGraph: {
      title: titleMap[slug] || "Usluga | Ministerstwo Porzadku",
      description: descriptionMap[slug] || "Profesjonalne uslugi organizacji przestrzeni.",
      type: "website",
      locale: "pl_PL",
      siteName: "Ministerstwo Porzadku",
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

  if (!service) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-20">
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </>
  )
}
