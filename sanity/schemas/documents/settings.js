const settings = {
  name: "settings",
  type: "document",
  title: "Settings",
  fields: [
    {
      title: "Site title",
      name: "title",
      type: "string",
    },
    {
      title: "Base URL",
      name: "url",
      type: "url",
    },
    {
      title: "Favicon",
      name: "favicon",
      type: "image",
    },
    {
      title: "Logo",
      name: "logo",
      type: "image",
    },
    {
      title: "Address",
      name: "address",
      type: "string",
    },
    {
      title: "Phone",
      name: "phone",
      type: "string",
    },
    {
      title: "Email",
      name: "email",
      type: "string",
    },
    {
      name: "siteDescription",
      type: "text",
      title: "Site description",
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "Open Graph Image",
      name: "openGraphImage",
      type: "image",
      description: "Image for sharing previews on Facebook, Twitter etc.",
    },
    {
      title: "Google Tag Manager ID",
      name: "googleTagmanagerId",
      type: "string",
    },
  ],
};

export default settings;
