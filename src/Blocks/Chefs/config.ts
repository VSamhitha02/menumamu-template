import type { Block } from 'payload'

const ChefDetailsBlock: Block = {
  slug: 'chef_details',
  labels: {
    singular: 'ChefDetail',
    plural: 'ChefDetailsBlocks',
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
      defaultValue: 'Chefs',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ChefDetailsBlock
