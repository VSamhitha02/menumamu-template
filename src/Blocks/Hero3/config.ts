import type { Block } from 'payload'

const Hero3Block: Block = {
  slug: 'heroThree',
  labels: {
    singular: 'Hero3',
    plural: 'Hero3 Blocks',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      label: 'ID',
    },

    {
      name: 'imageShape',
      type: 'select',
      required: true,
      label: 'Hero Image Shape',
      options: [
        { label: 'Circular Image', value: 'circular-image' },
        { label: 'Rectangle Image', value: 'rectangle-image' },
        { label: 'Custom Image', value: 'custom-image' },
      ],
      defaultValue: 'rectangle-image',
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
      defaultValue: 'hero3',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default Hero3Block
