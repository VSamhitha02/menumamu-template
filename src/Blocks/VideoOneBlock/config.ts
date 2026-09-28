import type { Block } from 'payload'

const VideoOneBlock: Block = {
  slug: 'videoone',
  labels: {
    singular: 'VideoOne',
    plural: 'VideosOne Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video Title',
    },
    {
      name: 'videoId',
      type: 'text',
      required: true,
      label: 'give youtube video link',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'videoOneBlock',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default VideoOneBlock
