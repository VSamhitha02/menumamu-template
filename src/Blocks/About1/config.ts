import type { Block } from 'payload'

const About1Block: Block = {
  slug: 'about1',
  labels: {
    singular: 'About1',
    plural: 'About1 Sections',
  },
fields: [
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
      relationTo: 'media',
      required: false,
      label: 'Image',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'about1',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default About1Block
