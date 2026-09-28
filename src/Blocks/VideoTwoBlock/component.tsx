'use client'

import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Menu.css'

interface VideoItem {
  videoId: string
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

export interface VideoTwoSectionProps {
  title: string
  videos: VideoItem[]
  className?: string
  inlineStyle?: string
  theme?: ThemeConfig
  themes?: ThemeConfig[]
  btn_variant?: 'fill' | 'outline'
}

const getYouTubeID = (url: string | undefined) => {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.slice(1)
    }

    if (parsedUrl.hostname.includes('youtube.com')) {
      const vParam = parsedUrl.searchParams.get('v')
      if (vParam) return vParam
      return parsedUrl.pathname.split('/').pop()
    }

    return url
  } catch (_error) {
    return url
  }
}

const VideoTwoSection: React.FC<VideoTwoSectionProps> = ({
  videos = [],
  title,
  className = '',
  inlineStyle,
  theme,
  themes,
  btn_variant,
}) => {
  const [startIndex, setStartIndex] = useState(0)
  const [videosPerPage, setVideosPerPage] = useState(2)

  // Resolve active theme configuration
  const activeTheme =
    theme ||
    themes?.find(
      (t) =>
        t.className &&
        className &&
        (className === t.className || className.includes(t.className))
    ) ||
    themes?.[0]

  useEffect(() => {
    const updateVideosPerPage = () => {
      setVideosPerPage(window.innerWidth < 640 ? 1 : 2)
    }

    updateVideosPerPage()
    window.addEventListener('resize', updateVideosPerPage)
    return () => window.removeEventListener('resize', updateVideosPerPage)
  }, [])

  useEffect(() => {
    if (startIndex + videosPerPage > videos.length) {
      setStartIndex(Math.max(0, videos.length - videosPerPage))
    }
  }, [videosPerPage, startIndex, videos.length])

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

  const parsedInlineStyles = parseStyleString(inlineStyle)

  // Dynamic style calculations strictly derived from activeTheme
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

  const isOutline = btn_variant === 'outline'
  const buttonStyle = isOutline ? dynamicOutlineStyle : dynamicFillStyle
  const variantClass = isOutline ? 'btn-outline bg-transparent' : 'btn-fill'

  // Section style excludes text color to isolate title formatting
  const sectionStyle: React.CSSProperties = {
    ...(activeTheme?.backgroundColor && {
      backgroundColor: activeTheme.backgroundColor,
    }),
    ...parsedInlineStyles,
  }

  // Pure inline style targeting ONLY the title color
  const titleColor =
    parsedInlineStyles.color ||
    activeTheme?.headingColor ||
    activeTheme?.textColor

  const titleInlineStyle: React.CSSProperties = {
    ...(titleColor && { color: String(titleColor) }),
  }

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      rel: 0,
      modestbranding: 1,
    },
  }

  const visibleVideos = videos.slice(startIndex, startIndex + videosPerPage)

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - videosPerPage)
    }
  }

  const handleNext = () => {
    if (startIndex + videosPerPage < videos.length) {
      setStartIndex(startIndex + videosPerPage)
    }
  }

  return (
    <section className={`w-full py-10 ${className}`} style={sectionStyle}>
      <div className="max-w-5xl mx-auto text-center py-6 px-4 sm:px-6">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold"
          style={titleInlineStyle}
        >
          {title}
        </h2>
      </div>

      <div className="relative flex flex-col items-center gap-6 px-4">
        {/* Video Grid */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth px-2 sm:justify-center snap-x snap-mandatory">
          {visibleVideos.map((video, index) => {
            const cleanVideoId = getYouTubeID(video.videoId)
            return (
              <div
                key={video.videoId + index}
                className="flex-shrink-0 w-[90vw] sm:w-[45vw] max-w-[500px] h-[50vw] max-h-[280px] sm:h-[250px] md:h-[280px] lg:h-[300px] relative overflow-hidden rounded-xl"
                style={{
                  backgroundColor: activeTheme?.containerBackground,
                }}
              >
                <YouTube
                  videoId={cleanVideoId || ''}
                  opts={opts}
                  className="absolute inset-0 w-full h-full"
                  iframeClassName="w-full h-full"
                />
              </div>
            )
          })}
        </div>

        {/* Dynamic Chevron Buttons */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            style={buttonStyle}
            className={`p-3 rounded-full shadow-md transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass}`}
            disabled={startIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 stroke-current" />
          </button>
          <button
            onClick={handleNext}
            style={buttonStyle}
            className={`p-3 rounded-full shadow-md transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass}`}
            disabled={startIndex + videosPerPage >= videos.length}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 stroke-current" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default VideoTwoSection