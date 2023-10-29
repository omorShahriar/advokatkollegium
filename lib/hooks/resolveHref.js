export function resolveHref(documentType, slug) {
  slug?.startsWith("/") && (slug = slug.slice(1));

  switch (documentType) {
    case "frontpage":
      return "/";
    case "page":
      return slug ? `/${slug}` : undefined;
    case "external":
      return slug ? slug : undefined;
    default:
      return slug ? `/${slug}` : undefined;
  }
}
