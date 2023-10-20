import { FiFileText } from "react-icons/fi";
import slugify from "slugify";
const frontPage = {
  name: "frontPage",
  type: "document",
  title: "Front Page",
  icon: FiFileText,
  initialValue: {
    includeInSitemap: true,
  },
  groups: [
    { name: "hero", title: "Hero" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: (doc) => doc.title,
        slugify: (input) =>
          `/${slugify(input, {
            lower: true,
            strict: true,
          })}`,
      },
      validation: (Rule) =>
        Rule.required().custom(({ current }) => {
          if (typeof current === "undefined") return true;

          if (current) {
            if (!current.startsWith("/")) {
              return `Slug must begin with "/". Click "Generate" to reset.`;
            }

            if (current.endsWith("/") && current !== "/") {
              return `Slug cannot end with "/"`;
            }
          }

          return true;
        }),
    },

    { name: "hero", type: "hero", title: "Hero Section", group: "hero" },

    // {
    //   name: "content",
    //   type: "array",
    //   title: "Content",
    //   of: [{ type: "hero" }],
    //   group: "content",
    // },
    {
      name: "publishSettings",
      title: "Publish Settings",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "url",
          type: "string",
          title: "URL",
        },
        {
          title: "Status",
          name: "status",
          type: "string",
          initialValue: "public",
          options: {
            list: [
              {
                title: "Private (Not accessible outside preview)",
                value: "private",
              },
              {
                title:
                  "Hidden (Won't show up in google, but accessible through url)",
                value: "hidden",
              },
              { title: "Public (Accessible for everyone)", value: "public" },
            ],
            layout: "radio",
          },
        },
      ],
    },

    {
      name: "metadata",
      title: "Metadata",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "Meta title",

          validation: (Rule) => Rule.required(),
        },
        {
          name: "metaDescription",
          type: "text",
          title: "Meta description",
          description: "This description populates meta-tags on the webpage",
        },
        {
          name: "openGraphImage",
          type: "image",
          title: "Open Graph Image",
          description: "Image for sharing previews on Facebook, Twitter etc.",
        },
        {
          name: "includeInSitemap",
          type: "boolean",
          title: "Include page in sitemap",
          description: "For search engines. Will be added to /sitemap.xml",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
};

export default frontPage;
