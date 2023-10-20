/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas/schema";
import { BsCardHeading } from "react-icons/bs";
import { TbNoCopyright } from "react-icons/tb";
// Define the actions that should be available for singleton documents
const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
  "update",
]);

// Define the singleton document types
const singletonTypes = new Set(["frontPage", "settings", "header", "footer"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Our singleton type has a list item with a custom child
            S.listItem()
              .title("Front Page")
              .icon(() => "🏠")
              .id("frontPage")
              .child(
                S.document()
                  .schemaType("frontPage")
                  .documentId("frontPage")
                  .title("Front Page")
              ),
            S.listItem()
              .title("Header")
              .icon(() => <BsCardHeading />)
              .id("header")
              .child(
                S.document()
                  .schemaType("header")
                  .documentId("header")
                  .title("Header")
              ),
            S.listItem()
              .title("Footer")
              .icon(() => <TbNoCopyright />)
              .id("footer")
              .child(
                S.document()
                  .schemaType("footer")
                  .documentId("footer")
                  .title("Footer")
              ),

            S.listItem()
              .title("Settings")
              .icon(() => "⚙️")
              .id("settings")
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
                  .title("Settings")
              ),
            S.documentTypeListItem("page").title("Pages"),

            S.documentTypeListItem("competence")
              .title("Competences")
              .icon(() => "📚"),
            S.documentTypeListItem("employee")
              .title("Employees")
              .icon(() => "👨‍💼"),
            S.documentTypeListItem("form")
              .title("Forms")
              .icon(() => "📝"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
