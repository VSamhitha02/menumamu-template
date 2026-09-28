'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Hero2.css'
import type { Media, Page } from '@/payload-types'

type HeroTwoBlockData = Extract<Page['layout'][number], { blockType: 'heroTwo' }>

export interface ThemeConfig {
  textColor?: string
  backgroundColor?: string
  containerBackground?: string
  headingColor?: string
  bodyFont?: string
  headingFont?: string
}

interface HeroTwoRendererProps extends HeroTwoBlockData {
  disableInnerContainer?: boolean
  className?: string
  inlineStyle?: string
  btn_variant?: 'fill' | 'outline'
  theme?: ThemeConfig
}

const Hero2Renderer: React.FC<HeroTwoRendererProps> = (props) => {
  const {
    id,
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
    image,
    className = '',
    btn_variant = 'fill',
    inlineStyle,
    theme,
  } = props

  const safeButtonLink = buttonLink || ''
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

  // Combine dynamic theme styles with custom inline styles
  const dynamicSectionStyle: React.CSSProperties = {
    backgroundColor: theme?.backgroundColor,
    color: theme?.textColor,
    fontFamily: theme?.bodyFont
      ? `var(--font-${theme.bodyFont}), ${theme.bodyFont}, sans-serif`
      : undefined,
    ...parseStyleString(inlineStyle),
  }

  // Heading style driven dynamically by the selected theme
  const dynamicHeadingStyle: React.CSSProperties = {
    color: theme?.headingColor || 'inherit',
    fontFamily: theme?.headingFont
      ? `var(--font-${theme.headingFont}), ${theme.headingFont}, sans-serif`
      : undefined,
  }

    const renderTextWithBr = (text?: string) => {
      if (!text) return null
  
      return text.split(/<br\s*\/?>/gi).map((part, index, parts) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && <br />}
        </React.Fragment>
      ))
    }
  

  return (
    <section
      id={id as string}
      className={`hero2 w-full py-8 sm:py-12 md:py-16 ${className}`}
      style={dynamicSectionStyle}
    >
      {/* Centered container wrapper matching navigation width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* LEFT COLUMN */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
<h1
  className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight text-balance !text-[color:var(--heading-color)]"
  style={dynamicHeadingStyle}
>
  {renderTextWithBr(title)}
  {subtitle && (
    <>
      {title && ' '}
      {renderTextWithBr(subtitle)}
    </>
  )}
</h1>

            {description && (
              <p
                className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg opacity-90 max-w-lg !text-[color:var(--description-color)]"
                style={{ color: theme?.textColor || 'inherit' }}
              >
                {renderTextWithBr(description)}
              </p>
            )}

            {/* Button matching HeroOne styling */}
            {buttonText && (
              <div className="mt-6 sm:mt-8 w-full flex justify-center md:justify-start">
                <Link
                  href={
                    safeButtonLink.startsWith('#')
                      ? safeButtonLink
                      : safeButtonLink.startsWith('/')
                        ? safeButtonLink
                        : `/${safeButtonLink}`
                  }
                  className={`inline-block px-6 py-3 rounded-md font-bold transition-all duration-300 shadow-lg ${
                    btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
                  }`}
                >
                  {buttonText}
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            {imageUrl && (
              <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                <Image
                  src={imageUrl}
                  alt={title || 'Hero Image'}
                  width={600}
                  height={500}
                  priority
                  className="
                    w-full
                    h-auto
                    max-h-[280px] sm:max-h-[400px] md:max-h-none
                    object-contain
                    rounded-br-[150px] sm:rounded-br-[300px] md:rounded-br-[500px]
                    rounded-bl-[80px] sm:rounded-bl-[150px] md:rounded-bl-[200px]
                    rounded-tr-[80px] sm:rounded-tr-[150px] md:rounded-tr-[200px]
                    rounded-tl-[150px] sm:rounded-tl-[300px] md:rounded-tl-[500px]
                    shadow-xl
                  "
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero2Renderer