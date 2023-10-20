import { FiLayout } from "react-icons/fi";

const hero = {
  title: "Hero",
  name: "hero",
  type: "object",
  fields: [
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Frontpage", value: "frontpage" },
          { title: "Normal", value: "normal" },
          { title: "Normal w/ textbackground", value: "normal_background" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Heading",
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slogan",
      name: "slogan",
      type: "string",
    },
    {
      title: "CTA List",
      name: "ctaList",
      type: "array",
      of: [{ type: "cta" }],
    },
    {
      title: "Background",
      name: "background",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      heading: "heading",
      type: "type",
    },
    prepare({ heading, type }) {
      return {
        title: "Hero",
        subtitle: `${heading} | Type: ${type}`,
        media: FiLayout,
      };
    },
  },
};

export default hero;
