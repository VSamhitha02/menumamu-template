import type { Block } from 'payload'

const ChefScrollDetailsBlock: Block = {
  slug: 'chef_sroll_details',
  labels: {
    singular: 'ChefScrollDetail',
    plural: 'ChefScrollDetailsBlocks',
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
      label: 'Chef Title',
    },
    {
      name: 'chefs',
      type: 'array',
      label: 'Chef List',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Chef Image',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Chef Name',
        },
        {
          name: 'expertise',
          type: 'text',
          required: true,
          label: 'Expertise',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'ChefScroll',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ChefScrollDetailsBlock
