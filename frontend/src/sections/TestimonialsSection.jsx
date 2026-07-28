import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
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

function GoogleBadge() {
  return (
    <div className="inline-flex items-center gap-1 bg-blue-50 text-[10px] font-sans font-semibold px-2 py-1 rounded-full border border-blue-100 flex-shrink-0">
      <GoogleIcon />
      <span className="text-blue-600">Google</span>
    </div>
  )
}

function ReviewItem({ name, condition, review, rating, verified, imageUrl, reply, source, profilePhotoUrl }) {
  const isGoogle = source === 'google'
  return (
    <article className="bg-white rounded-2xl border border-warm-100 shadow-sm overflow-hidden">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img src={imageUrl} alt="Patient review" loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Reviewer" className="w-10 h-10 rounded-full object-cover flex-shrink-0" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 font-sans font-bold text-sm flex-shrink-0">
                {isGoogle && name ? name[0].toUpperCase() : 'P'}
              </div>
            )}
            <div className="min-w-0">
              {isGoogle && name && (
                <div className="text-sm font-sans font-semibold text-navy-800 truncate">{name}</div>
              )}
              {condition && <div className="text-xs text-warm-400 truncate">{condition}</div>}
            </div>
          </div>
          {isGoogle ? <GoogleBadge /> : verified ? <VerifiedBadge /> : null}
        </div>

        <div className="mb-3">
          <StarRating count={rating} />
        </div>

        <p className="text-warm-600 text-sm leading-relaxed text-pretty">"{review}"</p>

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

function VideoTestimonialCard({ review, onClick }) {
  const videoSrc = review.videoUrl ?? review.videoFileUrl ?? null

  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 w-44 sm:w-48 text-left"
      aria-label="Play patient testimonial"
    >
      {/* Thumbnail */}
      <div className="relative bg-navy-900 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-200" style={{ aspectRatio: '9/16' }}>
        <div className="absolute inset-0 overflow-hidden">
          {review.imageUrl ? (
            <img src={review.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : videoSrc ? (
            <video
              src={`${videoSrc}#t=0.001`}
              preload="metadata"
              muted
              playsInline
              onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.001 }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-navy-700 to-navy-900" />
          )}
        </div>

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Play size={20} fill="#1e5fa8" className="text-medical-600 ml-0.5" />
          </div>
        </div>

        {/* Caption overlay */}
        {(review.caption || review.condition) && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 pt-8">
            <div className="text-white text-[11px] font-sans font-medium leading-snug line-clamp-2">
              {review.caption || review.condition}
            </div>
          </div>
        )}
      </div>

      {/* Stars — always visible directly below the card */}
      {review.rating && (
        <div className="mt-2 px-1 text-amber-400 text-base tracking-wide">
          {'★'.repeat(review.rating)}
        </div>
      )}
    </button>
  )
}

function VideoModal({ review, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const videoRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const videoSrc = review.videoUrl ?? review.videoFileUrl ?? null

  useEffect(() => {
    setExpanded(false)
  }, [review._id])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function isYouTube(url) {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'))
  }

  function getYouTubeEmbed(url) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
    return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1` : null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-2 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-xs flex flex-col" style={{ maxHeight: '96svh' }}>

        {/* Video — capped so caption always fits below */}
        <div
          className="relative rounded-2xl overflow-hidden bg-black mx-auto flex-shrink-0"
          style={{
            aspectRatio: '9/16',
            maxHeight: '65svh',
            maxWidth: 'calc(65svh * 9 / 16)',
            width: '100%',
          }}
        >
          {/* Close inside video — never clipped on phones */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          {videoSrc && isYouTube(videoSrc) ? (
            <iframe
              src={getYouTubeEmbed(videoSrc)}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">No video available</div>
          )}
        </div>

          {/* Prev / Next — inside video so touch targets stay within the video */}
          {(hasPrev || hasNext) && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-2 z-10">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-0 flex items-center justify-center text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 disabled:opacity-0 flex items-center justify-center text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Caption + description — scrollable, always visible */}
        <div
          className="mt-2 overflow-y-auto"
          style={{ maxHeight: '26svh', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex items-center justify-between gap-3 px-1 py-2">
            <div>
              {(review.caption || review.condition) && (
                <div className="text-white/80 text-xs font-sans">{review.caption || review.condition}</div>
              )}
              {review.rating && (
                <div className="text-amber-400 text-sm mt-0.5">{'★'.repeat(review.rating)}</div>
              )}
            </div>
            {review.description && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="text-medical-300 text-xs font-sans font-medium flex-shrink-0 hover:text-medical-200 transition-colors py-1 px-2"
              >
                {expanded ? 'See less ↑' : 'See more ↓'}
              </button>
            )}
          </div>
          {review.description && expanded && (
            <p className="px-1 pb-3 text-white/65 text-xs leading-relaxed border-t border-white/10 pt-2">
              {review.description}
            </p>
          )}
        </div>
      </div>
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
  const [form, setForm] = useState({ rating: 0, reviewText: '', condition: '' })
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
      onSubmitted({ condition: form.condition, reviewText: form.reviewText, rating: form.rating, imageUrl: imagePreview })
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
              disabled={!form.rating || !form.reviewText || status === 'submitting'}
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

function AllStoriesOverlay({ reviews, onClose, onPlayVideo }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[90] bg-white flex flex-col">
      {/* Sticky header */}
      <div className="flex-shrink-0 border-b border-warm-100 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-xl text-navy-800">Patient Stories</h2>
          <p className="text-xs text-warm-400 font-sans mt-0.5">
            {reviews.length} video testimonial{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-warm-50 hover:bg-warm-100 flex items-center justify-center text-warm-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {reviews.map((r, i) => (
              <VideoTestimonialCard
                key={r._id}
                review={r}
                onClick={() => onPlayVideo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function fetchGoogleReviews() {
  try {
    const res = await fetch('/api/google-reviews')
    if (!res.ok) return []
    const data = await res.json()
    return data.reviews ?? []
  } catch {
    return []
  }
}

export default function TestimonialsSection({
  content = TESTIMONIALS_CONTENT,
  stats = SOCIAL_PROOF_STATS,
}) {
  const [sanityReviews, setSanityReviews] = useState([])
  const [googleReviews, setGoogleReviews] = useState([])
  const [visitorCount, setVisitorCount] = useState(null)
  const [videoModalIndex, setVideoModalIndex] = useState(null)
  const [showAllStories, setShowAllStories] = useState(false)

  useEffect(() => {
    fetchApprovedReviews().then(setSanityReviews)
    fetchGoogleReviews().then(setGoogleReviews)
    fetch('/api/visit')
      .then((r) => r.json())
      .then((d) => setVisitorCount(d.count))
      .catch(() => {})
  }, [])

  // Split Sanity reviews into text and video
  const videoReviews = sanityReviews.filter((r) => r.reviewType === 'video')
  const textSanityReviews = sanityReviews.filter((r) => r.reviewType !== 'video')

  const sanityMapped = textSanityReviews.map((r) => ({
    id: r._id,
    condition: r.condition ?? '',
    review: r.reviewText,
    rating: r.rating,
    verified: r.verified ?? false,
    imageUrl: r.imageUrl ?? null,
    reply: r.reply ?? null,
    source: 'sanity',
    profilePhotoUrl: null,
  }))

  const allReviews = [...sanityMapped, ...googleReviews]
  const displayed = allReviews.length > 0 ? allReviews : TESTIMONIALS

  function handleNewReview(data) {
    setSanityReviews((prev) => [
      { _id: `temp-${Date.now()}`, reviewType: 'text', verified: false, reply: null, ...data },
      ...prev,
    ])
  }

  return (
    <>
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

        {/* ── Video Testimonials ── */}
        {videoReviews.length > 0 && (
          <RevealWrapper>
            <div className="mb-12 sm:mb-16">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-navy-700">
                  Patient Stories
                </h3>
                <button
                  onClick={() => setShowAllStories(true)}
                  className="text-sm font-sans font-medium text-medical-500 hover:text-medical-600 transition-colors flex items-center gap-1"
                >
                  View all <span aria-hidden="true">→</span>
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-4 sm:-mx-6 px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {videoReviews.map((r, i) => (
                  <div key={r._id} className="snap-start flex-shrink-0">
                    <VideoTestimonialCard
                      review={r}
                      onClick={() => setVideoModalIndex(i)}
                    />
                  </div>
                ))}
                {/* View all tile — always at the end of the scroll row */}
                <div className="snap-start flex-shrink-0 flex items-center pl-1 pr-4 sm:pr-6">
                  <button
                    onClick={() => setShowAllStories(true)}
                    className="flex flex-col items-center justify-center gap-2 w-24 text-center group"
                    style={{ aspectRatio: '9/16', maxHeight: '11rem' }}
                  >
                    <div className="w-12 h-12 rounded-full bg-medical-50 border-2 border-medical-200 flex items-center justify-center group-hover:bg-medical-100 transition-colors">
                      <span className="text-medical-500 text-lg font-sans font-bold">→</span>
                    </div>
                    <span className="text-xs font-sans font-medium text-medical-500 group-hover:text-medical-600 transition-colors leading-tight">
                      View all
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </RevealWrapper>
        )}

        {/* ── Text Reviews scrolling marquee ── */}
        <div className="overflow-hidden -mx-4 sm:-mx-6">
          <style>{`
            @keyframes reviews-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .reviews-track {
              animation: reviews-scroll 40s linear infinite;
            }
            .reviews-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div
            className="reviews-track flex gap-4 px-4 sm:px-6 pb-3"
            style={{ width: 'max-content' }}
          >
            {[...displayed, ...displayed].map((item, i) => (
              <div key={`${item.id}-${i}`} className="flex-shrink-0 w-80 sm:w-96">
                <ReviewItem {...item} />
              </div>
            ))}
          </div>
        </div>

        <ReviewForm onSubmitted={handleNewReview} />

        <RevealWrapper delay={80}>
          <div
            className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-warm-100 rounded-2xl sm:rounded-3xl border border-warm-100 shadow-card overflow-hidden gap-px"
            role="list"
            aria-label="Hospital statistics"
          >
            {[...stats, { value: visitorCount ? visitorCount.toLocaleString() : '...', label: 'Site Visitors' }].map(({ value, label }) => (
              <div
                key={label}
                role="listitem"
                className="bg-white px-4 sm:px-6 py-5 sm:py-7 text-center"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-medical-500">{value}</div>
                <div className="text-[10px] sm:text-xs text-warm-400 font-sans mt-1 sm:mt-1.5">{label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>

    {/* All Patient Stories overlay */}
    {showAllStories && (
      <AllStoriesOverlay
        reviews={videoReviews}
        onClose={() => setShowAllStories(false)}
        onPlayVideo={(i) => setVideoModalIndex(i)}
      />
    )}

    {/* Video modal — z-[100] sits above the overlay */}
    {videoModalIndex !== null && videoReviews.length > 0 && (
      <VideoModal
        review={videoReviews[videoModalIndex]}
        hasPrev={videoModalIndex > 0}
        hasNext={videoModalIndex < videoReviews.length - 1}
        onClose={() => setVideoModalIndex(null)}
        onPrev={() => setVideoModalIndex((i) => Math.max(0, i - 1))}
        onNext={() => setVideoModalIndex((i) => Math.min(videoReviews.length - 1, i + 1))}
      />
    )}
    </>
  )
}
