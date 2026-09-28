import type { Block } from 'payload'

const GalleryOneBlock: Block = {
  slug: 'galleryone',
  labels: {
    singular: 'GalleryOne',
    plural: 'GalleryOne Blocks',
  },
  fields: [
    {
      name: 'layoutType',
      type: 'select',
      label: 'Layout Type',
      required: true,
      options: [
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
      ],
      defaultValue: 'masonry',
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
      defaultValue: 'gallary1',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default GalleryOneBlock
