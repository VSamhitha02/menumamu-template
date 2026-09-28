import type { Block } from 'payload'

const Hero2Block: Block = {
  slug: 'heroTwo',
  labels: {
    singular: 'Hero2',
    plural: 'Hero2 Blocks',
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
      label: 'Hero Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'Hero Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Hero Description',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
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
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'hero2',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default Hero2Block
