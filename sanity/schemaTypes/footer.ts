import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Global Footer',
  type: 'document',
  fields: [
    // Brand
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'The Sidelined Gem',
    }),
    defineField({
      name: 'tagline',
      title: 'Footer Tagline',
      type: 'string',
      initialValue: 'Stories between worlds.',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      initialValue: `© ${new Date().getFullYear()} The Sidelined Gem. All rights reserved.`,
    }),

    // Contact
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Nairobi, Kenya',
    }),

    // Support (Text-only, no integration)
    defineField({
      name: 'supportSection',
      title: 'Support This Work',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Support This Work',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Your views and contributions help sustain this platform. No integration—just direct support.',
        }),
        defineField({
          name: 'paybillNumber',
          title: 'M-Pesa Paybill Number',
          type: 'string',
          description: 'Display only. No API integration.',
        }),
        defineField({
          name: 'accountNumber',
          title: 'Account Number (for Paybill)',
          type: 'string',
        }),
        defineField({
          name: 'bankAccount',
          title: 'Bank Account Details (Optional)',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'note',
          title: 'Support Note',
          type: 'string',
          initialValue: 'Funds support research, accessibility features, and platform maintenance.',
        }),
      ],
    }),

    // Newsletter
    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Join the Conversation' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Receive reflections, research updates, and advocacy news.' }),
        defineField({ name: 'providerUrl', title: 'Signup Service URL', type: 'url', description: 'e.g., ConvertKit, Beehiiv, Mailchimp' }),
      ],
    }),

    // Quick Links
    defineField({
      name: 'quickLinks',
      title: 'Quick Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'string' }),
            defineField({ name: 'isExternal', title: 'External Link?', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),

    // African Scholarship + Series Links
    defineField({
      name: 'featuredLinks',
      title: 'Featured Content Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string', initialValue: 'African Scholarship' }),
            defineField({ name: 'url', title: 'URL', type: 'string', initialValue: '/research/african-scholarship' }),
            defineField({ name: 'description', title: 'Short Description', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        },
      ],
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['LinkedIn', 'Twitter/X', 'Instagram', 'Facebook', 'YouTube', 'TikTok'] } }),
            defineField({ name: 'url', title: 'Profile URL', type: 'url' }),
            defineField({ name: 'handle', title: 'Handle/Username', type: 'string' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'handle' } },
        },
      ],
    }),

    // Site Credits (Your attribution)
defineField({
  name: 'siteCredits',
  title: 'Site Credits',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Credit Label',
      type: 'string',
      initialValue: 'Made by',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Sonny Sayi Solutions',
    }),
    defineField({
      name: 'companyUrl',
      title: 'Company Website URL',
      type: 'url',
      initialValue: 'https://sonnysayisolutions.co.ke',
    }),
    defineField({
      name: 'displayText',
      title: 'Display Text (Optional)',
      type: 'string',
      description: 'Custom text to show instead of default format',
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
    select: { title: 'siteName', published: 'published' },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.published ? '🟢 Live' : '⚪ Draft',
      }
    },
  }
  
})
