'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { Phone, Mail, MapPin } from 'lucide-react'
import './Contact.css'

export type FieldType = 'text' | 'email' | 'textarea'

export interface ContactField {
  label: string
  name: string
  type: FieldType
  required: boolean
}

export interface OpenHours {
  day: string
  hours: string
}

export interface ContactBlock {
  title: string
  description: string
  address: string
  phoneNumber: string
  email: string
  openHours: OpenHours[]
  fields: ContactField[]
  buttonText: string
  image: Media
  className: string
  btn_variant: 'fill' | 'outline'
  inlineStyle?: string
}

type ContactRendererProps = ContactBlock

const ContactOneRenderer: React.FC<ContactRendererProps> = ({
  title,
  address,
  phoneNumber,
  email,
  fields = [],
  description,
  buttonText,
  image,
  className = '',
  btn_variant,
  inlineStyle,
}) => {
  const initialFormState = fields.reduce<Record<string, string>>(
    (acc, field) => {
      acc[field.name] = ''
      return acc
    },
    {},
  )

  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('Form submitted:', formData)

    setFormData(initialFormState)
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
            value?.trim(),
          ]
        }),
    )
  }

  return (
    <section
      className={`${className} py-8 md:py-10 text-inherit`}
      style={parseStyleString(inlineStyle)}
    >
      {/* Outer Container strictly aligned with navigation margins */}
      <div className="max-w-[1230px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10">
        
        {/* ================= TITLE ================= */}
        {title && (
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 !text-[color:var(--heading-color)]">
            {title}
          </h1>
        )}

        {/* ================= MAIN CONTAINER ================= */}
        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-10">

          {/* ================================================= */}
          {/* LEFT - IMAGE + CONTACT CARD */}
          {/* ================================================= */}
          <div className="w-full md:w-[45%] flex flex-col items-center">
            {image?.url && (
              <div className="relative w-full max-w-[360px] md:max-w-none h-full flex flex-col flex-grow">

                {/* IMAGE wrapper with absolute full-fill */}
                <div className="relative w-full h-full min-h-[380px] md:min-h-[400px] flex-grow">
                  <Image
                    src={image.url}
                    alt={title || 'Contact'}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="
                      object-cover
                      rounded-xl
                    "
                  />
                </div>

                {/* ================================================= */}
                {/* CONTACT CARD (Blurred Glassmorphic Effect) */}
                {/* ================================================= */}
                <div
                  className="
                    absolute
                    left-[5%]
                    right-[5%]
                    bottom-4
                    p-5
                    rounded-xl
                    shadow-xl
                    z-10
                    bg-black/60
                    backdrop-blur-md
                    border
                    border-white/10
                    text-white
                  "
                >
                  {/* Card Heading */}
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    Come and visit us
                  </h3>

                  {/* Phone */}
                  {phoneNumber && (
                    <div className="flex items-center gap-2.5 text-sm mb-2.5 text-white/90">
                      <Phone className="w-4 h-4 shrink-0 text-white" />
                      <span>{phoneNumber}</span>
                    </div>
                  )}

                  {/* Email */}
                  {email && (
                    <div className="flex items-center gap-2.5 text-sm mb-2.5 text-white/90">
                      <Mail className="w-4 h-4 shrink-0 text-white" />
                      <span className="break-all">{email}</span>
                    </div>
                  )}

                  {/* Address */}
                  {address && (
                    <div className="flex items-start gap-2.5 text-sm text-white/90">
                      <MapPin className="w-4 h-4 shrink-0 text-white mt-0.5" />
                      <span>{address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ================================================= */}
          {/* RIGHT - FORM (Aligned with Image max-width on mobile) */}
          {/* ================================================= */}
          <div className="w-full max-w-[360px] md:max-w-none mx-auto md:mx-0 md:w-[55%] text-inherit flex flex-col justify-between">
            <div>
              {/* Description */}
              {description && (
                <p className="text-base md:text-lg mb-6 !text-[color:var(--description-color)]">
                  {description}
                </p>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field, index) => (
                  <div key={index}>
                    {/* Label */}
                    <label className="block text-sm font-medium mb-1 !text-[color:var(--heading-color)]">
                      {field.label}
                    </label>

                    {/* Textarea */}
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        rows={4}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="
                          w-full
                          border
                          rounded-lg
                          px-3
                          py-2
                          !text-[color:var(--description-color)]
                          focus:outline-none
                          focus:ring-2
                        "
                        style={{
                          ['--tw-ring-color' as string]:
                            'var(--primary-color, #216b45)',
                        }}
                      />
                    ) : (
                      /* Input */
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="
                          w-full
                          border
                          rounded-lg
                          px-3
                          py-2
                          !text-[color:var(--description-color)]
                          focus:outline-none
                          focus:ring-2
                        "
                        style={{
                          ['--tw-ring-color' as string]:
                            'var(--primary-color, #216b45)',
                        }}
                      />
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`
                    w-full sm:w-auto
                    px-6
                    py-3
                    rounded-lg
                    font-semibold
                    transition
                    ${className}__button
                    ${
                      btn_variant === 'outline'
                        ? 'btn-outline'
                        : 'btn-fill'
                    }
                  `}
                >
                  {buttonText}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactOneRenderer