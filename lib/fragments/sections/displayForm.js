import { groq } from "next-sanity";

import { FORM } from "../documents/form";

export const DISPLAY_FORM = groq`
  _type,
  _key,
  heading,
  subHeading,
  form-> {
    ${FORM}
  },
  email,
  telephone,
`;
