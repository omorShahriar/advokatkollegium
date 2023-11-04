const lawyerPreview = {
  name: "lawyerPreview",
  title: "Lawyer Preview",
  type: "object",
  fields: [
    {
      title: "Heading",
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Sub Heading",
      name: "subHeading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Description",
      name: "description",
      type: "texteditorSimple",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Lawyers",
      name: "lawyers",
      type: "array",
      of: [
        {
          type: "reference",
          title: "Lawyer",
          to: [{ type: "employee" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      type: "link",
      title: "Button",
      validation: (Rule) => Rule.required(),
    },
  ],
};
export default lawyerPreview;
