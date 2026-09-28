'use client'

import React from 'react'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'
import './About.css'

type AboutBlockData = Extract<Page['layout'][number], { blockType: 'abouttwo' }>

interface AboutRendererProps extends AboutBlockData {
  disableInnerContainer?: boolean
  inlineStyle?: string
}

const AboutTwoRenderer: React.FC<AboutRendererProps> = (props) => {
  const { className, title, description, image, inlineStyle } = props

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
      className={`${className || 'aboutTwo'} py-12 md:py-16 lg:py-20`} 
      style={parseStyleString(inlineStyle)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>

            <p className="text-[14px] leading-relaxed opacity-90 !text-[color:var(--description-color)]">{description}</p>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative w-full max-w-2xl min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden">
            <Image 
              src={imageUrl} 
              alt={(title as string) || 'About Image'} 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTwoRenderer