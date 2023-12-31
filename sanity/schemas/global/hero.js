import { FiLayout } from "react-icons/fi";
import { defineField } from "sanity";

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
      title: "Sub Heading",
      name: "subHeading",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "actions",
      type: "array",
      title: "Actions",
      of: [{ type: "link" }],
    }),
    {
      title: "Background",
      name: "background",
      type: "image",
      validation: (Rule) =>
        Rule.custom((background, context) => {
          if (
            (context.document.type === "frontpage" ||
              context.document.type === "normal_background") &&
            !background
          ) {
            return "Background is required";
          }
          return true;
        }),
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
