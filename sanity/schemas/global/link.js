import { RiLinkM } from "react-icons/ri";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "link",
  type: "object",
  title: "Link",
  icon: RiLinkM,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "page",
      type: "reference",
      title: "Page",
      description: "Select an internal page to link to.",
      to: [{ type: "page" }, { type: "frontpage" }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (value && (context.parent.link || context.parent.jumpToContact)) {
            return "Please select only one of the following: page, link, or jump to contact form";
          }
          if (
            context.parent.title &&
            !value &&
            !context.parent.link &&
            !context.parent.jumpToContact
          ) {
            return "Please select either a page or a link.";
          }
          return true;
        }),
      hidden: ({ value, parent }) => {
        return !value && (parent?.link || parent?.jumpToContact) ? true : false;
      },
    }),
    defineField({
      name: "link",
      type: "url",
      title: "Link",
      description: "Enter an external page to link to.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
          allowRelative: true,
        }).custom((value, context) => {
          if (value && (context.parent.page || context.parent.jumpToContact)) {
            return "Please select only one of the following: page, link, or jump to contact form";
          }
          if (
            context.parent.title &&
            !value &&
            !context.parent.page &&
            !context.parent.jumpToContact
          ) {
            return "Please select either a page or a link.";
          }
          return true;
        }),
      hidden: ({ value, parent }) => {
        return !value && (parent?.page || parent?.jumpToContact) ? true : false;
      },
    }),
    defineField({
      name: "jumpToContact",
      type: "boolean",
      title: "Jump to contact form",
      description:
        "If checked, the link will jump to the contact form on the page.",
      hidden: ({ value, parent }) => {
        return !value && (parent?.page || parent?.link) ? true : false;
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (value && (context.parent.page || context.parent.link)) {
            return "Please select only one of the following: page, link, or jump to contact form";
          }
          if (
            context.parent.title &&
            !value &&
            !context.parent.page &&
            !context.parent.link
          ) {
            return "Please select either a page or a link.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "page.settings.url.current",
      link: "link",
    },
    prepare({ title, slug, link }) {
      return {
        title: title,
        subtitle: slug ? `/${slug}` : link,
        icon: RiLinkM,
      };
    },
  },
});
