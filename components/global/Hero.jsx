import clsx from "clsx";
import { Button } from "components";
import { resolveHref } from "lib/hooks";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import Link from "next/link";

export function Hero({ hero }) {
  return (
    <div className=" relative mt-[82px] flex justify-end bg-theme-gray w-full">
      <div className="relative w-[65%] h-[calc(100vh-82px)]">
        <Image
          src={urlForImage(hero.background).url()}
          alt={hero.background.alt}
          className="absolute inset-0"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
      <div className=" absolute z-10 inset-0">
        <div className="w-full mx-auto max-w-content">
          <div className="bg-white mt-[72px] p-20 absolute">
            <p className="text-theme-orange font-bold uppercase leading-5">
              {hero.subHeading}
            </p>
            <h1 className="my-10 font-dm-serif text-7xl max-w-xl">
              {hero.heading}
            </h1>
            <p className="text-xl max-w-2xl leading-9">{hero.description}</p>
            <div className="mt-14 flex items-center gap-4">
              {hero.actions.map((action, i) => (
                <Button
                  key={action._key}
                  link={action}
                  style={i == 0 ? "fill" : "outline"}
                  className=""
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
