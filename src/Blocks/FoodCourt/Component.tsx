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

export interface Category {
  categoryName: string
  restaurants: Restaurant[]
}

export interface FoodCourtBlockData {
  title: string
  categories: Category[]
  className: string
  inlineStyle?: string
  variant: 'fill' | 'outline'
}

type FoodCourtRendererProps = FoodCourtBlockData

const FoodRenderer: React.FC<FoodCourtRendererProps> = ({
  title,
  categories,
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

  const scrollToCategory = (category: string) => {
    const section = document.getElementById(category)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
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
    <section className={`w-full py-16 ${className}`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>

        {/* Category Navigation */}
        {/* <div className="flex overflow-x-auto space-x-4 mb-6">
          {categories.map((category) => (
            <button
              key={category.categoryName}
              className="px-4 py-2 rounded bg-orange-400 hover:bg-orange-300 hover:text-white transition"
              onClick={() => scrollToCategory(category.categoryName)}
            >
              {category.categoryName}
            </button>
          ))}
        </div> */}
        {/* <div className="flex justify-center mt-6"> */}
        <div className="flex justify-center mb-6 ">
          <div className="flex overflow-x-auto whitespace-nowrap space-x-3 px-4 py-2 bg-gray-100 rounded-full shadow-sm">
            {/* <div className="bg-gray-200 shadow-md flex items-center space-x-4 px-6 py-3 rounded-full"> */}
            {categories.map((category) => (
              <button
                key={category.categoryName}
                onClick={() => scrollToCategory(category.categoryName)}
                className="px-4 py-2 rounded-full transition bg-transparent hover:bg-gray-300 text-gray-900"
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.categoryName} id={category.categoryName} className="mb-12">
            <h1 className="text-3xl font-bold mb-4">{category.categoryName}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.restaurants.map((restaurant, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl hover:-translate-y-1 duration-300"
                >
                  {restaurant.image && (
                    <div className="relative w-full h-56 sm:h-60 md:h-64">
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

                    {restaurant.cuisine && (
                      <p className="text-gray-500 mb-2">{restaurant.cuisine}</p>
                    )}

                    {restaurant.description && (
                      <p className="text-gray-600 mb-4">{restaurant.description}</p>
                    )}

                    <Link
                      href={restaurant.buttonLink}
                      className={`inline-block  text-white px-4 py-2 rounded-lg font-semibold transition ${variant === 'outline' ? 'btn-outline' : 'btn-fill'}`}
                    >
                      {restaurant.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FoodRenderer
