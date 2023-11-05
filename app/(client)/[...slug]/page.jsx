import { PreviewSuspense } from "components";
import { PageContent } from "components/pages/PageContent";
import { readToken } from "lib/sanity.api";
import { getPageBySlug, getPagePaths, getSettings } from "lib/sanity.client";
import { urlForImage } from "lib/sanity.image";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { lazy } from "react";

const PagePreview = lazy(() => import("components/pages/PagePreview"));

export const revalidate = 60;
export default async function Page({ params }) {
  const { isEnabled } = draftMode();

  const token = isEnabled ? readToken : undefined;
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  const preview = isEnabled;

  const [settings, page] = await Promise.all([
    getSettings({ token }),
    getPageBySlug({ token, slug, preview }),
  ]);

  if (!page) {
    notFound();
  }
  const props = { page, settings, preview, token, slug };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.config.title,
    image: urlForImage(settings.config.logo)?.height(100).url(),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Stortingsgata 16",
      addressLocality: "Oslo",
      postalCode: "0161",
      addressCountry: "NO",
    },
    telephone: settings.config.phone,
    email: settings.config.email,
    url: settings.config.url + "/" + slug,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "47",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  };

  if (preview) {
    return (
      <PreviewSuspense fallback={<PageContent {...props} jsonLd={jsonLd} />}>
        <PagePreview {...props} jsonLd={jsonLd} />
      </PreviewSuspense>
    );
  }

  return <PageContent {...props} jsonLd={jsonLd} />;
}
