import { FiImage } from "react-icons/fi";

const image = {
  title: "Image",
  name: "imageSingle",
  type: "object",
  fields: [
    {
      title: "Image",
      name: "image",
      type: "figure",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      image: "image",
    },
    prepare({ image }) {
      return {
        title: "Image",
        subtitle: image.alt ?? "",
        media: FiImage,
      };
    },
  },
};

export default image;
