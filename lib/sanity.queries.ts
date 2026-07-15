import { cache } from "react"
import { client } from "./sanity"
import { calculateReadingTime } from "./reading-time"

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  language: string
}

export interface Author {
  _id: string
  name: string
  image?: any
  bio?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  mainImage: any
  body: any
  category: Category
  author: Author
  publishedAt: string
  _createdAt: string
  _updatedAt?: string
  readingTime?: number
  language: string
  hidden?: boolean
  translationId?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export async function getAllPosts(language = "pl"): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && language == $language && hidden != true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    body,
    language,
    translationId,
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      language
    },
    author->{
      _id,
      name,
      image,
      bio
    },
    publishedAt,
    _createdAt,
    seo
  }`

  const posts = await client.fetch<BlogPost[]>(query, { language })

  return posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(JSON.stringify(post.body)),
  }))
}

export const getPostBySlug = cache(async function getPostBySlug(slug: string, language = "pl"): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug && language == $language][0] {
    _id,
    hidden,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    body,
    language,
    translationId,
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      language
    },
    author->{
      _id,
      name,
      image,
      bio
    },
    publishedAt,
    _createdAt,
    _updatedAt,
    seo
  }`

  const post = await client.fetch<BlogPost | null>(query, { slug, language })

  if (!post) return null

  return {
    ...post,
    readingTime: calculateReadingTime(JSON.stringify(post.body)),
  }
})

/**
 * Resolve the slug of the sibling-language version of a post, matched via the shared
 * `translationId`. Returns null when there is no linked, published counterpart.
 */
export async function getTranslationSlug(
  translationId: string | undefined,
  targetLanguage: string,
): Promise<string | null> {
  if (!translationId) return null
  const query = `*[_type == "blogPost" && translationId == $translationId && language == $targetLanguage && hidden != true][0].slug.current`
  return client.fetch<string | null>(query, { translationId, targetLanguage })
}

export async function getPostsByCategory(categorySlug: string, language = "pl"): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && category->slug.current == $categorySlug && language == $language && hidden != true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    body,
    language,
    category->{
      _id,
      title,
      "slug": slug.current,
      description,
      language
    },
    author->{
      _id,
      name,
      image,
      bio
    },
    publishedAt,
    _createdAt,
    seo
  }`

  const posts = await client.fetch<BlogPost[]>(query, { categorySlug, language })

  return posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(JSON.stringify(post.body)),
  }))
}

export async function getAllCategories(language = "pl"): Promise<Category[]> {
  const query = `*[_type == "category" && language == $language] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    language
  }`

  return client.fetch<Category[]>(query, { language })
}

export async function getCategoryBySlug(slug: string, language = "pl"): Promise<Category | null> {
  const query = `*[_type == "category" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    language
  }`

  return client.fetch<Category | null>(query, { slug, language })
}

export async function getRelatedPosts(
  postId: string,
  categoryId: string,
  language = "pl",
  limit = 3,
): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && _id != $postId && category._ref == $categoryId && language == $language && hidden != true] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    language,
    category->{
      _id,
      title,
      "slug": slug.current,
      language
    },
    publishedAt,
    _createdAt
  }`

  const posts = await client.fetch<BlogPost[]>(query, { postId, categoryId, language, limit })
  return posts
}
