'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import './Gallery.css'

export interface GalleryBlock {
  layoutType: 'carousel' | 'masonry'
  title: string
  className: string
  inlineStyle?: string
  images: {
    image: { filename?: string; url?: string }
    altText: string
  }[]
}

type GalleryRendererProps = GalleryBlock

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const lightboxVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3 } },
}

// const swipeConfidenceThreshold = 10000
// const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

const GalleryOneRenderer: React.FC<GalleryRendererProps> = ({
  title,

  layoutType,
  images,
  className,
  inlineStyle,
}) => {
  //

  const galleryImages = images.map((img) => ({
    src: img.image?.url || '',
    alt: img.altText,
  }))

  const [[page, direction], setPage] = useState([0, 0])
  const [selectedImageForLightbox, setSelectedImageForLightbox] = useState<string | null>(null)
  const imageIndex = ((page % galleryImages.length) + galleryImages.length) % galleryImages.length

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleImageClick = (src: string) => {
    setSelectedImageForLightbox(src)
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
    <section id="gallery" className={`gallery-section ${className} py-16`} style={parseStyleString(inlineStyle)}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
        >
          {title}
        </motion.h2>

        {layoutType === 'carousel' ? (
          <div className="relative flex flex-col items-center max-w-3xl mx-auto">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg shadow-xl mb-4">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  className="absolute w-full h-full cursor-pointer"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  onClick={() => handleImageClick(galleryImages[imageIndex].src)}
                >
                  <Image
                    src={galleryImages[imageIndex].src}
                    alt={galleryImages[imageIndex].alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="h-10 w-10" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="h-10 w-10" />
              </Button>
            </div>

            <div className="flex justify-center space-x-2 mt-6">
              {galleryImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                  className="h-20 w-20 rounded-md overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 px-2">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => handleImageClick(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImageForLightbox && (
          <Dialog open onOpenChange={() => setSelectedImageForLightbox(null)}>
            <DialogContent className="p-0 max-w-4xl w-[90vw] h-[80vh] bg-transparent border-none">
              <motion.div
                variants={lightboxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full h-full"
              >
                <Image
                  src={selectedImageForLightbox} // DB URL directly
                  alt="Selected image"
                  fill
                  style={{ objectFit: 'contain' }}
                />
                <button onClick={() => setSelectedImageForLightbox(null)}>
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GalleryOneRenderer
