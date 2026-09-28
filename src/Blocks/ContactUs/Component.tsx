'use client'
import React from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { Mail, Phone, Building, Clock } from 'lucide-react'
import './Contact.css'

export interface OpenHours {
  day: string
  hours: string
}

export interface ContactBlock {
  title: string
  description?: string
  address: string
  phoneNumber: string
  email: string
  openHours: OpenHours[]
  image: Media
  className?: string
  inlineStyle?: string
}

type ContactRendererProps = ContactBlock

const ContactUsRenderer: React.FC<ContactRendererProps> = ({
  title,
  description,
  address,
  phoneNumber,
  email,
  openHours,
  image,
  className,
  inlineStyle,
}) => {
  const parseStyleString = (styleString?: string) => {
    if (!styleString) return {}

    return Object.fromEntries(
      styleString
        .split(';')
        .filter(Boolean)
        .map((style) => {
          const firstColonIndex = style.indexOf(':')
          if (firstColonIndex === -1) return ['', '']

          const key = style.slice(0, firstColonIndex).trim()
          const value = style.slice(firstColonIndex + 1).trim()

          return [
            key.replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value,
          ]
        })
        .filter(([key]) => Boolean(key)),
    )
  }

  return (
    <section
      className={`pt-8 pb-4 md:pt-10 md:pb-6 px-4 ${className || ''}`}
      style={parseStyleString(inlineStyle)}
    >
      <div className="max-w-6xl mx-auto">
        {/* TOP SECTION */}
        <div className="w-full mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 !text-[color:var(--heading-color)]">
            {title}
          </h2>

          {description && (
            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line !text-[color:var(--description-color)]">
              {description}
            </p>
          )}
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
          
          {/* LEFT SIDE — CONTACT DETAILS */}
          <div className="flex flex-col justify-center h-full py-2 space-y-6 md:space-y-8">
            
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1 text-gray-700 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-1 !text-[color:var(--heading-color)]">
                  Email
                </h3>
                <p className="text-base md:text-lg break-words !text-[color:var(--description-color)]">
                  {email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1 text-gray-700 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-1 !text-[color:var(--heading-color)]">
                  Phone
                </h3>
                <p className="text-base md:text-lg !text-[color:var(--description-color)]">
                  {phoneNumber}
                </p>
              </div>
            </div>

            {/* Office */}
            <div className="flex items-start gap-4">
              <Building className="w-5 h-5 mt-1 text-gray-700 shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-1 !text-[color:var(--heading-color)]">
                  Office
                </h3>
                <p className="text-base md:text-lg leading-relaxed whitespace-pre-line !text-[color:var(--description-color)]">
                  {address}
                </p>
              </div>
            </div>

            {/* Open Hours */}
            {openHours?.length > 0 && (
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 mt-1 text-gray-700 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-1 !text-[color:var(--heading-color)]">
                    Open Hours
                  </h3>
                  <div className="space-y-1">
                    {openHours.map((hour, index) => (
                      <p
                        key={index}
                        className="text-base md:text-lg !text-[color:var(--description-color)]"
                      >
                        {hour.day}: {hour.hours}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div> 

          {/* RIGHT SIDE — IMAGE */}
          <div className="pb-4 md:pb-6">
            <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[380px] rounded-xl overflow-hidden shadow-sm">
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || "Contact image"}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactUsRenderer