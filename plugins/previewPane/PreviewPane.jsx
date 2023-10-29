import { Card, Text } from "@sanity/ui";
import { memo, Suspense } from "react";
import { isRecord, isString, useClient } from "sanity";

import { suspend } from "suspend-react";

import { getSecret } from "../productionUrl/utils";

export function PreviewPane(props) {
  const { document, previewSecretId, apiVersion } = props;
  const { displayed } = document;

  const documentType = displayed?._type;

  const slug =
    isRecord(displayed.settings) &&
    isRecord(displayed.settings.url) &&
    isString(displayed.settings.url.current)
      ? displayed.settings.url.current
      : undefined;

  const href = documentType === "frontpage" ? "/" : `/${slug}`;

  if (!href) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the post to see the preview!
        </Text>
      </Card>
    );
  }

  return (
    <Card
      scheme="light"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <Suspense fallback={null}>
        <Iframe
          apiVersion={apiVersion}
          documentType={documentType}
          previewSecretId={previewSecretId}
          slug={slug}
        />
      </Suspense>
    </Card>
  );
}

// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol("preview.secret");

const Iframe = memo(function Iframe(props) {
  const { apiVersion, documentType, previewSecretId, slug } = props;
  const client = useClient({ apiVersion });

  // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
  const secret = suspend(
    () => getSecret(client, previewSecretId, true),
    ["getSecret", previewSecretId, fetchSecret],
    { lifespan: 60000 }
  );

  const url = new URL("/api/preview/view", location.origin);

  if (documentType) url.searchParams.set("documentType", documentType);
  if (slug) url.searchParams.set("slug", slug);
  if (secret) url.searchParams.set("secret", secret);

  return (
    <iframe
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 1,
        border: "none",
      }}
      src={url.toString()}
    />
  );
});
