import { groq } from "next-sanity";
import { IMAGE } from "../global/image";
import { TEXTEDITOR } from "../global/texteditor";

export const AREA_OF_EXPERTISE = groq`
    _type,
    _key,
    heading,
    subHeading,
   description[] {
            ${TEXTEDITOR}
        },
    expertises[]-> {
        _id,
        title,
         description[] {
            ${TEXTEDITOR}
        },
        image {
            ${IMAGE}
        },
    },
    `;
