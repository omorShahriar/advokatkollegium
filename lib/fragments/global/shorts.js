import { groq } from 'next-sanity'

import { HERO } from './hero'
import { PUBLISH_SETTINGS } from './publishSettings'

export const PAGE_SHORT = groq`
  _id,
  title,
  ${HERO}
  ${PUBLISH_SETTINGS}
`
