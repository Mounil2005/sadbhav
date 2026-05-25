import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Patient Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Patient Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Treated For (optional)',
      type: 'string',
      description: 'e.g. Asthma, COPD, Lung Infection',
    }),
    defineField({
      name: 'approved',
      title: 'Visible on Website',
      type: 'boolean',
      description: 'Turn off to hide this review from the website without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      title: 'Patient Photo / Image',
      type: 'image',
      description: 'Optional image submitted by the patient with their review.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'verified',
      title: 'Verified Patient',
      type: 'boolean',
      description: 'Mark this after confirming the patient actually visited the clinic. Shows a green Verified badge on the website.',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      rating: 'rating',
      approved: 'approved',
      submittedAt: 'submittedAt',
    },
    prepare({title, rating, approved, submittedAt}) {
      const stars = '★'.repeat(rating ?? 0)
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString('en-IN') : ''
      const status = approved ? '✅ Visible' : '🚫 Hidden'
      return {
        title,
        subtitle: `${stars} · ${status} · ${date}`,
      }
    },
  },
})
