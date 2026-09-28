import { Block } from 'payload'

export const HeroVideo: Block = {
  slug: 'heroVideo',

  labels: {
    singular: 'Hero Video',
    plural: 'Hero Videos',
  },

  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: false,
    },

    {
      name: 'subHeading',
      type: 'text',
      label: 'Sub Heading',
    },

    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      
    },

    // VIDEO ARRAY
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      minRows: 1,
      
      fields: [
        // OPTION 1 → Upload video
        {
          name: 'uploadedVideo',
          type: 'upload',
          relationTo: 'media',
          label: 'Upload Video',
        },

        // OPTION 2 → External URL
        {
          name: 'videoUrl',
          type: 'text',
          label: 'External Video URL',
        },


    {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Custom Thumbnail',
        }  
      ],
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}