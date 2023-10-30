import { groq } from 'next-sanity'

import { IMAGE } from './image'
import { LINK } from './link'

export const HERO = groq`
  hero {
    heading,
    description,
    backgroundImage {
      ${IMAGE}
    },
    actions[] {
      ${LINK}
    },
    services[] {
      _key,
      link {
        ${LINK}
      },
      icon {
        ${IMAGE}
      },
    },
  },
`
