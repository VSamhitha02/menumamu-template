'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Hero.css'
import type { Media, Page } from '@/payload-types'

type HeroOneBlockData = Extract<Page['layout'][number], { blockType: 'heroOne' }>

export interface ThemeConfig {
  className?: string
  textColor?: string
  backgroundColor?: string
  containerBackground?: string
  headingColor?: string
  bodyFont?: string
  headingFont?: string
  buttonBackground?: string
  buttonTextColor?: string
  btnBg?: string
  btnColor?: string
  cardBackground?: string
  cardTextColor?: string
  primaryColor?: string
  variants?: {
    fill?: {
      textColor?: string
      backgroundColor?: string
    }
    outline?: {
      textColor?: string
      borderColor?: string
      backgroundColor?: string
    }
  }
}

interface HeroOneRendererProps extends HeroOneBlockData {
  disableInnerContainer?: boolean
  className?: string
  btn_variant?: 'fill' | 'outline'
  inlineStyle?: string
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

const HeroOneRenderer: React.FC<HeroOneRendererProps> = (props) => {
  const {
    id,
    title,
    description,
    backgroundImage,
    buttonText,
    buttonLink,
    subtitle,
    className = '',
    btn_variant = 'fill',
    inlineStyle,
    theme,
    themes,
  } = props

  // 1. Resolve Active Theme
  const cleanClassName = className.trim()
  const activeTheme: ThemeConfig | undefined =
    theme ||
    themes?.find(
      (t) =>
        t.className === cleanClassName ||
        cleanClassName.includes(t.className || '') ||
        t.className === 'heroOne' ||
        t.className === 'hero1'
    ) ||
    (themes && themes.length > 0 ? themes[0] : undefined)

  const safeButtonLink = buttonLink || ''
  const imageUrl = (backgroundImage as Media)?.url || ''

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

  // Section Styles
  const sectionStyle: React.CSSProperties = {
    color: activeTheme?.textColor || '#ffffff',
    fontFamily: activeTheme?.bodyFont
      ? `var(--font-${activeTheme.bodyFont}), ${activeTheme.bodyFont}, sans-serif`
      : undefined,
    ...parseStyleString(inlineStyle),
  }

  // Heading Styles
  const headingStyle: React.CSSProperties = {
    color: activeTheme?.headingColor || activeTheme?.textColor || '#ffffff',
    fontFamily: activeTheme?.headingFont
      ? `var(--font-${activeTheme.headingFont}), ${activeTheme.headingFont}, sans-serif`
      : undefined,
    lineHeight: 1.2,
  }

  // Extract Dynamic Button Colors
  const fillBg =
    activeTheme?.variants?.fill?.backgroundColor ||
    activeTheme?.buttonBackground ||
    activeTheme?.btnBg ||
    activeTheme?.primaryColor

  const fillText =
    activeTheme?.variants?.fill?.textColor ||
    activeTheme?.buttonTextColor ||
    activeTheme?.btnColor

  const outlineText =
    activeTheme?.variants?.outline?.textColor ||
    activeTheme?.buttonTextColor ||
    activeTheme?.textColor

  const outlineBorder =
    activeTheme?.variants?.outline?.borderColor ||
    activeTheme?.buttonBackground ||
    activeTheme?.textColor

  const outlineBg =
    activeTheme?.variants?.outline?.backgroundColor || 'transparent'

  // Dynamic Button Style
  const dynamicButtonStyle: React.CSSProperties =
    btn_variant === 'outline'
      ? {
          ...(outlineText && { color: outlineText }),
          ...(outlineBorder && { borderColor: outlineBorder }),
          backgroundColor: outlineBg,
          borderWidth: '1px',
          borderStyle: 'solid',
        }
      : {
          ...(fillText && { color: fillText }),
          ...(fillBg && { backgroundColor: fillBg }),
        }

  // Gradient Overlay
  const gradientOverlayStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)`,
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
      className={`${className} relative min-h-[calc(96vh-110px)] flex items-center justify-center overflow-hidden hero1`}
      style={sectionStyle}
    >
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title || 'Hero Background'}
          fill
          priority
          className="hero-image object-cover z-0"
        />
      )}

      {/* Black Gradient Overlay */}
      <div 
        className="hero-overlay absolute inset-0 z-[1] pointer-events-none" 
        style={gradientOverlayStyle}
      />

      {/* Foreground Content Container */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl md:max-w-4xl mx-auto -translate-y-4 sm:-translate-y-6">
        {/* Title */}
        {title && (
          <h1
            className="font-semibold text-[35px] sm:text-5xl md:text-5xl lg:text-6xl tracking-tight line-clamp-3 max-w-3xl mx-auto !text-[color:var(--heading-color)]"
            style={headingStyle}
          >
            {renderTextWithBr(title)}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <h2 
            className="text-[26px] sm:text-3xl md:text-3xl font-semibold mt-3 sm:mt-4 line-clamp-2 max-w-2xl mx-auto !text-[color:var(--description-color)]"
            style={headingStyle}
          >
            {renderTextWithBr(subtitle)}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="text-[18px] sm:text-xl md:text-xl mt-4 sm:mt-5 opacity-90 leading-relaxed line-clamp-3 md:line-clamp-4 max-w-xl mx-auto first-letter: !text-[color:var(--description-color)]">
            {renderTextWithBr(description)}
          </p>
        )}

        {/* Button */}
        {buttonText && (
          <div className="mt-6 sm:mt-7">
            <Link
              href={
                safeButtonLink.startsWith('#')
                  ? safeButtonLink
                  : safeButtonLink.startsWith('/')
                    ? safeButtonLink
                    : `/${safeButtonLink}`
              }
              style={dynamicButtonStyle}
              className={`inline-block px-6 py-3 sm:px-7 sm:py-3.5 rounded-md text-base sm:text-lg font-bold transition-all duration-300 shadow-lg ${
                btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
              }`}
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroOneRenderer