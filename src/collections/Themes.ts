import type { CollectionConfig } from 'payload'

export const Themes: CollectionConfig = {
  slug: 'themes',
  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'pageTheme',
      type: 'group',
      fields: [
        { name: 'textColor', type: 'text', defaultValue: '#000000' },
        { name: 'backgroundColor', type: 'text', defaultValue: '#FFFFFF' },
        { name: 'containerBackground', type: 'text', defaultValue: '#F5F5F5' },
        { name: 'headingColor', type: 'text', defaultValue: '#333333' },
        {
          name: 'googleFontUrl',
          type: 'text',
          defaultValue: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
        },
        { name: 'bodyFont', type: 'text', defaultValue: 'Roboto' },
        { name: 'headingFont', type: 'text', defaultValue: 'Roboto' },
      ],
    },

    {
      name: 'pageDarkTheme',
      type: 'group',
      fields: [
        { name: 'textColor', type: 'text', defaultValue: '#FFFFFF' },
        { name: 'backgroundColor', type: 'text', defaultValue: '#000000' },
        { name: 'containerBackground', type: 'text', defaultValue: '#333333' },
        { name: 'headingColor', type: 'text', defaultValue: '#CCCCCC' },
        {
          name: 'googleFontUrl',
          type: 'text',
          defaultValue: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
        },
        { name: 'bodyFont', type: 'text', defaultValue: 'Roboto' },
        { name: 'headingFont', type: 'text', defaultValue: 'Roboto' },
      ],
    },

    {
      name: 'navbar',
      type: 'group',
      fields: [
        { name: 'textColor', type: 'text', defaultValue: '#000000' },
        { name: 'backgroundColor', type: 'text', defaultValue: '#FFFFFF' },

        {
          name: 'dark',
          type: 'group',
          fields: [
            { name: 'textColor', type: 'text', defaultValue: '#FFFFFF' },
            { name: 'backgroundColor', type: 'text', defaultValue: '#000000' },
          ],
        },
      ],
    },

    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'textColor', type: 'text', defaultValue: '#000000' },
        { name: 'backgroundColor', type: 'text', defaultValue: '#FFFFFF' },
        {
          name: 'dark',
          type: 'group',
          fields: [
            { name: 'textColor', type: 'text', defaultValue: '#FFFFFF' },
            { name: 'backgroundColor', type: 'text', defaultValue: '#000000' },
          ],
        },
      ],
    },

    // -----------------------------
    // BUTTON / VARIANTS
    // -----------------------------
    {
      name: 'variants',
      type: 'group',
      fields: [
        {
          name: 'fill',
          type: 'group',
          fields: [
            { name: 'textColor', type: 'text', defaultValue: '#FFFFFF' },
            { name: 'backgroundColor', type: 'text', defaultValue: '#000000' },
          ],
        },
        {
          name: 'outline',
          type: 'group',
          fields: [
            { name: 'textColor', type: 'text', defaultValue: '#000000' },
            { name: 'borderColor', type: 'text', defaultValue: '#000000' },
            { name: 'backgroundColor', type: 'text', defaultValue: 'transparent' }, // optional (transparent)
          ],
        },
      ],
    },

    {
      name: 'customThemes',
      type: 'array',
      fields: [
        { name: 'className', type: 'text', required: true },
        { name: 'textColor', type: 'text' },
        { name: 'backgroundColor', type: 'text' },
        { name: 'descriptionColor', type: 'text' },
        {
          name: 'mode',
          type: 'select',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      ],
    },
  ],
}
