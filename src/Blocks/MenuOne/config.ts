import type { Block } from 'payload'

const Menu1Block: Block = {
  slug: 'menu1',
  labels: {
    singular: 'Menu1',
    plural: 'Menu1 Blocks',
  },
  fields: [
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
          required: true,
          label: 'Category',
        },
        {
          name: 'description',
          type: 'text',
          required: false,
          label: 'description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Uses your media collection
          required: false,
          label: 'Dish Image',
        },

        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'price',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'menuOne',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default Menu1Block
