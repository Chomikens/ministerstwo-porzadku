export interface Ebook {
  id: string
  name: string
  description: string
  priceInCents: number
  currency: "PLN" | "USD"
  coverImage: string
  samplePages: string[]
  pageCount: number
  format: string
  category: string
  features: string[]
}

// Source of truth for all ebooks
// To add a new ebook, simply uncomment or add a new entry to this array
export const EBOOKS: Ebook[] = [
  {
    id: "declutter-guide",
    name: "Kompletny Przewodnik po Declutteringu",
    description:
      "Poznaj sprawdzone metody organizacji przestrzeni i pozbycia się niepotrzebnych rzeczy. Ten ebook pomoże Ci stworzyć spokojną i uporządkowaną przestrzeń życiową.",
    priceInCents: 4900, // 49 PLN
    currency: "PLN",
    coverImage: "/ebook-cover-decluttering-guide-minimalist-design.jpg",
    samplePages: ["/ebook-page-organized-closet-tips.jpg", "/ebook-page-decluttering-checklist.jpg"],
    pageCount: 85,
    format: "PDF",
    category: "Dom",
    features: [
      "Krok po kroku proces declutteringu",
      "Checklisty do wydruku",
      "Metody organizacji dla każdego pomieszczenia",
      "Psychologia porządku",
      "Praktyczne wskazówki",
    ],
  },
  {
    id: "office-organization",
    name: "Organizacja Biura Domowego",
    description:
      "Stwórz produktywną przestrzeń do pracy w domu. Dowiedz się, jak zorganizować biuro domowe dla maksymalnej efektywności.",
    priceInCents: 3900, // 39 PLN
    currency: "PLN",
    coverImage: "/ebook-cover-home-office-organization-modern.jpg",
    samplePages: ["/ebook-page-desk-organization-system.jpg", "/ebook-page-cable-management-tips.jpg"],
    pageCount: 62,
    format: "PDF",
    category: "Biuro",
    features: [
      "Ergonomia miejsca pracy",
      "Systemy przechowywania dokumentów",
      "Zarządzanie kablami",
      "Minimalistyczne biuro",
      "Produktywność przez organizację",
    ],
  },
  // {
  //   id: "moving-checklist",
  //   name: "Przeprowadzka bez Stresu",
  //   description:
  //     "Kompletny przewodnik po przeprowadzce. Od pakowania po organizację w nowym miejscu - wszystko czego potrzebujesz.",
  //   priceInCents: 2900, // 29 PLN
  //   currency: "PLN",
  //   coverImage: "/ebook-cover-moving-house-checklist-organized.jpg",
  //   samplePages: ["/ebook-page-packing-timeline-checklist.jpg", "/ebook-page-room-by-room-packing-guide.jpg"],
  //   pageCount: 45,
  //   format: "PDF",
  //   category: "Przeprowadzka",
  //   features: [
  //     "Timeline przeprowadzki",
  //     "Listy pakowania",
  //     "Etykiety do wydruku",
  //     "Organizacja w nowym miejscu",
  //     "Minimalizacja przed przeprowadzką",
  //   ],
  // },
]
