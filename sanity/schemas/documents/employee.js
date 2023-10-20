const employee = {
  name: "employee",
  title: "Employee",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },

    {
      name: "email",
      title: "Email",
      type: "string",
    },

    {
      name: "bio",
      title: "Bio",
      type: "text",
    },
    {
      name: "ariaOfExpertise",
      title: "Area of Expertise",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Competence",
          to: [{ type: "competence" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
};

export default employee;
