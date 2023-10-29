/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { media, mediaAssetSource } from "sanity-plugin-media";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas/schema";
import { structure } from "./lib/sanity.structure";
import { previewDocumentNode } from "./plugins/previewPane";

const TITLE = process.env.NEXT_PUBLIC_SANITY_TITLE || "Advokat Kollegium";

// Define the actions that should be available for singleton documents

const PREVIEW_DOCUMENTS = ["frontpage", "page"];
const LOCKED_DOCUMENTS = [
  "frontpage",
  "header",
  "footer",
  "settings",
  "media.tag",
];

const Icon = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.png"
      alt={TITLE}
      style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: "0.1875rem" }}
    />
  );
};

export default defineConfig({
  title: TITLE,
  icon: Icon,
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode: previewDocumentNode({
        apiVersion,
        previewSecretId,
        types: PREVIEW_DOCUMENTS,
      }),
    }),
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEW_DOCUMENTS,
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !LOCKED_DOCUMENTS.includes(templateItem.templateId)
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (LOCKED_DOCUMENTS.includes(schemaType)) {
        return prev.filter(
          ({ action }) =>
            !["unpublish", "delete", "duplicate"].includes(action || "")
        );
      }
      return prev;
    },
  },

  form: {
    file: {
      assetSources: (prev) => prev.filter((s) => s !== mediaAssetSource),
    },
    image: {
      assetSources: () => [mediaAssetSource],
    },
  },
});
