import { apiVersion, dataset, projectId, useCdn } from "lib/sanity.api";
import {
  articleBySlugQuery,
  articlePathsQuery,
  frontpageQuery,
  pageBySlugQuery,
  pagePathsQuery,
  settingsQuery,
  sitemapQuery,
} from "lib/sanity.queries";
import { createClient } from "next-sanity";
import { cache } from "react";

export const sanityClientFetch = ({ token, query, params }) => {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
  });
  const fetcher = cache(client.fetch.bind(client));
  return fetcher(query, params);
};

export async function getFrontPage({ token }) {
  return await sanityClientFetch({ token, query: frontpageQuery });
}

export async function getPageBySlug({ slug, preview, token }) {
  return await sanityClientFetch({
    token,
    query: pageBySlugQuery,
    params: { slug, preview },
  });
}

export async function getPagePaths() {
  return await sanityClientFetch({ query: pagePathsQuery }).then((paths) => {
    return paths.map((path) => path.url.split("/"));
  });
}

export async function getSettings({ token }) {
  return await sanityClientFetch({ token, query: settingsQuery });
}

export async function getSitemap() {
  return await sanityClientFetch({ query: sitemapQuery });
}
