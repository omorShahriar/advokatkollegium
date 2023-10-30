import { RiFileList2Line } from "react-icons/ri";
import { defineField } from "sanity";
import slugify from "slugify";

const page = {
  name: "page",
  type: "document",
  title: "Page",
  icon: RiFileList2Line,

  groups: [
    { name: "content", title: "📝 Content", default: true },
    { name: "hero", title: "🖼️ Hero" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    defineField({
      name: "hero",
      type: "hero",
      group: "hero",
    }),
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
          type: "textNormal",
        },
        {
          type: "imageNormal",
        },
      ],
    }),
    defineField({
      name: "settings",
      type: "publishSettings",
      title: "Publish settings",
      group: "seo",
    }),
    defineField({
      name: "metadata",
      type: "metadata",
      title: "Metadata",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "settings.url.current",
    },
    prepare({ title, url }) {
      return {
        title,
        subtitle: `/${url}`,
        icon: RiFileList2Line,
      };
    },
  },
};

export default page;
