import type { BlogPost } from "@/lib/sanity.queries"
import { BlogCard } from "./blog-card"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="relative">
      <div className="mb-12">
        {/* Modern section header with decorative elements */}
        <div className="flex items-center gap-6 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Czytaj więcej</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 via-accent/20 to-transparent" />
        </div>
        <p className="text-muted-foreground text-sm md:text-base">Odkryj więcej inspirujących artykułów</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
