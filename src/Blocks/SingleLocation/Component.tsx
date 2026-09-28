'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import type { Media, Page } from '@/payload-types'
import './SingleLocation.css'

// Define a Media type to reflect a populated media object.

export interface SingleLocationCustom {
  // The image field can be either a Media object or a number (if not populated).
  images: { image: Media | number; category: string }[]
  menu: { category: string; items: { dish: string }[] }[]
  buttonText: string
  className: string
  btn_style: 'fill' | 'outline'
  inlineStyle?: string
}

// Intersect the extracted type with our custom type.
type SingleLocationRendererProps = Extract<
  Page['layout'][number],
  { blockType: 'singleLocation' }
> &
  SingleLocationCustom & {
    disableInnerContainer?: boolean
    
  }

const SingleLocationRenderer: React.FC<SingleLocationRendererProps> = (props) => {
  const { btn_style, title, description, images, menu, buttonText, className, inlineStyle } = props

  // console.log('the images are:::', images)

  // Set initial active category based on the first menu item.
  const initialCategory = menu && menu.length > 0 ? menu[0]?.category : ''
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  // Map theme values to corresponding CSS classes.
  const themeClasses: Record<string, string> = {
    'black-theme': 'single-location-black',
    'white-theme': 'single-location-white',
    'orange-theme': 'single-location-orange',
    'green-theme': 'single-location-green',
  }
  // const themeClass = themeClasses[theme] || themeClasses['orange-theme']

  // Filter images for the selected category using the 'category' property.
  const filteredImages = images.filter((img) => img.category === activeCategory)

  // Framer Motion animation variants.
  const imageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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
    <section id="single-location" className={`py-16 ${className}`}
    style={parseStyleString(inlineStyle)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-playfair">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredImages.length > 0 ? (
                filteredImages.map((img, index) => {
                  // Check if the image field is an object with a URL.
                  const imageUrl =
                    typeof img.image === 'object' && 'url' in img.image ? img.image.url : ''

                  // If there is no URL, you can either skip rendering or use a default image.
                  if (!imageUrl) return null

                  return (
                    <motion.div
                      key={typeof img.image === 'object' && img.image.id ? img.image.id : index}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={imageVariants}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        // src={`/media/${(img.image as Media).filename}`}
                        src={imageUrl}
                        alt={`Restaurant image ${index + 1}`}
                        width={600}
                        height={400}
                        className="rounded-lg"
                      />
                    </motion.div>
                  )
                })
              ) : (
                <p className="text-center">No images available for this category.</p>
              )}
            </AnimatePresence>
          </div>
          {/* Description & Menu */}
          <div>
            <p className="text-lg mb-6">{description}</p>
            <h3 className="text-2xl font-semibold mb-4 font-playfair">Our Menu</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {menu.map((item) => (
                <button
                  key={item.category}
                  className={`px-4 py-2 rounded-md transition duration-300 ${
                    activeCategory === item.category
                      ? 'bg-orange-500 text-orange-50'
                      : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
                  }`}
                  onClick={() => setActiveCategory(item.category)}
                >
                  {item.category}
                </button>
              ))}
            </div>
            <ul className="space-y-2">
              {(menu.find((item) => item.category === activeCategory)?.items || []).map(
                (dishObj) => (
                  <li key={dishObj.dish}>{dishObj.dish}</li>
                ),
              )}
            </ul>
          </div>
        </div>
        {/* CTA Button */}
        <div className="text-center">
          <button
            className={`${
              btn_style === 'fill' ? 'btn-fill' : 'btn-outline'
            } text-orange-50 px-6 py-3 rounded-md text-lg  transition duration-300`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default SingleLocationRenderer
