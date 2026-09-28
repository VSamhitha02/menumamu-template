import type { Block } from 'payload'

const ContactTwoBlock: Block = {
  slug: 'contact_two',
  labels: {
    singular: 'Contact_two',
    plural: 'ContactTwo Blocks',
  },
  fields: [
    {
      name: 'captchaType',
      type: 'select',
      required: true,
      label: 'Captcha Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Google reCAPTCHA', value: 'googlerecaptcha' },
        { label: 'Cloudflare Turnstile', value: 'cloudflareturnstile' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'storageType',
      type: 'select',
      required: true,
      label: 'Storage Type',
      options: [
        { label: 'Store only in Database', value: 'database' },
        { label: 'Store in Database and Excel Sheet', value: 'database-and-excel' },
      ],
      defaultValue: 'database',
    },
    {
      name: 'workflow',
      type: 'text',
      required: true,
      label: 'Workflow',
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Contact Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Contact Description',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'btn_variant',
      type: 'select',
      label: 'Button Style',
      defaultValue: 'fill',
      options: [
        { label: 'Fill', value: 'fill' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'contactTwo',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ContactTwoBlock
