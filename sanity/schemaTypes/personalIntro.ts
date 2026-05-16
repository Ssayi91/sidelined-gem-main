import {defineField, defineType} from 'sanity'

export const personalIntro = defineType({
  name: 'personalIntro',
  title: 'Personal Introduction',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(80),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading (Optional)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Biography Content',
      type: 'array',
      of: [{type: 'block'}], // Portable Text for rich formatting
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows Dziri to crop/focus in Sanity
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption (Optional)',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'researchLink',
      title: 'Featured Research Link',
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
      title: 'heading',
      media: 'portraitImage',
      published: 'published',
    },
    prepare(selection) {
      const status = selection.published ? '🟢 Live' : '⚪ Draft'
      return {
        title: selection.title,
        subtitle: status,
        media: selection.media,
      }
    },
  },
})