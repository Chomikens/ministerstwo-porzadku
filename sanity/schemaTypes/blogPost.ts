import { defineField, defineType } from "sanity"
import { DocumentTextIcon } from "@sanity/icons"

export const blogPost = defineType({
  name: "blogPost",
  title: "Artykuł",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "language",
      title: "Język",
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
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
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
      name: "excerpt",
      title: "Krótki opis",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Obraz główny",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Treść",
      type: "array",
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
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Tekst alternatywny",
            },
            {
              name: "caption",
              type: "string",
              title: "Podpis",
            },
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
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(155),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      language: "language",
    },
    prepare(selection) {
      const { author, language } = selection
      return {
        ...selection,
        subtitle: `${author ? `by ${author}` : ""} ${language ? `[${language.toUpperCase()}]` : ""}`,
      }
    },
  },
})
