import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqClient } from "./faq-client"
import { getFaqGroupedByCategory } from "@/lib/sanity.faq-queries"

const BASE_URL = "https://ministerstwoporzadku.pl"

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "FAQ | Ministerstwo Porz\u0105dku \u2014 Cz\u0119sto Zadawane Pytania o Decluttering i Organizacj\u0119 Przestrzeni",
  description:
    "Odpowiedzi na najcz\u0119\u015Bciej zadawane pytania o decluttering, organizacj\u0119 przestrzeni, ceny us\u0142ug i wsp\u00F3\u0142prac\u0119 z Professional Organizerem w Warszawie.",
  keywords:
    "FAQ decluttering, pytania organizacja przestrzeni, cena decluttering Warszawa, professional organizer pytania, jak wygl\u0105da decluttering",
  openGraph: {
    title: "FAQ | Ministerstwo Porz\u0105dku",
    description:
      "Odpowiedzi na najcz\u0119\u015Bciej zadawane pytania o decluttering i organizacj\u0119 przestrzeni w Warszawie.",
    type: "website",
    locale: "pl_PL",
    siteName: "Ministerstwo Porz\u0105dku",
  },
  alternates: {
    canonical: `${BASE_URL}/faq`,
  },
}

export default async function FaqPage() {
  // Fetch from Sanity
  let sanityData: Awaited<ReturnType<typeof getFaqGroupedByCategory>> = []
  try {
    sanityData = await getFaqGroupedByCategory("pl")
  } catch {
    // Sanity not available
  }

  // Build JSON-LD from Sanity data only
  const allQuestions = sanityData.flatMap((group) =>
    group.questions.map((q) => ({
      "@type": "Question" as const,
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: q.shortAnswer,
      },
      url: `${BASE_URL}/faq/${q.slug}`,
    }))
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/faq#faqpage`,
        mainEntity: allQuestions,
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
            name: "FAQ",
            item: `${BASE_URL}/faq`,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/faq#webpage`,
        url: `${BASE_URL}/faq`,
        name: "Cz\u0119sto Zadawane Pytania | Ministerstwo Porz\u0105dku",
        description:
          "Odpowiedzi na najcz\u0119\u015Bciej zadawane pytania o decluttering, organizacj\u0119 przestrzeni i wsp\u00F3\u0142prac\u0119 z Professional Organizerem.",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        inLanguage: "pl-PL",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <FaqClient
        sanityGroups={sanityData.length > 0 ? JSON.parse(JSON.stringify(sanityData)) : null}
      />
      <Footer />
    </>
  )
}
