import { Block } from 'payload'

const MenuCategories: Block = {
  slug: 'menu-categories',
  labels: {
    singular: 'Menu Category',
    plural: 'Menu Categories',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading Text',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description Text',
    },

    {
      name: 'menuCategories',
      type: 'array',
      label: 'Menu Category',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: ' Name',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: ' Image',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'menuCategories',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default MenuCategories
