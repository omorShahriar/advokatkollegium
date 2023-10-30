import { groq } from "next-sanity";

import { CONTENT } from "../global/content";
import { HERO } from "../global/hero";
import { METADATA } from "../global/metadata";

export const FRONTPAGE = groq`
  ${CONTENT}
  ${HERO}
  ${METADATA}
`;
