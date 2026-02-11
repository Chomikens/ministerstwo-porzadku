import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqClient } from "./faq-client"
import { faqCategories } from "@/lib/faq-data"
import { getFaqGroupedByCategory } from "@/lib/sanity.faq-queries"

const BASE_URL = "https://ministerstwoporzadku.pl"

// PL translations for JSON-LD (server-side)
const plTranslations: Record<string, string> = {
  "faq.general.q1": "Czym jest decluttering?",
  "faq.general.a1": "Decluttering to proces \u015Bwiadomego usuwania zb\u0119dnych przedmiot\u00F3w z przestrzeni \u017Cyciowej. To nie tylko sprz\u0105tanie \u2014 to zmiana podej\u015Bcia do tego, co naprawd\u0119 potrzebujesz. Pomagam Ci zdecydowa\u0107, co zachowa\u0107, co odda\u0107, a co mo\u017Cna wyrzuci\u0107, aby Tw\u00F3j dom sta\u0142 si\u0119 bardziej funkcjonalny i harmonijny.",
  "faq.general.q2": "Jak wygl\u0105da wsp\u00F3\u0142praca z Professional Organizerem?",
  "faq.general.a2": "Wsp\u00F3\u0142praca zaczyna si\u0119 od bezp\u0142atnej konsultacji telefonicznej, podczas kt\u00F3rej omawiamy Twoje potrzeby i cele. Nast\u0119pnie tworz\u0119 indywidualny plan dzia\u0142ania i realizuj\u0119 go wsp\u00F3lnie z Tob\u0105, krok po kroku, a\u017C do osi\u0105gni\u0119cia wymarzonej przestrzeni.",
  "faq.general.q3": "Czy musz\u0119 by\u0107 obecny/a podczas organizacji?",
  "faq.general.a3": "Tak, Twoja obecno\u015B\u0107 jest wa\u017Cna, szczeg\u00F3lnie podczas etapu selekcji (declutteringu).",
  "faq.process.q1": "Jak d\u0142ugo trwa organizacja przestrzeni?",
  "faq.process.a1": "Czas realizacji zale\u017Cy od wielko\u015Bci przestrzeni i zakresu prac.",
  "faq.process.q2": "Jak si\u0119 przygotowa\u0107 do wizyty organizera?",
  "faq.process.a2": "Nie musisz robi\u0107 nic specjalnego! Najwa\u017Cniejsze to by\u0107 otwartym na zmiany.",
  "faq.process.q3": "Co dzieje si\u0119 z rzeczami, kt\u00F3re zdecyduj\u0119 si\u0119 odda\u0107?",
  "faq.process.a3": "Pomagam posortowa\u0107 rzeczy na kategorie: do oddania, do sprzeda\u017Cy i do utylizacji.",
  "faq.pricing.q1": "Ile kosztuj\u0105 us\u0142ugi organizacji przestrzeni?",
  "faq.pricing.a1": "Wycena jest indywidualna i zale\u017Cy od zakresu prac, wielko\u015Bci przestrzeni i lokalizacji.",
  "faq.pricing.q2": "Czy musz\u0119 kupowa\u0107 organizery i pojemniki?",
  "faq.pricing.a2": "Nie zawsze! Cz\u0119sto okazuje si\u0119, \u017Ce po declutteringu wystarczy to, co ju\u017C masz.",
  "faq.pricing.q3": "Czy dojazd jest wliczony w cen\u0119?",
  "faq.pricing.a3": "Dojazd w obr\u0119bie Warszawy jest wliczony w cen\u0119 us\u0142ugi.",
  "faq.services.q1": "Czy obs\u0142ugujecie ca\u0142\u0105 Warszaw\u0119?",
  "faq.services.a1": "Tak, obs\u0142uguj\u0119 ca\u0142\u0105 Warszaw\u0119 i okolice do 50 km.",
  "faq.services.q2": "Jaka jest r\u00F3\u017Cnica mi\u0119dzy us\u0142ugami?",
  "faq.services.a2": "Projektowa organizacja to kompleksowy plan od audytu po wdro\u017Cenie systemu.",
  "faq.services.q3": "Czy oferujecie us\u0142ugi dla firm i biur?",
  "faq.services.a3": "Tak! Organizacja przestrzeni biurowej to r\u00F3wnie wa\u017Cna cz\u0119\u015B\u0107 mojej pracy.",
  "faq.practical.q1": "Jak utrzyma\u0107 porz\u0105dek po organizacji?",
  "faq.practical.a1": "Ka\u017Cdy klient otrzymuje ode mnie wskaz\u00F3wki dotycz\u0105ce utrzymania nowego porz\u0105dku.",
  "faq.practical.q2": "Czy organizacja przestrzeni dzia\u0142a z dzie\u0107mi?",
  "faq.practical.a2": "Absolutnie! Tworz\u0119 systemy organizacji dostosowane do wieku dzieci.",
  "faq.practical.q3": "Czy pomagasz r\u00F3wnie\u017C z gara\u017Cem, piwnic\u0105, strychem?",
  "faq.practical.a3": "Tak, organizuj\u0119 ka\u017Cd\u0105 przestrze\u0144 \u2014 od garderoby po gara\u017C, piwnic\u0119, strych.",
}

function tPl(key: string): string {
  return plTranslations[key] || key
}

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
  // Try to fetch from Sanity
  let sanityData: Awaited<ReturnType<typeof getFaqGroupedByCategory>> | null = null
  try {
    const data = await getFaqGroupedByCategory("pl")
    if (data.length > 0) {
      sanityData = data
    }
  } catch {
    // Sanity not available, use static data
  }

  // Build JSON-LD -- prefer Sanity data, fall back to static
  const allQuestions = sanityData
    ? sanityData.flatMap((group) =>
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
    : faqCategories.flatMap((category) =>
        category.items.map((item) => ({
          "@type": "Question" as const,
          name: tPl(item.questionKey),
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: tPl(item.answerKey),
          },
          url: `${BASE_URL}/faq/${item.slug}`,
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
        sanityGroups={sanityData ? JSON.parse(JSON.stringify(sanityData)) : null}
      />
      <Footer />
    </>
  )
}
