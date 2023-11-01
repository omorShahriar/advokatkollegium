import { groq } from "next-sanity";

import { LINK } from "../global/link";

export const FOOTER = groq`
  menus[] {
    _key,
    title,
    links[] {
      ${LINK}
    },
  },
  bottomLineMenu[] {
    ${LINK}
  },
`;
