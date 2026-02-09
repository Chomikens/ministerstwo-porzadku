import { defineField, defineType } from "sanity"
import { TagIcon } from "@sanity/icons"

export const category = defineType({
  name: "category",
  title: "Kategoria",
  type: "document",
  icon: TagIcon,
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
      validation: (Rule) => Rule.required(),
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
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare(selection) {
      const { title, language } = selection
      return {
        title,
        subtitle: language ? `[${language.toUpperCase()}]` : "",
      }
    },
  },
})
