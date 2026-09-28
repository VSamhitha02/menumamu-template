'use client'

import React from 'react'
import Image from 'next/image'
import type { Media, Page } from '@/payload-types'

type AboutBlockData = Extract<Page['layout'][number], { blockType: 'about1' }>

interface AboutRendererProps extends Partial<AboutBlockData> {
  disableInnerContainer?: boolean
  inlineStyle?: string
}

const About1Renderer: React.FC<AboutRendererProps> = (props) => {
  const { title, description, image, className, inlineStyle } = props

  const imageUrl = (image as Media)?.url || (typeof image === 'string' ? image : '')

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
      className={`relative w-full min-h-[85vh] md:min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden ${className || ''}`}
      style={parseStyleString(inlineStyle)}
    >
      {/* Background Image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src={imageUrl}
            alt={title || 'About Us Background'}
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Dark Overlay Card */}
      <div className="relative z-10 max-w-4xl w-full bg-black/60 backdrop-blur-sm border border-white/10 text-white rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl text-left">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center tracking-tight text-white !text-[color:var(--heading-color)]">
            {title}
          </h2>
        )}

        {description && (
          <div className="text-[14px] leading-relaxed text-gray-200 space-y-3.5 whitespace-pre-line font-normal tracking-normal !text-[color:var(--description-color)]">
            {description}
          </div>
        )}
      </div>
    </section>
  )
}

export default About1Renderer