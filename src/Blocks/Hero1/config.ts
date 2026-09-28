import type { Block } from 'payload'

const HeroBlock: Block = {
  slug: 'heroOne',
  labels: {
    singular: 'HeroOne',
    plural: 'Hero Blocks',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
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
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'hero1',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default HeroBlock
