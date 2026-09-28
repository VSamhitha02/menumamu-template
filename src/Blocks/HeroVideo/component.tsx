'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type VideoItem = {
  videoUrl?: string

  uploadedVideo?: {
    url?: string
  }

  thumbnail?: {
    url?: string
  }
}

export interface ThemeConfig {
  textColor?: string
  headingColor?: string
  subheadingColor?: string
  overlayColor?: string
  overlayOpacity?: number
  bodyFont?: string
  headingFont?: string
  variants?: {
    fill?: {
      textColor?: string
      backgroundColor?: string
    }
  }
}

type Props = {
  heading?: string
  subHeading?: string
  buttonText?: string
  buttonLink?: string
  btn_variant?: 'fill' | 'outline'
  videos?: VideoItem[]
  inlineStyle?: string
  theme?: ThemeConfig
}

export default function HeroVideo({
  heading,
  subHeading,
  buttonText,
  buttonLink,
  btn_variant = 'fill',
  videos = [],
  inlineStyle,
  theme,
}: Props) {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const [videoSrc, setVideoSrc] = useState('')
  const [imageSrc, setImageSrc] = useState('')

  const safeButtonLink = buttonLink || ''

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

  useEffect(() => {
    if (!videos.length) return

    const randomIndex = Math.floor(Math.random() * videos.length)
    const selectedVideo = videos[randomIndex]

    const finalVideo =
      selectedVideo.uploadedVideo?.url ||
      selectedVideo.videoUrl ||
      ''

    const finalImage =
      selectedVideo.thumbnail?.url ||
      ''

    setVideoSrc(finalVideo)
    setImageSrc(finalImage)
  }, [videos])

  // Dynamic Styles from Payload Theme
  const dynamicContainerStyle: React.CSSProperties = {
    fontFamily: theme?.bodyFont ? `var(--font-${theme.bodyFont}), ${theme.bodyFont}, sans-serif` : undefined,
    ...parseStyleString(inlineStyle),
  }

  const dynamicHeadingStyle: React.CSSProperties = {
    color: theme?.headingColor || theme?.textColor || 'inherit',
    fontFamily: theme?.headingFont ? `var(--font-${theme.headingFont}), ${theme.headingFont}, sans-serif` : undefined,
  }

  const dynamicSubHeadingStyle: React.CSSProperties = {
    color: theme?.subheadingColor || theme?.textColor || 'inherit',
  }

  const dynamicOverlayStyle: React.CSSProperties = {
    backgroundColor: theme?.overlayColor || '#000000',
    opacity: theme?.overlayOpacity ?? 0.7,
  }

  return (
    <div className="mb-10 relative w-full h-screen" style={dynamicContainerStyle}>
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {/* IMAGE FALLBACK */}
        {(!isVideoReady || videoError) && imageSrc && (
          <Image
            src={imageSrc}
            alt="background"
            fill
            priority
            className="object-cover"
          />
        )}

        {/* VIDEO */}
        {videoSrc && (
          <video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setIsVideoReady(true)}
            onError={() => setVideoError(true)}
            className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* DYNAMIC OVERLAY */}
        <div className="absolute inset-0" style={dynamicOverlayStyle} />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* 32px on Mobile, 48px (5xl) on Desktop */}
          <h1 
            className="text-[32px] md:text-5xl font-medium leading-tight"
            style={dynamicHeadingStyle}
          >
            {heading}
          </h1>

          {/* 16px on Mobile, 20px (xl) on Desktop */}
          {subHeading && (
            <p 
              className="mt-4 text-[16px] md:text-xl leading-relaxed"
              style={dynamicSubHeadingStyle}
            >
              {subHeading}
            </p>
          )}

          {/* Action Button matching theme button classes */}
          {buttonText && (
            <div className="mt-8">
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
      </div>
    </div>
  )
}