import type { Block } from 'payload'

const MultiLocationBlock: Block = {
  slug: 'multipleLocations',
  labels: {
    singular: 'Multiple Locations',
    plural: 'Multiple Locations Blocks',
  },
  fields: [

    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Main Title',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Locations',
      fields: [

        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'address',
          type: 'text',
          required: true,
          label: 'Address',
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'Hours',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Use your media collection for image uploads.
          required: true,
          label: 'Image',
        },
      ],
    },
    {
      name: 'rewardsTitle',
      type: 'text',
      required: false,
      label: 'Rewards Title',
    },
    {
      name: 'rewardsDescription',
      type: 'textarea',
      required: false,
      label: 'Rewards Description',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'btn_style',
      type: 'select',
      label: 'Button Style',
      defaultValue: 'fill',
      options: [
        { label: 'Fill', value: 'fill' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'multiLocation',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default MultiLocationBlock
