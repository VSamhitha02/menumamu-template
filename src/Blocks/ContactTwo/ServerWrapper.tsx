// src/Blocks/ContactTwo/ServerWrapper.tsx

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Form } from '@/payload-types'
import ContactTwoRenderer, { ContactField } from '@/Blocks/ContactTwo/Component'

interface SubmissionData {
  field: string
  value: string
}

export interface FormSubmissionData {
  form: {
    fields: ContactField[]
    submitButtonLabel?: string
  }
  submissionData: SubmissionData[]
  recaptchaToken: string
  turnstileToken: string
  captchaType: 'none' | 'googlerecaptcha' | 'cloudflareturnstile'
  workflow: string
  storageType: 'database' | 'database-and-excel'
}

// 1. Define interface for verification responses to avoid 'any'
interface CaptchaVerificationResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

interface ServerWrapperProps {
  title: string
  description: string
  form: {
    fields: ContactField[]
    submitButtonLabel?: string
  }
  captchaType: 'none' | 'googlerecaptcha' | 'cloudflareturnstile'
  workflow: string
  storageType: 'database' | 'database-and-excel'
}

async function saveFormSubmission(
  formData: FormSubmissionData,
): Promise<{ error?: string } | Record<string, unknown>> {
  'use server'

  const { recaptchaToken, captchaType, turnstileToken, workflow, storageType } = formData // ✨ UPDATE THIS LINE

  console.log('formData', formData)
  console.log('recaptchaToken', recaptchaToken)

  try {
    if (captchaType === 'googlerecaptcha') {
      //  Secret key from your Google reCAPTCHA settings
      const secretKey = process.env.RECAPTCHA_SECRET_KEY

      //  Verify with Google
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`

      const googleRes = await fetch(verifyUrl, { method: 'POST' })
      const googleData = (await googleRes.json()) as CaptchaVerificationResponse
      console.log('google data', googleData)
      if (!googleData.success) {
        console.log('reCAPTCHA verification failed:', googleData)
        return { error: 'failed reCAPTCHA verification' }
      }
    }
    if (captchaType === 'cloudflareturnstile') {
      const secretKey = process.env.TURNSTILE_SECRET_KEY
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

      const formData = new FormData()
      formData.append('secret', secretKey || '')
      formData.append('response', turnstileToken)

      const res = await fetch(verifyUrl, {
        method: 'POST',
        body: formData,
      })

      const data = (await res.json()) as CaptchaVerificationResponse
      console.log('Cloudflare Turnstile verification response:', data)

      if (!data.success) {
        return { error: 'Turnstile verification failed.' }
      }
    }

    const payload = await getPayload({ config: configPromise })

    const submission = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formData.form as Form,
        submissionData: formData.submissionData,
      },
    })
    if (storageType === 'database-and-excel') {
      //  Send to n8n webhook
      const n8nResponse = await fetch(workflow, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formData.form,
          submissionData: formData.submissionData,
        }),
      })
      //  Check if the n8n request was successful
      if (!n8nResponse.ok) {
        // If not, throw an error to be caught by the catch block
        throw new Error(`n8n webhook failed with status: ${n8nResponse.status}`)
      }
    }

    // return submission
    return { success: true, ...submission } // <-- CHANGED THIS

    // return { success: true }
  } catch (error) {
    console.error('Error saving form submission:', error)
    return { error: 'Failed to submit the form. Please try again later.' }
  }
}

// This is a SERVER COMPONENT that wraps the client component
const ContactTwoServerWrapper: React.FC<ServerWrapperProps> = ({
  title,
  description,
  form,
  captchaType,
  workflow,
  storageType,
}) => {
  return (
    <ContactTwoRenderer
      title={title}
      description={description}
      form={form}
      captchaType={captchaType}
      workflow={workflow}
      storageType={storageType}
      onSubmit={saveFormSubmission}
    />
  )
}

export default ContactTwoServerWrapper
