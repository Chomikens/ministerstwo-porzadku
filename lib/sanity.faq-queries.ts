import { cache } from "react"
import { client } from "./sanity"

// Extract plain text from Portable Text blocks for JSON-LD schema
export function extractPlainText(portableText: any[]): string {
  if (!portableText || !Array.isArray(portableText)) return ""
  return portableText
    .filter((block: any) => block._type === "block" && block.children)
    .map((block: any) =>
      block.children
        .filter((child: any) => child._type === "span")
        .map((span: any) => span.text)
        .join("")
    )
    .join(" ")
    .trim()
}

export interface SanityFaqCategory {
  _id: string
  title: string
  titleEn?: string
  slug: string
  icon: string
  order: number
}

export interface SanityFaqQuestion {
  _id: string
  question: string
  slug: string
  shortAnswer: string
  answer: any // Portable Text content
  category: SanityFaqCategory
  order: number
  language: string
  publishedAt: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// Get all FAQ categories
export async function getAllFaqCategories(): Promise<SanityFaqCategory[]> {
  const query = `*[_type == "faqCategory"] | order(order asc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    icon,
    order
  }`

  return client.fetch<SanityFaqCategory[]>(query)
}

// Get all FAQ questions for a language
export async function getAllFaqQuestions(language = "pl"): Promise<SanityFaqQuestion[]> {
  const query = `*[_type == "faqQuestion" && language == $language] | order(category->order asc, order asc) {
    _id,
    question,
    "slug": slug.current,
    shortAnswer,
    answer,
    category->{
      _id,
      title,
      titleEn,
      "slug": slug.current,
      icon,
      order
    },
    order,
    language,
    publishedAt,
    seo
  }`

  return client.fetch<SanityFaqQuestion[]>(query, { language })
}

// Get single FAQ question by slug
export const getFaqQuestionBySlug = cache(async function getFaqQuestionBySlug(
  slug: string,
  language = "pl"
): Promise<SanityFaqQuestion | null> {
  const query = `*[_type == "faqQuestion" && slug.current == $slug && language == $language][0] {
    _id,
    question,
    "slug": slug.current,
    shortAnswer,
    answer,
    category->{
      _id,
      title,
      titleEn,
      "slug": slug.current,
      icon,
      order
    },
    order,
    language,
    publishedAt,
    seo
  }`

  return client.fetch<SanityFaqQuestion | null>(query, { slug, language })
})

// Get related FAQ questions (same category, excluding current)
export async function getRelatedFaqQuestions(
  questionId: string,
  categoryId: string,
  language = "pl",
  limit = 3
): Promise<SanityFaqQuestion[]> {
  const query = `*[_type == "faqQuestion" && _id != $questionId && category._ref == $categoryId && language == $language] | order(order asc) [0...$limit] {
    _id,
    question,
    "slug": slug.current,
    shortAnswer,
    category->{
      _id,
      title,
      titleEn,
      "slug": slug.current,
      icon,
      order
    },
    order,
    language,
    publishedAt
  }`

  const sameCategory = await client.fetch<SanityFaqQuestion[]>(query, {
    questionId,
    categoryId,
    language,
    limit,
  })

  // If not enough from same category, get from other categories
  if (sameCategory.length < limit) {
    const remaining = limit - sameCategory.length
    const otherQuery = `*[_type == "faqQuestion" && _id != $questionId && category._ref != $categoryId && language == $language] | order(order asc) [0...$remaining] {
      _id,
      question,
      "slug": slug.current,
      shortAnswer,
      category->{
        _id,
        title,
        titleEn,
        "slug": slug.current,
        icon,
        order
      },
      order,
      language,
      publishedAt
    }`

    const others = await client.fetch<SanityFaqQuestion[]>(otherQuery, {
      questionId,
      categoryId,
      language,
      remaining,
    })

    return [...sameCategory, ...others]
  }

  return sameCategory
}

// Get all FAQ slugs for static generation
export async function getAllFaqSlugsFromSanity(language = "pl"): Promise<string[]> {
  const query = `*[_type == "faqQuestion" && language == $language].slug.current`
  return client.fetch<string[]>(query, { language })
}

// Get FAQ questions grouped by category
export async function getFaqGroupedByCategory(language = "pl"): Promise<{
  category: SanityFaqCategory
  questions: SanityFaqQuestion[]
}[]> {
  const categories = await getAllFaqCategories()
  const questions = await getAllFaqQuestions(language)

  return categories
    .map((category) => ({
      category,
      questions: questions.filter((q) => q.category._id === category._id),
    }))
    .filter((group) => group.questions.length > 0)
}
