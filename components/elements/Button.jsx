"use client";

import clsx from "clsx";
import { resolveHref, useTracking } from "lib/hooks";
import Link from "next/link";

export function Button({ link, title, onPress, className, style = "outline" }) {
  const { trackEvent } = useTracking();

  if (!link?.title && !(onPress && title)) return null;

  const defaultStyle =
    "group flex w-fit items-center border px-12 py-4 transition-all";

  const backgroundStyle = {
    outline: "bg-transparent  border-black hover:bg-theme-gray ",
    fill: "bg-theme-blue text-white border-theme-blue hover:bg-theme-blue/90 hover:border-theme-blue/90",
  };

  const href = resolveHref(link?.pageType, link?.url);

  if (link?.pageType === "external") {
    return (
      <a
        href={link.url}
        target="_blank"
        onClick={() =>
          trackEvent(
            link.url.startsWith("tel:") ? "call_button_click" : "button_click",
            {
              button_text: link.title,
              button_url: link.url,
            }
          )
        }
        className={clsx(defaultStyle, backgroundStyle[style], className)}
      >
        {link?.title}
      </a>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={clsx(defaultStyle, backgroundStyle[style], className)}
      >
        {link?.title}
      </Link>
    );
  }

  if (onPress) {
    return (
      <button
        onClick={onPress}
        className={clsx(defaultStyle, backgroundStyle[style], className)}
      >
        {title}
      </button>
    );
  }

  return (
    <a className={clsx(defaultStyle, backgroundStyle[style], className)}>
      {link?.title || title}
    </a>
  );
}
