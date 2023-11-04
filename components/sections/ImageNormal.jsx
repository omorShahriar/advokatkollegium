import clsx from "clsx";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";

export function ImageNormal({ image, dontRoundCorners, sectionId }) {
  if (!image?.asset) return null;

  return (
    <section id={sectionId}>
      <Image
        src={urlForImage(image)?.url()}
        alt={image.alt}
        width={image.metadata?.dimensions?.width}
        height={image.metadata?.dimensions?.height}
        blurDataURL={image.metadata?.lqip}
        placeholder="blur"
        className={clsx("w-full", dontRoundCorners ? "" : "rounded-xl")}
        unoptimized
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </section>
  );
}
