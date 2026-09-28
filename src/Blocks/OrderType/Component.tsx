'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'
import { Button } from '@/components/ui/button'

export interface ServiceOptionItem {
  icon?: {
    filename: string
    url: string
  }
  name: string
  link: string
  btn_variant?: 'fill' | 'outline'
}

export interface ThemeConfig {
  className?: string
  textColor?: string
  backgroundColor?: string
  containerBackground?: string
  headingColor?: string
  bodyFont?: string
  headingFont?: string
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

export interface ServiceOptionsBlockData {
  heading?: string
  options: ServiceOptionItem[]
  className?: string
  inlineStyle?: string
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

const ServiceOptionsRenderer: React.FC<ServiceOptionsBlockData> = ({
  heading,
  options = [],
  className = '',
  inlineStyle,
  theme,
  themes,
}) => {
  // Resolve active theme configuration from Payload CMS
  const activeTheme =
    theme ||
    themes?.find(
      (t) =>
        t.className === className ||
        t.className === 'serviceOptions' ||
        t.className === 'servieOptions'
    )

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

  // Pure dynamic styles based ONLY on CMS theme inputs (no hardcoded color fallbacks)
  const dynamicFillStyle: React.CSSProperties = {
    ...(activeTheme?.variants?.fill?.backgroundColor && {
      backgroundColor: activeTheme.variants.fill.backgroundColor,
    }),
    ...(activeTheme?.variants?.fill?.textColor && {
      color: activeTheme.variants.fill.textColor,
    }),
  }

  const dynamicOutlineStyle: React.CSSProperties = {
    ...(activeTheme?.variants?.outline?.backgroundColor && {
      backgroundColor: activeTheme.variants.outline.backgroundColor,
    }),
    ...(activeTheme?.variants?.outline?.textColor && {
      color: activeTheme.variants.outline.textColor,
    }),
    ...(activeTheme?.variants?.outline?.borderColor && {
      borderColor: activeTheme.variants.outline.borderColor,
      borderWidth: '1px',
      borderStyle: 'solid',
    }),
  }

  const sectionStyle: React.CSSProperties = {
    ...(activeTheme?.backgroundColor && {
      backgroundColor: activeTheme.backgroundColor,
    }),
    ...(activeTheme?.textColor && {
      color: activeTheme.textColor,
    }),
    ...parseStyleString(inlineStyle),
  }

  return (
    <section 
      className={`${className} py-8 sm:py-12 px-2 sm:px-6 lg:px-20`} 
      style={sectionStyle}
    >
      {/* Outer container matching max-width and margins */}
      <div className="max-w-7xl mx-auto">
        {heading && (
          <h2 
            className="text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6"
            style={{
              color: activeTheme?.headingColor || activeTheme?.textColor,
            }}
          >
            {heading}
          </h2>
        )}

        {options?.length > 0 && (
          /* Decreased horizontal gap (gap-x-1.5) to widen the cards */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-1.5 gap-y-3 sm:gap-4 lg:gap-6">
            {options.map((option, index) => {
              const isOutline = option.btn_variant === 'outline'
              const appliedStyle = isOutline ? dynamicOutlineStyle : dynamicFillStyle
              const variantClass = isOutline ? 'btn-outline bg-transparent' : 'btn-fill'

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100 flex flex-col justify-between w-full"
                  style={{
                    backgroundColor: activeTheme?.containerBackground,
                  }}
                >
                  {/* Image Container */}
                  {option.icon?.url && (
                    <div className="relative w-full aspect-[4/3] sm:h-52 overflow-hidden">
                      <Image
                        src={option.icon.url}
                        alt={option.name || 'Service Option'}
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                  )}

                  {/* Button Section - Kept exact button styles, max-widths, and paddings */}
                  <div className="flex justify-center p-2 sm:p-2.5 mt-auto w-full">
                    <Link href={option.link || '#'} className="w-full flex justify-center px-1">
                      <Button
                        style={appliedStyle}
                        className={`w-full max-w-[110px] sm:max-w-[130px] px-2 py-1.5 text-[11px] sm:text-xs rounded-lg font-semibold transition-all duration-200 shadow-sm hover:opacity-90 active:scale-95 ${variantClass}`}
                      >
                        {option.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default ServiceOptionsRenderer