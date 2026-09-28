'use client'

import React from 'react'
import Image from 'next/image'
import './Menu.css'
import Link from 'next/link'
import { Media } from '@/payload-types'

export interface MenuDisplay {
  title: string
  // image?: {
  //   filename: string
  // }
  image?: Media
  buttonText: string
  buttonLink: string
}

export interface FoodCourtBlockData {
  menu: MenuDisplay[]
  className: string
  inlineStyle?: string
}

type FoodCourtRendererProps = FoodCourtBlockData

const MenuDisplayRender: React.FC<FoodCourtRendererProps> = ({ menu, className, inlineStyle }) => {
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
    <div className={`w-full overflow-x-auto ${className}`} style={parseStyleString(inlineStyle)}>
      {/* Container */}
      <div className="flex gap-6 px-4 pt-16 pb-6 md:justify-center">
        {menu.map((menu, index) => (
          <div key={index} className="min-w-[140px] flex-shrink-0 text-center group">
            <Link href={menu.buttonLink}>
              {/* Image */}
              <div className="relative w-28 h-36 mx-auto transition-transform duration-300 group-hover:scale-105">
                {menu.image?.url && (
                  <Image
                    src={menu.image.url}
                    alt={menu.title}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                )}
              </div>
              {/* Title */}
              <p className="mt-3 text-sm font-medium transition-colors duration-300 group-hover:text-orange-500">
                {menu.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuDisplayRender
