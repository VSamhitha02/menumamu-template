'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'

export interface MediaItem {
  filename?: string
  url?: string
  alt?: string
}

export interface ServiceOptionItem {
  name: string
  link: string
  icon?: MediaItem | string
  badge?: string
  subtitle?: string
  actionText?: string
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

export interface ServiceOptionsBlockData {
  heading?: string
  options?: ServiceOptionItem[]
  className?: string
  inlineStyle?: string
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

const ServiceOptionsTwoRenderer: React.FC<ServiceOptionsBlockData> = ({
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
        t.className === 'serviceOptionsTwo'
    )

  const parseStyleString = (styleString?: string): React.CSSProperties => {
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
    ) as React.CSSProperties
  }

  // Pure dynamic styles based ONLY on CMS theme inputs
  const sectionStyle: React.CSSProperties = {
    ...(activeTheme?.backgroundColor && {
      backgroundColor: activeTheme.backgroundColor,
    }),
    color: activeTheme?.textColor || 'inherit',
    ...(activeTheme?.bodyFont && {
      fontFamily: `var(--font-${activeTheme.bodyFont}), ${activeTheme.bodyFont}, sans-serif`,
    }),
    ...parseStyleString(inlineStyle),
  }

  const headingStyle: React.CSSProperties = {
    color: activeTheme?.headingColor || activeTheme?.textColor || 'inherit',
    ...(activeTheme?.headingFont && {
      fontFamily: `var(--font-${activeTheme.headingFont}), ${activeTheme.headingFont}, sans-serif`,
    }),
  }

  // Explicitly apply card text color fallback to card container
  const cardStyle: React.CSSProperties = {
    backgroundColor:
      activeTheme?.containerBackground ||
      activeTheme?.cardBackground ||
      '#FFFFFF',
    color:
      activeTheme?.cardTextColor ||
      activeTheme?.textColor ||
      '#111827', // Defaults to high-contrast dark text (#111827) if no CMS color is provided
  }

  // Dynamic text color for the action link text
  const actionTextColor =
    activeTheme?.variants?.fill?.backgroundColor ||
    activeTheme?.buttonBackground ||
    activeTheme?.btnBg ||
    activeTheme?.variants?.outline?.textColor ||
    activeTheme?.primaryColor ||
    activeTheme?.textColor ||
    '#111827'

  // Dynamic style for top badge
  const badgeStyle: React.CSSProperties = {
    backgroundColor:
      activeTheme?.variants?.fill?.backgroundColor ||
      activeTheme?.buttonBackground ||
      activeTheme?.primaryColor ||
      'currentColor',
    color:
      activeTheme?.variants?.fill?.textColor ||
      activeTheme?.buttonTextColor ||
      '#FFFFFF',
  }

  const getImageUrl = (icon?: MediaItem | string): string | null => {
    if (!icon) return null
    if (typeof icon === 'string') return icon
    return icon.url || null
  }

  return (
    <section
      className={`${className} py-8 sm:py-12`}
      style={sectionStyle}
    >
      {/* Outer container matching max-width and padding of navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 leading-tight !text-[color:var(--heading-color)]"
            style={headingStyle}
          >
            {heading}
          </h2>
        )}

        {options?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4 sm:gap-6">
            {options.map((option, index) => {
              const rawLink = option.link || ''
              const safeLink = rawLink.startsWith('#')
                ? rawLink
                : rawLink.startsWith('/')
                  ? rawLink
                  : `/${rawLink}`

              const iconUrl = getImageUrl(option.icon)
              const actionLabel = option.actionText || `Order on ${option.name}`

              return (
                <Link
                  key={index}
                  href={rawLink ? safeLink : '#'}
                  className="relative rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center group w-full"
                  style={cardStyle}
                >
                  {/* Dynamic Top-Right Badge */}
                  {option.badge && (
                    <span
                      className="absolute top-0 right-0 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-wide shadow-sm"
                      style={badgeStyle}
                    >
                      {option.badge}
                    </span>
                  )}

                  {/* Dynamic Icon Container / Fallback Initial */}
                  {iconUrl ? (
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-50/80 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 p-2.5 sm:p-3 shadow-inner">
                      <Image
                        src={iconUrl}
                        alt={option.name || 'Service Option'}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-50/80 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-xl sm:text-2xl font-bold shadow-inner"
                      style={{ color: actionTextColor }}
                    >
                      {option.name?.charAt(0) || 'S'}
                    </div>
                  )}

                  {/* Dynamic Card Content */}
                  <h3
                    className="text-lg sm:text-2xl font-bold mb-1"
                    style={{
                      color:
                        activeTheme?.cardTextColor ||
                        activeTheme?.textColor ||
                        'inherit',
                    }}
                  >
                    {option.name}
                  </h3>

                  {option.subtitle && (
                    <p className="text-xs sm:text-base font-normal mb-3 sm:mb-4 opacity-75">
                      {option.subtitle}
                    </p>
                  )}

                  {/* Action Link Text */}
                  <div
                    className="font-bold text-xs sm:text-lg flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-1 sm:pt-2"
                    style={{ color: actionTextColor }}
                  >
                    <span>{actionLabel}</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default ServiceOptionsTwoRenderer