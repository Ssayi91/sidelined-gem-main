import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author(s) / Organization',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Publication Year',
      type: 'number',
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Research Paper', value: 'research'},
          {title: 'Concept Note', value: 'concept'},
          {title: 'Report', value: 'report'},
          {title: 'Policy Brief', value: 'policy'},
          {title: 'Article / Essay', value: 'article'},
          {title: 'Video / Podcast', value: 'media'},
          {title: 'External Link', value: 'link'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'link',
    }),
    defineField({
      name: 'description',
      title: 'Description / Abstract',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', type: 'type', author: 'author', published: 'published' },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.type} • ${selection.author || 'Unknown'} • ${selection.published ? '🟢 Live' : '⚪ Draft'}`,
      }
    },
  },
})