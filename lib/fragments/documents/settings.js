import { groq } from "next-sanity";

import { IMAGE } from "../global/image";

export const SETTINGS = groq`
  title,
  url,
  favicon {
    ${IMAGE}
  },
  logo {
    ${IMAGE}
  },
  phone,
  email,
  description,
  keywords,
  openGraphImage,
  googleTagManagerId,
`;
