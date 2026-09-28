'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './ChefScroll.css'
import { Media } from '@/payload-types'

export interface ChefList {
  image?: Media
  name: string
  expertise: string
}

export interface ChefBlockData {
  title: string
  chefs: ChefList[]
  className: string
  inlineStyle?: string
}

type ChefRendererProps = ChefBlockData

const ChefScrollRenderer: React.FC<ChefRendererProps> = ({ title, chefs, className, inlineStyle }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Theme mapping
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
    'orange-theme': 'menu-orange',
    'green-theme': 'menu-green',
    'modern-dark': 'menu-modern-dark',
    'modern-light': 'menu-modern-light',
  }

  // const themeClass = themeClasses[theme] || 'menu-modern-light'

  // Manual scroll
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -400 : 400,
      behavior: 'smooth',
    })
  }

  // Auto scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: 400, behavior: 'smooth' })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [chefs])
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
    <section className={`${className} py-12 `} style={parseStyleString(inlineStyle)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-current">{title}</h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 
                       text-current hover:bg-black/10 dark:hover:bg-white/10
                       p-2 rounded-full hidden md:flex z-10"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 
                       text-current hover:bg-black/10 dark:hover:bg-white/10
                       p-2 rounded-full hidden md:flex z-10"
          >
            <ChevronRight size={36} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {chefs.map((chef, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] max-w-[320px]
                           rounded-xl shadow-lg overflow-hidden
                           bg-white/90 dark:bg-black/40 backdrop-blur-sm
                           transition-transform duration-300 hover:-translate-y-2"
              >
                {chef.image?.url && (
                  <Image
                    src={chef.image.url}
                    alt={chef.name}
                    width={320}
                    height={400}
                    className="w-full h-[320px] object-cover"
                  />
                )}

                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-black">{chef.name}</h3>

                  <p className="text-sm text-gray-600">{chef.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChefScrollRenderer
