import { RiEdit2Line, RiMailSendLine, RiTodoLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";
import form from "../documents/form";

export default defineType({
  name: "displayForm",
  type: "object",
  title: "Display Form",
  icon: RiTodoLine,
  fields: [
    defineField({
      name: "subHeading",
      type: "string",
      title: "Sub Heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "telephone",
      type: "string",
      title: "Telephone",
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
      console.log(formName);
      return {
        title: "Form",
        subtitle: `${heading} | Connected form: ${formName}`,
        icon: RiMailSendLine,
      };
    },
  },
});
