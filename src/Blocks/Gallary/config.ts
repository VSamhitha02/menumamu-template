import type { Block } from 'payload'

const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery Blocks',
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
      label: 'Gallery Title',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        {
          name: 'altText',
          type: 'text',
          required: true,
          label: 'Alt Text',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'gallary',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default GalleryBlock
