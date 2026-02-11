export interface FaqItem {
  question: string
  answer: string
}

export interface FaqCategory {
  id: string
  labelKey: string
  iconName: "HelpCircle" | "Clock" | "Wallet" | "Sparkles" | "Home" | "Package"
  items: { questionKey: string; answerKey: string }[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    labelKey: "faq.category.general",
    iconName: "HelpCircle",
    items: [
      { questionKey: "faq.general.q1", answerKey: "faq.general.a1" },
      { questionKey: "faq.general.q2", answerKey: "faq.general.a2" },
      { questionKey: "faq.general.q3", answerKey: "faq.general.a3" },
    ],
  },
  {
    id: "process",
    labelKey: "faq.category.process",
    iconName: "Clock",
    items: [
      { questionKey: "faq.process.q1", answerKey: "faq.process.a1" },
      { questionKey: "faq.process.q2", answerKey: "faq.process.a2" },
      { questionKey: "faq.process.q3", answerKey: "faq.process.a3" },
    ],
  },
  {
    id: "pricing",
    labelKey: "faq.category.pricing",
    iconName: "Wallet",
    items: [
      { questionKey: "faq.pricing.q1", answerKey: "faq.pricing.a1" },
      { questionKey: "faq.pricing.q2", answerKey: "faq.pricing.a2" },
      { questionKey: "faq.pricing.q3", answerKey: "faq.pricing.a3" },
    ],
  },
  {
    id: "services",
    labelKey: "faq.category.services",
    iconName: "Sparkles",
    items: [
      { questionKey: "faq.services.q1", answerKey: "faq.services.a1" },
      { questionKey: "faq.services.q2", answerKey: "faq.services.a2" },
      { questionKey: "faq.services.q3", answerKey: "faq.services.a3" },
    ],
  },
  {
    id: "practical",
    labelKey: "faq.category.practical",
    iconName: "Home",
    items: [
      { questionKey: "faq.practical.q1", answerKey: "faq.practical.a1" },
      { questionKey: "faq.practical.q2", answerKey: "faq.practical.a2" },
      { questionKey: "faq.practical.q3", answerKey: "faq.practical.a3" },
    ],
  },
]
