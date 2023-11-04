import { groq } from "next-sanity";

import { BANNER } from "../sections/banner";
import { DISPLAY_FORM } from "../sections/displayForm";
import { IMAGE_NORMAL } from "../sections/imageNormal";
import { RICH_CONTENT } from "../sections/richContent";
import { TEXT_NORMAL } from "../sections/textNormal";
import { AREA_OF_EXPERTISE } from "../sections/areaOfExpertise";
import { LAWYER_LIST } from "../sections/lawyerList";
import { LAWYER_PREVIEW } from "../sections/lawyerPreview";

export const CONTENT = groq`
  content[] {
    ...,
    _type == "banner" => {
      ${BANNER}
    },
    _type == "areaOfExpertise" => {
      ${AREA_OF_EXPERTISE}
    },
    _type == "lawyerList" => {
      ${LAWYER_LIST}
    },
    _type == "lawyerPreview" => {
      ${LAWYER_PREVIEW}
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
