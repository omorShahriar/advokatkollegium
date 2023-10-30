export const useCdn = process.env.NODE_ENV === "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-20";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
