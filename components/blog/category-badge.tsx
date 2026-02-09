import Link from "next/link"
import type { Category } from "@/lib/sanity.queries"

interface CategoryBadgeProps {
  category: Category
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link
      href={`/blog/kategoria/${category.slug}`}
      className="inline-block px-3 py-1 text-sm font-medium bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
    >
      {category.title}
    </Link>
  )
}
