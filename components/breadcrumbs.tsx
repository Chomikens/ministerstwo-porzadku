"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  variant?: "default" | "light"
}

export function Breadcrumbs({ items, className = "", variant = "default" }: BreadcrumbsProps) {
  const { t } = useLanguage()

  const allItems: BreadcrumbItem[] = [
    { label: t("breadcrumbs.home"), href: "/" },
    ...items,
  ]

  const separatorColor = variant === "light"
    ? "text-primary-foreground/40"
    : "text-muted-foreground/60"

  const activeColor = variant === "light"
    ? "text-primary-foreground font-medium"
    : "text-foreground font-medium"

  const linkColor = variant === "light"
    ? "text-primary-foreground/70 hover:text-accent"
    : "text-muted-foreground hover:text-accent"

  return (
    <nav
      aria-label={t("breadcrumbs.label")}
      className={`text-sm ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          const isFirst = index === 0

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${separatorColor}`}
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  className={`truncate max-w-[200px] sm:max-w-[300px] ${activeColor}`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href || "/"}
                  className={`flex items-center gap-1 transition-colors ${linkColor}`}
                >
                  {isFirst && (
                    <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
