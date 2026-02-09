"use client"

import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import {
  QuoteBlock,
  StepByStepBlock,
  BeforeAfterBlock,
  TipBlock,
  ChecklistBlock,
  StatBlock,
  ComparisonBlock,
  TimeDifficultyBlock,
  ToolsBlock,
  FAQBlock,
  CTABlock,
  DownloadBlock,
  ResourceListBlock,
} from "./content-blocks"

const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-2xl font-bold text-foreground mt-8 mb-4 scroll-mt-24">{children}</h3>
    ),
    normal: ({ children }: any) => <p className="text-foreground leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic text-lg text-muted-foreground bg-secondary/30 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-foreground leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="text-foreground leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-accent/80 underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <figure className="my-12">
          {/* Decorative container with subtle gradient border */}
          <div className="relative p-1 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 rounded-2xl">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary/10">
              <Image
                src={urlFor(value).width(1200).height(675).url() || "/placeholder.svg"}
                alt={value.alt || "Blog image"}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground text-center mt-4 italic px-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    quoteBlock: QuoteBlock,
    stepByStepBlock: StepByStepBlock,
    beforeAfterBlock: BeforeAfterBlock,
    tipBlock: TipBlock,
    checklistBlock: ChecklistBlock,
    statBlock: StatBlock,
    comparisonBlock: ComparisonBlock,
    timeDifficultyBlock: TimeDifficultyBlock,
    toolsBlock: ToolsBlock,
    faqBlock: FAQBlock,
    ctaBlock: CTABlock,
    downloadBlock: DownloadBlock,
    resourceListBlock: ResourceListBlock,
  },
}

interface BlogContentProps {
  content: any
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
}
