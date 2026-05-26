import { useState, useEffect } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { fetchHealthUpdates } from '../lib/queries'
import { useSEO } from '../hooks/useSEO'

function CategoryBadge({ category }) {
  return (
    <span className="text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full bg-medical-50 text-medical-600">
      {category}
    </span>
  )
}

function FeaturedPost({ article }) {
  const isVideo = article.contentType === 'video'
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group grid md:grid-cols-2 bg-white rounded-2xl sm:rounded-3xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden mb-8 sm:mb-10"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-warm-100 min-h-[220px] md:min-h-[320px]">
        {article.coverImageUrl ? (
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="eager"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-medical-100 to-medical-200 flex items-center justify-center">
            {isVideo && <Play size={40} className="text-medical-400" />}
          </div>
        )}
        {isVideo && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-navy-900/80 text-white text-[11px] font-sans font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Play size={10} fill="white" /> Video
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7 sm:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge category={article.category} />
          <span className="text-[10px] font-sans text-warm-400 bg-warm-100 px-2.5 py-1 rounded-full">Featured</span>
        </div>
        <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-800 leading-snug mb-3 text-balance">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-warm-500 text-sm leading-relaxed line-clamp-3 mb-5">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-warm-100">
          <div>
            <div className="text-xs text-warm-400 font-sans">{article.author}</div>
            <time className="text-[11px] text-warm-300 font-sans">{article.displayDate}</time>
          </div>
          <div className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-medical-500 group-hover:gap-2.5 transition-all">
            {isVideo ? 'Watch' : 'Read'}
            <ArrowRight size={14} strokeWidth={2} />
          </div>
        </div>
      </div>
    </a>
  )
}

function PostCard({ article }) {
  const isVideo = article.contentType === 'video'
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Fixed-height thumbnail */}
      <div className="overflow-hidden aspect-video bg-warm-50 relative">
        {article.coverImageUrl ? (
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isVideo
              ? <Play size={28} className="text-warm-300" />
              : <div className="w-8 h-0.5 bg-warm-200 rounded-full" />}
          </div>
        )}
        {isVideo && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-navy-900/80 text-white text-[10px] font-sans font-medium px-2.5 py-1 rounded-full">
            <Play size={8} fill="white" /> Video
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <CategoryBadge category={article.category} />
        </div>
        <h3 className="font-display font-semibold text-base text-navy-800 leading-snug mb-2 flex-1 text-balance">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-warm-500 text-xs leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
        )}
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

  const featured = posts?.[0]
  const rest = posts?.slice(1)

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

        {/* Featured + Grid */}
        {posts && posts.length > 0 && (
          <>
            <FeaturedPost article={featured} />
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {rest.map((article) => (
                  <PostCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
