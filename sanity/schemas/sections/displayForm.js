import { RiEdit2Line, RiTodoLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "displayForm",
  type: "object",
  title: "Display Form",
  icon: RiTodoLine,
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subHeading",
      type: "texteditorSimple",
      title: "Sub Heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "telephone",
      type: "string",
      title: "Telephone",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Form",
      name: "form",
      type: "reference",
      to: [{ type: "form" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      formName: "form.name",
    },
    prepare({ heading, formName }) {
      return {
        title: "Form",
        subtitle: `${heading} | Connected form: ${formName}`,
        icon: RiMailSendLine,
      };
    },
  },
});
