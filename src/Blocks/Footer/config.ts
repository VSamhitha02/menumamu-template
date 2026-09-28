import type { Block } from 'payload'

const FooterBlock: Block = {
  slug: 'footer',
  labels: {
    singular: 'Footer',
    plural: 'Footer Blocks',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      label: 'ID',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // uses your media collection for logo uploads
      required: false,
      label: 'Logo',
    },

    {
  name: 'socialLinks',
  type: 'array',
  label: 'Social Media Links',
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: false,
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'YouTube', value: 'youtube' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: false,
      label: 'Profile URL',
    },
  ],
},
    {
      name: 'links',
      type: 'array',
      label: 'Footer Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
          label: 'Link Label',
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      required: false,
      label: 'Copyright Text',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default FooterBlock
