import type { Block } from 'payload'

const VideoThreeBlock: Block = {
  slug: 'videothree',
  labels: {
    singular: 'Videothree',
    plural: 'Videosthree Blocks',
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
      label: 'Give YouTube Video Link',
    },
    {
      name: 'description',
      type: 'text',
      required: false,
      label: 'Video Description',
    },
    {
      name: 'image',
      type: 'upload',
      required: false,
      label: 'image',
      relationTo: 'media',
    },
    {
      name: 'mediaPosition',
      type: 'select',
      required: true,
      label: 'Media Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'videoThreeBlock',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default VideoThreeBlock
