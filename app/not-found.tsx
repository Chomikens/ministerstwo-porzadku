import type { Metadata } from "next"
import NotFoundClient from "./not-found-client"

export const metadata: Metadata = {
  title: "404 - Strona nie znaleziona | Ministerstwo Porządku",
  description: "Strona nie została znaleziona",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundClient />
}
