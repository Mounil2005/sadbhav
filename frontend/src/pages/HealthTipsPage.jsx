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

function ArticleCard({ article }) {
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-2xl border border-warm-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* 16:9 thumbnail */}
      <div className="overflow-hidden aspect-video bg-warm-100 relative">
        {article.coverImageUrl ? (
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-medical-50 to-medical-100">
            <div className="w-8 h-0.5 bg-medical-200 rounded-full" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <CategoryBadge category={article.category} />
        </div>
        <h3 className="font-display font-semibold text-sm text-navy-800 leading-snug mb-2 flex-1 text-balance line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-warm-100">
          <time className="text-[10px] text-warm-400 font-sans">{article.displayDate}</time>
          <div className="flex items-center gap-1 text-xs font-sans font-semibold text-medical-500 group-hover:gap-2 transition-all">
            Read <ArrowRight size={11} strokeWidth={2} />
          </div>
        </div>
      </div>
    </a>
  )
}

function ReelCard({ article }) {
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 relative"
    >
      {/* 9:16 portrait */}
      <div className="aspect-[9/16] bg-navy-900 relative overflow-hidden">
        {article.coverImageUrl ? (
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-navy-700 to-navy-900 flex items-center justify-center">
            <Play size={32} className="text-white/30" />
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <Play size={22} fill="white" className="text-white ml-1" />
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-12">
          <CategoryBadge category={article.category} />
          <h3 className="font-display font-semibold text-sm text-white leading-snug mt-2 line-clamp-2">
            {article.title}
          </h3>
          <time className="text-[10px] text-white/50 font-sans mt-1 block">{article.displayDate}</time>
        </div>
      </div>
    </a>
  )
}

function SectionHeading({ title, count }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="font-display font-bold text-xl text-navy-800">{title}</h2>
      {count > 0 && (
        <span className="text-xs font-sans font-semibold text-warm-400 bg-warm-100 px-2.5 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
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

  const articles = posts?.filter((p) => p.contentType !== 'reel') ?? []
  const reels = posts?.filter((p) => p.contentType === 'reel') ?? []

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Back bar */}
      <div className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-sans font-medium text-warm-500 hover:text-medical-600 transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14 sm:space-y-16">
        {/* Header */}
        <div>
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

        {/* Articles & Tips section */}
        {posts !== undefined && articles.length > 0 && (
          <section>
            <SectionHeading title="Health Tips & Articles" count={articles.length} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Reels & Videos section */}
        {posts !== undefined && reels.length > 0 && (
          <section>
            <SectionHeading title="Reels & Videos" count={reels.length} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {reels.map((article) => (
                <ReelCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {posts !== undefined && posts.length === 0 && (
          <div className="text-center py-20 text-warm-400 font-sans">
            No posts published yet.
          </div>
        )}
      </div>
    </div>
  )
}
