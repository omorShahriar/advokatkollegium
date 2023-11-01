'use client'

import { usePreview } from '@/lib/sanity.preview'
import { frontpageQuery } from '@/lib/sanity.queries'
import { FrontpageContent } from './FrontpageContent'




export default function FrontpagePreview({ settings, token }) {
  const previewContent= usePreview(token, frontpageQuery)
  return <FrontpageContent page={previewContent} settings={settings} preview={true} />
}
