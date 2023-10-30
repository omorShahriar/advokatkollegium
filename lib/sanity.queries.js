import { groq } from "next-sanity";

import { FRONTPAGE } from "./fragments/documents/frontpage";
import { PAGE } from "./fragments/documents/page";
import { HEADER } from "./fragments/documents/header";
import { FOOTER } from "./fragments/documents/footer";
import { SETTINGS } from "./fragments/documents/settings";

export const frontpageQuery = groq`
  *[_id == "frontpage"][0] {
    ${FRONTPAGE}
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && settings.url.current == $slug && ($preview || settings.status != "private")][0] {
    ${PAGE}
  }
`;

export const pagePathsQuery = groq`
  *[_type == "page" && defined(settings.url.current) && settings.status != "private"] {
    "url": settings.url.current,
  }
`;

export const settingsQuery = groq`
  {
    "config": *[_id == "settings"][0] {
      ${SETTINGS}
    },
    "header": *[_id == "header"][0] {
      ${HEADER}
    },
    "footer": *[_id == "footer"][0] {
      ${FOOTER}
    },
  }
`;

export const sitemapQuery = groq`
  *[_type in ["page"] && defined(settings.url.current) && settings.status == "public"] {
    _type,
    _updatedAt,
    "url": settings.url.current,
    "image": metadata.openGraphImage.asset->url,
    "priority": select(
      metadata.priority != null => metadata.priority,
      0.5,
    ),
  }
`;
