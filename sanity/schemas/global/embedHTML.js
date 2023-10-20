import React from "react";

const HTMLpreview = ({ value }) => {
  console.log(value);
  return <div dangerouslySetInnerHTML={{ __html: value?.html }} />;
};

const embedHTML = {
  title: "Embed HTML",
  name: "embedHTML",
  type: "object",
  fields: [
    {
      title: "HTML",
      description:
        "You usually want to avoid storing freeform HTML, but for embed codes it can be useful.",
      name: "html",
      type: "text",
      options: {
        language: "html",
      },
    },
  ],
  components: {
    preview: HTMLpreview,
  },
};

export default embedHTML;
