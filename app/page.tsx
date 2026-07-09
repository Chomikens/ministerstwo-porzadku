import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Transformation } from "@/components/transformation"
// import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { About } from "@/components/about"

// FAQ + breadcrumb structured data belongs only to the homepage (previously it
// leaked onto every route via the root layout).
const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://ministerstwoporzadku.pl" },
        { "@type": "ListItem", position: 2, name: "O mnie", item: "https://ministerstwoporzadku.pl#about" },
        { "@type": "ListItem", position: 3, name: "Usługi", item: "https://ministerstwoporzadku.pl#services" },
        { "@type": "ListItem", position: 4, name: "Realizacje", item: "https://ministerstwoporzadku.pl#transformations" },
        { "@type": "ListItem", position: 5, name: "Kontakt", item: "https://ministerstwoporzadku.pl#contact" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://ministerstwoporzadku.pl/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Czym jest decluttering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Decluttering to proces usuwania zbędnych przedmiotów z przestrzeni życiowej, który pomaga stworzyć bardziej funkcjonalny i harmonijny dom. Pomagamy Ci zdecydować, co zachować, a co można oddać lub wyrzucić.",
          },
        },
        {
          "@type": "Question",
          name: "Jak wygląda współpraca z Professional Organizer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Współpraca zaczyna się od bezpłatnej konsultacji, podczas której omawiamy Twoje potrzeby i cele. Następnie tworzymy plan działania i realizujemy go wspólnie, krok po kroku, aż do osiągnięcia wymarzonej przestrzeni.",
          },
        },
        {
          "@type": "Question",
          name: "Jak długo trwa organizacja przestrzeni?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Czas realizacji zależy od wielkości przestrzeni i zakresu prac. Mała szafa może zająć 2-3 godziny, podczas gdy pełna organizacja domu to kilka dni pracy. Wszystko ustalimy podczas wstępnej konsultacji.",
          },
        },
        {
          "@type": "Question",
          name: "Czy obsługujecie całą Warszawę?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tak, obsługujemy całą Warszawę i okolice do 50km, w tym dzielnice: Mokotów, Śródmieście, Ochota, Wola, Żoliborz, Praga i inne.",
          },
        },
        {
          "@type": "Question",
          name: "Czy potrzebuję być obecny podczas organizacji przestrzeni?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tak, Twoja obecność jest ważna, szczególnie podczas declutteringu. Wspólnie podejmujemy decyzje o tym, co zachować. Możemy jednak pracować samodzielnie przy organizowaniu już posegregowanych rzeczy, jeśli wolisz.",
          },
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }} />
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Transformation />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
