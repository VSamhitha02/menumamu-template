import type { Block } from 'payload'

const VideoTwoBlock: Block = {
  slug: 'videotwo',
  labels: {
    singular: 'Videotwo',
    plural: 'Videostwo Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: ' Title',
    },
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      required: true,
      fields: [
        {
          name: 'videoId',
          type: 'text',
          required: true,
          label: 'YouTube Video Link',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'videoTwoBlock',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default VideoTwoBlock
