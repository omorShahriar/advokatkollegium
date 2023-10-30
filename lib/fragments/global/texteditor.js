import { groq } from 'next-sanity'

import { IMAGE } from './image'

export const TEXTEDITOR = groq`
  ...,
  _type == "image" => {
    ${IMAGE}
  },
  markDefs[] {
    ...,
    (_type == "internalLink") => {
      "url": @.reference->settings.url.current,
    },
  }
`
