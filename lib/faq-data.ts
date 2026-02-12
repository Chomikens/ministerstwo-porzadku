export interface FaqItem {
  questionKey: string
  answerKey: string
  slug: string
}

export interface FaqCategory {
  id: string
  labelKey: string
  iconName: "HelpCircle" | "Clock" | "Wallet" | "Sparkles" | "Home" | "Package"
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    labelKey: "faq.category.general",
    iconName: "HelpCircle",
    items: [
      { questionKey: "faq.general.q1", answerKey: "faq.general.a1", slug: "czym-jest-decluttering" },
      { questionKey: "faq.general.q2", answerKey: "faq.general.a2", slug: "wspolpraca-z-professional-organizerem" },
      { questionKey: "faq.general.q3", answerKey: "faq.general.a3", slug: "obecnosc-podczas-organizacji" },
    ],
  },
  {
    id: "process",
    labelKey: "faq.category.process",
    iconName: "Clock",
    items: [
      { questionKey: "faq.process.q1", answerKey: "faq.process.a1", slug: "jak-dlugo-trwa-organizacja-przestrzeni" },
      { questionKey: "faq.process.q2", answerKey: "faq.process.a2", slug: "jak-przygotowac-sie-do-wizyty-organizera" },
      { questionKey: "faq.process.q3", answerKey: "faq.process.a3", slug: "co-z-rzeczami-do-oddania" },
    ],
  },
  {
    id: "pricing",
    labelKey: "faq.category.pricing",
    iconName: "Wallet",
    items: [
      { questionKey: "faq.pricing.q1", answerKey: "faq.pricing.a1", slug: "ile-kosztuje-organizacja-przestrzeni" },
      { questionKey: "faq.pricing.q2", answerKey: "faq.pricing.a2", slug: "czy-muszę-kupowac-organizery" },
      { questionKey: "faq.pricing.q3", answerKey: "faq.pricing.a3", slug: "czy-dojazd-jest-wliczony-w-cene" },
    ],
  },
  {
    id: "services",
    labelKey: "faq.category.services",
    iconName: "Sparkles",
    items: [
      { questionKey: "faq.services.q1", answerKey: "faq.services.a1", slug: "czy-obslugujecie-cala-warszawe" },
      { questionKey: "faq.services.q2", answerKey: "faq.services.a2", slug: "roznica-miedzy-uslugami" },
      { questionKey: "faq.services.q3", answerKey: "faq.services.a3", slug: "uslugi-dla-firm-i-biur" },
    ],
  },
  {
    id: "practical",
    labelKey: "faq.category.practical",
    iconName: "Home",
    items: [
      { questionKey: "faq.practical.q1", answerKey: "faq.practical.a1", slug: "jak-utrzymac-porzadek-po-organizacji" },
      { questionKey: "faq.practical.q2", answerKey: "faq.practical.a2", slug: "organizacja-przestrzeni-z-dziecmi" },
      { questionKey: "faq.practical.q3", answerKey: "faq.practical.a3", slug: "garaz-piwnica-strych-organizacja" },
    ],
  },
]

export function getAllFaqSlugs(): string[] {
  return faqCategories.flatMap((c) => c.items.map((i) => i.slug))
}

export function getFaqBySlug(slug: string): { item: FaqItem; category: FaqCategory } | null {
  for (const category of faqCategories) {
    const item = category.items.find((i) => i.slug === slug)
    if (item) return { item, category }
  }
  return null
}

export function getRelatedFaq(currentSlug: string, categoryId: string, limit = 3): { item: FaqItem; category: FaqCategory }[] {
  const sameCategory = faqCategories
    .find((c) => c.id === categoryId)
    ?.items.filter((i) => i.slug !== currentSlug)
    .map((item) => ({ item, category: faqCategories.find((c) => c.id === categoryId)! })) || []

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)

  const otherCategories = faqCategories
    .filter((c) => c.id !== categoryId)
    .flatMap((c) => c.items.map((item) => ({ item, category: c })))
    .filter((i) => i.item.slug !== currentSlug)

  return [...sameCategory, ...otherCategories].slice(0, limit)
}
