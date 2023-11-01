import { RiSettings5Line } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  type: "document",
  title: "Settings",
  icon: RiSettings5Line,
  groups: [
    { name: "general", title: "⚙️ General", default: true },
    { name: "contact", title: "📞 Contact" },
    { name: "seo", title: "🔍 SEO" },
    { name: "integrations", title: "🔌 Integrations" },
  ],
  fields: [
    // General
    defineField({
      name: "title",
      type: "string",
      title: "Site title",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Base URL",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "favicon",
      type: "image",
      title: "Favicon",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      fields: [
        {
          name: "altText",
          type: "string",
          title: "Alt text",
        },
      ],
      group: "general",
      validation: (Rule) => Rule.required(),
    }),

    // Contact
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      type: "text",
      title: "Address",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),

    // SEO
    defineField({
      name: "description",
      type: "text",
      title: "Site description",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "keywords",
      type: "array",
      title: "Keywords",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      group: "seo",
    }),
    defineField({
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      group: "seo",
    }),

    // Integrations
    defineField({
      name: "googleTagManagerId",
      type: "string",
      title: "Google Tag Manager ID",
      group: "integrations",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
});
