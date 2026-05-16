import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Snippet/Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Full Content',
      type: 'array',
      of: [{type: 'block'}], // Portable Text for full articles
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Articles', value: 'articles'},
          {title: 'Reflections', value: 'reflections'},
          {title: 'Awareness', value: 'awareness'},
          {title: 'Opinion', value: 'opinion'},
          {title: 'Public Engagement', value: 'engagement'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
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
      category: 'category',
      media: 'featuredImage',
      published: 'published',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.category || 'Uncategorized'} • ${selection.published ? '🟢 Live' : '⚪ Draft'}`,
        media: selection.media,
      }
    },
  },
})