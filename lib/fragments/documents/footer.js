import { groq } from "next-sanity";

import { IMAGE } from "../global/image";
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
