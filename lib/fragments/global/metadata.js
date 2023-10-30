import { groq } from 'next-sanity'

export const METADATA = groq`
  metadata {
    metaTitle,
    metaDescription,
    priority,
    openGraphImage,  
  },
`
