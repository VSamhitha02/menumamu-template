'use client'

import React from 'react'
import Image from 'next/image'
import './About.css'
import type { Media, Page } from '@/payload-types'

// Extract the About block type from the Page layout union
type AboutBlockData = Extract<Page['layout'][number], { blockType: 'about' }>

interface AboutRendererProps extends AboutBlockData {
  disableInnerContainer?: boolean
  inlineStyle?: string
}

const AboutRenderer: React.FC<AboutRendererProps> = (props) => {
  const { className, title, description, image, inlineStyle } = props

  // Map theme values to corresponding CSS classes.
  const themeClasses: Record<string, string> = {
    'black-theme': 'about-black',
    'white-theme': 'about-white',
    'orange-theme': 'about-orange',
    'green-theme': 'about-green',
  }
  
  const imageUrl = (image as Media)?.url || ''

  const parseStyleString = (styleString?: string) => {
    if (!styleString) return {}

    return Object.fromEntries(
      styleString
        .split(';')
        .filter(Boolean)
        .map((style) => {
          const [key, value] = style.split(':')

          if (!key || !value) return []

          return [
            key
              .trim()
              .replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value.trim(),
          ]
        })
        .filter((entry) => entry.length === 2)
    )
  }

  return (
    <section 
      className={`${className || ''} py-8 sm:py-12 px-2 sm:px-6 lg:px-20`}
      style={parseStyleString(inlineStyle)}
    >
      {/* container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* image */}
        <div className="ml-auto md:ml-4 flex-1 relative w-full max-w-2xl min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title || 'About Image'}
            fill
            className="rounded-3xl object-cover w-full h-auto"
          />
        </div>

        {/* content */}
        <div className="flex-1 text-center md:text-left px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-6 !text-[color:var(--heading-color)]">{title}</h2>
          {/* logo / description */}
          <p className="text-[14px] leading-relaxed opacity-90 !text-[color:var(--description-color)]">{description}</p>
        </div>
      </div>
    </section>
  )
}

export default AboutRenderer