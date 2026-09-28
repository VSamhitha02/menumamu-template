'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'
import { Media } from '@/payload-types'

export interface MenuItem {
  image?: Media | { url: string; alt?: string }
  name: string
  description?: string
  link: string
}

export interface ThemeConfig {
  className?: string
  textColor?: string
  backgroundColor?: string
  containerBackground?: string
  headingColor?: string
  bodyFont?: string
  headingFont?: string
  cardBackground?: string
  cardTextColor?: string
  primaryColor?: string
}

export interface MenuBlockData {
  heading: string
  description?: string
  menuCategories: MenuItem[]
  className?: string
  inlineStyle?: string
  index?: number
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

const MenuCategoryRenderer: React.FC<MenuBlockData> = ({
  heading,
  description,
  menuCategories = [],
  className = '',
  inlineStyle,
  index,
  theme,
  themes,
}) => {
  // 1. Enhanced theme lookup
  const activeTheme =
    theme ||
    themes?.find(
      (t) =>
        t.className === className ||
        t.className?.toLowerCase() === className?.toLowerCase() ||
        t.className === 'menuCategories' ||
        t.className === 'menuCategory'
    ) ||
    themes?.[0]

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
    )
  }

  const getImageUrl = (image?: Media | { url: string; alt?: string }): string => {
    if (!image) return ''
    if (typeof image === 'string') return image
    return (image as Media)?.url || (image as { url: string }).url || ''
  }

  // 2. Strict Fallback Logic
  const primaryTextColor = activeTheme?.textColor || '#000000'
  const primaryHeadingColor =
    activeTheme?.headingColor || activeTheme?.textColor || '#000000'
  const cardTitleColor =
    activeTheme?.cardTextColor || activeTheme?.textColor || '#000000'

  const sectionStyle: React.CSSProperties = {
    color: primaryTextColor,
    ...(activeTheme?.backgroundColor && {
      backgroundColor: activeTheme.backgroundColor,
    }),
    ...(activeTheme?.bodyFont && {
      fontFamily: `var(--font-${activeTheme.bodyFont}), ${activeTheme.bodyFont}, sans-serif`,
    }),
    ...parseStyleString(inlineStyle),
  }

  const headingStyle: React.CSSProperties = {
    color: primaryHeadingColor,
    ...(activeTheme?.headingFont && {
      fontFamily: `var(--font-${activeTheme.headingFont}), ${activeTheme.headingFont}, sans-serif`,
    }),
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor:
      activeTheme?.containerBackground ||
      activeTheme?.cardBackground ||
      '#FFFFFF',
  }

  return (
    <section
      className={`${
        index === 0
          ? 'pt-16 sm:pt-20 md:pt-24 pb-8'
          : 'pt-4 sm:pt-6 pb-8'
      } ${className}`}
      style={sectionStyle}
    >
      {/* Outer container matching Navigation bounds (Logo on Left, Profile on Right) */}
      <div className="max-w-[1230px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10">
        {/* Heading & Description - Aligned strictly to the left logo margin */}
        <div className="pb-4 mb-1 text-left">
          <h2 className="text-2xl md:text-3xl font-bold m-0 p-0 !text-[color:var(--heading-color)]" style={headingStyle} >
            {heading}
          </h2>
          {description && (
            <p className="mt-1 text-base m-0 p-0 !text-[color:var(--description-color)]">
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {menuCategories?.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {menuCategories.map((item, idx) => {
              const imageUrl = getImageUrl(item.image)

              return (
                <Link key={idx} href={item.link || '#'} className="block text-left">
                  <div
                    className="rounded-xl shadow-md overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
                    style={cardStyle}
                  >
                    {/* Image */}
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    {/* Card Content */}
                    <div className="p-4 text-left">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: cardTitleColor }}
                      >
                        {item.name}
                      </h3>

                      {item.description && (
                        <p
                          className="text-sm mb-2"
                          style={{ color: primaryTextColor, opacity: 0.75 }}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
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

export default MenuCategoryRenderer