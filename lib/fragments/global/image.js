import { groq } from 'next-sanity'

export const IMAGE = groq`
  _key,
  asset,
  crop,
  hotspot,
  "title": asset->title,
  "alt": asset->altText,
  "tags": asset->opt.media.tags[]->name.current,
  "metadata": asset->metadata {
    dimensions,
    lqip,
  },
`
