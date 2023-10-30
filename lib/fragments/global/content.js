import { groq } from "next-sanity";

import { BANNER } from "../sections/banner";
import { DISPLAY_FORM } from "../sections/displayForm";
import { IMAGE_NORMAL } from "../sections/imageNormal";
import { RICH_CONTENT } from "../sections/richContent";
import { TEXT_NORMAL } from "../sections/textNormal";

export const CONTENT = groq`
  content[] {
    ...,
    _type == "banner" => {
      ${BANNER}
    },
    _type == "displayForm" => {
      ${DISPLAY_FORM}
    },
    _type == "imageNormal" => {
      ${IMAGE_NORMAL}
    },
    _type == "richContent" => {
      ${RICH_CONTENT}
    },
    _type == "textNormal" => {
      ${TEXT_NORMAL}
    },
  },
`;
