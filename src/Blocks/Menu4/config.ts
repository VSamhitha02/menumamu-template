import type { Block } from 'payload'

const MenuFourBlock: Block = {
  slug: 'menufour',
  labels: {
    singular: 'Menu Four',
    plural: 'Menu Four Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'How would you like to experience Taaza Kitchen?',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Card Description',
        },
        {
          name: 'iconName',
          type: 'select',
          label: 'Card Icon',
          defaultValue: 'kitchen',
          options: [
            { label: 'Kitchen / Utensils', value: 'kitchen' },
            { label: 'Pantry / Store', value: 'pantry' },
            { label: 'Location / Pin', value: 'location' },
            { label: 'Groups / People', value: 'groups' },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Label',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button URL',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color (Hex Code)',
          admin: {
            placeholder: '#8B2626',
            description: 'Provide a hex code (e.g. #8B2626, #F3EFE6, #2A5D34, #231F1D)',
          },
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'menu4',
    },
    {
      name: 'inlineStyle',
      type: 'text',
      label: 'Inline Styles',
    },
  ],
}

export default MenuFourBlock