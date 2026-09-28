import type { Block } from 'payload'

const ContactOneBlock: Block = {
  slug: 'contactus',
  labels: {
    singular: 'ContactOne',
    plural: 'ContactOne Blocks',
  },
  fields: [
    { name: 'id', type: 'text', required: true, label: 'ID' },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Contact Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
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
      relationTo: 'media',
      required: false,
      label: 'Image',
    },
    {
      name: 'fields',
      type: 'array',
      label: 'Form Fields',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Field Label',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Field Name',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Field Type',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Phone Number', value: 'phone' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'CTA Button Text',
    },

    {
      name: 'btn_variant',
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
      defaultValue: 'contactOne',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ContactOneBlock
