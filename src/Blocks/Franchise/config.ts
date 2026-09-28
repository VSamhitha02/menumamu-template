import type { Block } from 'payload'

const FranchiseBlock: Block = {
  slug: 'franchise',
  labels: {
    singular: 'Franchise',
    plural: 'Franchise Blocks',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      label: 'ID',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Franchise Title',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Uses your media collection for franchise image uploads
      required: false,
      label: 'Franchise Image',
    },
    {
      name: 'franchiseSteps',
      type: 'array',
      label: 'Franchise Steps',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Step Description',
        },
      ],
    },
    {
      name: 'investmentDetails',
      type: 'array',
      label: 'Investment Details',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Detail Title',
        },
        {
          name: 'amount',
          type: 'text',
          required: true,
          label: 'Investment Amount',
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'CTA Button Text',
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
      defaultValue: 'Franchise',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default FranchiseBlock
