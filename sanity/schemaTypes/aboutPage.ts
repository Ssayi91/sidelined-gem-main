import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Dziri',
    }),
    // Hero collage images
    defineField({
      name: 'heroCollage',
      title: 'Hero Collage Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        },
      ],
      description: '3-4 images for the lurking collage effect',
    }),
    // AP-10001: Professional Biography
    defineField({
      name: 'professionalBio',
      title: 'Professional Biography',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Professional Journey' }),
        defineField({ name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}] }),
        defineField({
          name: 'sideImage',
          title: 'Side Image (Lurking)',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        }),
      ],
    }),
    // AP-10002: Academic Background
    defineField({
      name: 'academicBackground',
      title: 'Academic Background',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Academic Path' }),
        defineField({ name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}] }),
        defineField({
          name: 'sideImage',
          title: 'Side Image (Lurking)',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        }),
      ],
    }),
    // AP-10003: Advocacy Work
    defineField({
      name: 'advocacyWork',
      title: 'Advocacy & Accessibility Work',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Advocacy in Action' }),
        defineField({ name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}] }),
        defineField({
          name: 'sideImage',
          title: 'Side Image (Lurking)',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        }),
      ],
    }),
    // AP-10004: Areas of Focus
    defineField({
      name: 'focusAreas',
      title: 'Areas of Focus',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Core Focus Areas' }),
        defineField({ 
          name: 'topics', 
          title: 'Focus Topics', 
          type: 'array',
          of: [{ type: 'object', fields: [
            defineField({ name: 'topic', title: 'Topic Name', type: 'string' }),
            defineField({ name: 'description', title: 'Brief Description', type: 'string' }),
          ]}],
        }),
      ],
    }),
    // AP-10005: Personal Mission
    defineField({
      name: 'personalMission',
      title: 'Personal Motivation & Mission',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'My Mission' }),
        defineField({ name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}] }),
        defineField({ name: 'quote', title: 'Key Quote (Optional)', type: 'string' }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Collage Image',
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
        }),
      ],
    }),
    // AP-10006: Future Vision
    defineField({
      name: 'futureVision',
      title: 'Future Vision & Goals',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Looking Forward' }),
        defineField({ name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}] }),
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
    select: { title: 'pageTitle', published: 'published' },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.published ? '🟢 Live' : '⚪ Draft',
      }
    },
  },
})