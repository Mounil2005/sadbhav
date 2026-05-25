import emailjs from '@emailjs/browser'

export async function notifyAdminOfReview({ name, rating, reviewText, condition }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) return

  await emailjs.send(
    serviceId,
    templateId,
    {
      patient_name: name,
      rating: `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)`,
      review_text: reviewText,
      condition: condition || 'Not specified',
      studio_link: 'https://sadbhavhospital.sanity.studio/structure/patientReviews',
    },
    publicKey,
  )
}
