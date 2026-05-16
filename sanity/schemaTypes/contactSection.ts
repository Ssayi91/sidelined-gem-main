import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Let\'s Connect',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Invitation Text',
      type: 'array',
      of: [{type: 'block'}], // Portable Text
      description: 'The main message inviting collaboration.',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string' }),
            defineField({ name: 'url', title: 'Profile URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'e.g., "twitter", "linkedin"' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Primary Call-to-Action',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Button Text', type: 'string' }),
        defineField({ name: 'url', title: 'Link URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'heading', published: 'published' },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.published ? '🟢 Live' : '⚪ Draft',
      }
    },
  },
})