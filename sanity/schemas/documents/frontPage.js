import { RiHome4Line } from "react-icons/ri";
import { defineField } from "sanity";

const frontpage = {
  name: "frontpage",
  type: "document",
  title: "Front Page",
  icon: RiHome4Line,
  groups: [
    { name: "content", title: "📝 Content", default: true },
    { name: "hero", title: "🖼️ Hero" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      group: "content",
      of: [
        { type: "richContent" },
        { type: "areaOfExpertise" },
        { type: "lawyerPreview" },
        { type: "lawyerList" },
        { type: "displayForm" },
        { type: "banner" },
        {
          type: "normalText",
        },
        {
          type: "normalImage",
        },
      ],
    }),
    defineField({
      name: "hero",
      type: "hero",
      title: "Hero",
      group: "hero",
    }),

    defineField({
      name: "metadata",
      type: "metadata",
      title: "Metadata",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Frontpage",
      };
    },
  },
};

export default frontpage;
