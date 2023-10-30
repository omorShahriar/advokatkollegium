import { RiInformationLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "banner",
  type: "object",
  title: "Banner",
  icon: RiInformationLine,
  fields: [
    defineField({
      name: "subHeading",
      type: "string",
      title: "Sub Heading",
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "background",
      type: "string",
      title: "Background",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Gray", value: "gray" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent.background !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent.background === "image" && !value) {
            return "Please select an image";
          }
          return true;
        }),
    }),

    defineField({
      name: "button",
      type: "link",
      title: "Button",
    }),
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Banner",
        subtitle: heading,
        icon: RiInformationLine,
      };
    },
  },
});
