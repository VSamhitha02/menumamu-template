'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Hero2.css'
import type { Media, Page } from '@/payload-types'

type HeroTwoBlockData = Extract<Page['layout'][number], { blockType: 'heroThree' }>

interface HeroTwoRendererProps extends Omit<HeroTwoBlockData, 'imageShape' | 'image' | 'btn_variant'> {
  disableInnerContainer?: boolean
  imageShape?: 'circular-image' | 'rectangle-image' | 'custom-image'
  image: Media
  className?: string
  inlineStyle?: string
  btn_variant?: 'fill' | 'outline'
  badgeText?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  locationLinkText?: string
  locationLinkUrl?: string
  imageCaption?: string
}

const HeroThreeRenderer: React.FC<HeroTwoRendererProps> = (props) => {
  const {
    imageShape = 'rectangle-image',
    id,
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
    image,
    className = '',
    inlineStyle,
    btn_variant = 'fill',
    badgeText,
    secondaryButtonText,
    secondaryButtonLink,
    locationLinkText,
    locationLinkUrl,
    imageCaption,
  } = props

  // Maps CMS imageShape selections to Tailwind radius rules
  const ImageShapeClasses: Record<string, string> = {
    'circular-image': 'rounded-full',
    'rectangle-image': 'rounded-2xl',
    'custom-image': 'rounded-br-[120px] sm:rounded-br-[250px] rounded-bl-[60px] sm:rounded-bl-[120px] rounded-tr-[60px] sm:rounded-tr-[120px] rounded-tl-[120px] sm:rounded-tl-[250px]',
  }
  
  const currentShapeClass = ImageShapeClasses[imageShape] || ImageShapeClasses['rectangle-image']

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
          if (!key || !value) return []
          return [
            key.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value.trim(),
          ]
        })
        .filter((entry) => entry.length === 2)
    )
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
      className={`hero hero-two py-8 sm:py-12 md:py-16 ${className}`}
      id={id as string}
      style={parseStyleString(inlineStyle)}
    >
      {/* Centered container wrapper matching navigation width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Starts flush under the Navbar logo */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6">
            
            {/* Top Badge */}
            {badgeText && (
              <div className="hero-badge inline-flex items-center px-4 py-1 rounded-full text-xs uppercase tracking-wider font-semibold">
                {badgeText}
              </div>
            )}

            {/* Title & Subtitle */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-balance">
              {renderTextWithBr(title)} {subtitle && <span>{renderTextWithBr(subtitle)}</span>}
            </h1>

            {/* Description Paragraph */}
            {description && (
              <p className="text-sm sm:text-base md:text-lg max-w-lg font-normal leading-relaxed opacity-90 text-pretty">
                {renderTextWithBr(description)}
              </p>
            )}

            {/* Action Buttons */}
            {(buttonText || secondaryButtonText) && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 w-full">
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

            {/* Location Link */}
            {locationLinkText && (
              <div className="pt-2">
                <Link
                  href={formatLink(locationLinkUrl)}
                  className="hero-location-link text-xs underline underline-offset-4 transition-colors"
                >
                  {locationLinkText}
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Right edge ends directly under the profile icon */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl aspect-square overflow-hidden shadow-xl ${currentShapeClass}`}>
              <Image
                src={(image as Media)?.url || ''}
                alt={(image as Media)?.alt || 'Hero Image'}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 500px, 600px"
                className="object-cover"
              />
              
              {/* Image Overlay Caption */}
              {imageCaption && (
                <div className="hero-image-caption absolute bottom-4 left-4 text-xs font-medium bg-black/50 text-white px-3 py-1.5 rounded-md backdrop-blur-sm">
                  {imageCaption}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroThreeRenderer