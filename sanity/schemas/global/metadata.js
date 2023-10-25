import { defineField, defineType } from "sanity";

export default defineType({
  name: "metadata",
  type: "object",
  title: "Metadata",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
      title: "Meta title",
      description:
        "The title of the page. This is what shows up in the browser tab and in search results. Ideally between 15 and 70 characters.",
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      title: "Meta description",
      description:
        "The description of the page. This is what shows up in search results. Keep it short and sweet, ideally between 70 and 160 characters.",
    }),
    defineField({
      name: "priority",
      type: "number",
      title: "Priority",
      description:
        "The priority of the page (0-1). This is used to determine the order of the pages in the sitemap. The higher the number, the higher the priority. The default is 0.5.",
      validation: (Rule) => Rule.min(0).max(1).precision(1),
    }),
    defineField({
      name: "openGraphImage",
      type: "image",
      title: "Social image",
      description:
        "The image that shows up when sharing the page on social media. It should be at least 1200x630 pixels.",
    }),
  ],
});
