import { PreviewSuspense } from "@/components";
import { FrontpageContent } from "@/components/pages/FrontpageContent";
import { readToken } from "@/lib/sanity.api";
import { getFrontPage, getSettings } from "@/lib/sanity.client";
import { urlForImage } from "@/lib/sanity.image";
import { draftMode } from "next/headers";
import { lazy } from "react";

const FrontpagePreview = lazy(() =>
  import("@/components/pages/FrontpagePreview")
);

export const revalidate = 60;

export default async function Home() {
  const { isEnabled } = draftMode();

  const token = isEnabled ? readToken : undefined;
  const preview = isEnabled;

  const [settings, page] = await Promise.all([
    getSettings({ token }),
    getFrontPage({ token }),
  ]);

  const props = { page, settings, preview, token };
  if (preview) {
    return (
      <PreviewSuspense fallback={<FrontpageContent {...props} />}>
        <FrontpagePreview {...props} />
      </PreviewSuspense>
    );
  }

  return <FrontpageContent {...props} />;
}
