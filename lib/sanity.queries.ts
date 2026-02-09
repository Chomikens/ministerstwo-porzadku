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
  readingTime?: number
  language: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export async function getAllPosts(language = "pl"): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && language == $language] | order(publishedAt desc) {
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

  const posts = await client.fetch<BlogPost[]>(query, { language })
  const filteredPosts = posts.filter((post) => post.language === language)

  return filteredPosts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(JSON.stringify(post.body)),
  }))
}

export async function getPostBySlug(slug: string, language = "pl"): Promise<BlogPost | null> {
  const query = `*[_type == "blogPost" && slug.current == $slug && language == $language][0] {
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

  const post = await client.fetch<BlogPost | null>(query, { slug, language })

  if (!post) return null

  return {
    ...post,
    readingTime: calculateReadingTime(JSON.stringify(post.body)),
  }
}

export async function getPostsByCategory(categorySlug: string, language = "pl"): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost" && category->slug.current == $categorySlug && language == $language] | order(publishedAt desc) {
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
  const query = `*[_type == "blogPost" && _id != $postId && category._ref == $categoryId && language == $language] | order(publishedAt desc) [0...$limit] {
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
