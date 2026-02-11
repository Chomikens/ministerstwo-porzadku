import { defineField, defineType } from "sanity"
import { FolderIcon } from "@sanity/icons"

export const faqCategory = defineType({
  name: "faqCategory",
  title: "Kategoria FAQ",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nazwa kategorii",
      type: "string",
      description: "Np. Ogolne, Proces, Cennik, Uslugi, Praktyczne",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Nazwa kategorii (EN)",
      type: "string",
      description: "English translation, e.g. General, Process, Pricing",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ikona",
      type: "string",
      description: "Nazwa ikony z Lucide",
      options: {
        list: [
          { title: "Znak zapytania (Ogolne)", value: "HelpCircle" },
          { title: "Zegar (Proces)", value: "Clock" },
          { title: "Portfel (Cennik)", value: "Wallet" },
          { title: "Iskierki (Uslugi)", value: "Sparkles" },
          { title: "Dom (Praktyczne)", value: "Home" },
          { title: "Paczka", value: "Package" },
        ],
      },
      initialValue: "HelpCircle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      description: "Kolejnosc wyswietlania (1 = pierwsza)",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Kolejnosc",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
      icon: "icon",
    },
    prepare({ title, order, icon }) {
      const iconMap: Record<string, string> = {
        HelpCircle: "?",
        Clock: "O",
        Wallet: "$",
        Sparkles: "*",
        Home: "H",
        Package: "P",
      }
      return {
        title: `${order}. ${title}`,
        subtitle: `Ikona: ${icon || "brak"}`,
      }
    },
  },
})
