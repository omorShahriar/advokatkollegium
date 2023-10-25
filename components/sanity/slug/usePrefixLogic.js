import * as PathUtils from "@sanity/util/paths";
import React, { useCallback, useEffect, useState } from "react";
import { PatchEvent, set, unset, useClient, useFormValue } from "sanity";
import speakingurl from "speakingurl";

import { useSlugContext } from "./useSlugContext";

const createPatchFrom = (value) =>
  PatchEvent.from(value ? set(value) : unset());

// eslint-disable-next-line
export function usePrefixLogic(props) {
  const { schemaType } = props;
  const sourceContext = useSlugContext();
  const document = useFormValue([]);
  const options = schemaType.options;
  const client = useClient({ apiVersion: "2023-10-20" });

  const [urlPrefix, setUrlPrefix] = useState();

  const finalPrefix = `${urlPrefix}${
    // Add a slash if the prefix doesn't end with one and doesn't contain a hash or a query string
    !urlPrefix?.endsWith("/") &&
    !urlPrefix?.includes("#") &&
    !urlPrefix?.includes("?")
      ? "/"
      : ""
  }`;
  const getUrlPrefix = useCallback(
    async (doc) => {
      if (!doc) return;

      if (typeof options?.urlPrefix === "string") {
        setUrlPrefix(options.urlPrefix);
        return;
      }

      if (typeof options?.urlPrefix === "function") {
        try {
          const value = await Promise.resolve(options.urlPrefix(doc));
          setUrlPrefix(value);
          return;
        } catch (error) {
          console.error(
            `[prefixed-slug] Couldn't generate URL prefix: `,
            error
          );
        }
      }

      setUrlPrefix(undefined);
    },
    // eslint-disable-next-line
    [setUrlPrefix, options.urlPrefix]
  );

  // Re-create the prefix whenever the document changes
  useEffect(() => {
    getUrlPrefix(document);
  }, [document, getUrlPrefix]);

  function updateValue(strValue) {
    const newValue = strValue
      ? Object.assign(
          {
            _type: schemaType?.name || "slug",
            current: strValue,
          },
          finalPrefix && options.storeFullUrl === true
            ? {
                fullUrl: `${finalPrefix}${strValue}`,
              }
            : {}
        )
      : undefined;

    props.onChange(createPatchFrom(newValue));
  }

  async function generateSlug() {
    if (!document) return;

    const parentPath = props.path.slice(0, -1);
    const parent = PathUtils.get(document, parentPath);
    const sourceValue = await Promise.resolve(
      typeof options?.source === "function"
        ? options?.source(document, { parentPath, parent, ...sourceContext })
        : PathUtils.get(document, options?.source || [])
    );
    formatSlug(sourceValue);
  }

  async function getReferenceSlug(refId) {
    if (typeof refId !== "string") return;
    const slug = await client.fetch(
      `*[_id == $refId][0].settings.url.current`,
      { refId }
    );
    return slug;
  }

  /**
   * Avoids trailing slashes, double slashes, spaces, special characters and uppercase letters
   */
  async function formatSlug(input) {
    const customValue = typeof input === "string" ? input : undefined;
    let finalSlug = customValue || props.value?.current || "";
    // Option that can be passed to this input component to format values on input
    const customSlugify = schemaType.options?.slugify;
    if (customSlugify) {
      finalSlug = await Promise.resolve(
        customSlugify(finalSlug || "", schemaType, {})
      );
    } else {
      // Removing special characters, spaces, uppercase letters, etc.
      finalSlug = await Promise.all(
        finalSlug
          // As we want to allow slashes between segments (segment-1/segment-2)
          // We're splitting the string to preserve these slashes
          .split("/")
          // If a segment is empty, this means a starting or trailing slash, or double slashes, which we want to get rid of
          .filter((segment) => !!segment)
          .map(async (segment) => {
            // If segment is a reference, fetch the url
            if (segment.startsWith("ref:")) {
              const refSlug = await getReferenceSlug(segment.split("ref:")[1]);
              return refSlug;
            }
            return speakingurl(segment, { symbols: true });
          })
      ).then((segments) =>
        segments.join(["page", "model"].includes(document._type) ? "/" : "-")
      );
    }

    // Finally, save this final slug to the document
    updateValue(finalSlug);
  }

  return {
    prefix: finalPrefix,
    generateSlug,
    updateValue,
    formatSlug,
  };
}
