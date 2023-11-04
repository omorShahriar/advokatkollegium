"use client";

import clsx from "clsx";
import { BlockContent, Button, Text } from "components";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function Banner({
  subHeading,
  heading,
  background,
  backgroundImage,
  link,
  sectionId,
}) {
  return (
    <section
      id={sectionId}
      className={clsx("no-style relative  w-full px-4 md:py-36 py-28  ")}
    >
      <div className="relative z-20 mx-auto max-w-content flex justify-between items-center">
        <div className=" flex max-w-3xl flex-col  gap-4">
          <Text as="h3" size="subHeading">
            {subHeading}
          </Text>
          <Text as="h2" size="display" className="text-white py-0">
            {heading}
          </Text>
        </div>

        <div className="">
          {link ? <Button link={link} style="fill" /> : null}
        </div>
      </div>

      {backgroundImage ? (
        <>
          <div className="absolute inset-0 z-10 bg-[#111111] opacity-80" />
          <Image
            src={urlForImage(backgroundImage).url()}
            alt={backgroundImage.alt}
            blurDataURL={backgroundImage.metadata?.lqip}
            placeholder="blur"
            className="absolute inset-0 h-full w-full object-cover object-top"
            fill
          />
        </>
      ) : null}
    </section>
  );
}
