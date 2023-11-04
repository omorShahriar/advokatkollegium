const employee = {
  name: "employee",
  title: "Employee",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Area of Expertise",
      name: "ariaOfExpertise",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Competence",
          to: [{ type: "competence" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      image: "image",
    },
    prepare: ({ title, image }) => ({
      title,
      media: image,
    }),
  },
};

export default employee;
