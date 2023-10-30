import { groq } from 'next-sanity'

export const LINK = groq`
  _key,
  title,
  "url": select(
    link != null => link,
    page != null => page->settings.url.current,
    null
  ),
  "pageType": select(
    link != null => "external",
    page != null => page->_type,
    null
  ),
`
