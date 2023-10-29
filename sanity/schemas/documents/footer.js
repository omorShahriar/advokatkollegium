import { defineField } from "sanity";

const footer = {
  name: "footer",
  type: "document",
  title: "Footer",
  fields: [
    {
      name: "menus",
      title: "Menus",
      type: "array",
      of: [
        {
          type: "object",
          name: "menu",
          title: "Menu",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              type: "array",
              title: "Links",
              of: [{ type: "link" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              links: "links",
            },
            prepare({ title, links }) {
              return {
                title,
                subtitle: `${links.length} links`,
              };
            },
          },
        },
      ],
    },
    {
      title: "Copyright",
      name: "copyright",
      type: "texteditorSimple",
    },
    {
      name: "bottomLineMenu",
      type: "array",
      title: "Bottom line menu",
      of: [{ type: "link" }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
      };
    },
  },
};

export default footer;
