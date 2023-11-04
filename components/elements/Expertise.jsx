import { urlForImage } from "@/lib/sanity.image";
import Image from "next/image";
import React from "react";
import { Text } from ".";

const Expertise = ({ title, image }) => {
  return (
    <div className="w-full group aspect-[465/264] bg-theme-blue">
      {image && (
        <div className="w-full relative h-full overflow-hidden ">
          <div className="absolute bg-black/50 inset-0 z-10" />
          <div className="absolute w-3/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Text size="heading" color="white" className="text-4xl lg:text-5xl">
              {title}
            </Text>
          </div>
          <Image
            src={urlForImage(image)?.width(1000).url()}
            width={image.metadata.dimensions.width}
            height={image.metadata.dimensions.height}
            blurDataURL={image.metadata.lqip}
            placeholder="blur"
            alt={image.alt}
            className="object-cover object-center w-full h-full group-hover:scale-110 transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default Expertise;
