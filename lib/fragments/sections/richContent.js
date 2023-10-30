import { groq } from "next-sanity";

import { IMAGE } from "../global/image";
import { LINK } from "../global/link";
import { TEXTEDITOR } from "../global/texteditor";

export const RICH_CONTENT = groq`
  _type,
  _key,
  heading,
  content[] {
    ${TEXTEDITOR}
  },
  points,
  link {
    ${LINK}
  },
  image {
    ${IMAGE}
  },
  imagePosition,
  background,
  sectionId,
`;
