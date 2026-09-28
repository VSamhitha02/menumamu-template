'use client'

import React, { useState } from 'react'
import './Contact.css'
//import { saveContactData } from '@/components/contactActions'

export type FieldType = 'text' | 'email' | 'textarea'

export interface ContactField {
  label: string
  name: string
  type: FieldType
  required: boolean
}

export interface ContactBlock {
  title: string
  description: string
  fields: ContactField[]
  buttonText: string
  className: string
  btn_variant: 'fill' | 'outline'
  inlineStyle?: string
}

type ContactRendererProps = ContactBlock

const ContactRenderer: React.FC<ContactRendererProps> = ({
  title,
  description,
  fields,
  buttonText,
  className,
  btn_variant,
  inlineStyle,
}) => {
  const initialFormState = fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.name] = ''
    return acc
  }, {})

  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData(initialFormState)
  }
  //============================================================================
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   console.log('Form submitted:', formData)
  //   setFormData(initialFormState)
  //   const response = await fetch('/api/form-submissions', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(formData),
  //   })
  // }

  // Map theme to a CSS class
  const themeClasses: Record<string, string> = {
    'black-theme': 'contact-black',
    'white-theme': 'contact-white',
    'orange-theme': 'contact-orange',
    'green-theme': 'contact-green',
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
    <section id="contact" className={`${className} py-16 px-4`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-4 !text-[color:var(--heading-color)]">{title}</h2>
        {/* Description */}
        <p className="text-lg text-center mb-8 opacity-80 !text-[color:var(--description-color)]">{description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label htmlFor={field.name} className="font-medium !text-[color:var(--description-color)]">
                {field.label}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border rounded-md bg-transparent !text-[color:var(--description-color)]"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border rounded-md bg-transparent !text-[color:var(--description-color)]"
                />
              )}
            </div>
          ))}
          {/* Button */}
          <button
            type="submit"
            className={` px-6 py-3 rounded-md font-bold transition 
    ${className}__button 
    ${btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'}
  `}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactRenderer
