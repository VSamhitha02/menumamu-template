import { Block } from 'payload'

export const Instagram: Block = {
  slug: 'instagram',

  labels: {
    singular: 'Social Video',
    plural: 'Social Videos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
     // REPEATER FOR MULTIPLE VIDEOS
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      minRows: 1,

      fields: [
        {
          name: 'platform',
          type: 'select',
          required: false,
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'YouTube',
              value: 'youtube',
            },
          ],
        },

        {
          name: 'videoUrl',
          type: 'text',
          required: false,
          label: 'Video URL',
        },

    {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Custom Thumbnail',
        },    
                // REEL TITLE
        {
          name: 'reelTitle',
          type: 'text',
          required: false,
          label: 'Reel Title',
        },

        // VIEWS
        {
          name: 'views',
          type: 'text',
          required: false,
          label: 'Views',
        },

      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'instagram',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}