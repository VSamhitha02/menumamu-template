import type { Block } from 'payload'

const Location1Block: Block = {
  slug: 'singleLocation',
  labels: {
    singular: 'Single Location',
    plural: 'Single Location Blocks',
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
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Location Description',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Uses your media collection for image uploads
          required: true,
          label: 'Image',
        },
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Image Category',
        },
      ],
    },
    {
      name: 'menu',
      type: 'array',
      label: 'Menu',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          fields: [
            {
              name: 'dish',
              type: 'text',
              required: true,
              label: 'Dish Name',
            },
          ],
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
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
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'singleLocation',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default Location1Block
