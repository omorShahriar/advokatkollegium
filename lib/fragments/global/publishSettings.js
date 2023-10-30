import { groq } from 'next-sanity'

export const PUBLISH_SETTINGS = groq`
  settings {
    "url": url.current,
    status,
  },
`
