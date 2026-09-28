import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
        {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'mediaBlock',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}
