import type { Block } from 'payload'

const ServiceOptionsThreeBlock: Block = {
  slug: 'serviceOptionsThree',
  labels: {
    singular: 'Service Options Three',
    plural: 'Service Options Three Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'options',
      type: 'array',
      label: 'Options',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon / Image',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'View Menu',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default ServiceOptionsThreeBlock