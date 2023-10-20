import { defineField } from "sanity";

const footer = {
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      title: "Copyright",
      name: "copyright",
      type: "texteditorSimple",
    },
    {
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
    },
    {
      title: "Contact options",
      name: "contactOptions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
              title: "Link",
              name: "link",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                  allowRelative: true,
                }),
            },
            {
              title: "Icon",
              name: "icon",
              type: "image",
            },
          ],
        },
      ],
    },
  ],
};

export default footer;
