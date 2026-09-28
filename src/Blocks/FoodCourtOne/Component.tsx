'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'
import { Media } from '@/payload-types'

export interface Restaurant {
  title: string
  cuisine?: string
  description: string
  // image?: {
  //   filename: string
  // }
  image?: Media
  buttonText: string
  buttonLink: string
}

export interface FoodCourtBlockData {
  title: string
  restaurants: Restaurant[]
  className: string
  inlineStyle?: string
  variant: 'fill' | 'outline'
}

type FoodCourtRendererProps = FoodCourtBlockData

const FoodOneRenderer: React.FC<FoodCourtRendererProps> = ({
  title,
  restaurants,
  className,
  inlineStyle,
  variant,
}) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
    'orange-theme': 'menu-orange',
    'green-theme': 'menu-green',
  }

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
    <section className={`py-12 ${className}`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants?.map((restaurant, i) => (
            <div
              key={i}
              className="
                bg-white
                rounded-xl
                shadow-md
                hover:shadow-xl
                transition
                duration-300
                flex
                flex-col
                overflow-hidden
              "
            >
              {' '}
              {/* Image */}
              {restaurant.image && (
                <Image
                  src={(restaurant.image as Media)?.url || ''}
                  alt={restaurant.title || 'Restaurant'}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{restaurant.title}</h3>
                {restaurant.cuisine && <p className="text-gray-500 mb-2">{restaurant.cuisine}</p>}
                {restaurant.description && (
                  <p className="text-gray-600 mb-4 text-justify flex-grow">
                    {restaurant.description}
                  </p>
                )}
                {/* Button */}
                <Link
                  href={restaurant.buttonLink}
                  className="
                   ${variant === 'outline' ? 'btn-outline' : 'btn-fill'}
                    text-white
                    px-6
                    py-2
                    rounded-lg
                    font-semibold
                    text-center
                    transition
                    duration-300
                    active:scale-95
                  "
                >
                  {restaurant.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoodOneRenderer
