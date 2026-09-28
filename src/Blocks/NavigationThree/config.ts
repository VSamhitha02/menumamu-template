// src/blocks/NavigationBlock.ts
import type { Block } from 'payload'

const NavigationThreeBlock: Block = {
  slug: 'navigationThree',
  labels: {
    singular: 'Navigation Three',
    plural: 'Navigation Three Blocks',
  },
  fields: [
    // Theme selector for the navigation block
    // {
    //   name: 'theme',
    //   type: 'select',
    //   required: true,
    //   label: 'Navigation Theme',
    //   options: [
    //     { label: 'Black Theme', value: 'black-theme' },
    //     { label: 'White Theme', value: 'white-theme' },
    //     { label: 'Orange Theme', value: 'orange-theme' },
    //     { label: 'Green Theme', value: 'green-theme' },
    //   ],
    //   defaultValue: 'orange-theme',
    // },
    {
      name: 'colorScheme',
      type: 'number',
      label: 'Color Index (1 = first color)',
      defaultValue: 1,
      min: 1,
    },
    {
      name: 'mode',
      type: 'select',
      options: [
        { label: 'Inherit (Page)', value: 'inherit' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      defaultValue: 'inherit',
    },
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Adjust if your media collection has a different slug
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
    // Array of navigation links
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
    // Array of buttons (e.g., call-to-action buttons)
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
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'navigationThree',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default NavigationThreeBlock
