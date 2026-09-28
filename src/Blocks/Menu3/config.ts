import type { Block } from 'payload'

const MenuThreeBlock: Block = {
  slug: 'menuthree',
  labels: {
    singular: 'Menu3',
    plural: 'Menu3 Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'MenuTwo Title',
    },
    {
      name: 'menu',
      type: 'array',
      label: 'menu',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'menu items',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: ' Name',
            },
            {
              name: 'description',
              type: 'text',
              label: 'description',
            },
            {
              name: 'rating',
              type: 'text',
              label: 'rating',
            },
            {
              name: 'price',
              type: 'text',
              label: 'price',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'item Image',
            },
            {
              name: 'buttonText',
              type: 'text',
              label: 'Button Text',
            },
            {
              name: 'buttonLink',
              type: 'text',
              label: 'Button Link',
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
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'menu3',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default MenuThreeBlock
