import { ArrowRight, Clock, Play } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import HospitalImage from '../components/ui/HospitalImage'
import RevealWrapper from '../components/ui/RevealWrapper'
import { BLOG_ARTICLES, BLOG_CONTENT } from '../data/blog'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return m ? m[1] : null
}

function ReelThumb({ reel }) {
  const ytId = getYouTubeId(reel.videoUrl)
  if (reel.coverImageUrl) {
    return <img src={reel.coverImageUrl} alt={reel.title} loading="lazy" className="w-full h-full object-cover" />
  }
  if (ytId) {
    return <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={reel.title} loading="lazy" className="w-full h-full object-cover" />
  }
  if (reel.videoUrl) {
    return <video src={reel.videoUrl} preload="metadata" muted playsInline className="w-full h-full object-cover" />
  }
  return <div className="w-full h-full bg-gradient-to-b from-navy-700 to-navy-900 flex items-center justify-center"><Play size={28} className="text-white/30" /></div>
}

function ReelPreviewCard({ reel }) {
  return (
    <a
      href={`/blog/${reel.slug}`}
      className="group flex-shrink-0 w-36 sm:w-40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-[9/16] bg-navy-900 relative overflow-hidden">
        <div className="w-full h-full group-hover:scale-105 transition-transform duration-300">
          <ReelThumb reel={reel} />
        </div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-10">
          <p className="text-white text-[11px] font-display font-semibold leading-snug line-clamp-2">{reel.title}</p>
        </div>
      </div>
    </a>
  )
}

const TYPE_ICON = {
  video: <Play size={11} className="inline-block mr-0.5" aria-hidden="true" />,
  reel: <Play size={11} className="inline-block mr-0.5" aria-hidden="true" />,
}

function BlogMeta({ date, readTime, contentType }) {
  return (
    <div className="flex items-center gap-3">
      <time className="text-[10px] sm:text-xs text-warm-400 font-sans">{date}</time>
      {readTime && (
        <span className="flex items-center gap-1 text-[10px] sm:text-xs text-warm-400 font-sans">
          <Clock size={11} aria-hidden="true" /> {readTime}
        </span>
      )}
      {(contentType === 'video' || contentType === 'reel') && (
        <span className="text-[10px] sm:text-xs text-medical-400 font-sans font-medium">
          {TYPE_ICON[contentType]}
          {contentType === 'reel' ? 'Reel' : 'Video'}
        </span>
      )}
    </div>
  )
}

function ArticleThumbnail({ article, aspect = 'wide', className = '' }) {
  if (article.coverImageUrl) {
    return (
      <div className={`rounded-xl overflow-hidden mb-5 -mx-2 ${className}`}>
        <img
          src={article.coverImageUrl}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="w-full object-cover"
          style={{ aspectRatio: '16/9' }}
        />
      </div>
    )
  }
  if (article.image) {
    return (
      <HospitalImage
        src={article.image}
        alt={article.title}
        aspect={aspect}
        overlay
        className={`rounded-xl overflow-hidden mb-5 -mx-2 ${className}`}
      />
    )
  }
  return null
}

function FeaturedCard({ article }) {
  const isVideo = article.contentType === 'video'
  const href = `/blog/${article.slug}`

  return (
    <a
      href={href}
      className={`group card-base h-full p-6 sm:p-8 bg-gradient-to-br ${article.color} border-warm-100 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] cursor-pointer`}
    >
      <ArticleThumbnail article={article} />

      <div>
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <span className={`inline-block text-[10px] sm:text-xs font-sans font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${article.accent}`}>
            {article.category}
          </span>
          {isVideo && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-sans font-semibold px-2 py-1 rounded-full bg-navy-50 text-navy-500">
              <Play size={9} />
              Video
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-xl sm:text-2xl text-navy-800 leading-snug mb-3 sm:mb-4 text-balance">
          {article.title}
        </h3>
        <p className="text-warm-500 text-xs sm:text-sm leading-relaxed">{article.excerpt}</p>
      </div>

      <div className="flex items-center justify-between mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-warm-200">
        <BlogMeta date={article.displayDate} readTime={article.readTime} contentType={article.contentType} />
        <div className="flex items-center gap-1 text-xs sm:text-sm font-sans font-semibold text-medical-500 group-hover:gap-2 transition-all">
          {isVideo ? 'Watch' : 'View'}
          <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </a>
  )
}

function SecondaryCard({ article }) {
  const isVideo = article.contentType === 'video'
  const href = `/blog/${article.slug}`

  return (
    <a
      href={href}
      className={`group card-base p-5 sm:p-6 bg-gradient-to-br ${article.color} border-warm-100 flex gap-4 sm:gap-5 cursor-pointer`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
          <span className={`inline-block text-[10px] sm:text-xs font-sans font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${article.accent}`}>
            {article.category}
          </span>
          {isVideo && (
            <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-navy-50 text-navy-400">
              <Play size={8} />Video
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-sm sm:text-base text-navy-800 leading-snug mb-1.5 sm:mb-2 text-balance">
          {article.title}
        </h3>
        <p className="text-warm-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-2.5 sm:mt-3">
          <BlogMeta date={article.displayDate} readTime={article.readTime} contentType={article.contentType} />
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/60 flex items-center justify-center group-hover:bg-medical-50 transition-colors"
          aria-hidden="true"
        >
          <ArrowRight size={13} className="text-medical-500" strokeWidth={2} />
        </div>
      </div>
    </a>
  )
}

export default function BlogSection({
  articles = BLOG_ARTICLES,
  reels = [],
  content = BLOG_CONTENT,
}) {
  const featured = articles.find((a) => a.featured) ?? articles[0]
  const secondary = articles.filter((a) => a.id !== featured?.id).slice(0, 3)

  if (!featured && reels.length === 0) return null

  return (
    <section id="blog" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {featured && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
              <RevealWrapper>
                <SectionHeader
                  label={content.sectionLabel}
                  heading={content.heading}
                />
              </RevealWrapper>
              <RevealWrapper delay={80}>
                <a
                  href={content.viewAllHref}
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-medical-500 hover:gap-3 transition-all duration-200 flex-shrink-0"
                >
                  {content.viewAllLabel}
                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                </a>
              </RevealWrapper>
            </div>

            <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
              <RevealWrapper>
                <FeaturedCard article={featured} />
              </RevealWrapper>

              <div className="flex flex-col gap-4 sm:gap-5">
                {secondary.map((article, i) => (
                  <RevealWrapper key={article.id} delay={(i + 1) * 70}>
                    <SecondaryCard article={article} />
                  </RevealWrapper>
                ))}
              </div>
            </div>
          </>
        )}

        {reels.length > 0 && (
          <RevealWrapper>
            <div className={featured ? 'mt-14 sm:mt-16' : ''}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-navy-800">Videos for General Health</h2>
                <a
                  href="/health-tips"
                  className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-medical-500 hover:gap-2.5 transition-all flex-shrink-0"
                >
                  View all <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
              <div
                className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory -mx-4 sm:-mx-6 px-4 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {reels.map((reel) => (
                  <div key={reel.id} className="snap-start">
                    <ReelPreviewCard reel={reel} />
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        )}

      </div>
    </section>
  )
}
