'use client'

import React from 'react'

export interface TestimonialsBlockData {
  title: string
  className: string
  inlineStyle?: string
  video?: {
    url: string
    filename: string
  }
}

const VideoSection: React.FC<TestimonialsBlockData> = ({ title, video, className, inlineStyle }) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'bg-black text-white',
    'white-theme': 'bg-white text-black',
    'orange-theme': 'bg-orange-500 text-white',
    'green-theme': 'bg-green-600 text-white',
    'modern-dark': 'bg-zinc-900 text-white',
    'modern-light': 'bg-zinc-100 text-black',
  }
  console.log('Video URL:', video?.url)

  //
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
    <section className={`py-12 px-4 sm:px-6 md:px-10 ${className} `} style={parseStyleString(inlineStyle)}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8">{title}</h2>

        {video?.url && (
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
            <video
              controls
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoSection
