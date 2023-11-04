import { groq } from "next-sanity";
import { IMAGE } from "../global/image";

export const LAWYER_LIST = groq`
    _type,
    _key,
    "lawyers": lawyerList[]-> {
        _id,
        name,
        image {
            ${IMAGE}
        },
        title,
        email,
        
 
    },
    `;
