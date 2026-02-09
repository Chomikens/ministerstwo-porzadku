import { defineType } from "sanity"
import {
  BulbOutlineIcon,
  ClipboardIcon,
  TrendUpwardIcon,
  ComposeIcon,
  CogIcon,
  PlayIcon,
  RefreshIcon,
  BellIcon,
  DownloadIcon,
  LinkIcon,
} from "@sanity/icons"

// 1. Quote Block
export const quoteBlock = defineType({
  name: "quoteBlock",
  title: "Cytat",
  type: "object",
  icon: ComposeIcon,
  fields: [
    {
      name: "quote",
      title: "Treść cytatu",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor cytatu",
      type: "string",
    },
  ],
  preview: {
    select: {
      quote: "quote",
      author: "author",
    },
    prepare({ quote, author }) {
      return {
        title: `"${quote.substring(0, 50)}..."`,
        subtitle: author ? `— ${author}` : "Cytat",
      }
    },
  },
})

// 2. Step-by-Step Process
export const stepByStepBlock = defineType({
  name: "stepByStepBlock",
  title: "Proces Krok po Kroku",
  type: "object",
  icon: PlayIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł procesu",
      type: "string",
    },
    {
      name: "steps",
      title: "Kroki",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Tytuł kroku",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    },
  ],
  preview: {
    select: {
      title: "title",
      steps: "steps",
    },
    prepare({ title, steps }) {
      return {
        title: title || "Proces krok po kroku",
        subtitle: `${steps?.length || 0} kroków`,
      }
    },
  },
})

// 3. Before & After
export const beforeAfterBlock = defineType({
  name: "beforeAfterBlock",
  title: "Przed/Po",
  type: "object",
  icon: RefreshIcon,
  fields: [
    {
      name: "before",
      title: "Przed",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Zdjęcie",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Opis",
          type: "text",
          rows: 2,
        },
      ],
    },
    {
      name: "after",
      title: "Po",
      type: "object",
      fields: [
        {
          name: "image",
          title: "Zdjęcie",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Opis",
          type: "text",
          rows: 2,
        },
      ],
    },
  ],
  preview: {
    select: {
      beforeImage: "before.image",
      afterImage: "after.image",
    },
    prepare({ beforeImage }) {
      return {
        title: "Przed/Po",
        media: beforeImage,
      }
    },
  },
})

// 4. Tip Box
export const tipBlock = defineType({
  name: "tipBlock",
  title: "Wskazówka",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
    },
    {
      name: "content",
      title: "Treść",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      content: "content",
    },
    prepare({ title, content }) {
      return {
        title: title || "Wskazówka",
        subtitle: content?.substring(0, 50),
      }
    },
  },
})

// 5. Warning Box

// 6. Success Story

// 7. Checklist
export const checklistBlock = defineType({
  name: "checklistBlock",
  title: "Checklista",
  type: "object",
  icon: ClipboardIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
    },
    {
      name: "items",
      title: "Elementy",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(2),
    },
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Checklista",
        subtitle: `${items?.length || 0} elementów`,
      }
    },
  },
})

// 8. Stat Highlight
export const statBlock = defineType({
  name: "statBlock",
  title: "Statystyka",
  type: "object",
  icon: TrendUpwardIcon,
  fields: [
    {
      name: "number",
      title: "Liczba",
      type: "string",
      description: "Główna statystyka (np. '85%', '200+', '3h')",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "label",
      title: "Opis",
      type: "string",
      description: "Krótki opis statystyki",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "context",
      title: "Kontekst",
      type: "text",
      description: "Dodatkowy kontekst lub wyjaśnienie (opcjonalne)",
      rows: 3,
    },
    {
      name: "icon",
      title: "Typ ikony",
      type: "string",
      description: "Wybierz ikonę reprezentującą tę statystykę",
      options: {
        list: [
          { title: "✨ Domyślna", value: "default" },
          { title: "👥 Użytkownicy/Klienci", value: "users" },
          { title: "🏠 Domy", value: "homes" },
          { title: "⏰ Czas", value: "time" },
          { title: "⭐ Satysfakcja", value: "satisfaction" },
          { title: "📊 Procent", value: "percentage" },
          { title: "📈 Wzrost", value: "growth" },
        ],
      },
      initialValue: "default",
    },
    {
      name: "trend",
      title: "Wskaźnik trendu",
      type: "string",
      description: "Opcjonalnie: Pokaż wzrost (np. '15%', '50')",
    },
    {
      name: "subtext",
      title: "Dodatkowy tekst",
      type: "string",
      description: "Opcjonalnie: Dodatkowy mały tekst poniżej (np. 'w ostatnim roku')",
    },
  ],
  preview: {
    select: {
      number: "number",
      label: "label",
      icon: "icon",
    },
    prepare({ number, label, icon }) {
      const iconMap: Record<string, string> = {
        users: "👥",
        homes: "🏠",
        time: "⏰",
        satisfaction: "⭐",
        percentage: "📊",
        growth: "📈",
        default: "✨",
      }
      const displayIcon = icon ? iconMap[icon] || "📊" : "📊"
      return {
        title: `${displayIcon} ${number}`,
        subtitle: label,
      }
    },
  },
})

// 9. Comparison
export const comparisonBlock = defineType({
  name: "comparisonBlock",
  title: "Porównanie",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
    },
    {
      name: "optionA",
      title: "Opcja A",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Tytuł",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "points",
          title: "Punkty",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: "optionB",
      title: "Opcja B",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Tytuł",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "points",
          title: "Punkty",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      optionA: "optionA.title",
      optionB: "optionB.title",
    },
    prepare({ title, optionA, optionB }) {
      return {
        title: title || "Porównanie",
        subtitle: `${optionA} vs ${optionB}`,
      }
    },
  },
})

// 10. Time & Difficulty
export const timeDifficultyBlock = defineType({
  name: "timeDifficultyBlock",
  title: "Czas i Trudność",
  type: "object",
  fields: [
    {
      name: "time",
      title: "Szacowany czas",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "difficulty",
      title: "Poziom trudności",
      type: "string",
      options: {
        list: [
          { title: "Łatwy", value: "easy" },
          { title: "Średni", value: "medium" },
          { title: "Trudny", value: "hard" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      time: "time",
      difficulty: "difficulty",
    },
    prepare({ time, difficulty }) {
      const difficultyLabels: Record<string, string> = {
        easy: "Łatwy",
        medium: "Średni",
        hard: "Trudny",
      }
      return {
        title: `${time} • ${difficultyLabels[difficulty] || difficulty}`,
        subtitle: "Czas i trudność",
      }
    },
  },
})

// 11. Tools Needed
export const toolsBlock = defineType({
  name: "toolsBlock",
  title: "Potrzebne Narzędzia",
  type: "object",
  icon: CogIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
    },
    {
      name: "tools",
      title: "Narzędzia",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: "title",
      tools: "tools",
    },
    prepare({ title, tools }) {
      return {
        title: title || "Potrzebne narzędzia",
        subtitle: `${tools?.length || 0} narzędzi`,
      }
    },
  },
})

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Wezwanie do Działania (CTA)",
  type: "object",
  icon: BellIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
      description: "Główny nagłówek CTA",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Opis",
      type: "text",
      description: "Krótki opis zachęcający do działania",
      rows: 3,
    },
    {
      name: "buttonText",
      title: "Tekst przycisku",
      type: "string",
      description: "Tekst na przycisku akcji",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "buttonLink",
      title: "Link przycisku",
      type: "string",
      description: "URL do którego prowadzi przycisk (domyślnie: #kontakt)",
      initialValue: "#kontakt",
    },
    {
      name: "secondaryText",
      title: "Dodatkowy tekst",
      type: "string",
      description: "Opcjonalny mały tekst pod przyciskiem",
    },
    {
      name: "showIcon",
      title: "Pokaż ikonę",
      type: "boolean",
      description: "Czy pokazać ikonę megafonu nad tytułem",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      buttonText: "buttonText",
    },
    prepare({ title, buttonText }) {
      return {
        title: title || "Wezwanie do działania",
        subtitle: `Przycisk: "${buttonText}"`,
      }
    },
  },
})

export const downloadBlock = defineType({
  name: "downloadBlock",
  title: "Materiał do Pobrania",
  type: "object",
  icon: DownloadIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł",
      type: "string",
      description: "Nazwa materiału do pobrania",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Opis",
      type: "text",
      description: "Krótki opis zawartości pliku",
      rows: 3,
    },
    {
      name: "fileUrl",
      title: "URL pliku",
      type: "url",
      description: "Link do pliku do pobrania",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "fileName",
      title: "Nazwa pliku",
      type: "string",
      description: "Nazwa pliku po pobraniu (np. 'przewodnik-organizacji.pdf')",
    },
    {
      name: "fileType",
      title: "Typ pliku",
      type: "string",
      description: "Format pliku",
      options: {
        list: [
          { title: "PDF", value: "pdf" },
          { title: "Word (DOC/DOCX)", value: "doc" },
          { title: "Excel (XLSX)", value: "xlsx" },
          { title: "ZIP", value: "zip" },
          { title: "Inny", value: "default" },
        ],
      },
      initialValue: "pdf",
    },
    {
      name: "fileSize",
      title: "Rozmiar pliku",
      type: "string",
      description: "Rozmiar pliku (np. '2.5 MB')",
    },
  ],
  preview: {
    select: {
      title: "title",
      fileType: "fileType",
      fileSize: "fileSize",
    },
    prepare({ title, fileType, fileSize }) {
      return {
        title: title || "Materiał do pobrania",
        subtitle: `${fileType?.toUpperCase() || "FILE"}${fileSize ? ` • ${fileSize}` : ""}`,
      }
    },
  },
})

export const resourceListBlock = defineType({
  name: "resourceListBlock",
  title: "Lista Zasobów",
  type: "object",
  icon: LinkIcon,
  fields: [
    {
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      description: "Nagłówek listy zasobów",
    },
    {
      name: "description",
      title: "Opis",
      type: "text",
      description: "Krótki opis listy zasobów",
      rows: 2,
    },
    {
      name: "resources",
      title: "Zasoby",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Nazwa",
              type: "string",
              description: "Nazwa produktu/zasobu",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Opis",
              type: "text",
              description: "Krótki opis zasobu",
              rows: 2,
            },
            {
              name: "image",
              title: "Zdjęcie",
              type: "image",
              description: "Zdjęcie produktu/zasobu",
              options: { hotspot: true },
            },
            {
              name: "price",
              title: "Cena",
              type: "string",
              description: "Cena (np. '49 zł', 'Darmowe')",
            },
            {
              name: "link",
              title: "Link",
              type: "url",
              description: "Link do zasobu/produktu",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "isAffiliate",
              title: "Link partnerski",
              type: "boolean",
              description: "Czy to link partnerski/afiliacyjny",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              name: "name",
              price: "price",
              image: "image",
            },
            prepare({ name, price, image }) {
              return {
                title: name,
                subtitle: price || "Brak ceny",
                media: image,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "footerNote",
      title: "Notatka stopki",
      type: "string",
      description: "Opcjonalna notatka na dole (np. 'Wszystkie ceny są orientacyjne')",
    },
  ],
  preview: {
    select: {
      title: "title",
      resources: "resources",
    },
    prepare({ title, resources }) {
      return {
        title: title || "Lista zasobów",
        subtitle: `${resources?.length || 0} zasobów`,
      }
    },
  },
})
