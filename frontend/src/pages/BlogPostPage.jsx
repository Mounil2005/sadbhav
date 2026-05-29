import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Clock, Calendar, User, ExternalLink } from 'lucide-react'
import { fetchPostBySlug } from '../lib/queries'
import { SITE } from '../data/site'
import { useSEO } from '../hooks/useSEO'

const categoryLabels = {
  'pulmonary-health': 'Pulmonary Health',
  'asthma-copd': 'Asthma & COPD',
  'critical-care': 'Critical Care',
  'respiratory-tips': 'Respiratory Tips',
  'patient-awareness': 'Patient Awareness',
  'sleep-breathing': 'Sleep & Breathing',
  'general-health': 'General Health',
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-warm-600 leading-relaxed mb-5 text-base sm:text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-semibold text-2xl sm:text-3xl text-navy-800 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-semibold text-xl sm:text-2xl text-navy-700 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-medical-300 pl-5 py-1 my-6 italic text-warm-500 text-base sm:text-lg bg-medical-50 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-navy-700">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      const [, id, dims, fmt] = value.asset._ref.split('-')
      const url = `https://cdn.sanity.io/images/v0ztl8cn/production/${id}-${dims}.${fmt}`
      return (
        <div className="my-8 rounded-2xl overflow-hidden shadow-sm">
          <img src={url} alt={value.alt ?? ''} loading="lazy" className="w-full object-cover" />
        </div>
      )
    },
  },
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined)

  useSEO({
    title: post?.title ?? undefined,
    description: post?.shortDescription ?? undefined,
    image: post?.coverImageUrl ?? undefined,
  })

  useEffect(() => {
    setPost(undefined)
    fetchPostBySlug(slug).then(setPost)
  }, [slug])

  if (post === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-medical-300 border-t-medical-600 animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="font-display text-2xl text-navy-700">Article not found</p>
        <a href="/#blog" className="btn-primary">Back to Health Tips</a>
      </div>
    )
  }

  const displayDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const isVideo = post.contentType === 'video'
  const category = categoryLabels[post.category] ?? post.category

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Back bar */}
      <div className="bg-white border-b border-warm-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-warm-500 hover:text-medical-600 transition-colors"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Back to Health Tips
          </a>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Category + type badge */}
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-block text-xs font-sans font-semibold px-3 py-1 rounded-full bg-medical-50 text-medical-600">
            {category}
          </span>
          {post.contentType && (
            <span className="inline-block text-xs font-sans font-medium px-3 py-1 rounded-full bg-navy-50 text-navy-500 capitalize">
              {post.contentType}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-800 leading-tight mb-6 text-balance">
          {post.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-warm-400 font-sans mb-8 pb-8 border-b border-warm-200">
          {post.authorName && (
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.authorName}
            </span>
          )}
          {displayDate && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {displayDate}
            </span>
          )}
          {post.contentType === 'article' && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              4 min read
            </span>
          )}
        </div>

        {/* Cover image */}
        {post.coverImageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        )}

        {/* Short description (lead paragraph) */}
        <p className="text-warm-500 text-lg sm:text-xl leading-relaxed mb-8 font-sans">
          {post.shortDescription}
        </p>

        {/* Uploaded video file — plays inline */}
        {isVideo && post.videoFileUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-sm bg-black">
            <video
              src={post.videoFileUrl}
              controls
              playsInline
              className="w-full max-h-[520px]"
            />
          </div>
        )}

        {/* External video link (YouTube / Instagram) */}
        {isVideo && !post.videoFileUrl && post.videoUrl && (
          <a
            href={post.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 mb-10"
          >
            Watch Video
            <ExternalLink size={15} />
          </a>
        )}

        {/* Article body */}
        {post.body && post.body.length > 0 && (
          <div className="mt-2">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 pt-10 border-t border-warm-200">
          <div className="bg-white rounded-2xl border border-warm-100 shadow-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-display font-semibold text-lg text-navy-800 mb-1">
                Have questions about your respiratory health?
              </p>
              <p className="text-sm text-warm-500">Consult Dr. Vivek Nanda at {SITE.name}, Jamnagar</p>
            </div>
            <button
              data-cal-link="mounil-kankhara-tsigot/30min"
              data-cal-namespace="30min"
              data-cal-config='{"layout":"month_view"}'
              className="btn-primary flex-shrink-0"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
