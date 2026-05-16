import {defineField, defineType} from 'sanity'

export const featuredPublication = defineType({
  name: 'featuredPublication',
  title: 'Featured Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Publication Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (Optional)',
      type: 'array',
      of: [{type: 'block'}], // Portable Text
    }),
    defineField({
      name: 'publicationType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Research Paper', value: 'research'},
          {title: 'Concept Note', value: 'concept'},
          {title: 'Report', value: 'report'},
          {title: 'Policy Brief', value: 'policy'},
        ],
        layout: 'radio',
      },
      initialValue: 'research',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover/Thumbnail',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt Text', type: 'string'},
        {name: 'caption', title: 'Caption', type: 'string'},
      ],
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download/PDF Link',
      type: 'url',
      description: 'Link to PDF, DOI, or external publication',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
    }),
    defineField({
      name: 'tags',
      title: 'Tags/Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: false,
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
      media: 'coverImage',
      type: 'publicationType',
      featured: 'featured',
      published: 'published',
    },
    prepare(selection) {
      const badge = selection.featured ? '⭐ Featured' : ''
      const status = selection.published ? '🟢 Live' : '⚪ Draft'
      return {
        title: selection.title,
        subtitle: `${selection.type} • ${badge} ${status}`.trim(),
        media: selection.media,
      }
    },
  },
})