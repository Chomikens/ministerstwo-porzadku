import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqQuestionClient } from "./faq-question-client"
import { getAllFaqSlugs, getFaqBySlug, faqCategories } from "@/lib/faq-data"
import { notFound } from "next/navigation"

// Pre-render all FAQ question pages at build time
export function generateStaticParams() {
  return getAllFaqSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

// Hard-coded PL translations for metadata (server component can't use useLanguage)
const plTranslations: Record<string, string> = {
  "faq.general.q1": "Czym jest decluttering?",
  "faq.general.q2": "Jak wygl\u0105da wsp\u00F3\u0142praca z Professional Organizerem?",
  "faq.general.q3": "Czy musz\u0119 by\u0107 obecny/a podczas organizacji?",
  "faq.process.q1": "Jak d\u0142ugo trwa organizacja przestrzeni?",
  "faq.process.q2": "Jak si\u0119 przygotowa\u0107 do wizyty organizera?",
  "faq.process.q3": "Co dzieje si\u0119 z rzeczami, kt\u00F3re zdecyduj\u0119 si\u0119 odda\u0107?",
  "faq.pricing.q1": "Ile kosztuj\u0105 us\u0142ugi organizacji przestrzeni?",
  "faq.pricing.q2": "Czy musz\u0119 kupowa\u0107 organizery i pojemniki?",
  "faq.pricing.q3": "Czy dojazd jest wliczony w cen\u0119?",
  "faq.services.q1": "Czy obs\u0142ugujecie ca\u0142\u0105 Warszaw\u0119?",
  "faq.services.q2": "Jaka jest r\u00F3\u017Cnica mi\u0119dzy us\u0142ugami?",
  "faq.services.q3": "Czy oferujecie us\u0142ugi dla firm i biur?",
  "faq.practical.q1": "Jak utrzyma\u0107 porz\u0105dek po organizacji?",
  "faq.practical.q2": "Czy organizacja przestrzeni dzia\u0142a z dzie\u0107mi?",
  "faq.practical.q3": "Czy pomagasz r\u00F3wnie\u017C z gara\u017Cem, piwnic\u0105, strychem?",
  "faq.general.a1": "Decluttering to proces \u015Bwiadomego usuwania zb\u0119dnych przedmiot\u00F3w z przestrzeni \u017Cyciowej. To nie tylko sprz\u0105tanie \u2014 to zmiana podej\u015Bcia do tego, co naprawd\u0119 potrzebujesz.",
  "faq.general.a2": "Wsp\u00F3\u0142praca zaczyna si\u0119 od bezp\u0142atnej konsultacji telefonicznej, podczas kt\u00F3rej omawiamy Twoje potrzeby i cele.",
  "faq.general.a3": "Tak, Twoja obecno\u015B\u0107 jest wa\u017Cna, szczeg\u00F3lnie podczas etapu selekcji (declutteringu).",
  "faq.process.a1": "Czas realizacji zale\u017Cy od wielko\u015Bci przestrzeni i zakresu prac.",
  "faq.process.a2": "Nie musisz robi\u0107 nic specjalnego! Najwa\u017Cniejsze to by\u0107 otwartym na zmiany.",
  "faq.process.a3": "Pomagam posortowa\u0107 rzeczy na kategorie: do oddania, do sprzeda\u017Cy i do utylizacji.",
  "faq.pricing.a1": "Wycena jest indywidualna i zale\u017Cy od zakresu prac, wielko\u015Bci przestrzeni i lokalizacji.",
  "faq.pricing.a2": "Nie zawsze! Cz\u0119sto okazuje si\u0119, \u017Ce po declutteringu wystarczy to, co ju\u017C masz.",
  "faq.pricing.a3": "Dojazd w obr\u0119bie Warszawy jest wliczony w cen\u0119 us\u0142ugi.",
  "faq.services.a1": "Tak, obs\u0142uguj\u0119 ca\u0142\u0105 Warszaw\u0119 i okolice do 50 km.",
  "faq.services.a2": "Projektowa organizacja to kompleksowy plan od audytu po wdro\u017Cenie systemu.",
  "faq.services.a3": "Tak! Organizacja przestrzeni biurowej to r\u00F3wnie wa\u017Cna cz\u0119\u015B\u0107 mojej pracy.",
  "faq.practical.a1": "Ka\u017Cdy klient otrzymuje ode mnie wskaz\u00F3wki dotycz\u0105ce utrzymania nowego porz\u0105dku.",
  "faq.practical.a2": "Absolutnie! Tworz\u0119 systemy organizacji dostosowane do wieku dzieci.",
  "faq.practical.a3": "Tak, organizuj\u0119 ka\u017Cd\u0105 przestrze\u0144 \u2014 od garderoby po gara\u017C, piwnic\u0119, strych.",
  "faq.category.general": "Og\u00F3lne",
  "faq.category.process": "Proces",
  "faq.category.pricing": "Cennik",
  "faq.category.services": "Us\u0142ugi",
  "faq.category.practical": "Praktyczne",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = getFaqBySlug(slug)

  if (!result) {
    return { title: "Pytanie nie znalezione | Ministerstwo Porz\u0105dku" }
  }

  const question = plTranslations[result.item.questionKey] || slug
  const answer = plTranslations[result.item.answerKey] || ""
  const categoryName = plTranslations[result.category.labelKey] || ""
  const canonicalUrl = `https://ministerstwoporzadku.pl/faq/${slug}`

  return {
    title: `${question} | FAQ Ministerstwo Porz\u0105dku`,
    description: answer.slice(0, 160),
    keywords: `${question}, decluttering, organizacja przestrzeni, professional organizer, Warszawa, ${categoryName}`,
    openGraph: {
      title: question,
      description: answer.slice(0, 160),
      type: "website",
      locale: "pl_PL",
      siteName: "Ministerstwo Porz\u0105dku",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      title: question,
      description: answer.slice(0, 160),
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function FaqQuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = getFaqBySlug(slug)

  if (!result) {
    notFound()
  }

  // Build JSON-LD for this single FAQ question
  const question = plTranslations[result.item.questionKey] || slug
  const answer = plTranslations[result.item.answerKey] || ""
  const canonicalUrl = `https://ministerstwoporzadku.pl/faq/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona g\u0142\u00F3wna",
            item: "https://ministerstwoporzadku.pl",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "FAQ",
            item: "https://ministerstwoporzadku.pl/faq",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: question,
            item: canonicalUrl,
          },
        ],
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
      <FaqQuestionClient slug={slug} />
      <Footer />
    </>
  )
}
