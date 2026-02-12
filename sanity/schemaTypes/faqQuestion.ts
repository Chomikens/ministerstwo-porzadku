import { defineField, defineType } from "sanity"
import { HelpCircleIcon } from "@sanity/icons"

export const faqQuestion = defineType({
  name: "faqQuestion",
  title: "Pytanie FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "language",
      title: "Jezyk",
      type: "string",
      options: {
        list: [
          { title: "Polski", value: "pl" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "pl",
    }),
    defineField({
      name: "question",
      title: "Pytanie",
      type: "string",
      description: "Pytanie FAQ (bedzie H1 na podstronie)",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "question",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortAnswer",
      title: "Krotka odpowiedz",
      type: "text",
      rows: 3,
      description: "Krotka odpowiedz widoczna na liscie FAQ i w meta description (max 200 znakow)",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: [{ type: "faqCategory" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Pelna odpowiedz",
      type: "array",
      description: "Rozbudowana odpowiedz z komponentami (jak w blogu)",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Tekst alternatywny" },
            { name: "caption", type: "string", title: "Podpis" },
          ],
        },
        { type: "quoteBlock" },
        { type: "stepByStepBlock" },
        { type: "beforeAfterBlock" },
        { type: "tipBlock" },
        { type: "checklistBlock" },
        { type: "statBlock" },
        { type: "comparisonBlock" },
        { type: "timeDifficultyBlock" },
        { type: "toolsBlock" },
        { type: "ctaBlock" },
        { type: "downloadBlock" },
        { type: "resourceListBlock" },
      ],
    }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      description: "Kolejnosc wyswietlania w danej kategorii",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Nadpisz domyslny tytul (pytanie + | FAQ Ministerstwo Porzadku)",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Nadpisz domyslny opis (krotka odpowiedz)",
          validation: (Rule) => Rule.max(160),
        },
      ],
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
      question: "question",
      category: "category.title",
      language: "language",
    },
    prepare({ question, category, language }) {
      return {
        title: question,
        subtitle: `${category || "Brak kategorii"} [${language?.toUpperCase() || "PL"}]`,
      }
    },
  },
})
