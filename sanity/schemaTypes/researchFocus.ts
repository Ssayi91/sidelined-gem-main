// Research Focus schema for Sanity CMS
import {defineField, defineType} from 'sanity'

export const researchFocus = defineType({
  name: 'researchFocus',
  title: 'Research Themes',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Research Themes & Focus Areas',
    }),
    defineField({
      name: 'introText',
      title: 'Introductory Paragraph',
      type: 'array',
      of: [{type: 'block'}], // Portable Text
      description: 'The main overview of the research focus.',
    }),
    defineField({
      name: 'topicGrid',
      title: 'Key Topics (Grid Items)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'topic', title: 'Topic Name', type: 'string' }),
            defineField({ name: 'description', title: 'Short Description', type: 'string' }),
          ],
          preview: { select: { title: 'topic' } },
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
    select: { title: 'heading', published: 'published' },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.published ? '🟢 Live' : '⚪ Draft',
      }
    },
  },
})