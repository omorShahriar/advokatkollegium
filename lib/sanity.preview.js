import { dataset, projectId } from "lib/sanity.api";
import { definePreview } from "next-sanity/preview";

let alerted = false;

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly: () => {
    if (!alerted) {
      alert("You need to be signed in to use preview mode");
      alerted = true;
    }
  },
});
