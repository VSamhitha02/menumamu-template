'use client'

import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'

export interface MenuItem {
  title: string
  category?: string
  description: string
  image?: Media
  price: string
}

export interface MenuBlockData {
  title: string
  items: MenuItem[]
  className?: string
  inlineStyle?: string
}

type MenuRendererProps = MenuBlockData & {
  index?: number
}

const Menu1Renderer: React.FC<MenuRendererProps> = ({
  title,
  items = [],
  className = '',
  index,
  inlineStyle,
}) => {
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

  return (
    <section
      className={`w-full overflow-hidden ${
        index === 0
          ? 'pt-12 sm:pt-16 md:pt-20 pb-8'
          : 'pt-4 sm:pt-6 pb-8'
      } ${className}`}
      style={parseStyleString(inlineStyle)}
    >
      {/* Standardized horizontal padding across break points */}
      <div className="max-w-[1230px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full overflow-hidden">
        {/* Section Heading */}
        {title && (
          <h2 className="text-2xl font-bold pb-4 mb-1 !text-[color:var(--heading-color)]">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item, index) => {
            const displayPrice = item.price?.startsWith('₹')
              ? item.price
              : `₹${item.price}`

            // Check if item category indicates Non-Veg
            const categoryText = (item.category || 'VEG').toUpperCase()
            const isNonVeg = categoryText.includes('NON')

            return (
              <div
                key={index}
                className="flex items-start justify-between gap-3 sm:gap-4 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-200 w-full min-w-0"
              >
                {/* Left Section (Content) */}
                <div className="flex-1 min-w-0 pr-1 sm:pr-2">
                  {/* Category / Veg / Non-Veg Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center justify-center border rounded-[3px] p-[2px] shrink-0 ${
                        isNonVeg ? 'border-red-600' : 'border-green-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isNonVeg ? 'bg-red-600' : 'bg-green-600'
                        }`}
                      ></span>
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded uppercase ${
                        isNonVeg
                          ? 'text-red-700 bg-red-50'
                          : 'text-green-700 bg-green-50'
                      }`}
                    >
                      {categoryText}
                    </span>
                  </div>

                  {/* Title - Responsive wrapping prevents layout stretching */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-snug break-words">
                    {item.title}
                  </h3>

                  {/* Price */}
                  <p className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                    {displayPrice}
                  </p>

                  {/* Description */}
                  <p className="text-gray-500 text-xs sm:text-sm line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Right Section (Image) */}
                {item.image && (
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={(item.image as Media)?.url || ''}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Menu1Renderer