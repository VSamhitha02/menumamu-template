import type { Block } from 'payload'

const ContactUsBlock: Block = {
  slug: 'contact_us',
  labels: {
    singular: 'ContactUs',
    plural: 'ContactUs Blocks',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      label: 'ID',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Contact Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Description',
      admin: {
        placeholder: 'Write a short description to show above the address...',
      },
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      label: 'Address',
    },
    {
      name: 'openHours',
      type: 'array',
      label: 'Open Hours',
      fields: [
        {
          name: 'day',
          type: 'text',
          //   required: true,
          label: 'Day',
        },
        {
          name: 'hours',
          type: 'text',
          //   required: true,
          label: 'Operating Hours',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // ensure you have a "media" collection set up
      required: false,
      label: 'Image',
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'contactUs',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ContactUsBlock
