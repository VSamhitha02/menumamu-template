'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Media } from '@/payload-types'

export interface LocationList {
  // image?: {
  //   url: string
  //   filename: string
  // }
  image?: Media
  name: string
  address: string
  orderNowUrl: string
}

export interface LocationBlockData {
  title: string
  locations: LocationList[]
  className: string
  btn_variant: 'fill' | 'outline'
  inlineStyle?: string
}

type LocationRendererProps = LocationBlockData
const LocationScrollRenderer: React.FC<LocationRendererProps> = ({
  title,
  locations,
  className,
  btn_variant,
  inlineStyle,
}) => {
  // Map the theme value to a CSS class.
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
    <section className={`py-12 ${className} relative`}
    style={parseStyleString(inlineStyle)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

        <div className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide">
          {locations.map((location, index) => (
            <div
              key={index}
              className="min-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              {location.image && (
                <Image
                  // src={`/media/${location.image.filename}`}
                  src={(location.image as Media)?.url || ''}
                  alt={location.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                {/* Fixed height container for address with overflow handling */}
                <div className="h-16 mb-4">
                  <p className="text-gray-600">{location.address}</p>
                </div>
                {/* Button container at the bottom */}
                <div className="mt-auto">
                  <Button
                    className={`${btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'} w-full`}
                  >
                    <Link href={location.orderNowUrl} className="text-black">
                      Order Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocationScrollRenderer
