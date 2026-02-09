export function calculateReadingTime(text: string): number {
  // Average reading speed for Polish: 200 words per minute
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime
}

export function formatReadingTime(minutes: number, lang: "pl" | "en" = "pl"): string {
  if (lang === "pl") {
    return `${minutes} min czytania`
  }
  return `${minutes} min read`
}
