import { RiArticleLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "richContent",
  type: "object",
  title: "Rich Content",
  icon: RiArticleLine,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "texteditorSimple",
      title: "Description",
    }),
    defineField({
      name: "content",
      type: "texteditorSimple",
      title: "Content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Button",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent.background === "image" && !value) {
            return "Please select an image";
          }
          return true;
        }),
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      title: "Image Position",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => !parent.image,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent.image && !value) {
            return "Please select an image position";
          }
          return true;
        }),
    }),
    defineField({
      name: "background",
      type: "string",
      title: "Background",
      options: {
        list: [
          { title: "Transparent", value: "transparent" },
          { title: "Image", value: "image" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      link: "link",
      image: "image",
      background: "background",
    },
    prepare({ title, link, image, background }) {
      return {
        title,
        subtitle: `${link ? "With button" : "No button"} ${
          image ? " | With image" : ""
        } | Background: ${background}`,
        icon: RiArticleLine,
      };
    },
  },
});
