'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

import {
  Heart,
  MessageCircle,
  Send,
  Play,
  Share2,
  Youtube,
  Bookmark,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type VideoItem = {
  platform?: 'instagram' | 'youtube'
  videoUrl?: string

  thumbnail?: {
    url?: string
  }

  reelTitle?: string
  views?: string
}

type Props = {
  title?: string
  videos?: VideoItem[]
  className?: string
  theme?: 'black-theme' | 'white-theme' | 'orange-theme' | 'green-theme' | string
  inlineStyle?: string
}

export const InstagramRenderer = ({
  title,
  videos = [],
  className,
  theme,
  inlineStyle,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Track whether the scroll container is at the left boundary
  const [isAtStart, setIsAtStart] = useState(true)

  // DEBUG: what props actually arrived at the component
  console.log('[InstagramRenderer] props received:', {
    title,
    className,
    theme,
    inlineStyle,
    videosCount: videos?.length,
  })

  // Theme mapping — real Tailwind utility classes, same approach as VideoSection
  const themeClasses: Record<string, string> = {
    'black-theme': 'bg-black text-white',
    'white-theme': 'bg-white text-black',
    'orange-theme': 'bg-orange-500 text-white',
    'green-theme': 'bg-green-600 text-white',
  }

  const selectedThemeClass = theme ? themeClasses[theme] || '' : ''

  // DEBUG: confirm the theme key matched something in the map
  console.log('[InstagramRenderer] theme lookup:', {
    themeProp: theme,
    matchedClass: selectedThemeClass,
    didMatch: Boolean(theme && themeClasses[theme]),
    availableKeys: Object.keys(themeClasses),
  })

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
  const showControls = videos.length > 3

  // NEXT
  const nextSlide = () => {
    if (!scrollRef.current) return

    scrollRef.current.scrollBy({
      left: 320,
      behavior: 'smooth',
    })
  }

  // PREV
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

    const parsed = Object.fromEntries(
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

    // DEBUG: see exactly what inline style object gets applied —
    // if this contains a background/backgroundColor/color key, it will
    // always override the Tailwind theme classes below
    console.log('[InstagramRenderer] parsed inlineStyle:', parsed)

    return parsed
  }

  // DEBUG: final className string being applied to the <section>
  const sectionClassName = `${className || ''} ${selectedThemeClass} pt-12 pb-12`.trim()
  console.log('[InstagramRenderer] final section className:', sectionClassName)

  return (
    <section 
      className={sectionClassName} 
      style={parseStyleString(inlineStyle)}
    >
      {/* TITLE - Uses text-inherit to dynamically pull color from parent inline styles */}
      {title && (
        <h2 className="text-3xl xl:text-4xl font-bold text-center mb-2 !text-[color:var(--heading-color)]">
          {title}
        </h2>
      )}

      <div className="relative max-w-[1036px] mx-auto mt-8">
        {/* LEFT BUTTON */}
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
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
        )}

        {/* RIGHT BUTTON */}
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
          >
            <ChevronRight className="w-5 h-5 text-black" />
          </button>
        )}

        {/* SLIDER */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="
            flex
            gap-4
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
          "
        >
          {videos?.map((video, index) => (
            <a
              key={index}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                snap-center
                flex-shrink-0
                w-[280px]
                sm:w-[290px]
                md:w-[300px]
                bg-white
                rounded-xl
                overflow-hidden
                border border-gray-300
                transition-all
                duration-300
                hover:shadow-xl
              "
            >
              {/* IMAGE */}
              <div className="relative h-[410px] sm:h-[450px] md:h-[460px] lg:h-[500px] bg-black">
                {video.thumbnail?.url ? (
                  <Image
                    src={video.thumbnail.url}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    No Thumbnail
                  </div>
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/10" />

                {/* TOP SHADOW */}
                <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black/80 to-transparent" />

                {/* BOTTOM SHADOW */}
                <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/80 to-transparent" />

                {/* TITLE */}
                <div className="absolute top-0 left-0 p-4 z-10">
                  <p className="text-white font-semibold text-sm leading-tight">
                    {video.reelTitle}
                  </p>
                </div>

                {/* BOTTOM */}
                <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-4 z-10">
                  <Play className="w-7 h-7 fill-white text-white" />

                  <p className="text-white text-sm font-medium">
                    {video.views} Views
                  </p>
                </div>
              </div>

              {/* INSTAGRAM */}
              {video.platform === 'instagram' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-5">
                      <Heart className="w-6 h-6 text-black" />
                      <MessageCircle className="w-6 h-6 text-black" />
                      <Send className="w-6 h-6 text-black" />
                    </div>

                    <Bookmark className="w-6 h-6 text-black" />
                  </div>

                  <p className="font-semibold text-sm text-black">
                    Click to View on Instagram
                  </p>
                </div>
              )}

              {/* YOUTUBE */}
              {video.platform === 'youtube' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <Youtube className="w-7 h-7 text-red-600" />
                      <Share2 className="w-6 h-6 text-black" />
                    </div>

                    <Clock3 className="w-6 h-6 text-black" />
                  </div>

                  <p className="font-semibold text-sm text-black">
                    Watch on YouTube
                  </p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}