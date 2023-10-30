import { RiText } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "textNormal",
  type: "object",
  title: "Text",
  icon: RiText,
  fields: [
    defineField({
      name: "text",
      type: "texteditor",
      title: "Text",
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
        icon: RiText,
      };
    },
  },
});
