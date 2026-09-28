import type { Block } from 'payload'

const AboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'About',
    plural: 'About Sections',
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
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // ensure you have a "media" collection set up
      required: false,
      label: 'Image',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'about',
    },
    
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default AboutBlock
