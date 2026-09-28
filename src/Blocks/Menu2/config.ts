import type { Block } from 'payload'

const MenuTwoBlock: Block = {
  slug: 'menutwo',
  labels: {
    singular: 'Menu2',
    plural: 'Menu2 Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'MenuTwo Title',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      fields: [
        {
          name: 'categoryName',
          type: 'text',
          required: true,
          label: 'Category Name',
        },
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
      defaultValue: 'menu2',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default MenuTwoBlock
