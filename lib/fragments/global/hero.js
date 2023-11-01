import { groq } from "next-sanity";

import { IMAGE } from "./image";
import { LINK } from "./link";

export const HERO = groq`
  hero {
    subHeading,
    heading,
    description,
    background {
      ${IMAGE}
    },
    actions[] {
      ${LINK}
    }
   
  },
`;
