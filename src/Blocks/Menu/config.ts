import type { Block } from 'payload'

const MenuBlock: Block = {
  slug: 'menu',
  labels: {
    singular: 'Menu',
    plural: 'Menu Blocks',
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
      label: 'Menu Title',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Dish Title',
        },
        {
          name: 'category',
          type: 'text',
          required: false,
          label: 'Category',
        },
        {
          name: 'specialTag',
          type: 'text',
          required: false,
          label: 'Special Tag',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Uses your media collection
          required: false,
          label: 'Dish Image',
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      required: false,
      label: 'Button Text',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: false,
      label: 'Button Link',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'menu',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default MenuBlock
