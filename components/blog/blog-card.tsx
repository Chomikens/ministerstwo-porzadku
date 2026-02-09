import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/sanity.queries"
import { urlFor } from "@/lib/sanity"
import { CategoryBadge } from "./category-badge"
import { ReadingTime } from "./reading-time"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(400).url() : "/placeholder.svg"

  return (
    <article className="group relative flex flex-col h-full">
      {/* Decorative gradient background blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 rounded-2xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main card container */}
      <div className="relative flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl">
        {/* Image container with decorative elements */}
        <Link href={`/blog/${post.slug}`} className="relative">
          <div className="relative aspect-[3/2] overflow-hidden bg-muted">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 gap-4">
          {/* Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <CategoryBadge category={post.category} />
            {post.readingTime && <ReadingTime minutes={post.readingTime} />}
          </div>

          {/* Title and excerpt */}
          <Link href={`/blog/${post.slug}`} className="flex-1 space-y-3">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
          </Link>

          {/* Footer with date and CTA */}
          <div className="flex items-center justify-between pt-4 mt-auto">
            <time className="text-xs md:text-sm text-muted-foreground" dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), "d MMMM yyyy", { locale: pl })}
            </time>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-all group-hover:gap-2.5"
            >
              <span>Czytaj</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorative bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </article>
  )
}
