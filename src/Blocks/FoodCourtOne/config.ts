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

const FoodCourtOneBlock: Block = {
  slug: 'foodcourtone',
  labels: {
    singular: 'FoodCourtone',
    plural: 'FoodCourt Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'FoodCourt Title',
    },

    {
      name: 'restaurants',
      type: 'array',
      label: 'Restaurants',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Restaurant Name',
        },
        {
          name: 'cuisine',
          type: 'text',
          label: 'Cuisine',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Restaurant Image',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
          label: 'Button Link',
        },
        {
          name: 'variant',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'fill',
          options: [
            { label: 'Fill', value: 'fill' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'FoodCourtOne',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default FoodCourtOneBlock
