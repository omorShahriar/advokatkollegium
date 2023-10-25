const areaOfExpertise = {
  title: "Area of Expertise",
  name: "areaOfExpertise",
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
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Expertises",
      name: "expertises",
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
};
export default areaOfExpertise;
