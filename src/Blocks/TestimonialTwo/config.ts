import type { Block } from 'payload'

const TestimonialTwoBlock: Block = {
  slug: 'testimonialtwo',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Testimonials Title',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Image',
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
          name: 'Personimage',
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
      defaultValue: 'testimonialsTwo',
    },
    {
  name: 'inlineStyle',
  type: 'text',
  label: 'Inline Styles',
},
  ],
}

export default TestimonialTwoBlock
