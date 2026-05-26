import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import StarRating from '../components/ui/StarRating'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { TESTIMONIALS, TESTIMONIALS_CONTENT } from '../data/testimonials'
import { SOCIAL_PROOF_STATS, SITE } from '../data/site'
import { fetchApprovedReviews } from '../lib/queries'
import { submitReview } from '../lib/sanityWrite'
import { notifyAdminOfReview } from '../lib/emailNotify'

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-[10px] font-sans font-semibold px-2 py-1 rounded-full border border-green-100 flex-shrink-0">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="5" fill="#22c55e" />
        <path d="M2.5 5l1.8 1.8 3.2-3.2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </div>
  )
}

function ReviewItem({ name, condition, review, rating, verified, imageUrl, reply }) {
  return (
    <article className="bg-white rounded-2xl border border-warm-100 shadow-sm overflow-hidden">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img src={imageUrl} alt={`Photo from ${name}`} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        {/* Patient info — top like Google */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 font-sans font-bold text-sm flex-shrink-0">
              {name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="font-sans font-semibold text-navy-700 text-sm">{name}</div>
              {condition && <div className="text-xs text-medical-500 mt-0.5">{condition}</div>}
            </div>
          </div>
          {verified && <VerifiedBadge />}
        </div>

        {/* Stars */}
        <div className="mb-3">
          <StarRating count={rating} />
        </div>

        {/* Review text */}
        <p className="text-warm-600 text-sm leading-relaxed text-pretty">"{review}"</p>

        {/* Hospital reply */}
        {reply && (
          <div className="mt-4 border-l-2 border-medical-300 pl-4 py-1">
            <div className="font-sans font-bold text-navy-800 text-xs mb-1">Sadbhav Hospital</div>
            <p className="text-warm-500 text-xs leading-relaxed">{reply}</p>
          </div>
        )}
      </div>
    </article>
  )
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl sm:text-3xl transition-transform hover:scale-110 focus:outline-none"
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <span className={(hovered || value) >= star ? 'text-amber-400' : 'text-warm-200'}>★</span>
        </button>
      ))}
      {value > 0 && (
        <span className="text-xs text-warm-400 font-sans ml-1">
          {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][value]}
        </span>
      )}
    </div>
  )
}

function ReviewForm({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', rating: 0, reviewText: '', condition: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.rating || !form.reviewText.trim()) return
    setStatus('submitting')
    try {
      await submitReview({ ...form, imageFile })
      notifyAdminOfReview(form).catch(() => {})
      onSubmitted({ name: form.name, condition: form.condition, reviewText: form.reviewText, rating: form.rating, imageUrl: imagePreview })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-8 sm:mt-10 bg-white rounded-2xl border border-warm-100 shadow-card p-8 text-center max-w-lg mx-auto">
        <div className="text-3xl mb-3">🙏</div>
        <h3 className="font-display font-semibold text-lg text-navy-800 mb-1">Thank You!</h3>
        <p className="text-sm text-warm-500 mb-5">Your review has been added.</p>
        {SITE.googleReviewUrl && (
          <div className="border-t border-warm-100 pt-5">
            <p className="text-xs text-warm-400 mb-3">Would you also share it on Google? It helps patients find us.</p>
            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4285F4] text-white text-sm font-sans font-semibold hover:bg-[#3367D6] transition-colors"
            >
              <GoogleIcon />
              Leave a Google Review
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <RevealWrapper>
      <div className="mt-8 sm:mt-10 bg-white rounded-2xl sm:rounded-3xl border border-warm-100 shadow-card p-6 sm:p-8 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h3 className="font-display font-semibold text-lg sm:text-xl text-navy-800">Share Your Experience</h3>
          {SITE.googleReviewUrl && (
            <a
              href={SITE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-warm-200 bg-warm-50 text-sm font-sans font-medium text-warm-600 hover:border-[#4285F4] hover:text-[#4285F4] transition-colors self-start sm:self-auto"
            >
              <GoogleIcon />
              Review on Google
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-sans font-semibold text-navy-700 mb-2">
              Your Rating <span className="text-crimson-500">*</span>
            </label>
            <StarPicker value={form.rating} onChange={(r) => setForm((f) => ({ ...f, rating: r }))} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="r-name" className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
                Your Name <span className="text-crimson-500">*</span>
              </label>
              <input
                id="r-name" name="name" type="text" value={form.name} onChange={handleChange} required
                placeholder="e.g. Ramesh Patel"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-warm-50 text-sm text-navy-700 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-medical-300 transition"
              />
            </div>
            <div>
              <label htmlFor="r-condition" className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
                Treated For <span className="text-warm-400 font-normal">(optional)</span>
              </label>
              <input
                id="r-condition" name="condition" type="text" value={form.condition} onChange={handleChange}
                placeholder="e.g. Asthma, COPD"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-warm-50 text-sm text-navy-700 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-medical-300 transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="r-review" className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
              Your Review <span className="text-crimson-500">*</span>
            </label>
            <textarea
              id="r-review" name="reviewText" value={form.reviewText} onChange={handleChange} required rows={3}
              placeholder="Tell us about your visit and the care you received..."
              className="w-full px-4 py-2.5 rounded-xl border border-warm-200 bg-warm-50 text-sm text-navy-700 placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-medical-300 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-sans font-semibold text-navy-700 mb-1.5">
              Add a Photo <span className="text-warm-400 font-normal">(optional)</span>
            </label>
            {imagePreview ? (
              <div className="relative w-full h-36 rounded-xl overflow-hidden border border-warm-200">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null) }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70"
                >✕</button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 w-full h-20 rounded-xl border-2 border-dashed border-warm-200 bg-warm-50 cursor-pointer hover:border-medical-300 hover:bg-medical-50 transition-colors">
                <span className="text-xs text-warm-400 font-sans">Click to upload a photo</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {status === 'error' && (
            <p className="text-sm text-crimson-600 bg-crimson-50 rounded-xl px-4 py-2.5">
              Something went wrong. Please try again.
            </p>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={!form.name || !form.rating || !form.reviewText || status === 'submitting'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </RevealWrapper>
  )
}

export default function TestimonialsSection({
  content = TESTIMONIALS_CONTENT,
  stats = SOCIAL_PROOF_STATS,
}) {
  const [realReviews, setRealReviews] = useState([])

  useEffect(() => {
    fetchApprovedReviews().then(setRealReviews)
  }, [])

  const displayed = realReviews.length > 0
    ? realReviews.map((r) => ({
        id: r._id,
        name: r.name,
        condition: r.condition ?? '',
        review: r.reviewText,
        rating: r.rating,
        verified: r.verified ?? false,
        imageUrl: r.imageUrl ?? null,
        reply: r.reply ?? null,
      }))
    : TESTIMONIALS

  function handleNewReview(data) {
    setRealReviews((prev) => [
      { _id: `temp-${Date.now()}`, ...data, verified: false, reply: null },
      ...prev,
    ])
  }

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-warm-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <RevealWrapper>
          <div className="text-center mb-10 sm:mb-14">
            <SectionHeader
              label={content.sectionLabel}
              heading={content.heading}
              subheading={content.subheading}
              align="center"
            />
          </div>
        </RevealWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {displayed.map((item, i) => (
            <RevealWrapper key={item.id} delay={i * 70}>
              <ReviewItem {...item} />
            </RevealWrapper>
          ))}
        </div>

        <ReviewForm onSubmitted={handleNewReview} />

        <RevealWrapper delay={80}>
          <div
            className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 bg-white rounded-2xl sm:rounded-3xl border border-warm-100 shadow-card overflow-hidden"
            role="list"
            aria-label="Hospital statistics"
          >
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                role="listitem"
                className={[
                  'px-5 sm:px-8 py-5 sm:py-7 text-center',
                  i < stats.length - 1 ? 'border-r border-warm-100' : '',
                  i < 2 ? 'border-b md:border-b-0 border-warm-100' : '',
                ].filter(Boolean).join(' ')}
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-medical-500">{value}</div>
                <div className="text-[10px] sm:text-xs text-warm-400 font-sans mt-1 sm:mt-1.5">{label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
