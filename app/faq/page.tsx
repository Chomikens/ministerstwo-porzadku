import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqClient } from "./faq-client"

export const metadata: Metadata = {
  title: "FAQ | Ministerstwo Porz\u0105dku \u2014 Cz\u0119sto Zadawane Pytania o Decluttering i Organizacj\u0119 Przestrzeni",
  description:
    "Odpowiedzi na najcz\u0119\u015Bciej zadawane pytania o decluttering, organizacj\u0119 przestrzeni, ceny us\u0142ug i wsp\u00F3\u0142prac\u0119 z Professional Organizerem w Warszawie.",
  keywords:
    "FAQ decluttering, pytania organizacja przestrzeni, cena decluttering Warszawa, professional organizer pytania, jak wygl\u0105da decluttering",
  openGraph: {
    title: "FAQ | Ministerstwo Porz\u0105dku",
    description:
      "Odpowiedzi na najcz\u0119\u015Bciej zadawane pytania o decluttering i organizacj\u0119 przestrzeni w Warszawie.",
    type: "website",
    locale: "pl_PL",
    siteName: "Ministerstwo Porz\u0105dku",
  },
  alternates: {
    canonical: "https://ministerstwoporzadku.pl/faq",
  },
}

export default function FaqPage() {
  return (
    <>
      <Navigation />
      <FaqClient />
      <Footer />
    </>
  )
}
