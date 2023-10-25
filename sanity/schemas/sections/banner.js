import { defineField } from "sanity";

const banner = {
  title: "Banner",
  name: "banner",
  type: "object",
  fields: [
    {
      title: "Heading",
      name: "heading",
      type: "string",
    },
    {
      title: "Sub Heading",
      name: "subHeading",
      type: "string",
    },
    {
      title: "Background Image",
      name: "backgroundImage",
      type: "image",
    },
    defineField({
      name: "link",
      type: "link",
      title: "Button",
    }),
  ],
};

export default banner;
