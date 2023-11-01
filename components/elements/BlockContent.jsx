import { PortableText } from "@portabletext/react";
import { Figure, Text } from "components";
import { resolveHref } from "lib/hooks";
import Link from "next/link";

const slugifyHeading = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export function BlockContent({ value }) {
  const components = {
    block: {
      normal: ({ children }) => <Text className="py-2">{children}</Text>,
      h1: ({ children }) => (
        <Text
          as="h1"
          size="display"
          className="pb-2 pt-8 first:pt-0"
          id={slugifyHeading(children.toString())}
        >
          {children}
        </Text>
      ),
      h2: ({ children }) => (
        <Text
          as="h2"
          size="display"
          className="pb-2 pt-8 first:pt-0"
          id={slugifyHeading(children.toString())}
        >
          {children}
        </Text>
      ),
      h3: ({ children }) => (
        <Text
          as="h3"
          size="display"
          className="pb-2 pt-8 first:pt-0"
          id={slugifyHeading(children.toString())}
        >
          {children}
        </Text>
      ),
      h4: ({ children }) => (
        <Text
          as="h4"
          size="display"
          className="pb-2 pt-8 first:pt-0"
          id={slugifyHeading(children.toString())}
        >
          {children}
        </Text>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-2 border-l-4 pl-4">{children}</blockquote>
      ),
    },
    marks: {
      externalLink: ({ children, value }) => {
        const { url } = value;

        if (!url) return <a className="underline">{children}</a>;

        const rel =
          url.startsWith("/") || url.startsWith("#")
            ? undefined
            : "noopener noreferrer";
        const target =
          url.startsWith("/") || url.startsWith("#") ? "_self" : "_blank";

        return (
          <Link
            className="text-brand hover:text-secondary underline transition-all"
            href={url}
            target={target}
            rel={rel}
          >
            {children}
          </Link>
        );
      },
      link: ({ children, value }) => {
        const { url } = value;

        if (!url) return <a className="underline">{children}</a>;

        const rel =
          url.startsWith("/") || url.startsWith("#")
            ? undefined
            : "noopener noreferrer";
        const target =
          url.startsWith("/") || url.startsWith("#") ? "_self" : "_blank";

        return (
          <Link
            className="text-brand hover:text-secondary underline transition-all"
            href={url}
            target={target}
            rel={rel}
          >
            {children}
          </Link>
        );
      },
      internalLink: ({ children, value }) => {
        const { pageType, url } = value;

        if (!url) return <a className="underline">{children}</a>;

        return (
          <Link
            className="text-brand hover:text-secondary underline transition-all"
            href={resolveHref(pageType, url)}
          >
            {children}
          </Link>
        );
      },
    },
    types: {
      image: ({ value }) => <Figure image={value} />,
    },
  };

  return <PortableText components={components} value={value} />;
}
