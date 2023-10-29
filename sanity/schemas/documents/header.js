import { RiLayoutTop2Line } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "header",
  type: "document",
  title: "Header",
  icon: RiLayoutTop2Line,
  fields: [
    defineField({
      name: "menu",
      type: "array",
      title: "Menu",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "cta",
      type: "link",
      title: "CTA",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      };
    },
  },
});
