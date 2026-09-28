'use client'

import React, { useRef, useState } from 'react'
import './Contact.css'
import ReCAPTCHA from 'react-google-recaptcha'
import Turnstile from 'react-turnstile'
import { FormSubmissionData } from './ServerWrapper'

// export type FieldType = 'text' | 'email' | 'textarea'

export interface ContactField {
  label: string
  name: string
  // blockType: 'text' | 'email' | 'textarea' | 'phone'
  blockType: 'text' | 'email' | 'textarea' | 'number' | 'checkbox' | 'select' | 'country' | 'state'
  required: boolean
  options?: { label: string; value: string }[]
}
type ServerActionResponse = { error?: string } | Record<string, unknown>
// 1. Manually define the interface for the ReCAPTCHA ref to satisfy TypeScript
interface ReCAPTCHARef {
  getValue: () => string | null
  reset: () => void
}
export interface ContactTwoBlockProps {
  title: string
  description: string
  className?: string
  inlineStyle?: string
  form: {
    fields: ContactField[]
    submitButtonLabel?: string
  }
  captchaType: 'none' | 'googlerecaptcha' | 'cloudflareturnstile'
  workflow: string
  storageType: 'database' | 'database-and-excel'
  onSubmit: (formData: FormSubmissionData) => Promise<ServerActionResponse>
  btn_variant?: 'fill' | 'outline'
}

const ContactTwoRenderer: React.FC<ContactTwoBlockProps> = (props) => {
  const {
    title,
    description,
    form,
    captchaType,
    workflow,
    storageType,
    className,
    btn_variant,
    inlineStyle,
    onSubmit,
  } = props

  // ✅ ALWAYS define hooks first
  const recaptchaRef = useRef<ReCAPTCHARef>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)

  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)
  const [_verified, setVerified] = useState(false)

  const initialFormState =
    form?.fields?.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {}) || {}

  const [formData, setFormData] = useState(initialFormState)

  const [formState, setFormState] = useState({
    loading: false,
    error: null as string | null,
    success: false,
  })

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const turnstilesitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  // ✅ AFTER hooks → safe to return
  if (!form?.fields?.length) {
    return null
  }
  // const [turnstileToken, setTurnstileToken] = useState('')
  // const [turnstileKey, setTurnstileKey] = useState(0)

  // const [_verified, setVerified] = useState(false)
  // const [formData, setFormData] = useState(initialFormState)
  // const [formState, setFormState] = useState({
  //   loading: false,
  //   error: null as string | null,
  //   success: false,
  // })
  console.log('form.fields:', form.fields)
  //recaptcha function
  function onChange(value: string | null) {
    console.log('Captcha value:', value)
    setVerified(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  function validatePhoneNumber(value: string) {
    // Example: Only digits, length between 10–15
    const phoneRegex = /^[0-9]{10,15}$/
    return phoneRegex.test(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //  Phone Number validation
    const phoneField = form.fields.find((f) => f.label.toLowerCase() === 'phone number')
    if (phoneField) {
      const phoneValue = formData[phoneField.name]
      if (!validatePhoneNumber(phoneValue)) {
        setFormState({
          loading: false,
          error: 'Please enter a valid phone number.',
          success: false,
        })
        return
      }
    }
    const recaptchaValue = recaptchaRef.current?.getValue()
    console.log('recaptchaValue', recaptchaValue)
    if (captchaType === 'googlerecaptcha' && !recaptchaValue) {
      setFormState({ loading: false, error: 'Please complete the reCAPTCHA.', success: false })
      return
    }

    setFormState({ loading: true, error: null, success: false })

    try {
      // Convert formData into expected format
      const submissionData = Object.entries(formData).map(([field, value]) => ({
        field,
        value: value as string,
      }))
      console.log('form========', form)
      console.log('submissiondata', submissionData)
      // Pass only `form.id` to match the expected type
      const response = await onSubmit({
        form,
        submissionData,
        recaptchaToken: recaptchaValue || '',
        turnstileToken,
        captchaType,
        workflow,
        storageType,
      })

      if (response && typeof response === 'object' && 'error' in response) {
        throw new Error(response.error as string)
      }

      setFormState({ loading: false, error: null, success: true })
      setFormData(initialFormState) // Reset form after successful submission

      if (captchaType === 'googlerecaptcha' && recaptchaRef.current) {
        recaptchaRef.current.reset()
        setVerified(false)
      }
      if (captchaType === 'cloudflareturnstile') {
        setTurnstileKey((prev) => prev + 1)
        setVerified(false)
      }
      setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState({ loading: false, error: 'Failed to submit form', success: false })
    }
  }

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
    <section id="contact" className={`${className}py-16 px-4`} style={parseStyleString(inlineStyle)}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>

        <p className="text-center text-base md:text-lg mb-8 opacity-80">{description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {form.fields?.map((field, index) => (
            <div key={index}>
              {/* For all input types except checkbox, show label above */}
              {field.blockType !== 'checkbox' && <label htmlFor={field.name}>{field.label}</label>}

              {field.blockType === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={4}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-current"
                />
              ) : field.blockType === 'select' && field.options ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-current"
                >
                  <option value="">{field.label}</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.blockType === 'checkbox' ? (
                <div className="flex gap-2">
                  <div className=" flex items-start h-6 w-4 accent-blue-600 rounded ">
                    <input
                      type="checkbox"
                      id={field.name}
                      name={field.name}
                      checked={formData[field.name] === 'true'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: e.target.checked.toString(),
                        }))
                      }
                      required={field.required}
                      className="h-4 w-4 accent-current rounded"
                    />
                  </div>
                  <label htmlFor={field.name} className="block mb-1 font-medium text-gray-700 ">
                    {field.label}
                  </label>
                </div>
              ) : (
                <input
                  type={field.blockType}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-current"
                />
              )}
            </div>
          ))}

          {captchaType === 'googlerecaptcha' && (
            <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={onChange} />
          )}

          {captchaType === 'cloudflareturnstile' && (
            <Turnstile
              key={turnstileKey}
              sitekey={turnstilesitekey}
              onSuccess={(token) => {
                console.log('Turnstile token:', token)
                setTurnstileToken(token)
                setVerified(true)
              }}
            />
          )}
          {/* Turnstile widget */}
          <div ref={turnstileRef} className="cf-turnstile my-4" />

          {/* display error or success message */}
          {formState.error && <p className="text-red-500 mt-2">{formState.error}</p>}

          {formState.success ? (
            <p className="text-green-600 mt-4">Form Subitted Succesfully</p>
          ) : (
            <button
              type="submit"
              className={`
              px-6 py-3 rounded-md font-semibold transition  ${btn_variant === 'outline' ? 'btn-outline' : 'btn-fill'}
              ${formState.loading ? 'opacity-50 cursor-not-allowed' : ''}
`}
              disabled={formState.loading}
            >
              {formState.loading ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
            </button>
          )}

          {/* <button type="submit" className="contact-button" disabled={formState.loading}>
            {formState.loading ? 'Submitting...' : form.submitButtonLabel || 'Submit'}
          </button> */}
        </form>
      </div>
    </section>
  )
}
export default ContactTwoRenderer
