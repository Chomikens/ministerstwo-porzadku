import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqQuestionClient } from "./faq-question-client"
import {
  getFaqQuestionBySlug,
  getRelatedFaqQuestions,
  getAllFaqSlugsFromSanity,
  extractPlainText,
} from "@/lib/sanity.faq-queries"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  try {
    const slugs = await getAllFaqSlugsFromSanity("pl")
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
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

  return {
    title: "Pytanie nie znalezione | Ministerstwo Porzadku",
  }
}

export default async function FaqQuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

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

  if (!sanityQuestion) {
    notFound()
  }

  // Build JSON-LD -- use full Portable Text answer for richer schema
  const questionText = sanityQuestion?.question || slug
  const fullAnswerText = sanityQuestion?.answer
    ? extractPlainText(sanityQuestion.answer)
    : ""
  const answerText = fullAnswerText || sanityQuestion?.shortAnswer || ""
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
        sanityQuestion={JSON.parse(JSON.stringify(sanityQuestion))}
        sanityRelated={sanityRelated.length > 0 ? JSON.parse(JSON.stringify(sanityRelated)) : null}
      />
      <Footer />
    </>
  )
}
