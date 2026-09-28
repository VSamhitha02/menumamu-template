'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Menu.css'
import { Media } from '@/payload-types'

export interface Menu {
  title: string
  description?: string
  rating: string
  price: string
  image?: Media
  buttonText: string
  buttonLink: string
  btn_variant: 'fill' | 'outline'
}

export interface Category {
  items: Menu[]
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

export interface FoodCourtBlockData {
  title: string
  menu: Category[]
  className?: string
  inlineStyle?: string
  theme?: ThemeConfig
  themes?: ThemeConfig[]
}

type FoodCourtRendererProps = FoodCourtBlockData & {
  index?: number
}

const MenuThreeRenderer: React.FC<FoodCourtRendererProps> = ({
  title,
  menu = [],
  className = '',
  index,
  inlineStyle,
  theme,
  themes,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollPosition = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollPosition()
    el.addEventListener('scroll', checkScrollPosition)
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      el.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [menu])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const scrollAmount = 400

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const activeTheme =
    theme ||
    themes?.find(
      (t) =>
        t.className === className ||
        t.className === 'menuThree' ||
        t.className === 'foodCourt'
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
        .filter((entry) => entry.length === 2)
    )
  }

  const formatPrice = (priceVal: string) => {
    if (!priceVal) return ''
    const cleanPrice = priceVal.replace(/[₹$Rs.\s]/g, '')
    return `₹${cleanPrice}`
  }

  const primaryTextColor = activeTheme?.textColor || 'inherit'
  const primaryHeadingColor =
    activeTheme?.headingColor || activeTheme?.textColor || 'inherit'
  const cardTitleColor =
    activeTheme?.cardTextColor || activeTheme?.textColor || 'inherit'

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
      
    >
      <div className="max-w-[1230px] mx-auto px-0 sm:px-6 md:px-8 lg:px-10 xl:px-10">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold pb-4 mb-1 pl-4 sm:pl-0 !text-[color:var(--heading-color)">
            {title}
          </h2>
        )}

        <div className="relative group">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute -left-5 lg:-left-8 top-1/2 -translate-y-1/2 z-20 
                       bg-white/90 shadow-md hover:bg-white text-gray-800 p-3 
                       rounded-full transition-all duration-300 hidden md:flex 
                       items-center justify-center border border-gray-100
                       ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
            aria-label="Previous menu items"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute -right-5 lg:-right-8 top-1/2 -translate-y-1/2 z-20 
                       bg-white/90 shadow-md hover:bg-white text-gray-800 p-3 
                       rounded-full transition-all duration-300 hidden md:flex 
                       items-center justify-center border border-gray-100
                       ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
            aria-label="Next menu items"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex gap-6 overflow-x-auto scroll-smooth py-2 px-0 [&::-webkit-scrollbar]:hidden"
          >
            {menu.flatMap((category) => category.items || []).map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex-1 min-w-[280px] sm:min-w-[320px] max-w-[360px]
                           rounded-2xl border border-gray-100 shadow-sm hover:shadow-md 
                           transition-all duration-300 overflow-hidden flex flex-col flex-shrink-0 text-left"
                style={cardStyle}
              >
                {item.image && (
                  <div className="bg-gray-50/50">
                    <Image
                      src={(item.image as Media)?.url || ''}
                      alt={item.title}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="p-4 sm:p-5 flex flex-col items-start text-left flex-grow">
                  <h3 className="text-xl font-bold mb-1.5 leading-snug text-black">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mb-3 text-sm opacity-80 leading-normal font-normal text-gray-800">
                      {item.description}
                    </p>
                  )}

                  {(item.rating || item.price) && (
                    <div className="flex items-center justify-start gap-4 text-sm font-medium mb-3 mt-auto text-gray-800">
                      {item.rating && (
                        <span>
                          <span className="opacity-70 font-normal">Rating:</span> {item.rating}
                        </span>
                      )}
                      {item.price && (
                        <span>
                          <span className="opacity-70 font-normal">Price:</span> {formatPrice(item.price)}
                        </span>
                      )}
                    </div>
                  )}

                  {item.buttonText && (
                    <Link
                      href={item.buttonLink || '#'}
                      className={`inline-block px-4 py-2 text-sm rounded-lg font-semibold transition ${
                        item.btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
                      }`}
                    >
                      {item.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenuThreeRenderer