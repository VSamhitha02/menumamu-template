import type { Block } from 'payload'

const RestaurantBlock: Block = {
  slug: 'restaurant',
  labels: {
    singular: 'Restaurant',
    plural: 'Restaurant Blocks',
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
      label: 'Restaurant Title',
    },
    {
      name: 'restaurants',
      type: 'array',
      label: 'Restaurants',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Restaurant Name',
        },
        {
          name: 'cuisine',
          type: 'text',
          label: 'Cuisine',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Restaurant Image',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
          label: 'Button Link',
        },
        {
          name: 'btn_style',
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
      defaultValue: 'restaurant',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default RestaurantBlock
