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

export const dynamicParams = false

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
      title: "Usluga nie znaleziona | Ministerstwo Porz\u0105dku",
    }
  }

  const titleMap: Record<string, string> = {
    "projektowa-organizacja-przestrzeni":
      "Projektowa organizacja przestrzeni | Ministerstwo Porz\u0105dku",
    "decluttering-i-organizacja-przestrzeni":
      "Decluttering i organizacja przestrzeni | Ministerstwo Porz\u0105dku",
    "wsparcie-w-przeprowadzce":
      "Wsparcie w Przeprowadzce | Ministerstwo Porz\u0105dku",
    "konsultacja-online":
      "Konsultacja online / stacjonarnie | Ministerstwo Porz\u0105dku",
  }

  const descriptionMap: Record<string, string> = {
    "projektowa-organizacja-przestrzeni":
      "Funkcjonalny dom zaczyna si\u0119 od przemy\u015Blanego projektu. Profesjonalna organizacja przestrzeni w Warszawie.",
    "decluttering-i-organizacja-przestrzeni":
      "Nowy porz\u0105dek, nowa energia, nowa przestrze\u0144. Kompleksowy decluttering i organizacja przestrzeni.",
    "wsparcie-w-przeprowadzce":
      "Tw\u00F3j nowy pocz\u0105tek w perfekcyjnie zorganizowanej przestrzeni. Kompleksowe wsparcie w przeprowadzce.",
    "konsultacja-online":
      "Zaplanowana przestrze\u0144, kt\u00F3r\u0105 mo\u017Cesz wdro\u017Cy\u0107 samodzielnie. Konsultacja online lub stacjonarna.",
  }

  return {
    title: titleMap[slug] || "Us\u0142uga | Ministerstwo Porz\u0105dku",
    description: descriptionMap[slug] || "Profesjonalne us\u0142ugi organizacji przestrzeni.",
    openGraph: {
      title: titleMap[slug] || "Us\u0142uga | Ministerstwo Porz\u0105dku",
      description: descriptionMap[slug] || "Profesjonalne us\u0142ugi organizacji przestrzeni.",
      type: "website",
      locale: "pl_PL",
      siteName: "Ministerstwo Porz\u0105dku",
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
