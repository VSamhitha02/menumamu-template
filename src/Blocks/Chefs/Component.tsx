'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Chef.css'
import { Media } from '@/payload-types'

export interface ChefList {
  image?: Media
  name: string
  role?: string
  expertise: string
  specialty?: string
}

export interface ChefBlockData {
  title: string
  subtitle?: string
  chefs: ChefList[]
  className?: string
  inlineStyle?: string
}

type ChefRendererProps = ChefBlockData & {
  index?: number
}

const ChefRenderer: React.FC<ChefRendererProps> = ({
  title,
  subtitle,
  chefs = [],
  className = '',
  index,
  inlineStyle,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Track whether the scroll container is at the start
  const [isAtStart, setIsAtStart] = useState(true)

  // Listen to scroll events to toggle the left button state dynamically
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      setIsAtStart(el.scrollLeft <= 5)
    }

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide control buttons if total items are 3 or fewer
  const showControls = chefs.length > 3

  // NEXT SLIDE (Matching InstagramRenderer)
  const nextSlide = () => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: 320,
      behavior: 'smooth',
    })
  }

  // PREV SLIDE (Matching InstagramRenderer)
  const prevSlide = () => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: -320,
      behavior: 'smooth',
    })
  }

  // DRAG START
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return

    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  // DRAG END
  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  // DRAG MOVE
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return

    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5

    scrollRef.current.scrollLeft = scrollLeft.current - walk
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
      className={`pt-0 mt-0 pb-8 bg-[#F9F7F2] max-w-full overflow-hidden ${className}`}
      style={parseStyleString(inlineStyle)}
    >
      <div className="max-w-[1230px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 max-w-full overflow-hidden  ">
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-6 pt-8 sm:pt-12 md:pt-12">
            {title && (
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-gray-900 mb-2 mt-0 !text-[color:var(--heading-color)]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light !text-[color:var(--description-color)]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative max-w-[1036px] mx-auto mt-8">
          {/* LEFT BUTTON (Identical to InstagramRenderer) */}
          {showControls && (
            <button
              onClick={prevSlide}
              disabled={isAtStart}
              className="
                absolute
                -left-10
                top-1/2
                -translate-y-1/2
                z-20
                hidden md:flex
                bg-transparent
                hover:bg-transparent
                focus:bg-transparent
                active:bg-transparent
                shadow-none
                border-none
                outline-none
                disabled:opacity-30
                disabled:cursor-not-allowed
              "
              aria-label="Previous chefs"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
          )}

          {/* RIGHT BUTTON (Identical to InstagramRenderer) */}
          {showControls && (
            <button
              onClick={nextSlide}
              className="
                absolute
                -right-10
                top-1/2
                -translate-y-1/2
                z-20
                hidden md:flex
                bg-transparent
                hover:bg-transparent
                focus:bg-transparent
                active:bg-transparent
                shadow-none
                border-none
                outline-none
              "
              aria-label="Next chefs"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          )}

          {/* SLIDER (Identical scrolling mechanics to InstagramRenderer) */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className="
              flex
              gap-6
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              px-4
              sm:px-6
              md:px-14
              cursor-grab
              active:cursor-grabbing
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
              max-w-full
            "
          >
            {chefs.map((chef, index) => (
              <div
                key={index}
                className="
                  snap-center
                  flex-shrink-0
                  w-[280px]
                  sm:w-[320px]
                  md:w-[340px]
                  bg-[#faf8f5]
                  border border-amber-900/10
                  rounded-2xl
                  p-6 sm:p-8
                  flex flex-col items-center
                  text-center
                  shadow-sm
                  hover:shadow-md
                  transition-all duration-300
                "
              >
                {/* Circular Image Container */}
                {chef.image?.url && (
                  <div className="relative mb-6">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-amber-400/30 to-amber-700/40 ring-1 ring-amber-600/20">
                      <div className="w-full h-full relative rounded-full overflow-hidden border-2 border-white shadow-inner">
                        <Image
                          src={chef.image.url}
                          alt={chef.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-role / Tag */}
                {chef.role && (
                  <span className="text-xs font-bold tracking-widest uppercase text-amber-700 mb-2">
                    {chef.role}
                  </span>
                )}

                {/* Chef Name */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-3">
                  {chef.name}
                </h3>

                {/* Description / Expertise */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
                  {chef.expertise}
                </p>

                {/* Specialty Badge */}
                {chef.specialty && (
                  <div className="mt-auto">
                    <span className="inline-block bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-medium px-4 py-1.5 rounded-full">
                      Specialty: {chef.specialty}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChefRenderer