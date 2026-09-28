'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface ServiceOptionThreeItem {
  icon?: {
    filename?: string
    url: string
  }
  name: string
  link: string
  description?: string
  buttonText?: string
}

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

export interface ServiceOptionsThreeBlockData {
  id?: string
  heading?: string
  options: ServiceOptionThreeItem[]
  className?: string
  inlineStyle?: string
  btn_variant?: 'fill' | 'outline'
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

const ServiceOptionsThreeRenderer: React.FC<ServiceOptionsThreeBlockData> = ({
  id,
  heading,
  options = [],
  className = '',
  inlineStyle,
  btn_variant = 'fill',
  theme,
  themes,
}) => {
  // Resolve active theme configuration from props or payload theme list
  const cleanClassName = className.trim()
  const activeTheme =
    theme ||
    themes?.find(
      (t) =>
        t.className === cleanClassName ||
        cleanClassName.includes(t.className || '') ||
        t.className === 'serviceOptionThree' ||
        t.className === 'servieOptionThree'
    ) ||
    (themes && themes.length > 0 ? themes[0] : undefined)

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

  // Extract variables safely with comprehensive fallbacks across Payload structure
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

  // Map dynamic Payload theme properties directly to CSS Variables declared in CSS
  const sectionStyle: React.CSSProperties = {
    backgroundColor: activeTheme?.backgroundColor || undefined,
    color: activeTheme?.textColor || undefined,
    fontFamily: activeTheme?.bodyFont
      ? `var(--font-${activeTheme.bodyFont}), ${activeTheme.bodyFont}, sans-serif`
      : undefined,

    // CSS Variable Bindings for .btn-fill and .btn-outline classes
    '--btn-fill-bg': fillBg,
    '--btn-fill-text': fillText,
    '--btn-outline-border': outlineBorder,
    '--btn-outline-text': outlineText,
    '--bg-color': activeTheme?.backgroundColor,
    '--text-color': activeTheme?.textColor,
    '--heading-color': activeTheme?.headingColor || activeTheme?.textColor,

    ...parseStyleString(inlineStyle),
  } as React.CSSProperties

  const cardContainerStyle: React.CSSProperties = {
    backgroundColor:
      activeTheme?.containerBackground ||
      activeTheme?.cardBackground ||
      '#ffffff',
    color: activeTheme?.cardTextColor || activeTheme?.textColor || '#000000',
  }

  const headingStyle: React.CSSProperties = {
    color: activeTheme?.headingColor || activeTheme?.textColor || 'inherit',
    fontFamily: activeTheme?.headingFont
      ? `var(--font-${activeTheme.headingFont}), ${activeTheme.headingFont}, sans-serif`
      : undefined,
  }

  return (
    <section
      id={id}
      className={`serviceOptionThree py-12 w-full ${className}`}
      style={sectionStyle}
    >
      {/* Align container bounds directly to Navbar container grid (max-w-7xl + standard responsive padding) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {heading && (
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10  !text-[color:var(--heading-color)]"
            style={headingStyle}
          >
            {heading}
          </h2>
        )}

        <div className="flex flex-col gap-10 lg:gap-16">
          {options.map((option, index) => {
            const rawLink = option.link || ''
            const safeLink = rawLink.startsWith('#')
              ? rawLink
              : rawLink.startsWith('/')
                ? rawLink
                : `/${rawLink}`

            return (
              <React.Fragment key={index}>
                {/* Mobile & Tablet Layout (< lg) */}
                <div
                  className="block lg:hidden w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-md border border-gray-100/20"
                  style={cardContainerStyle}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden">
                    {option.icon?.url && (
                      <Image
                        src={option.icon.url}
                        alt={option.name || 'Service Option'}
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    )}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="py-6 px-5 flex flex-col items-center justify-center text-center !text-[color:var(--heading-color)]">
                    {option.name && (
                      <h3
                        className="text-lg font-bold mb-2"
                        style={headingStyle}
                      >
                        {option.name}
                      </h3>
                    )}

                    {option.description && (
                      <p className="text-sm font-medium leading-relaxed mb-4 opacity-90 !text-[color:var(--description-color)]">
                        {option.description}
                      </p>
                    )}

                    {option.buttonText && (
                      <Link
                        href={rawLink ? safeLink : '#'}
                        className={`inline-block px-6 py-3 rounded-md font-bold transition-all duration-300 shadow-lg ${
                          btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
                        }`}
                      >
                        {option.buttonText}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Desktop Overlapping Layout (≥ lg) */}
                <div className="hidden lg:flex items-center justify-center w-full">
                  {/* Left Box: Graphic Container */}
                  <div className="relative w-1/2 rounded-2xl overflow-hidden min-h-[360px] shadow-lg">
                    {option.icon?.url && (
                      <Image
                        src={option.icon.url}
                        alt={option.name || 'Service Option'}
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    )}
                  </div>

                  {/* Right Box: Overlapping Card */}
                  <div
                    className="relative z-10 w-1/2 -ml-12 rounded-2xl p-10 shadow-xl border border-gray-100/20 flex flex-col items-center justify-center text-center"
                    style={cardContainerStyle}
                  >
                    {option.name && (
                      <h3
                        className="text-xl font-bold mb-3"
                        style={headingStyle}
                      >
                        {option.name}
                      </h3>
                    )}

                    {option.description && (
                      <p className="text-base font-medium leading-relaxed mb-6 max-w-sm opacity-90">
                        {option.description}
                      </p>
                    )}

                    {option.buttonText && (
                      <Link
                        href={rawLink ? safeLink : '#'}
                        className={`inline-block px-6 py-3 rounded-md font-bold transition-all duration-300 shadow-lg ${
                          btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
                        }`}
                      >
                        {option.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServiceOptionsThreeRenderer