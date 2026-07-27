import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Patient Review',
  type: 'document',
  groups: [
    {name: 'content', title: 'Review Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'moderation', title: 'Moderation'},
  ],
  fields: [
    defineField({
      name: 'reviewType',
      title: 'Review Type',
      type: 'string',
      group: 'content',
      description: 'Text reviews appear in the scrolling review strip. Video testimonials appear in the "Patient Stories" video section above.',
      options: {
        list: [
          {title: 'Text Review', value: 'text'},
          {title: 'Video Testimonial', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Treated For (optional)',
      type: 'string',
      group: 'content',
      description: 'e.g. Asthma, COPD, Lung Infection',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      group: 'content',
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      group: 'content',
      rows: 4,
      description: 'Required for text reviews. Optional for video testimonials (can be a short caption).',
      hidden: ({document}) => document?.reviewType === 'video',
      validation: (r) =>
        r.custom((value, ctx) => {
          if ((ctx.document as any)?.reviewType !== 'video' && !value?.trim()) {
            return 'Review text is required for text reviews.'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Video Caption (optional)',
      type: 'string',
      group: 'content',
      description: 'A short one-line summary shown on the video card, e.g. "Recovered from severe COPD".',
      hidden: ({document}) => document?.reviewType !== 'video',
    }),

    // ── Media ────────────────────────────────────────────────────────────────
    defineField({
      name: 'videoFile',
      title: 'Upload Video File',
      type: 'file',
      group: 'media',
      description: 'Upload the patient testimonial video (MP4 recommended, max 100 MB).',
      options: {accept: 'video/*'},
      hidden: ({document}) => document?.reviewType !== 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Or paste a Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or direct MP4 link — alternative to uploading a file.',
      hidden: ({document}) => document?.reviewType !== 'video',
    }),
    defineField({
      name: 'image',
      title: 'Photo / Thumbnail',
      type: 'image',
      group: 'media',
      description: 'For text reviews: optional patient photo. For video testimonials: cover thumbnail shown before the video plays.',
      options: {hotspot: true},
    }),

    // ── Moderation ───────────────────────────────────────────────────────────
    defineField({
      name: 'approved',
      title: 'Visible on Website',
      type: 'boolean',
      group: 'moderation',
      description: 'Turn off to hide this review from the website without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Patient',
      type: 'boolean',
      group: 'moderation',
      description: 'Mark after confirming the patient actually visited. Shows a green Verified badge.',
      initialValue: false,
    }),
    defineField({
      name: 'reply',
      title: 'Hospital Reply',
      type: 'text',
      group: 'moderation',
      rows: 3,
      description: 'Your response — appears under the text review on the website.',
      hidden: ({document}) => document?.reviewType === 'video',
    }),
    defineField({
      name: 'repliedAt',
      title: 'Replied At',
      type: 'datetime',
      group: 'moderation',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      group: 'moderation',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Video Testimonials First',
      name: 'videoFirst',
      by: [
        {field: 'reviewType', direction: 'desc'},
        {field: 'submittedAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      reviewType: 'reviewType',
      rating: 'rating',
      approved: 'approved',
      submittedAt: 'submittedAt',
      media: 'image',
    },
    prepare({reviewType, rating, approved, submittedAt, media}) {
      const stars = '★'.repeat(rating ?? 0)
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('en-IN') : ''
      const status = approved ? '✅ Visible' : '🚫 Hidden'
      const type = reviewType === 'video' ? '🎥 Video' : '💬 Text'
      return {
        title: `${type} Review`,
        subtitle: `${stars} · ${status} · ${date}`,
        media,
      }
    },
  },
})
