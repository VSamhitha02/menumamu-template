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
  btn_style: 'fill' | 'outline'
}

export interface RestaurantBlockData {
  title: string

  restaurants: Restaurant[]
  className: string
  inlineStyle?: string
}

type RestaurantRendererProps = RestaurantBlockData

const RestaurantRenderer: React.FC<RestaurantRendererProps> = ({
  title,
  restaurants,
  className,
  inlineStyle,
}) => {
  // Map the theme value to a CSS class.

  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',

    'white-theme': 'menu-white',

    'orange-theme': 'menu-orange',

    'green-theme': 'menu-green',
  }

  // const themeClass = themeClasses[theme] || themeClasses['orange-theme']

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
    <section className={`py-12  ${className}`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">{title}</h2>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              {restaurant.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={(restaurant.image as Media)?.url || ''}
                    alt={restaurant.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{restaurant.title}</h3>

                {restaurant.cuisine && <p className="text-gray-500 mb-4">{restaurant.cuisine}</p>}
                {restaurant.description && (
                  <p className="text-gray-600 mb-4">{restaurant.description}</p>
                )}
                <Link
                  href={restaurant.buttonLink}
                  className={`inline-block ${
                    restaurant.btn_style === 'fill' ? 'btn-fill' : 'btn-outline'
                  } text-white px-4 py-2 rounded-md font-medium transition hover:-translate-y-0.5`}
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

export default RestaurantRenderer
