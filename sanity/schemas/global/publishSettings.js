import { SlugInput } from "@/components/sanity";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "publishSettings",
  type: "object",
  title: "Publish settings",
  initialValue: {
    status: "public",
  },
  fields: [
    {
      name: "url",
      type: "slug",
      title: "URL",
      components: {
        input: SlugInput,
      },
      options: {
        urlPrefix: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/`,
        source: (doc) => doc.title || doc.name,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          {
            title: "🔒 Private (not accessible outside preview)",
            value: "private",
          },
          {
            title: `👻 Hidden (won't show up in Google, but accessible through URL)`,
            value: "hidden",
          },
          { title: "✅ Public (accessible for everyone)", value: "public" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
