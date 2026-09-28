// import type { Block } from 'payload'

// const FoodCourtBlock: Block = {
//   slug: 'foodcourt',
//   labels: {
//     singular: 'FoodCourt',
//     plural: 'FoodCourt Blocks',
//   },
//   fields: [
//     {
//       name: 'theme',
//       type: 'select',
//       required: true,
//       label: 'FoodCourt Theme',
//       options: [
//         { label: 'Black Theme', value: 'black-theme' },
//         { label: 'White Theme', value: 'white-theme' },
//         { label: 'Orange Theme', value: 'orange-theme' },
//         { label: 'Green Theme', value: 'green-theme' },
//       ],
//       defaultValue: 'orange-theme',
//     },
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//       label: 'Restaurant Title',
//     },
//     {
//       name: 'restaurants',
//       type: 'array',
//       label: 'Restaurants',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Restaurant Name',
//         },
//         {
//           name: 'category',
//           type: 'text',
//           required: true,
//           label: 'Category',
//         },
//         {
//           name: 'cuisine',
//           type: 'text',
//           label: 'Cuisine',
//         },
//         {
//           name: 'description',
//           type: 'text',
//           label: 'Description',
//         },
//         {
//           name: 'image',
//           type: 'upload',
//           relationTo: 'media',
//           required: false,
//           label: 'Restaurant Image',
//         },
//         {
//           name: 'buttonText',
//           type: 'text',
//           required: true,
//           label: 'Button Text',
//         },
//         {
//           name: 'buttonLink',
//           type: 'text',
//           required: true,
//           label: 'Button Link',
//         },
//       ],
//     },
//   ],
// }

// export default FoodCourtBlock
import type { Block } from 'payload'

const MenuDisplayBlock: Block = {
  slug: 'menudisplay',
  labels: {
    singular: 'MenuDisplay',
    plural: 'MenuDisplay Blocks',
  },
  fields: [
    {
      name: 'menu',
      type: 'array',
      label: 'menu',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'title',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Restaurant Image',
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
          label: 'Button Link',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'menuDisplay',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default MenuDisplayBlock
