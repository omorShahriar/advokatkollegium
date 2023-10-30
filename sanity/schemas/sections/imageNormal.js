import { RiImage2Line } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageNormal",
  type: "object",
  title: "Image",
  icon: RiImage2Line,
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
  ],
  preview: {
    select: {},
    prepare({}) {
      return {
        title: "Image",
        subtitle: "",
        icon: RiImage2Line,
      };
    },
  },
});
