const lawyerList = {
  name: "lawyerList",
  title: "Lawyer List",
  type: "object",
  fields: [
    {
      name: "lawyerList",
      title: "Lawyer List",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "employee",
            },
          ],
        },
      ],
    },
  ],
};
export default lawyerList;
