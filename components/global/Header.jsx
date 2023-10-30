"use client";

import clsx from "clsx";

import { useNavigate } from "lib/hooks";
import { resolveHref } from "lib/hooks/resolveHref";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "../elements/Button";

export function Header({ settings }) {
  const [navOpen, setNavOpen] = useState(false);

  useNavigate(() => setNavOpen(false));

  if (!settings) return null;

  const { config, header } = settings;

  return (
    <header className="absolute left-0 right-0 top-0 z-40 w-full bg-white">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-6">
        <Link href="/">
          <Image
            src={urlForImage(config.logo)?.height(100).url()}
            alt={config.logo.alt ?? "Logo"}
            className="h-9 w-auto object-contain md:h-12"
            width={0}
            height={100}
            priority
            unoptimized
          />
        </Link>

        <div className=" hidden items-center gap-6 text-black lg:flex">
          {header?.menu?.map((item) => (
            <Link
              key={item._key}
              href={resolveHref(item.pageType, item.url)}
              className="hover:border-b font-medium text-base leading-5 uppercase"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div>
          <Button link={header.cta} style="fill" className="hidden lg:flex" />
          <span className="relative block lg:hidden">
            <FiMenu
              className="h-6 w-6 cursor-pointer text-black"
              onClick={() => setNavOpen(true)}
            />
          </span>
        </div>
      </div>

      <nav
        className={clsx(
          "fixed bottom-0 right-0 top-0 z-50 w-full overflow-y-auto bg-white shadow-md transition-all duration-300 sm:max-w-md",
          navOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b px-8 py-6">
          <span className="text-lg font-medium text-gray-600">Meny</span>
          <button
            className="rounded-full p-1 hover:bg-gray-100"
            onClick={() => setNavOpen(false)}
          >
            <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col divide-y px-8 pt-6">
          {header?.menu?.map((item) => (
            <Link
              key={item._key}
              href={resolveHref(item.pageType, item.url)}
              className="group flex items-center justify-between py-3 text-xl"
            >
              {item.title}
              <BsArrowRight className="text-brand h-6 w-6 transition-all group-hover:-mr-1" />
            </Link>
          ))}
        </div>
        <div className="absolute bottom-8 left-8 right-8 flex items-center gap-2">
          <Button link={header.cta} color="dark" style="fill" withIcon />
          <Button
            link={{
              title: "Ring oss",
              url: `tel:${config.phone.replace(/\s/g, "")}`,
              pageType: "external",
            }}
            color="dark"
            style="fill"
            withIcon
          />
        </div>
      </nav>

      <div
        className={clsx(
          "fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-40 transition-all duration-300",
          navOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setNavOpen(false)}
      />
    </header>
  );
}
