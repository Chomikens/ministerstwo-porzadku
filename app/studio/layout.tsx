import type { Metadata } from "next"
import type { ReactNode } from "react"

// Panel CMS (Sanity Studio) nie może być indeksowany przez wyszukiwarki.
export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children
}
