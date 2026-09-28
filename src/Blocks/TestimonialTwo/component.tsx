'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, RepeatType } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface TestimonialItem {
  name: string
  designation?: string
  testimonialText: string
  Personimage?: {
    filename: string
    url: string
  }
}

export interface TestimonialsBlockData {
  title: string
  className: string
  inlineStyle?: string
  image?: {
    filename: string
    url: string
  }
  testimonials: TestimonialItem[]
}

type TestimonialTwoSectionProps = TestimonialsBlockData & {
  index?: number
}

const TestimonialTwoSection: React.FC<TestimonialTwoSectionProps> = ({
  title,
  testimonials,
  image,
  className,
  index,
  inlineStyle,
}) => {
  const carouselVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      opacity: 1,
      x: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? '100%' : '-100%',
      zIndex: 0,
    }),
  }

  const itemsPerPage = 4
  const interval = 8000
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    if (testimonials.length <= itemsPerPage || totalPages <= 1) return
    const timer = setTimeout(() => {
      setDirection(1)
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    }, interval)
    return () => clearTimeout(timer)
  }, [currentPage, totalPages, testimonials.length])

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  )

  if (!testimonials || testimonials.length === 0) return null

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
    <section
      className={`${
        index === 0
          ? 'pt-16 sm:pt-20 md:pt-24 pb-8'
          : 'pt-4 sm:pt-6 pb-8'
      } ${className} relative overflow-hidden`}
      style={parseStyleString(inlineStyle)}
    >
      {image?.url && (
        <Image
          src={image.url}
          alt="Decorative background"
          fill
          className="object-cover absolute top-0 left-0 w-full h-1/3 md:h-1/2 z-0 opacity-30 pointer-events-none"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background z-[1]" />

      <div className="max-w-[1230px] mx-auto px-1 sm:px-6 md:px-8 lg:px-10 xl:px-10 relative z-10">
        {/* Heading container with increased top padding & decreased bottom padding */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="pt-4 sm:pt-6 mb-4 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold pb-1 mb-0 text-foreground">{title}</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
          {/* Main feature image - Hidden on mobile screens */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="hidden lg:flex w-full lg:w-1/3 items-center justify-center p-4"
          >
            <motion.div
              className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 overflow-hidden shadow-2xl"
              animate={{
                borderRadius: ['25%', '40% 60% 50% 50% / 50% 30% 70% 50%', '25%'],
                scale: [1, 1.03, 1],
              }}
              transition={{
                borderRadius: {
                  duration: 12,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop' as RepeatType,
                },
                scale: {
                  duration: 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror' as RepeatType,
                },
              }}
            >
              {image?.url && (
                <Image
                  src={image.url}
                  alt="Happy customer experience"
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </motion.div>

          {/* Testimonial Grid Container */}
          <div className="w-full lg:w-2/3 relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 250, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
              >
                {currentTestimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="bg-card/90 backdrop-blur-sm shadow-xl rounded-xl border border-border/70 hover:shadow-primary/20 transition-shadow duration-300 flex flex-col items-center text-center"
                  >
                    <CardContent className="p-5 md:p-8 flex flex-col items-center text-center flex-grow">
                      <Avatar className="h-14 w-14 md:h-16 md:w-16 mb-4 border-2 border-primary">
                        <AvatarImage
                          src={testimonial.Personimage?.url || ''}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>{testimonial.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-base md:text-lg text-foreground">{testimonial.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mb-3">
                        {testimonial.designation}
                      </p>
                      <p className="text-xs md:text-base text-foreground/80 italic leading-relaxed">
                        &quot;{testimonial.testimonialText}&quot;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialTwoSection