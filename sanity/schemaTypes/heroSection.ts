import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Main Content',
      type: 'array',
      of: [{type: 'block'}], // Portable Text for rich formatting
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'referenceLinks',
      title: 'Reference Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
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
    select: {
      title: 'title',
      published: 'published',
    },
    prepare(selection) {
      const status = selection.published ? '🟢 Live' : '⚪ Draft'
      return {
        title: selection.title,
        subtitle: status,
      }
    },
  },
})