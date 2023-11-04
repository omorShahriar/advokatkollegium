import { urlForImage } from "@/lib/sanity.image";
import Image from "next/image";

const LawyerThumbnail = ({ lawyer }) => {
  return (
    <Image
      src={urlForImage(lawyer.image).width(800).url()}
      alt={lawyer.image.alt}
      width={lawyer.image.metadata?.dimensions?.width}
      height={lawyer.image.metadata?.dimensions?.height}
      blurDataURL={lawyer.image.metadata?.lqip}
      placeholder="blur"
      className="h-full w-full object-cover object-center"
    />
  );
};

export default LawyerThumbnail;
