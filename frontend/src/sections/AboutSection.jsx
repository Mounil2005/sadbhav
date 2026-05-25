import { CheckCircle, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { ABOUT_PILLARS, ABOUT_MILESTONES, ABOUT_CONTENT } from '../data/about'

export default function AboutSection({
  pillars = ABOUT_PILLARS,
  milestones = ABOUT_MILESTONES,
  content = ABOUT_CONTENT,
}) {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 xl:gap-24 items-center">

          {/* Left — Visual composition */}
          <RevealWrapper direction="right">
            {/* overflow-hidden on this container prevents decorative circles from spilling */}
            <div className="relative overflow-hidden sm:overflow-visible">
              {/* Primary visual block */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                <img
                  src="/icu.png"
                  alt="Sadbhav Hospital ICU"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" aria-hidden="true" />
                {/* Est. caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
                    <div className="text-[10px] sm:text-xs font-sans font-semibold text-white uppercase tracking-widest mb-1">Est. in Jamnagar</div>
                    <div className="font-display text-white/90 text-xs sm:text-sm leading-snug">
                      Dedicated to advancing respiratory and critical care since our founding.
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone stats grid — staggered reveal */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 max-w-xs sm:max-w-sm mx-auto lg:mx-0">
                {milestones.map(({ value, label }, i) => (
                  <RevealWrapper key={label} delay={i * 80}>
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-warm-100 shadow-card p-4 sm:p-5">
                      <div className="font-display font-bold text-2xl sm:text-3xl text-medical-500">{value}</div>
                      <div className="text-[11px] sm:text-xs text-warm-500 font-sans mt-1">{label}</div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>

              {/* Decorative rings — hidden on small screens to prevent overflow */}
              <div className="hidden sm:block absolute -top-6 -left-6 w-20 h-20 rounded-full border-2 border-medical-100 pointer-events-none" aria-hidden="true" />
              <div className="hidden sm:block absolute top-1/2 -right-4 w-12 h-12 rounded-full border border-crimson-100 pointer-events-none" aria-hidden="true" />
            </div>
          </RevealWrapper>

          {/* Right — Text content */}
          <RevealWrapper delay={100}>
            <div className="space-y-6 sm:space-y-8">
              <div>
                <SectionHeader
                  label={content.sectionLabel}
                  heading={content.heading}
                />
                <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                  {content.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed text-pretty ${
                        i === 0 ? 'text-warm-500 text-base sm:text-lg' : 'text-warm-400 text-sm sm:text-base'
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Pillars checklist */}
              <ul className="space-y-2.5 sm:space-y-3" role="list">
                {pillars.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle
                      size={17}
                      strokeWidth={2}
                      className="text-medical-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-warm-600 text-sm font-body leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Vision quote */}
              <blockquote className="bg-warm-50 border-l-4 border-medical-400 rounded-r-2xl pl-5 sm:pl-6 pr-5 sm:pr-6 py-4 sm:py-5">
                <p className="font-display italic text-navy-600 text-base sm:text-lg leading-relaxed">
                  {content.vision}
                </p>
              </blockquote>

              {/* Free Friday OPD note */}
              <p className="text-warm-500 text-sm font-sans leading-relaxed">
                New patients can walk in free of charge every Friday for OPD consultation.
              </p>

              <a
                href={content.ctaHref}
                className="inline-flex items-center gap-2 text-medical-500 font-sans font-semibold text-sm hover:gap-3 transition-all duration-200"
              >
                {content.ctaLabel}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
