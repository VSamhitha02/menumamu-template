import type { Block } from 'payload'

const VideoBlock: Block = {
  slug: 'video',
  labels: {
    singular: 'Video',
    plural: 'Videos Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video Title',
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'upload video',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'videoBlock',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default VideoBlock
