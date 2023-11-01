import { Hero } from '@/components'
import { RenderSections } from '@/components/sections/RenderSections'
import React from 'react'



export function PageContent(props) {
  const { page, settings, jsonLd } = props

  return (
    <React.Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero hero={page.hero} />
      <RenderSections sections={page.content} settings={settings} />
    </React.Fragment>
  )
}
