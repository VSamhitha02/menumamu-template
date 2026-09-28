import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'captchaType',
      type: 'select',
      required: true,
      label: 'Captcha Type',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Google reCAPTCHA', value: 'googlerecaptcha' },
        { label: 'Cloudflare Turnstile', value: 'cloudflareturnstile' },
      ],
    },
    {
      name: 'storageType',
      type: 'select',
      required: true,
      label: 'Storage Type',
      defaultValue: 'database',
      options: [
        { label: 'Store only in Database', value: 'database' },
        { label: 'Store in Database and Excel Sheet', value: 'database-and-excel' },
      ],
    },
    {
      name: 'workflow',
      type: 'text',
      label: 'Workflow URL (n8n Webhook)',
      admin: {
        condition: (_, siblingData) => siblingData?.storageType === 'database-and-excel',
      },
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
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
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: 'Intro Content',
    },
        {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'formBlock',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
}