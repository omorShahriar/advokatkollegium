const form = {
  title: "Form",
  name: "form",
  type: "document",

  fields: [
    {
      name: "formName",
      title: "Form name",
      type: "string",
    },
    {
      name: "fields",
      title: "Fields",
      type: "array",
      of: [
        {
          name: "inputName",
          title: "Input name",
          type: "string",
        },
        {
          name: "placeholder",
          title: "Placeholder",
          type: "string",
        },
        {
          name: "type",
          title: "type",
          type: "string",
        },

        {
          name: "required",
          title: "Required",
          type: "boolean",
        },
        {
          name: "width",
          title: "Width",
          descprition: "Width of the input in px",
          type: "string",
        },
      ],
    },
    {
      name: "recipients",
      title: "Recipients",
      type: "array",
      of: [
        {
          name: "recipient",
          title: "Recipient",
          type: "string",
        },
      ],
    },
  ],
};

export default form;
