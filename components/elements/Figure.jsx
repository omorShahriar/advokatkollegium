import { urlForImage } from "lib/sanity.image";
import Image from "next/image";

export function Figure({ image }) {
  return (
    <figure className="py-2">
      <Image
        src={urlForImage(image)?.url()}
        alt={image.alt || ""}
        width={image.metadata.dimensions.width}
        height={image.metadata.dimensions.height}
        blurDataURL={image.metadata.lqip}
        placeholder="blur"
        className="w-full rounded-xl"
        unoptimized
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </figure>
  );
}
