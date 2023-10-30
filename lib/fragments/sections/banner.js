import { groq } from "next-sanity";

import { IMAGE } from "../global/image";
import { LINK } from "../global/link";
import { TEXTEDITOR } from "../global/texteditor";

export const BANNER = groq`
  _type,
  _key,
  heading,
  description[] {
    ${TEXTEDITOR}
  },
  background,
  backgroundImage {
    ${IMAGE}
  },
  images[] {
    ${IMAGE}
  },
  bigText,
  link {
    ${LINK}
  },
  sectionId,
`;
