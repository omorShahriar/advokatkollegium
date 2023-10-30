import { groq } from "next-sanity";

import { FORM } from "../documents/form";
import { IMAGE } from "../global/image";
import { TEXTEDITOR } from "../global/texteditor";

export const DISPLAY_FORM = groq`
  _type,
  _key,
  heading,
  description[] {
    ${TEXTEDITOR}
  },
  form-> {
    ${FORM}
  },
  image {
    ${IMAGE}
  },
  backgroundColor,
  sectionId,
`;
