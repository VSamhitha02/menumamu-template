import type { Block } from 'payload'

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials Blocks',
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
      label: 'Testimonials Title',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'designation',
          type: 'text',
          label: 'Designation',
        },
        {
          name: 'testimonialText',
          type: 'text',
          label: 'Testimonial Text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Person Image',
        },
      ],
    },
    {
      name: 'className',
      type: 'text',
      label: 'Custom Class Name',
      defaultValue: 'testimonialsOne',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default TestimonialsBlock
