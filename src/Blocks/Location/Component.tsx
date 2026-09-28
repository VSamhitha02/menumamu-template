'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Location.css'
import { Media } from '@/payload-types'

export interface LocationList {
  image?: Media
  name: string
  address: string
  buttonText: string
  orderNowUrl: string
}

export interface LocationBlockData {
  title: string
  locations: LocationList[]
  className: string
  inlineStyle?: string
  btn_variant?: 'fill' | 'outline'
}

type LocationRendererProps = LocationBlockData

const LocationRenderer: React.FC<LocationRendererProps> = ({
  title,
  locations = [],
  className,
  inlineStyle,
  btn_variant = 'fill',
}) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
    'orange-theme': 'menu-orange',
    'green-theme': 'menu-green',
    'modern-dark': 'menu-modern-dark',
    'modern-light': 'menu-modern-light',
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

  const cleanClassName = className?.trim() || ''

  return (
    <section
      className={`location ${themeClasses[cleanClassName] || cleanClassName} py-12 transition-colors duration-300`}
      style={parseStyleString(inlineStyle)}
    >
      {/* Updated wrapper div classes to match Menu component padding & width */}
      <div className="max-w-[1230px] mx-auto px-1 sm:px-6 md:px-8 lg:px-10 xl:px-10">
        {/* Title */}
        {title && (
          <h2 className="text-3xl font-bold text-center mb-8 !text-[color:var(--heading-color)]">
            {title}
          </h2>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => {
            const rawUrl = location.orderNowUrl || '#'
            const safeLink =
              rawUrl.startsWith('#') || rawUrl.startsWith('/')
                ? rawUrl
                : '/' + rawUrl

            return (
              <div
                key={index}
                className="flex flex-col h-full rounded-xl overflow-hidden shadow-md transition duration-300 bg-white"
              >
                {/* Image */}
                {location.image && (
                  <Image
                    src={(location.image as Media)?.url || ''}
                    alt={location.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {location.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{location.address}</p>

                  {/* Centered button */}
                  <Link
                    href={safeLink}
                    className={`mt-auto self-center mx-auto w-fit py-2 px-6 rounded-md font-semibold text-center transition duration-200 ${
                      btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'
                    }`}
                  >
                    {location.buttonText || 'Order Now'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LocationRenderer