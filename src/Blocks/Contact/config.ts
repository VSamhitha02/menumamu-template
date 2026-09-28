import type { Block } from 'payload'

const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Contact',
    plural: 'Contact Blocks',
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
      required: true,
      label: 'Contact Description',
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
      required: true,
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
      defaultValue: 'contact',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default ContactBlock
