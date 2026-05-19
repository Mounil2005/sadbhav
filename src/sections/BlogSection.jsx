import { ArrowRight, Clock } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import HospitalImage from '../components/ui/HospitalImage'
import RevealWrapper from '../components/ui/RevealWrapper'
import { BLOG_ARTICLES, BLOG_CONTENT } from '../data/blog'

function BlogMeta({ date, readTime }) {
  return (
    <div className="flex items-center gap-3">
      <time className="text-[10px] sm:text-xs text-warm-400 font-sans">{date}</time>
      <span className="flex items-center gap-1 text-[10px] sm:text-xs text-warm-400 font-sans">
        <Clock size={11} aria-hidden="true" /> {readTime}
      </span>
    </div>
  )
}

export default function BlogSection({
  articles = BLOG_ARTICLES,
  content = BLOG_CONTENT,
}) {
  const featured = articles.find((a) => a.featured) ?? articles[0]
  const secondary = articles.filter((a) => !a.featured).slice(0, 3)

  return (
    <section id="blog" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

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

          {/* Featured article */}
          <RevealWrapper>
            <article
              className={`group card-base h-full p-6 sm:p-8 bg-gradient-to-br ${featured.color} border-warm-100 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] cursor-pointer`}
            >
              {/* Future: article thumbnail image */}
              {featured.image && (
                <HospitalImage
                  src={featured.image}
                  alt={featured.title}
                  aspect="wide"
                  overlay
                  className="rounded-xl overflow-hidden mb-5 -mx-2"
                />
              )}

              <div>
                <span
                  className={`inline-block text-[10px] sm:text-xs font-sans font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full ${featured.accent} mb-4 sm:mb-5`}
                >
                  {featured.category}
                </span>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-navy-800 leading-snug mb-3 sm:mb-4 text-balance">
                  {featured.title}
                </h3>
                <p className="text-warm-500 text-xs sm:text-sm leading-relaxed">{featured.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-warm-200">
                <BlogMeta date={featured.displayDate} readTime={featured.readTime} />
                <div className="flex items-center gap-1 text-xs sm:text-sm font-sans font-semibold text-medical-500 group-hover:gap-2 transition-all">
                  Read <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
            </article>
          </RevealWrapper>

          {/* Secondary articles */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {secondary.map((article, i) => (
              <RevealWrapper key={article.id} delay={(i + 1) * 70}>
                <article
                  className={`group card-base p-5 sm:p-6 bg-gradient-to-br ${article.color} border-warm-100 flex gap-4 sm:gap-5 cursor-pointer`}
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block text-[10px] sm:text-xs font-sans font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${article.accent} mb-2 sm:mb-3`}
                    >
                      {article.category}
                    </span>
                    <h3 className="font-display font-semibold text-sm sm:text-base text-navy-800 leading-snug mb-1.5 sm:mb-2 text-balance">
                      {article.title}
                    </h3>
                    <p className="text-warm-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mt-2.5 sm:mt-3">
                      <BlogMeta date={article.displayDate} readTime={article.readTime} />
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
                </article>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
