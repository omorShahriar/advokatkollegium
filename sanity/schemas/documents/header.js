import { defineField, defineType } from "sanity";
const header = defineType({
  name: "header",
  type: "document",
  title: "Header",
  fieldsets: [
    {
      title: "Button",
      name: "button",
    },
  ],
  fields: [
    {
      title: "Logo",
      name: "logo",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          options: {
            isHighlighted: false,
          },
        },
      ],
    },
    {
      title: "Button text",
      name: "buttonText",
      type: "string",
      fieldset: "button",
      validation: (Rule) => Rule.required(),
    },
    defineField({
      title: "Button link",
      name: "buttonLink",
      type: "reference",
      to: [{ type: "page" }],
      fieldset: "button",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "menu",
      title: "Menu",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "page" }],
        },
      ],
      validation: (Rule) =>
        Rule.unique().error("You can't add the same page twice"),
    }),
  ],
});

export default header;
