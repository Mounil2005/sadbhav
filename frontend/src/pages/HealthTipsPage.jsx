import { useState, useEffect } from 'react'
import { ArrowRight, Play, ChevronRight, ChevronLeft } from 'lucide-react'
import { fetchHealthUpdates } from '../lib/queries'
import { useSEO } from '../hooks/useSEO'
import ReelModal from '../components/ui/ReelModal'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return m ? m[1] : null
}

function CategoryBadge({ category, dark }) {
  return (
    <span
      className={
        dark
          ? 'text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white/90'
          : 'text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full bg-medical-50 text-medical-600'
      }
    >
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
      {article.coverImageUrl && (
        <div className="overflow-hidden aspect-video bg-warm-100">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

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

function ReelThumbnail({ article }) {
  const ytId = getYouTubeId(article.videoUrl)

  if (article.coverImageUrl) {
    return (
      <img
        src={article.coverImageUrl}
        alt={article.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    )
  }

  if (ytId) {
    return (
      <img
        src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
        alt={article.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    )
  }

  if (article.videoUrl) {
    return (
      <video
        src={`${article.videoUrl}#t=0.001`}
        preload="metadata"
        muted
        playsInline
        onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.001 }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-b from-navy-700 to-navy-900 flex items-center justify-center">
      <Play size={32} className="text-white/30" />
    </div>
  )
}

function ReelCard({ article, onClick, width = 'w-40 sm:w-44 md:w-48' }) {
  return (
    <button
      onClick={onClick}
      className={`group rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 relative text-left ${width}`}
      aria-label={`Play: ${article.title}`}
    >
      <div className="relative bg-navy-900" style={{ aspectRatio: '9/16' }}>
        <div className="absolute inset-0 overflow-hidden group-hover:scale-105 transition-transform duration-300">
          <ReelThumbnail article={article} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <Play size={20} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-12">
          <CategoryBadge category={article.category} dark />
          <h3 className="font-display font-semibold text-xs text-white leading-snug mt-1.5 line-clamp-2">
            {article.title}
          </h3>
        </div>
      </div>
    </button>
  )
}

function SectionHeading({ title, count }) {
  return (
    <div className="flex items-center gap-3">
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
    description:
      'Expert articles and videos on respiratory health, asthma, COPD, and critical care by Dr. Vivek Nanda at Sadbhav Hospital, Jamnagar.',
  })

  const [posts, setPosts] = useState(undefined)
  const [showAllReels, setShowAllReels] = useState(false)
  const [modalIndex, setModalIndex] = useState(null)

  useEffect(() => {
    fetchHealthUpdates().then(setPosts)
  }, [])

  const articles = posts?.filter((p) => p.contentType !== 'reel') ?? []
  const reels = posts?.filter((p) => p.contentType === 'reel') ?? []

  const openModal = (i) => setModalIndex(i)
  const closeModal = () => setModalIndex(null)
  const prevReel = () => setModalIndex((i) => Math.max(0, i - 1))
  const nextReel = () => setModalIndex((i) => Math.min(reels.length - 1, i + 1))

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

        {/* Section 1: Insights for Better Health */}
        {posts !== undefined && articles.length > 0 && (
          <section>
            <div className="mb-6">
              <SectionHeading title="Insights for Better Health" count={articles.length} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Videos for General Health */}
        {posts !== undefined && reels.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <SectionHeading title="Videos for General Health" count={reels.length} />
              <button
                onClick={() => setShowAllReels((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-sans font-semibold text-medical-600 hover:text-medical-700 transition-colors shrink-0 ml-4"
              >
                {showAllReels ? (
                  <>
                    <ChevronLeft size={14} />
                    Collapse
                  </>
                ) : (
                  <>
                    View All
                    <ChevronRight size={14} />
                  </>
                )}
              </button>
            </div>

            {!showAllReels ? (
              /* Horizontal scroll row */
              <div
                className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-4 sm:-mx-6 px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {reels.map((reel, i) => (
                  <div key={reel.id} className="snap-start shrink-0">
                    <ReelCard article={reel} onClick={() => openModal(i)} />
                  </div>
                ))}
              </div>
            ) : (
              /* Portrait grid */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {reels.map((reel, i) => (
                  <ReelCard key={reel.id} article={reel} onClick={() => openModal(i)} width="w-full" />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Empty state */}
        {posts !== undefined && posts.length === 0 && (
          <div className="text-center py-20 text-warm-400 font-sans">
            No posts published yet.
          </div>
        )}
      </div>

      {/* Reel Modal */}
      {modalIndex !== null && reels.length > 0 && (
        <ReelModal
          reels={reels}
          index={modalIndex}
          onClose={closeModal}
          onPrev={prevReel}
          onNext={nextReel}
        />
      )}
    </div>
  )
}
