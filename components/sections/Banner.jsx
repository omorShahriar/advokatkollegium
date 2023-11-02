'use client'

import clsx from 'clsx'
import { BlockContent, Button, Text } from 'components'
import { urlForImage } from 'lib/sanity.image'
import Image from "next/legacy/image"
import { useEffect, useRef } from 'react'


export function Banner({
  heading,
  description,
  background,
  backgroundImage,
  images,
  bigText,
  link,
  sectionId
}) {
  const scrollDivRef = useRef<HTMLDivElement>(null)
  let scrollAnimation;

  const animateScroll = () => {
    if (scrollDivRef.current) {
      if (
        scrollDivRef.current.scrollLeft !==
        scrollDivRef.current.scrollWidth - scrollDivRef.current.clientWidth
      ) {
        scrollDivRef.current.scrollLeft += 1
      } else {
        scrollDivRef.current.scrollLeft = 0
      }
      setTimeout(() => {
        scrollAnimation = requestAnimationFrame(animateScroll)
      }, 20)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    scrollAnimation = requestAnimationFrame(animateScroll)

    return () => {
      cancelAnimationFrame(scrollAnimation)
    }
  }, [])

  const backgroundStyle = {
    image: 'bg-gray-100 text-white',
    brandLight: 'bg-primary-50 text-primary-950',
    brandDark: 'bg-primary-900 text-white',
    gray: 'bg-gray-100'
  }

  return (
    <section
      id={sectionId}
      className={clsx(
        'no-style relative my-16 w-full px-4 py-20 md:my-24 md:px-12',
        backgroundStyle[background]
      )}
    >
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4">
        <Text as="h2" size="display" className="text-center">
          {heading}
        </Text>
        {description ? (
          <div className="w-full text-center">
            <BlockContent value={description} />
          </div>
        ) : null}
      </div>
      {images ? (
        <div
          ref={scrollDivRef}
          className="no-scrollbar relative z-10 mx-auto mt-12 flex w-full max-w-7xl items-center justify-between gap-6 overflow-x-auto lg:overflow-x-visible"
        >
          {images?.map((image) => (
            <Image
              key={image.asset._ref}
              src={urlForImage(image).url()}
              alt={image.alt}
              width={200}
              height={200}
              className="h-8 w-auto object-contain"
            />
          ))}
        </div>
      ) : null}
      <div className="flex w-full flex-col items-center gap-8">
        {bigText ? <p className="relative z-10 mt-12 text-center text-6xl">{bigText}</p> : null}
        {link ? (
          <Button
            link={link}
            color={background === 'brandDark' || background === 'image' ? 'light' : 'dark'}
            className="relative z-10"
            withIcon
          />
        ) : null}
      </div>
      {backgroundImage ? (
        <Image
          src={urlForImage(backgroundImage).url()}
          alt={backgroundImage.alt}
          blurDataURL={backgroundImage.metadata?.lqip}
          placeholder="blur"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fill
        />
      ) : null}
    </section>
  )
}
