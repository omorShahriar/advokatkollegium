import { RiAlignLeft } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "normalText",
  type: "object",
  title: "Text",
  icon: RiAlignLeft,
  fields: [
    defineField({
      name: "content",
      type: "texteditor",
      title: "Content",
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
      text: "content.0.children.0.text",
    },
    prepare({ text }) {
      return {
        title: "Text",
        subtitle: text,
        icon: RiAlignLeft,
      };
    },
  },
});
