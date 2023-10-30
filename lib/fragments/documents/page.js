import { groq } from "next-sanity";

import { CONTENT } from "../global/content";
import { HERO } from "../global/hero";
import { METADATA } from "../global/metadata";
import { PUBLISH_SETTINGS } from "../global/publishSettings";

export const PAGE = groq`
  _id,
  _type,
  title,
  ${CONTENT}
  ${HERO}
  ${METADATA}
  ${PUBLISH_SETTINGS}
`;
