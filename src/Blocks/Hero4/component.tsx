'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { Media, Page } from '@/payload-types'

// Extract block type dynamically or fall back to generic record if types haven't regenerated
type HeroFourBlockData = Extract<Page['layout'][number], { blockType: 'heroFour' }> extends never
  ? {
      id?: string
      title?: string
      subtitle?: string
      description?: string
      backgroundImage?: Media | string | null
      buttonText?: string
      buttonLink?: string
      secondaryButtonText?: string
      secondaryButtonLink?: string
    }
  : Extract<Page['layout'][number], { blockType: 'heroFour' }>

interface HeroFourRendererProps extends Partial<HeroFourBlockData> {
  disableInnerContainer?: boolean
  className?: string
  btn_variant?: 'fill' | 'outline'
  inlineStyle?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

const HeroFourRenderer: React.FC<HeroFourRendererProps> = (props) => {
  const {
    id,
    title,
    description,
    backgroundImage,
    buttonText,
    buttonLink,
    secondaryButtonText,
    secondaryButtonLink,
    subtitle,
    className = '',
    btn_variant = 'fill',
    inlineStyle,
  } = props

  const imageUrl = (backgroundImage as Media)?.url || (typeof backgroundImage === 'string' ? backgroundImage : '')

  const formatLink = (url?: string) => {
    if (!url) return '#'
    return url.startsWith('#') || url.startsWith('/') ? url : `/${url}`
  }

  const parseStyleString = (styleString?: string) => {
    if (!styleString) return {}

    return Object.fromEntries(
      styleString
        .split(';')
        .filter(Boolean)
        .map((style) => {
          const [key, value] = style.split(':')

          return [
            key
              .trim()
              .replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value.trim(),
          ]
        }),
    )
  }

  return (
    <section
      id={id as string}
      className={`relative min-h-[85vh] sm:min-h-[90vh] w-full flex items-center overflow-hidden hero4 [clip-path:ellipse(130%_100%_at_50%_0%)] ${className}`}
      style={parseStyleString(inlineStyle)}
    >
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title || 'Hero Background'}
          fill
          priority
          className="hero-image object-cover object-center"
        />
      )}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-white py-16">
        <div className="max-w-xl text-left space-y-6">
          {/* Main Title */}
          {title && (
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md">
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-xl sm:text-2xl font-medium text-gray-200">
              {subtitle}
            </h2>
          )}

          {/* Description with Vertical Accent Bar */}
          {description && (
            <div className="flex items-stretch gap-3.5 my-4">
              <span className="w-1 bg-white/80 rounded-full flex-shrink-0" />
              <p className="text-sm sm:text-base italic text-gray-200 leading-relaxed opacity-95">
                {description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {(buttonText || secondaryButtonText) && (
            <div className="flex flex-wrap items-center justify-start gap-4 pt-2 w-full">
              {buttonText && (
                <Link
                  href={formatLink(buttonLink)}
                  className={`inline-block px-6 py-3 rounded-md font-bold transition-all duration-300 shadow-lg ${
                    btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
                  }`}
                >
                  {buttonText}
                </Link>
              )}

              {secondaryButtonText && (
                <Link
                  href={formatLink(secondaryButtonLink)}
                  className="btn-secondary inline-block px-6 py-3 rounded-md font-bold transition-all duration-300 shadow-lg"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroFourRenderer