import { cn } from "@/lib/utils";
import clsx from "clsx";
import { BlockContent, Button, Text } from "components/elements";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";

export function RichContent({
  subHeading,
  heading,
  content,

  image,
  imagePosition,
  link,
  background,
}) {
  if (image && background === "image") {
    return (
      <div className="relative flex justify-end w-full">
        <div className="absolute  w-1/2 h-full ">
          <Image
            src={urlForImage(image).width(1000).url()}
            alt={image.alt}
            width={image.metadata?.dimensions?.width}
            height={image.metadata?.dimensions?.height}
            blurDataURL={image.metadata?.lqip}
            placeholder="blur"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <section className={cn("py-20")}>
          <div className=" w-full max-w-fit  ml-0 md:ml-10   bg-theme-blue p-32 md:w-1/2 lg:w-3/5">
            <div className="flex flex-col gap-4 items-start ">
              <Text color="white" as="h2" size="display" className="py-0">
                {heading}
              </Text>
              <div className="w-full text-white max-w-lg md:mt-12">
                <BlockContent value={content} />
              </div>

              <Button
                link={link}
                style="fill"
                className="bg-white text-theme-blue border-white mt-6"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={cn(background === "beige" && "bg-theme-beige ")}>
      <section>
        <div
          className={clsx(
            "flex  flex-col-reverse items-center",
            imagePosition === "left" ? "md:flex-row-reverse " : "md:flex-row"
          )}
        >
          <div
            className={cn(
              "w-full md:w-[55%]",
              imagePosition === "left"
                ? "md:pl-10 lg:pl-20"
                : "md:pr-10 lg:pr-20"
            )}
          >
            <Text size="subHeading">{subHeading}</Text>
            <Text as="h2" size="display">
              {heading}
            </Text>
            <div className="w-full max-w-xl">
              <BlockContent value={content} />
            </div>
            <Button link={link} style="outline" className="mt-8" />
          </div>
          {image?.asset ? (
            <div className="w-full md:w-[45%] aspect-square  overflow-hidden">
              <Image
                src={urlForImage(image)?.width(1000).url()}
                width={image.metadata.dimensions.width}
                height={image.metadata.dimensions.height}
                blurDataURL={image.metadata.lqip}
                placeholder="blur"
                alt={image.alt}
                className=" object-cover object-center h-full w-full "
                unoptimized
              />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
