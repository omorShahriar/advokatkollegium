import clsx from "clsx";
import { BlockContent, Button, Text } from "components/elements";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

export function RichContent({
  heading,
  content,
  points,
  image,
  imagePosition,
  link,
  background,
  sectionId,
}) {
  if (image && background === "image") {
    return (
      <section className="no-style relative my-16 w-full">
        <Image
          src={urlForImage(image)?.quality(100).url()}
          alt={image.alt}
          className="-z-10 object-cover"
          blurDataURL={image.metadata.lqip}
          placeholder="blur"
          fill
          unoptimized
        />
        <div className="mx-auto w-full max-w-content px-4 py-16 md:py-32">
          <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-white p-8 md:w-1/2 lg:w-3/5">
            <Text as="h2" size="display">
              {heading}
            </Text>
            <div className="w-full">
              <BlockContent value={content} />
            </div>
            {points?.length > 0 ? (
              <div className="my-4 w-full columns-2 gap-4">
                {points?.map((point, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <FiCheckCircle className="mr-2 text-primary-800" />
                    {point}
                  </span>
                ))}
              </div>
            ) : null}

            <Button link={link} color="dark" withIcon />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={sectionId}>
      <div
        className={clsx(
          "flex w-full flex-col-reverse items-center gap-x-32 overflow-hidden rounded-xl",
          imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row",
          background === "brandDark" && "bg-primary-950 p-2 text-white md:p-6",
          background === "brandLight" && "bg-primary-100 p-2 md:p-6",
          background === "gray" && "bg-gray-100 p-2 md:p-6"
        )}
      >
        <div
          className={clsx(
            "flex w-full flex-col items-start gap-4",
            image ? "md:w-[55%]" : "md:w-full",
            background !== ("transparent" || "image")
              ? "p-4 md:py-0"
              : "pt-6 md:pt-0"
          )}
        >
          <Text as="h2" size="display">
            {heading}
          </Text>
          <div className="w-full">
            <BlockContent value={content} />
          </div>
          {points?.length > 0 ? (
            <div className="my-4 w-full columns-2 gap-4">
              {points?.map((point, index) => (
                <span key={index} className="flex items-center gap-2">
                  <FiCheckCircle className="mr-2 text-primary-800" />
                  {point}
                </span>
              ))}
            </div>
          ) : null}
          <Button
            link={link}
            color={background === "brandDark" ? "white" : "dark"}
            className="mt-2"
            withIcon
          />
        </div>
        {image?.asset ? (
          <div className="w-full md:w-[45%]">
            <Image
              src={urlForImage(image)?.width(1000).url()}
              width={image.metadata.dimensions.width}
              height={image.metadata.dimensions.height}
              blurDataURL={image.metadata.lqip}
              placeholder="blur"
              alt={image.alt}
              className="rounded-xl object-cover"
              unoptimized
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
