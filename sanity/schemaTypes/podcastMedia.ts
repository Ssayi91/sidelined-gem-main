import {defineField, defineType} from 'sanity'

export const podcastMedia = defineType({
  name: 'podcastMedia',
  title: 'Podcast & Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Podcast', value: 'podcast'},
          {title: 'Interview', value: 'interview'},
          {title: 'Awareness Video', value: 'video'},
          {title: 'Educational Content', value: 'educational'},
          {title: 'Multimedia Story', value: 'multimedia'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'podcast',
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: ['YouTube', 'Spotify', 'SoundCloud', 'Apple Podcasts', 'Google Podcasts', 'Vimeo', 'Other'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL / Embed Link',
      type: 'url',
      description: 'Paste the YouTube, Spotify, or other platform link here',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
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
      mediaType: 'mediaType',
      platform: 'platform',
      published: 'published',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.mediaType} • ${selection.platform || 'Unknown'} • ${selection.published ? '🟢 Live' : '⚪ Draft'}`,
      }
    },
  },
})