'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'
import { Media } from '@/payload-types'

export interface PageItem {
  // image?: {
  //   filename: string
  //   url: string
  // }
  image?: Media
  description: string
  link: {
    page: {
      id: string
      slug: string
    }
    text: string
  }
}

export interface MainPageBlockData {
  title: string
  description?: string
  pages: PageItem[]
  className: string
  inlineStyle?: string
}

const MainPageRenderer: React.FC<MainPageBlockData> = ({ title, pages, className, inlineStyle }) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
    'orange-theme': 'menu-orange',
    'green-theme': 'menu-green',
    'modern-dark': 'menu-modern-dark',
    'modern-light': 'menu-modern-light',
  }

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
    <section
      className={`
        ${className}
        py-12
        px-4
      `}
      style={parseStyleString(inlineStyle)}
    >
      {/* container */}
      <div className="max-w-6xl mx-auto">
        {/* title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">{title}</h2>

        {/* grid */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className="
                menu-card
                flex
                flex-col
                h-full
              "
            >
              {/* image */}
              {page.image && (
                <div className="relative w-full h-52">
                  <Image
                    src={(page.image as Media)?.url || ''}
                    alt={page.link?.text || 'Menu image'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* content */}
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-gray-700 mb-4 flex-grow">{page.description}</p>

                {page.link && (
                  <Link
                    href={`/${page.link.page.slug}`}
                    className={`font-semibold
                      hover:text-underline
                      transition-colors`}
                  >
                    {page.link.text}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MainPageRenderer
