import { RiGlobalLine, RiLinkM } from "react-icons/ri";
import { defineType } from "sanity";

export default defineType({
  name: "texteditorSimple",
  type: "array",
  title: "Text editor",
  of: [
    {
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "Link",
            name: "externalLink",
            type: "object",
            icon: RiGlobalLine,
            fields: [
              {
                name: "url",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                    allowRelative: true,
                  }),
              },
            ],
          },
          {
            title: "Internal link",
            name: "internalLink",
            type: "object",
            icon: RiLinkM,
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [{ type: "frontpage" }, { type: "page" }],
              },
            ],
          },
        ],
      },
    },
  ],
});
