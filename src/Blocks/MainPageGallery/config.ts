import type { Block } from 'payload'

export const MainPageBlock: Block = {
  slug: 'MainPage',
  labels: {
    singular: 'Main Page Block',
    plural: 'Main Page Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'pages',
      type: 'array',
      label: 'Pages',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: false,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: true,
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Select Page',
              required: true,
            },
            {
              name: 'text',
              type: 'text',
              label: 'Link Text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'mainPageGallery',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}
