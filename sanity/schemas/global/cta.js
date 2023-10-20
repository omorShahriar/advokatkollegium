import { FiLink } from "react-icons/fi";
const cta = {
  title: "CTA",
  name: "cta",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Internal link",
      description: "Use this to link between pages on the website",
      name: "page",
      type: "reference",
      to: [{ type: "page" }],
    },
    {
      title: "External link",
      name: "link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }),
    },
  ],
  preview: {
    select: {
      title: "title",
      pageTitle: "page.title",
      slug: "page.slug.current",
      link: "link",
    },
    prepare({ title, pageTitle = "", slug, link }) {
      const subtitleExtra = slug
        ? `(slug: ${slug})`
        : link
        ? `Link: ${link}`
        : "Not set";
      return {
        title: `${title}`,
        subtitle: `${pageTitle} ${subtitleExtra}`,
        media: FiLink,
      };
    },
  },
};
export default cta;
