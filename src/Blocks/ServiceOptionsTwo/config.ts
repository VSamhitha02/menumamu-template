import { Block } from 'payload'

const ServiceOptionsTwoBlock: Block = {
  slug: 'serviceOptionsTwo',
  labels: {
    singular: 'Service Option Two',
    plural: 'Service Options Two',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading Text',
      defaultValue: 'Choose Your Service',
    },

    {
      name: 'options',
      type: 'array',
      label: 'Service Options',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Option Name',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Option Icon',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link URL',
        },

        {
          name: 'badge',
          type: 'text',
          label: 'Badge Text',
          admin: {
            placeholder: 'e.g. 30 Mins or Gold Deals',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle/ Rating Detail',
          admin: {
            placeholder: 'e.g. Rating: 4.5 . ₹100 oFF coupon',
          },
        },
        {
          name: 'actionText',
          type: 'text',
          label: 'Action Link Label',
          admin: {
            placeholder: 'e.g. Order on Swiggy',
          },
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'serviceOptionsTwo',
    },
    
{
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ServiceOptionsTwoBlock
