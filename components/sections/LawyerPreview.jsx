"use client";

import { useState, useEffect } from "react";
import { BlockContent, Text } from "../elements";
import { LawyerThumbnail } from "../elements/lawyer";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";
import { cn } from "@/lib/utils";

export default function LawyerPreview({
  heading,
  subHeading,
  link,
  description,
  lawyers,
}) {
  const [selectedLawyer, setSelectedLawyer] = useState(lawyers[0]);
  const [selectedId, setSelectedID] = useState(lawyers[0]._id);

  const selectLawyer = (id) => {
    setSelectedID(id);
  };
  useEffect(() => {
    setSelectedLawyer(lawyers.find((lawyer) => lawyer._id === selectedId));
  }, [selectedId, lawyers]);

  return (
    <section>
      <div className="max-w-4xl mx-auto flex flex-col ">
        <Text className="text-center" size="subHeading">
          {subHeading}
        </Text>
        <Text className="text-center" size="display">
          {heading}
        </Text>
        <div className="text-center max-w-3xl mx-auto">
          <BlockContent value={description} />
        </div>
      </div>
      <div className="mt-16 flex md:justify-between">
        <div>
          <div className="max-w-[640px] mt-[60px] w-full aspect-[641/752]">
            <Image
              src={urlForImage(selectedLawyer.image).width(800).url()}
              alt={selectedLawyer.image.alt}
              width={selectedLawyer.image.metadata?.dimensions?.width}
              height={selectedLawyer.image.metadata?.dimensions?.height}
              blurDataURL={selectedLawyer.image.metadata?.lqip}
              placeholder="blur"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <Text size="display" className="py-0 pt-8">
              {selectedLawyer.name}
            </Text>
            <Text size="subHeading" className="text-2xl pt-6">
              {selectedLawyer.title}
            </Text>
          </div>
        </div>
        <div className="max-w-xl flex justify-end gap-5 flex-wrap">
          {lawyers.map((lawyer) => {
            return (
              <div
                className={cn(
                  " max-w-[175px] aspect-[171/256]",
                  selectedId === lawyer._id && "border-8 border-theme-blue"
                )}
                key={lawyer._id}
                onClick={() => selectLawyer(lawyer._id)}
              >
                <LawyerThumbnail lawyer={lawyer} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
