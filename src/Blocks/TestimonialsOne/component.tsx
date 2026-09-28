'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import type { Media, Page } from '@/payload-types'

type TestimonialsBlockData = Extract<
  Page['layout'][number],
  { blockType: 'testimonials' }
>

interface TestimonialsRendererProps extends Omit<TestimonialsBlockData, 'testimonials'> {
  testimonials?: Array<{
    name: string
    designation?: string | null
    testimonialText?: string | null
    image?: number | Media | string | null
  }> | null
  disableInnerContainer?: boolean
  inlineStyle?: string
  index?: number
  theme?: any
  textColor?: string
  backgroundColor?: string
}

const TestimonialsSection: React.FC<TestimonialsRendererProps> = (props) => {
  const { 
    className, 
    title, 
    testimonials = [], 
    inlineStyle, 
    index, 
    theme,
    textColor: directTextColor,
    backgroundColor: directBgColor
  } = props

  // Mount state to eliminate SSR/Client animation hydration mismatches
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const extractColor = (key: 'textColor' | 'backgroundColor'): string | undefined => {
    if (key === 'textColor' && directTextColor) return directTextColor
    if (key === 'backgroundColor' && directBgColor) return directBgColor

    if (typeof theme === 'object' && theme !== null) {
      if (theme[key]) return theme[key]
      if (theme.theme && typeof theme.theme === 'object' && theme.theme[key]) {
        return theme.theme[key]
      }
      if (theme.value && typeof theme.value === 'object' && theme.value[key]) {
        return theme.value[key]
      }
    }
    return undefined
  }

  const textColor = extractColor('textColor')
  const backgroundColor = extractColor('backgroundColor')

  const themeClasses: Record<string, string> = {
    'testimonialsOne': 'testimonials-one',
    'black-theme': 'testimonials-black',
    'white-theme': 'testimonials-white',
    'orange-theme': 'testimonials-orange',
    'green-theme': 'testimonials-green',
  }

  const getImageUrl = (img?: number | Media | string | null): string => {
    if (!img) return '/default-image.jpg'
    if (typeof img === 'number') return `/media/${img}`
    if (typeof img === 'string') return img
    if (img.url) return img.url
    if (img.filename) return `/media/${img.filename}`
    return '/default-image.jpg'
  }

  const formattedTestimonials = (testimonials || []).map((testimonial) => ({
    quote: testimonial.testimonialText ?? '',
    name: testimonial.name || '',
    designation: testimonial.designation || '',
    src: getImageUrl(testimonial.image),
  }))

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
        .filter((entry) => entry.length === 2),
    )
  }

  const computedStyles: React.CSSProperties = {
    ...parseStyleString(inlineStyle),
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(textColor ? { color: textColor } : {}),
  }

  const rawThemeClassName = typeof theme === 'string' ? theme : theme?.className || theme?.theme?.className || ''
  const resolvedClassName = 
    themeClasses[rawThemeClassName] || 
    themeClasses[className || ''] || 
    rawThemeClassName || 
    className || 
    ''

  if (!testimonials || testimonials.length === 0) return null

  return (
    <section
      className={`${resolvedClassName} ${
        index === 0
          ? 'pt-16 sm:pt-20 md:pt-24 pb-8'
          : 'pt-4 sm:pt-6 pb-8'
      }`}
      style={computedStyles}
    >
      <div className="text-2xl md:text-3xl  text-center w-full pt-4 sm:pt-6 md:pt-4 pb-2 m-0">
        {title && (
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center p-0 m-0 w-full"
            style={{ color: textColor || 'inherit' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
        )}

        {/* Increased negative margin to remove ~2 inches of vertical gap below title */}
        <div 
          style={{ color: textColor || 'inherit' }} 
          className="[&_div.flex.gap-4]:justify-center md:[&_div.flex.gap-4]:justify-start min-h-fit -mt-10 sm:-mt-14 md:-mt-18"
        >
          {/* Render component only after client hydration */}
          {hasMounted ? (
            <AnimatedTestimonials
              testimonials={formattedTestimonials}
              autoplay={true}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection