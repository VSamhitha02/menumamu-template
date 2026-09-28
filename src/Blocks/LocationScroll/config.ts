import type { Block } from 'payload'

const LocationScrollBlock: Block = {
  slug: 'location_scroll',
  labels: {
    singular: 'LocationScroll',
    plural: 'LocationScrollBlocks',
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
          name: 'orderNowUrl',
          type: 'text',
          required: true,
          label: 'Order Now URL',
        },
      ],
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
      defaultValue: 'locationScroll',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default LocationScrollBlock
