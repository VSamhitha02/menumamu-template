import type { Block } from 'payload'

const LocationBlock: Block = {
  slug: 'location',
  labels: {
    singular: 'Location',
    plural: 'Location Blocks',
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
      label: 'Location Title',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Location List',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Location Image',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Location Name',
        },
        {
          name: 'address',
          type: 'text',
          required: true,
          label: 'Address',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          label: 'Button Text',
        },

        {
          name: 'orderNowUrl',
          type: 'text',
          required: true,
          label: 'Order Now URL',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'location',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default LocationBlock
