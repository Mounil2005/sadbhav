import {defineField, defineType} from 'sanity'

export const healthUpdate = defineType({
  name: 'healthUpdate',
  title: 'Health Update',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO (Optional)'},
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      group: 'content',
      description: 'Reel / Short: content will display in portrait (9:16) mode on the website. All other types display in landscape.',
      hidden: ({document}) => document?.contentType === 'reel',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Image Post', value: 'image'},
          {title: 'Video (in article)', value: 'video'},
          {title: 'Reel / Short (portrait 9:16)', value: 'reel'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Pulmonary Health', value: 'pulmonary-health'},
          {title: 'Asthma & COPD', value: 'asthma-copd'},
          {title: 'Critical Care', value: 'critical-care'},
          {title: 'Respiratory Tips', value: 'respiratory-tips'},
          {title: 'Patient Awareness', value: 'patient-awareness'},
          {title: 'Sleep & Breathing', value: 'sleep-breathing'},
          {title: 'General Health', value: 'general-health'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Gujarati', value: 'gu'},
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Shown as a preview card on the website. Keep under 160 characters.',
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      group: 'content',
      description: 'Optional. Add text, headings, or inline images below the main media.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),

    // ── Media ────────────────────────────────────────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Upload your photo here. For articles and videos, used as thumbnail.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Upload Video File',
      type: 'file',
      group: 'media',
      description: 'Upload a video directly (MP4 recommended). Best for short clips.',
      options: {accept: 'video/*'},
      hidden: ({document}) => document?.contentType !== 'video' && document?.contentType !== 'reel',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Or paste a Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or Instagram link. Use this for long videos instead of uploading.',
      hidden: ({document}) => document?.contentType !== 'video' && document?.contentType !== 'reel',
    }),

    // ── Publishing ───────────────────────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      hidden: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      group: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author',
      type: 'string',
      group: 'publishing',
      initialValue: 'Dr. Vivek Nanda',
    }),

    // ── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Leave blank to use the main title.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: 'Keep under 160 characters for best results.',
      validation: (r) => r.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, contentType, media, publishedAt}) {
      const typeLabel: Record<string, string> = {
        article: 'Article',
        video: 'Video',
        image: 'Image',
        reel: 'Reel',
      }
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-IN') : ''
      return {
        title,
        subtitle: `${typeLabel[contentType] ?? contentType} · ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'publishedAt', direction: 'desc'},
      ],
    },
  ],
})
