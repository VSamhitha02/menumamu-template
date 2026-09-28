// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import './Gallery.css'

// export interface GalleryBlock {
//   theme:
//     | 'modern-dark'
//     | 'modern-light'
//     | 'black-theme'
//     | 'white-theme'
//     | 'orange-theme'
//     | 'green-theme'
//   title: string
//   images: {
//     image: {
//       filename: string
//     }
//     altText: string
//   }[]
// }

// type GalleryRendererProps = GalleryBlock

// const GalleryRenderer: React.FC<GalleryRendererProps> = ({ theme, title, images }) => {
//   // Map the gallery theme to a CSS class.
//   const themeClasses: Record<string, string> = {
//     'modern-dark': 'gallery-modern-dark',
//     'modern-light': 'gallery-modern-light',
//     'black-theme': 'gallery-black',
//     'white-theme': 'gallery-white',
//     'orange-theme': 'gallery-orange',
//     'green-theme': 'gallery-green',
//   }
//     

//   // Map the images array to a simplified format.
//   const galleryImages = images.map((img) => ({
//     src: img.image.filename, // Use the URL provided by the media upload.
//     alt: img.altText,
//   }))

//   return (
//     <section id="gallery" className={`gallery-section ${themeClass} py-16`}>
//       <div className="gallery-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="gallery-title text-4xl font-bold text-center mb-12 font-playfair">
//           {title}
//         </h2>
//         <div className="gallery-grid grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {galleryImages.map((image, index) => (
//             <div key={index} className="gallery-item relative h-64 rounded-lg overflow-hidden">
//               <Image
//                 src={`/media/${image.src}`}
//                 alt={image.alt}
//                 fill
//                 style={{ objectFit: 'cover' }}
//                 className="gallery-image transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default GalleryRenderer

'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Gallery.css'
import { Media } from '@/payload-types'

export interface GalleryBlock {
  className: string
  inlineStyle?: string

  title: string
  // images: {
  //   image: {
  //     filename: string
  //   }
  //   altText: string
  // }[]
  images: {
    image: Media
    altText: string
  }[]
}

type GalleryRendererProps = GalleryBlock

const GalleryRenderer: React.FC<GalleryRendererProps> = ({ title, images, className, inlineStyle }) => {
  const themeClasses: Record<string, string> = {
    'modern-dark': 'gallery-modern-dark',
    'modern-light': 'gallery-modern-light',
    'black-theme': 'gallery-black',
    'white-theme': 'gallery-white',
    'orange-theme': 'gallery-orange',
    'green-theme': 'gallery-green',
  }

    
  const galleryImages = images.map((img) => ({
    src: img.image.filename,
    alt: img.altText,
  }))

  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null)

  const handlePrev = () => {
    if (zoomedIndex !== null) {
      setZoomedIndex((prev) => (prev! > 0 ? prev! - 1 : galleryImages.length - 1))
    }
  }

  const handleNext = () => {
    if (zoomedIndex !== null) {
      setZoomedIndex((prev) => (prev! < galleryImages.length - 1 ? prev! + 1 : 0))
    }
  }

  const handleTouch = {
    startX: 0,
    endX: 0,
    onTouchStart: (e: React.TouchEvent) => {
      handleTouch.startX = e.touches[0].clientX
    },
    onTouchMove: (e: React.TouchEvent) => {
      handleTouch.endX = e.touches[0].clientX
    },
    onTouchEnd: () => {
      if (handleTouch.startX - handleTouch.endX > 50) handleNext()
      if (handleTouch.endX - handleTouch.startX > 50) handlePrev()
    },
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
    <section id="gallery" className={`gallery-section ${className} py-16`}
    style={parseStyleString(inlineStyle)}>
      <div className="gallery-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="gallery-title text-4xl font-bold text-center mb-12 font-playfair">
          {title}
        </h2>
        <div className="gallery-grid grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="gallery-item relative h-64 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setZoomedIndex(index)}
            >
              <Image
                // src={`/media/${image.src}`}
                src={(img.image as Media)?.url || ''}
                alt={img.altText}
                fill
                style={{ objectFit: 'cover' }}
                className="gallery-image transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Overlay */}
      {/* <AnimatePresence>
        {zoomedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTouchStart={handleTouch.onTouchStart}
            onTouchMove={handleTouch.onTouchMove}
            onTouchEnd={handleTouch.onTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src={`/media/${galleryImages[zoomedIndex].src}`}
                alt={galleryImages[zoomedIndex].alt}
                width={800}
                height={600}
                className="object-contain max-h-[90vh] max-w-[95vw]"
              />

              
              <button
                className="absolute top-4 right-4 text-white bg-orange-500 rounded-full p-2 hover:bg-orange-600 z-[10000]"
                onClick={() => setZoomedIndex(null)}
              >
                <X size={24} />
              </button>

             
              <button
                className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600"
                onClick={handlePrev}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600"
                onClick={handleNext}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {zoomedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onTouchStart={handleTouch.onTouchStart}
            onTouchMove={handleTouch.onTouchMove}
            onTouchEnd={handleTouch.onTouchEnd}
          >
            {/* Close Button on Top Right of Screen */}
            <button
              className="absolute top-6 right-6 text-white bg-orange-500 rounded-full p-2 hover:bg-orange-600 z-[10000]"
              onClick={() => setZoomedIndex(null)}
            >
              <X size={24} />
            </button>

            {/* Chevron Navigation Buttons (Left & Right of Screen) */}
            <button
              className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600 z-[10000]"
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600 z-[10000]"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src={`/media/${galleryImages[zoomedIndex].src}`}
                alt={galleryImages[zoomedIndex].alt}
                width={800}
                height={600}
                className="object-contain max-h-[90vh] max-w-[95vw]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GalleryRenderer
