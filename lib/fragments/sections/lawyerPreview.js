import { groq } from "next-sanity";
import { TEXTEDITOR } from "../global/texteditor";
import { IMAGE } from "../global/image";
import { LINK } from "../global/link";

export const LAWYER_PREVIEW = groq`
    _type,
    _key,
    heading,
    subHeading,
    description[] {
      ${TEXTEDITOR}
    },
    "lawyers": lawyers[]-> {
        _id,
        name,
        image {
            ${IMAGE}
        },
        title,
       
    },
    link {
    
    ${LINK}

    }

    `;
