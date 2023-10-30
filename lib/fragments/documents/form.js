import { groq } from 'next-sanity'

export const FORM = groq`
  name,
  fields[] {
    _key,
    name,
    placeholder,
    type,
    options[] {
      _key,
      label,
      value,
    },
    required,
    width,
  },
  recipient,
`
