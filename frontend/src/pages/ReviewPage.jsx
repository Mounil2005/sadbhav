import { useState } from 'react'
import { submitReview } from '../lib/sanityWrite'
import { SITE } from '../data/site'
import { useSEO } from '../hooks/useSEO'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-transform hover:scale-110 focus:outline-none"
        >
          <span className={(hovered || value) >= star ? 'text-amber-400' : 'text-warm-200'}>
            ★
          </span>
        </button>
      ))}
    </div>
  )
}

const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' }

export default function ReviewPage() {
  useSEO({
    title: 'Share Your Review',
    description: 'Had a great experience at Sadbhav Hospital? Share your feedback and help other patients find trusted care in Jamnagar.',
  })

  const [form, setForm] = useState({ name: '', rating: 0, reviewText: '', condition: '' })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.rating || !form.reviewText.trim()) return
    setStatus('submitting')
    try {
      await submitReview(form)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-warm-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <span className="text-3xl">🙏</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-navy-800 mb-2">Thank You!</h2>
        <p className="text-warm-500 text-sm max-w-xs mb-6">
          Your review has been submitted. It will appear on our website once approved.
        </p>
        <a href="/" className="text-sm font-sans font-medium text-medical-600 hover:underline">
          Back to {SITE.name}
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-warm-100 px-5 py-4 flex items-center gap-3">
        <img src="/sadbhav_transparent.png" alt={SITE.name} className="h-8 w-auto object-contain" />
        <div>
          <div className="font-display font-semibold text-sm text-navy-800">{SITE.name}</div>
          <div className="text-[11px] text-warm-400 font-sans">Dr. V. K. Nanda · Jamnagar</div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-5 py-8 max-w-md mx-auto w-full">
        <h1 className="font-display font-bold text-2xl text-navy-800 mb-1">Share Your Experience</h1>
        <p className="text-warm-500 text-sm mb-8">Your feedback helps other patients and motivates our team.</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Rating */}
          <div>
            <label className="block text-sm font-sans font-semibold text-navy-700 mb-2">
              How was your experience? <span className="text-crimson-500">*</span>
            </label>
            <StarPicker value={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} />
            {form.rating > 0 && (
              <p className="text-xs text-warm-400 mt-1 font-sans">{ratingLabels[form.rating]}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
              Your Name <span className="text-crimson-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ramesh Patel"
              required
              className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-white text-sm text-navy-700 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-medical-300 focus:border-medical-400 transition"
            />
          </div>

          {/* Review */}
          <div>
            <label htmlFor="reviewText" className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
              Your Review <span className="text-crimson-500">*</span>
            </label>
            <textarea
              id="reviewText"
              name="reviewText"
              value={form.reviewText}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Tell us about your visit, the care you received, and how you're feeling now..."
              className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-white text-sm text-navy-700 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-medical-300 focus:border-medical-400 transition resize-none"
            />
          </div>

          {/* Condition (optional) */}
          <div>
            <label htmlFor="condition" className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
              Treated For <span className="text-warm-400 font-normal">(optional)</span>
            </label>
            <input
              id="condition"
              name="condition"
              type="text"
              value={form.condition}
              onChange={handleChange}
              placeholder="e.g. Asthma, COPD, Lung Infection"
              className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-white text-sm text-navy-700 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-medical-300 focus:border-medical-400 transition"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-crimson-600 bg-crimson-50 rounded-xl px-4 py-3">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={!form.name || !form.rating || !form.reviewText || status === 'submitting'}
            className="w-full btn-primary py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
          </button>

          <p className="text-center text-[11px] text-warm-400 font-sans">
            Your review will appear on our website shortly.
          </p>
        </form>
      </div>
    </div>
  )
}
