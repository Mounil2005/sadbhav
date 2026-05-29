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
  const hasImage = !!article.coverImageUrl

  return (
    <a
      href={`/blog/${article.slug}`}
      className={`group bg-white rounded-2xl sm:rounded-3xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden mb-8 sm:mb-10 ${hasImage ? 'grid md:grid-cols-2' : 'block'}`}
    >
      {/* Image — only rendered if available */}
      {hasImage && (
        <div className="relative overflow-hidden min-h-[220px] md:min-h-[320px]">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="eager"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
          />
          {isVideo && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-navy-900/80 text-white text-[11px] font-sans font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Play size={10} fill="white" /> Video
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col justify-center ${hasImage ? 'p-7 sm:p-8' : 'p-8 sm:p-10'}`}>
        <div className="flex items-center gap-2 mb-4">
          <CategoryBadge category={article.category} />
          <span className="text-[10px] font-sans text-warm-400 bg-warm-100 px-2.5 py-1 rounded-full">Latest</span>
          {isVideo && !hasImage && (
            <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2.5 py-1 rounded-full bg-navy-50 text-navy-500">
              <Play size={8} /> Video
            </span>
          )}
        </div>
        <h2 className={`font-display font-bold text-navy-800 leading-snug mb-3 text-balance ${hasImage ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-warm-500 text-sm leading-relaxed line-clamp-3 mb-5 max-w-2xl">
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
  const hasImage = !!article.coverImageUrl

  return (
    <a
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Portrait thumbnail — tall card, image fills naturally */}
      {hasImage ? (
        <div className="overflow-hidden aspect-[3/4] relative">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <Play size={20} fill="white" className="text-white ml-0.5" />
              </div>
            </div>
          )}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <CategoryBadge category={article.category} />
            <h3 className="font-display font-semibold text-sm text-white leading-snug mt-2 line-clamp-2">
              {article.title}
            </h3>
            <time className="text-[10px] text-white/60 font-sans mt-1 block">{article.displayDate}</time>
          </div>
        </div>
      ) : (
        /* No image — text card */
        <div className="p-5 flex flex-col flex-1 min-h-[200px]">
          <div className="mb-3">
            <CategoryBadge category={article.category} />
          </div>
          <h3 className="font-display font-semibold text-base text-navy-800 leading-snug mb-2 flex-1 text-balance">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-warm-500 text-xs leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
          )}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-warm-100">
            <time className="text-[11px] text-warm-400 font-sans">{article.displayDate}</time>
            <div className="flex items-center gap-1 text-xs font-sans font-semibold text-medical-500 group-hover:gap-2 transition-all">
              {isVideo ? 'Watch' : 'Read'} <ArrowRight size={12} strokeWidth={2} />
            </div>
          </div>
        </div>
      )}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
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
