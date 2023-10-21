import { RiEdit2Line, RiTodoLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "form",
  type: "object",
  title: "Form",
  icon: RiTodoLine,
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailRecipients",
      type: "array",
      title: "Email recipients",
      of: [
        {
          type: "string",
          title: "Email",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "fields",
      type: "array",
      title: "Fields",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "placeholder",
              type: "string",
              title: "Placeholder",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Number", value: "number" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "tel" },
                  { title: "Textarea", value: "textarea" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "required",
              type: "boolean",
              title: "Required",
            },
          ],
          preview: {
            select: {
              placeholder: "placeholder",
              type: "type",
              required: "required",
            },
            prepare({ placeholder, type, required }) {
              return {
                title: placeholder,
                subtitle: `Type: ${type} | Required ${required ? "yes" : "no"}`,
                icon: RiEdit2Line,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "buttonText",
      type: "string",
      title: "Button text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      fields: "fields",
    },
    prepare({ title, fields }) {
      return {
        title,
        subtitle: `${fields.length} fields`,
        icon: RiTodoLine,
      };
    },
  },
});
