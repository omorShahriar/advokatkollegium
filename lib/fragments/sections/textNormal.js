import { groq } from "next-sanity";

import { TEXTEDITOR } from "../global/texteditor";

export const TEXT_NORMAL = groq`
  _type,
  _key,
  text[] {
    ${TEXTEDITOR}
  },
  sectionId,
`;
