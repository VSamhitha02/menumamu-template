'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Menu.css'
import { Media } from '@/payload-types'

export interface MenuItem {
  title: string
  category: string
  specialTag?: string
  image?: Media
}

export interface MenuBlockData {
  title: string
  items: MenuItem[]
  buttonText?: string
  buttonLink?: string
  className: string
  inlineStyle?: string
}

type MenuRendererProps = MenuBlockData & {
  index?: number
}

const MenuRenderer: React.FC<MenuRendererProps> = ({
  title,
  items,
  buttonText,
  buttonLink,
  className,
  index,
  inlineStyle,
}) => {
  const themeClasses: Record<string, string> = {
    'black-theme': 'menu-black',
    'white-theme': 'menu-white',
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

          return [
            key
              .trim()
              .replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value.trim(),
          ]
        }),
    )
  }

  const safeButtonLink = buttonLink || ''

  return (
    <section
      className={`${
        index === 0
          ? 'pt-16 sm:pt-20 md:pt-24 pb-8'
          : 'pt-4 sm:pt-6 pb-8'
      } ${className}`}
      style={parseStyleString(inlineStyle)}
    >
      <div className="max-w-[1230px] mx-auto px-1 sm:px-6 md:px-8 lg:px-10 xl:px-10">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold pb-4 mb-1 !text-[color:var(--heading-color)]">
          {title}
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100"
            >
              {item.image && (
                <Image
                  src={(item.image as Media)?.url || ''}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-black ">{item.title}</h3>

                <p className="text-gray-600 mb-2">
                  {item.category}
                </p>

                {item.specialTag && (
                  <span className="menu-tag">
                    {item.specialTag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        {buttonText && (
          <div className="flex justify-end mt-6">
            <Link
         href={buttonLink || '#'} 
              className="inline-flex items-center text-xl font-semibold text-gray-900 hover:text-gray-600 transition-colors duration-200"
            >
              {buttonText}
              <span className="ml-1 text-base">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default MenuRenderer