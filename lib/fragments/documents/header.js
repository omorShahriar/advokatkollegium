import { groq } from "next-sanity";

import { LINK } from "../global/link";

export const HEADER = groq`
  menu[] {
    ${LINK}
  },
  cta {
    ${LINK}
  },
`;
