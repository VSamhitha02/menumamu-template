// 'use server'

// import { getPayload } from 'payload'
// import configPromise from '@payload-config'
// import { Form, FormSubmission } from '@/payload-types'
// import { ContactField } from '@/Blocks/ContactTwo/Component'
// interface SubmissionData {
//   field: string
//   value: string
// }
// interface FormSubmissionData {
//   form: {
//     fields: ContactField[]
//     submitButtonLabel?: string
//   } // Allowing this structure
//   submissionData: SubmissionData[]
//   recaptchaToken: string
//   turnstileToken: string
//   captchaType: 'none' | 'googlerecaptcha' | 'cloudflareturnstile'
// }

// export async function saveFormSubmission(formData: FormSubmissionData) {
//   const { recaptchaToken, captchaType, turnstileToken } = formData

//   console.log('formData', formData)

//   console.log('recaptchaToken', recaptchaToken)
//   try {
//     if (captchaType === 'googlerecaptcha') {
//       //  Secret key from your Google reCAPTCHA settings
//       const secretKey = process.env.RECAPTCHA_SECRET_KEY

//       //  Verify with Google
//       const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`

//       const googleRes = await fetch(verifyUrl, { method: 'POST' })
//       const googleData = await googleRes.json()
//       console.log('google data', googleData)
//       if (!googleData.success) {
//         console.log('reCAPTCHA verification failed:', googleData)
//         return { error: 'failed reCAPTCHA verification' }
//       }
//     }
//     if (captchaType === 'cloudflareturnstile') {
//       const secretKey = process.env.TURNSTILE_SECRET_KEY
//       const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

//       const formData = new FormData()
//       formData.append('secret', secretKey || '')
//       formData.append('response', turnstileToken)

//       const res = await fetch(verifyUrl, {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       console.log('Cloudflare Turnstile verification response:', data)

//       if (!data.success) {
//         return { error: 'Turnstile verification failed.' }
//       }
//     }

//     const payload = await getPayload({ config: configPromise })

//     const submission = await payload.create({
//       collection: 'form-submissions',
//       data: {
//         form: formData.form as Form,
//         submissionData: formData.submissionData,
//       },
//     })

//     //  Send to n8n webhook
//     const n8nResponse = await fetch(
//       'https://n8n.ordermatic.tech/webhook-test/8403de45-d2f9-453d-af45-b75c69fb6ddb',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           form: formData.form,
//           submissionData: formData.submissionData,
//         }),
//       },
//     )
//     //  Check if the n8n request was successful
//     if (!n8nResponse.ok) {
//       // If not, throw an error to be caught by the catch block
//       throw new Error(`n8n webhook failed with status: ${n8nResponse.status}`)
//     }

//     return submission
//     // return { success: true }
//   } catch (error) {
//     console.error('Error saving form submission:', error)
//     return { error: 'Failed to submit the form. Please try again later.' }
//   }
// }

// // // 'use server'

// // // export async function saveContactData(formData: Record<string, string>) {
// // //   try {
// // //     const response = await fetch('/api/form-submissions', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify(formData),
// // //     })

// // //     if (!response.ok) {
// // //       throw new Error('Failed to submit form')
// // //     }

// // //     const data = await response.json()
// // //     return data
// // //   } catch (error) {
// // //     console.error('Error in saveContactData:', error)
// // //     return { error: 'Failed to submit form' }
// // //   }
// // // }
