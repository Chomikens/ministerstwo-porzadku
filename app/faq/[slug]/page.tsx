import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqQuestionClient } from "./faq-question-client"
import {
  getFaqQuestionBySlug,
  getRelatedFaqQuestions,
  getAllFaqSlugsFromSanity,
} from "@/lib/sanity.faq-queries"
import { getFaqBySlug, getAllFaqSlugs as getStaticFaqSlugs } from "@/lib/faq-data"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  // Try Sanity first, fall back to static data
  try {
    const sanitySlugs = await getAllFaqSlugsFromSanity("pl")
    if (sanitySlugs.length > 0) {
      return sanitySlugs.map((slug) => ({ slug }))
    }
  } catch {
    // Sanity not available, use static data
  }
  return getStaticFaqSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = true
export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Try Sanity first
  try {
    const question = await getFaqQuestionBySlug(slug, "pl")
    if (question) {
      const title = question.seo?.metaTitle || `${question.question} | FAQ Ministerstwo Porzadku`
      const description = question.seo?.metaDescription || question.shortAnswer.slice(0, 160)
      const canonicalUrl = `https://ministerstwoporzadku.pl/faq/${slug}`

      return {
        title,
        description,
        keywords: `${question.question}, decluttering, organizacja przestrzeni, professional organizer, Warszawa, ${question.category.title}`,
        openGraph: {
          title: question.question,
          description,
          type: "website",
          locale: "pl_PL",
          siteName: "Ministerstwo Porzadku",
          url: canonicalUrl,
        },
        twitter: {
          card: "summary",
          title: question.question,
          description,
        },
        alternates: { canonical: canonicalUrl },
        robots: { index: true, follow: true },
      }
    }
  } catch {
    // Sanity not available
  }

  // Fallback to static data
  const staticResult = getFaqBySlug(slug)
  if (!staticResult) {
    return { title: "Pytanie nie znalezione | Ministerstwo Porzadku" }
  }

  const canonicalUrl = `https://ministerstwoporzadku.pl/faq/${slug}`
  return {
    title: `FAQ | Ministerstwo Porzadku`,
    description: "Czesto zadawane pytania o decluttering i organizacje przestrzeni.",
    alternates: { canonical: canonicalUrl },
  }
}

export default async function FaqQuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Try Sanity first
  let sanityQuestion = null
  let sanityRelated: Awaited<ReturnType<typeof getRelatedFaqQuestions>> = []

  try {
    sanityQuestion = await getFaqQuestionBySlug(slug, "pl")
    if (sanityQuestion) {
      sanityRelated = await getRelatedFaqQuestions(
        sanityQuestion._id,
        sanityQuestion.category._id,
        "pl",
        3
      )
    }
  } catch {
    // Sanity not available
  }

  // If no Sanity data, check static fallback
  if (!sanityQuestion) {
    const staticResult = getFaqBySlug(slug)
    if (!staticResult) {
      notFound()
    }
  }

  // Build JSON-LD
  const questionText = sanityQuestion?.question || slug
  const answerText = sanityQuestion?.shortAnswer || ""
  const canonicalUrl = `https://ministerstwoporzadku.pl/faq/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: questionText,
            acceptedAnswer: {
              "@type": "Answer",
              text: answerText,
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
            name: "Strona glowna",
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
            name: questionText,
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
      <FaqQuestionClient
        slug={slug}
        sanityQuestion={sanityQuestion ? JSON.parse(JSON.stringify(sanityQuestion)) : null}
        sanityRelated={sanityRelated.length > 0 ? JSON.parse(JSON.stringify(sanityRelated)) : null}
      />
      <Footer />
    </>
  )
}
