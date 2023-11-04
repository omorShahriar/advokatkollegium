"use client";

import { Text } from "components";
import { resolveHref, useTracking } from "lib/hooks";

import Link from "next/link";

import { BlockContent } from "../elements";

export function Footer({ settings }) {
  const { trackEvent } = useTracking();

  if (!settings) return null;

  const { config, footer } = settings;

  return (
    <footer id="footer" className="py-24 w-full mx-auto max-w-content">
      <div className="grid gap-5 grid-cols-12 pb-8 ">
        <div className="col-span-4">
          <p className="text-theme-blue font-medium leading-6 ">
            {config.title}
          </p>
          <p className="mt-3">{config.address}</p>
          <div className="mt-6 flex flex-col gap-1 ">
            <a
              href={`tel:${config.phone.replace(/[^0-9]/g, "")}`}
              onClick={() => trackEvent("call_button_click", {})}
              className=""
            >
              {config.phone}
            </a>
            <Link href={`mailto:${config.email}`}>{config.email}</Link>
          </div>
        </div>
        {footer?.menus?.map((menu) => {
          return (
            <div
              key={menu._key}
              className="col-span-2 flex w-full flex-col gap-1"
            >
              <Text
                color="black"
                className="mb-2 font-medium  text-theme-blue  leading-6"
              >
                {menu.title}
              </Text>
              {menu.links?.map((link) => (
                <Link
                  key={link._key}
                  href={resolveHref(link.pageType, link.url)}
                >
                  <Text size="fine" color="black">
                    {link.title}
                  </Text>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
      <div className="w-full border-t">
        <div className=" flex  flex-col items-center justify-between gap-y-4 py-4 md:flex-row">
          <Text as="p" size="fine">
            Copyright © {new Date().getFullYear()} {config.title}
          </Text>
          <div className="flex items-center gap-4">
            {footer?.bottomLineMenu.map((item) => (
              <Link key={item._key} href={resolveHref(item.pageType, item.url)}>
                <Text as="p" size="fine">
                  {item.title}
                </Text>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
