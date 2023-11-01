'use client'

import { usePreview } from '@/lib/sanity.preview'
import { pageBySlugQuery } from '@/lib/sanity.queries'


import { PageContent } from './PageContent'

export default function PagePreview({ settings, slug, token, jsonLd }) {
  const previewContent = usePreview(token, pageBySlugQuery, { slug })
  return <PageContent page={previewContent} jsonLd={jsonLd} settings={settings} preview={true} />
}
