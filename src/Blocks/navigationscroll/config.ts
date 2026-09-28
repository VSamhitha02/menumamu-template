import { Block } from 'payload'

const NavigationDropDownBlock: Block = {
  slug: 'navigationDropDown',
  labels: {
    singular: 'NavigationDropDown',
    plural: 'NavigationDropDown Blocks',
  },
  fields: [
    {
      name: 'theme',
      type: 'select',
      required: true,
      label: 'Navigation Theme',
      options: [
        { label: 'Black Theme', value: 'black-theme' },
        { label: 'White Theme', value: 'white-theme' },
        { label: 'Orange Theme', value: 'orange-theme' },
        { label: 'Green Theme', value: 'green-theme' },
      ],
      defaultValue: 'orange-theme',
    },
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Alternative Text',
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Link Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Navigation Buttons',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Button URL',
        },
        {
          name: 'style',
          type: 'select',
          required: true,
          label: 'Button Style',
          options: [
            { label: 'fill', value: 'fill' },
            { label: 'outline', value: 'outline' },
          ],
        },
      ],
    },
    {
      name: 'menu',
      type: 'array',
      label: 'Menu',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Menu Item Text',
        },
        {
          name: 'url',
          type: 'text',
          required: false,
          label: 'Menu Item URL',
        },
        {
          name: 'submenu',
          type: 'array',
          label: 'Submenu Links',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Submenu Link Text',
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Submenu Link URL',
            },
          ],
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'navigationScroll',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default NavigationDropDownBlock
