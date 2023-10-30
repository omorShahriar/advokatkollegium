import { groq } from "next-sanity";

import { IMAGE } from "../global/image";

export const IMAGE_NORMAL = groq`
  _type,
  _key,
  image {
    ${IMAGE}
  },
  dontRoundCorners,
  sectionId,
`;
