import { groq } from "next-sanity";

import { PAGE_SHORT } from "../global/shorts";

export const PAGE_LINKS = groq`
  _type,
  _key,
  pages[]-> {
    ${PAGE_SHORT}
  },
  sectionId,
`;
