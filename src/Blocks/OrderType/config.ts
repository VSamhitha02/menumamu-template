import { Block } from 'payload'

const ServiceOptionsBlock: Block = {
  slug: 'serviceOptions',
  labels: {
    singular: 'Service Option',
    plural: 'Service Options',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading Text',
      defaultValue: 'Choose Your Service',
    },

    {
      name: 'options',
      type: 'array',
      label: 'Service Options',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Option Name',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Option Icon',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link URL',
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
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'orderType',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ServiceOptionsBlock
