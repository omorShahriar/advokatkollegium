import { groq } from "next-sanity";

import { IMAGE } from "../global/image";
import { LINK } from "../global/link";
import { TEXTEDITOR } from "../global/texteditor";

export const RICH_CONTENT = groq`
  _type,
  _key,
  subHeading,
  heading,
  content[] {
    ${TEXTEDITOR}
  },
  link {
    ${LINK}
  },
  background,
  image {
    ${IMAGE}
  },
  imagePosition,
  sectionId,
`;
