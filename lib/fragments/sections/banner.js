import { groq } from "next-sanity";
import { IMAGE } from "../global/image";
import { LINK } from "../global/link";

export const BANNER = groq`
  _type,
  _key,
  subHeading,
  heading,
  background,
  backgroundImage {
    ${IMAGE}
  },
  link {
    ${LINK}
  },
  sectionId,
`;
