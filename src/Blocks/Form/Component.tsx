'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import Turnstile from 'react-turnstile'

import { Button } from '@/components/ui/button'
import { fields } from './fields'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType | null
  introContent?: SerializedEditorState
  btn_variant?: 'fill' | 'outline'
  captchaType: 'none' | 'googlerecaptcha' | 'cloudflareturnstile'
  storageType: 'database' | 'database-and-excel'
  workflow?: string
  className?: string
  inlineStyle?: string
}

interface ReCAPTCHARef {
  getValue: () => string | null
  reset: () => void
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    introContent,
    btn_variant = 'fill',
    captchaType = 'none',
    storageType = 'database',
    workflow,
    className,
    inlineStyle,
  } = props

  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps || {}

  const recaptchaRef = useRef<ReCAPTCHARef>(null)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const turnstilesitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  const formMethods = useForm<Record<string, unknown>>()
  const { control, formState: { errors }, handleSubmit, register } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()

  const router = useRouter()

  const parseStyleString = (styleString?: string): React.CSSProperties => {
    if (!styleString) return {}
    return Object.fromEntries(
      styleString
        .split(';')
        .filter(Boolean)
        .map((style) => {
          const [key, value] = style.split(':')
          if (!key || !value) return []
          return [
            key.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase()),
            value.trim(),
          ]
        })
        .filter((entry) => entry.length === 2),
    ) as React.CSSProperties
  }

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        setError(undefined)

        const recaptchaValue = recaptchaRef.current?.getValue()
        if (captchaType === 'googlerecaptcha' && !recaptchaValue) {
          setError({ message: 'Please complete the reCAPTCHA.' })
          return
        }
        if (captchaType === 'cloudflareturnstile' && !turnstileToken) {
          setError({ message: 'Please complete the Cloudflare Turnstile verification.' })
          return
        }

        setIsLoading(true)

        try {
          const submissionData = Object.entries(data).map(([field, rawValue]) => {
            let value = ''
            if (rawValue !== null && rawValue !== undefined) {
              value = typeof rawValue === 'object' ? JSON.stringify(rawValue) : String(rawValue)
            }
            return { field, value }
          })

          const response = await fetch('/api/form-submissions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              form: formID,
              submissionData,
              captchaType,
              storageType,
              workflow,
              recaptchaToken: recaptchaValue || '',
              turnstileToken,
            }),
          })

          if (!response.ok) {
            const resData = (await response.json().catch(() => ({}))) as {
              errors?: Array<{ message: string }>
            }
            throw new Error(
              resData?.errors?.[0]?.message || `Failed to submit: ${response.statusText}`,
            )
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (captchaType === 'googlerecaptcha' && recaptchaRef.current) {
            recaptchaRef.current.reset()
          }
          if (captchaType === 'cloudflareturnstile') {
            setTurnstileKey((prev) => prev + 1)
          }

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch (err: any) {
          console.error('Form submission error:', err)
          setIsLoading(false)
          setError({ message: err.message || 'Something went wrong.' })
        }
      }

      void submitForm()
    },
    [formID, router, confirmationType, redirect, captchaType, storageType, workflow, turnstileToken],
  )

  if (!formFromProps || !formFromProps.fields) return null

  // className drives which globals.css hook applies (.formBlock, .formBlockOne, .formBlockTwo, ...).
  // Falls back to 'formBlock' so it always resolves to something in globals.css.
  const resolvedClassName = className || 'formBlock'

return (
  <section
    className={`${resolvedClassName} min-h-screen w-full py-10 md:py-18 flex items-center justify-center transition-colors duration-200`}
    style={parseStyleString(inlineStyle)}
  >
    <div className="mx-auto w-full max-w-[700px] px-4">
      <div className="form-card w-full rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg">
          {!hasSubmitted && (
            <div className="form-header mb-6 text-center md:mb-8">
              <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl text-black">
                Get in Touch
              </h2>
              {enableIntro && introContent && (
                <div className="prose mx-auto max-w-xl text-center text-sm leading-relaxed opacity-80 [&_p]:m-0 [&_p]:leading-relaxed">
                  <RichText data={introContent} />
                </div>
              )}
            </div>
          )}

          <FormProvider {...formMethods}>
            {!isLoading && hasSubmitted && confirmationType === 'message' && confirmationMessage && (
              <div className="rounded-md border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
                {typeof confirmationMessage === 'string' ? (
                  confirmationMessage
                ) : typeof confirmationMessage === 'object' && 'root' in confirmationMessage ? (
                  <RichText data={confirmationMessage as SerializedEditorState} />
                ) : (
                  'Form submitted successfully!'
                )}
              </div>
            )}

            {isLoading && !hasSubmitted && (
              <div className="py-8 text-center text-sm opacity-70">Loading, please wait...</div>
            )}

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
                {`${error.status || 'Error'}: ${error.message}`}
              </div>
            )}

            {!hasSubmitted && !isLoading && (
              <form id={formID} onSubmit={handleSubmit(onSubmit)} className="form-layout w-full">
<div 
  className="flex flex-col gap-y-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-5
    [&>div]:m-0 [&>div]:w-full [&>div]:p-0
    [&_label]:mb-1.5 [&_label]:block [&_label]:h-5 [&_label]:text-sm [&_label]:font-semibold [&_label]:leading-5
    [&_input]:h-11 [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-gray-300 [&_input]:bg-white [&_input]:px-3.5 [&_input]:text-sm [&_input]:outline-none [&_input]:placeholder:text-gray-400 [&_input:focus]:border-gray-500 [&_input:focus]:bg-white
    [&_select]:h-11 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-gray-300 [&_select]:bg-white [&_select]:px-3.5 [&_select]:text-sm [&_select]:outline-none [&_select]:appearance-none [&_select:focus]:border-gray-500 [&_select:focus]:bg-white [&_select:hover]:bg-white [&_select]:[color-scheme:light]
    [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-gray-300 [&_textarea]:bg-white [&_textarea]:p-3.5 [&_textarea]:text-sm [&_textarea]:outline-none [&_textarea]:placeholder:text-gray-400 [&_textarea:focus]:border-gray-500 [&_textarea:focus]:bg-white"
>
                  {formFromProps.fields.map((field: FormFieldBlock, index: number) => {
                    const Field = fields[field.blockType as keyof typeof fields]
                    if (!Field) return null

                    const isFullWidth =
                      field.blockType === 'textarea' ||
                      field.blockType === 'message' ||
                      field.blockType === 'checkbox'

                    return (
                      <div key={index} className={`flex w-full flex-col justify-start min-w-0 ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'}`}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className="form-bottom mt-6 flex w-full flex-col gap-4">
                  {captchaType === 'googlerecaptcha' && (
                    <div className="flex w-full justify-center sm:justify-start">
                      <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey || ''} />
                    </div>
                  )}

                  {captchaType === 'cloudflareturnstile' && (
                    <div className="flex w-full justify-center sm:justify-start">
                      <Turnstile
                        key={turnstileKey}
                        sitekey={turnstilesitekey}
                        onSuccess={(token) => setTurnstileToken(token)}
                      />
                    </div>
                  )}

                  <Button
                    form={formID}
                    type="submit"
                    className={`h-11 w-full rounded-lg text-base font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 ${btn_variant === 'outline' ? 'btn-outline bg-transparent' : 'btn-fill'}`}
                  >
                    {submitButtonLabel || 'Submit'}
                  </Button>
                </div>
              </form>
            )}
          </FormProvider>
        </div>
      </div>
    </section>
  )
}