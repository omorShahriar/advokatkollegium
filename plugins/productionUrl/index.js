import { definePlugin, isRecord, isString } from "sanity";

import { getSecret } from "./utils";

export const productionUrl = definePlugin(
  ({ previewSecretId, types: _types, apiVersion = "2023-10-20" }) => {
    if (!previewSecretId) {
      throw new TypeError("`previewSecretId` is required");
    }

    if (!previewSecretId.includes(".")) {
      throw new TypeError(
        "`previewSecretId` must contain a `.` to ensure it can only be queried by authenticated users"
      );
    }

    if (!_types || _types.length === 0) {
      throw new TypeError("`types` is required");
    }

    const types = new Set(_types);

    return {
      name: "productionUrl",
      document: {
        productionUrl: async (prev, { document, getClient }) => {
          const url = new URL("/api/preview/view", location.origin);
          const client = getClient({ apiVersion });
          const secret = await getSecret(client, previewSecretId, true);

          if (secret) {
            url.searchParams.set("secret", secret);
          }

          const slug =
            isRecord(document.settings) &&
            isRecord(document.settings.url) &&
            isString(document.settings.url.current)
              ? document.settings.url.current
              : undefined;

          if (slug) {
            url.searchParams.set("slug", slug);
          }

          if (types.has(document._type)) {
            url.searchParams.set("documentType", document._type);
            return url.toString();
          }

          return prev;
        },
      },
    };
  }
);
