import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { fetchHealthUpdates } from '../lib/queries'
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

function PostCard({ article }) {
  const isVideo = article.contentType === 'video'
  const isImage = article.contentType === 'image'

  return (
    <a
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      {article.coverImageUrl && (
        <div className="overflow-hidden">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full bg-medical-50 text-medical-600">
            {article.category}
          </span>
          {isVideo && (
            <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2 py-1 rounded-full bg-navy-50 text-navy-500">
              <Play size={8} /> Video
            </span>
          )}
        </div>

        <h3 className="font-display font-semibold text-base text-navy-800 leading-snug mb-2 flex-1 text-balance">
          {article.title}
        </h3>

        <p className="text-warm-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-warm-100">
          <time className="text-[11px] text-warm-400 font-sans">{article.displayDate}</time>
          <div className="flex items-center gap-1 text-xs font-sans font-semibold text-medical-500 group-hover:gap-2 transition-all">
            {isVideo ? 'Watch' : 'Read'}
            <ArrowRight size={12} strokeWidth={2} />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function HealthTipsPage() {
  useSEO({
    title: 'Health Tips & Updates',
    description: 'Expert articles and videos on respiratory health, asthma, COPD, and critical care by Dr. Vivek Nanda at Sadbhav Hospital, Jamnagar.',
  })

  const [posts, setPosts] = useState(undefined)

  useEffect(() => {
    fetchHealthUpdates().then(setPosts)
  }, [])

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Back bar */}
      <div className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-warm-500 hover:text-medical-600 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <span className="inline-block text-[11px] font-sans font-semibold tracking-widest uppercase text-medical-500 mb-3">
            Health Awareness
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-800">
            Health Tips & Updates
          </h1>
          <p className="mt-3 text-warm-500 text-base max-w-xl">
            Expert insights on respiratory health, asthma, COPD, and critical care from Dr. Vivek Nanda.
          </p>
        </div>

        {/* Loading */}
        {posts === undefined && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-medical-300 border-t-medical-600 animate-spin" />
          </div>
        )}

        {/* Empty */}
        {posts !== undefined && posts.length === 0 && (
          <div className="text-center py-20 text-warm-400 font-sans">
            No posts published yet.
          </div>
        )}

        {/* Grid */}
        {posts && posts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
            {posts.map((article) => (
              <PostCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
