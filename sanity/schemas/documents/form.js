import { RiArrowRightLine, RiMailSendLine, RiPencilLine } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "form",
  type: "document",
  title: "Form",
  icon: RiMailSendLine,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fields",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Name",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "placeholder",
              type: "string",
              title: "Placeholder",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "tel" },
                  { title: "Number", value: "number" },
                  { title: "Date", value: "date" },
                  { title: "Time", value: "time" },
                  { title: "Textarea", value: "textarea" },
                  { title: "Checkbox", value: "checkbox" },
                  { title: "Select", value: "select" },
                  { title: "Files", value: "file" },
                ],
              },
            }),
            defineField({
              name: "options",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      type: "string",
                      title: "Label",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "value",
                      type: "string",
                      title: "Value",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      label: "label",
                      value: "value",
                    },
                    prepare({ label, value }) {
                      return {
                        title: label,
                        subtitle: value,
                        icon: RiArrowRightLine,
                      };
                    },
                  },
                },
              ],
              title: "Options",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (
                    ["select", "checkbox"].includes(context.parent?.type) &&
                    !value
                  ) {
                    return "Please add at least one option";
                  }
                  return true;
                }),
              hidden: ({ value, parent }) =>
                !["select", "checkbox"].includes(parent?.type) && !value,
            }),
            defineField({
              name: "required",
              type: "boolean",
              title: "Required",
            }),
            defineField({
              name: "width",
              type: "string",
              options: {
                list: [
                  { title: "Full", value: "full" },
                  { title: "Half", value: "half" },
                ],
              },
              title: "Width",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: "name",
              type: "type",
            },
            prepare({ name, type }) {
              return {
                title: name,
                subtitle: `Type: ${type}`,
                icon: RiPencilLine,
              };
            },
          },
        },
      ],
      title: "Fields",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recipients",
      type: "array",
      of: [{ type: "string" }],
      title: "Recipients",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "name",
      recipients: "recipients",
      fields: "fields",
    },
    prepare({ name, recipients, fields }) {
      return {
        title: name,
        subtitle: `${
          recipients?.length ? `${recipients.length} recipients -` : null
        }  ${fields?.length ? fields.length : 0} fields`,
        icon: RiMailSendLine,
      };
    },
  },
});
