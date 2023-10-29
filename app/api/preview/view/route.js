import { resolveHref } from "lib/hooks";
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
  readToken,
} from "lib/sanity.api";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "next-sanity";
import { getSecret } from "plugins/productionUrl/utils";

export async function GET(request) {
  if (!readToken) {
    return new Response("Misconfigured server", { status: 500 });
  }
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = resolveHref(
    searchParams.get("documentType"),
    searchParams.get("slug")
  );
  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (!secret) {
    return new Response("No secret provided", { status: 401 });
  }
  // Create a Sanity client to fetch the draft
  const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: readToken,
  });
  // The secret can't be stored in an env variable with a NEXT_PUBLIC_ prefix, as it would make you
  // vulnerable to leaking the token to anyone. If you don't have an custom API with authentication
  // that can handle checking secrets, you may use https://github.com/sanity-io/sanity-studio-secrets
  // to store the secret in your dataset.
  const storedSecret = await getSecret(sanityClient, previewSecretId);
  // This is the most common way to check for auth, but we encourage you to use your existing auth
  // infra to protect your token and securely transmit it to the client
  if (secret !== storedSecret) {
    return new Response("Invalid Secret", { status: 401 });
  }
  // If the slug doesn't exist prevent draft mode from being enabled
  // Enable Draft Mode by setting the cookie
  if (slug) {
    draftMode().enable();
    redirect(slug);
  }
  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  return new Response("Slug query parameter is required", { status: 404 });
}
