import { useState, useEffect } from 'react'
import { Phone, Calendar } from 'lucide-react'
import { getIcon } from '../utils/icons'
import RevealWrapper from '../components/ui/RevealWrapper'
import { SITE, TRUST_BADGES } from '../data/site'

const HERO_SLIDES = [
  { src: '/Reception.png', alt: 'Sadbhav Hospital reception' },
  { src: '/AC Private room.png', alt: 'AC private rooms' },
  { src: '/Consultation Cabin.png', alt: 'Consultation cabin' },
  { src: '/General Ward.png', alt: 'General ward' },
]

export default function HeroSection() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-[92svh] md:min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Background architectural layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -right-32 top-0 bottom-0 w-1/2 hidden sm:block"
          style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 40%, #f0f9ff 100%)',
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #1e5fa820 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-500 via-medical-400 to-crimson-500" />
        <div
          className="absolute left-0 top-1/4 w-[700px] h-[700px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 15% 50%, rgba(30, 95, 168, 0.07) 0%, transparent 65%)',
          }}
        />
        <div className="absolute bottom-16 left-0 w-16 sm:w-24 h-0.5 bg-medical-200" />
        <div className="absolute bottom-16 left-20 sm:left-28 w-6 sm:w-8 h-0.5 bg-crimson-300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left — Content ── */}
          <RevealWrapper>
            <div className="space-y-6 sm:space-y-8">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-50 border border-medical-100 rounded-full">
                <span className="text-[11px] sm:text-xs font-sans font-semibold text-medical-600 tracking-widest uppercase">
                  {SITE.tagline}
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[64px] font-semibold text-navy-800 leading-tighter text-balance">
                  Your Health,{' '}
                  <span className="relative inline-block">
                    Our
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-medical-400 to-medical-300 rounded-full"
                      aria-hidden="true"
                    />
                  </span>{' '}
                  <span className="text-medical-500">Dedication.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-warm-500 font-body leading-relaxed max-w-lg text-pretty">
                  Compassionate, expert-led respiratory and critical care for every patient.
                  Modern medicine delivered with warmth, precision, and genuine concern.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  data-cal-link="mounil-kankhara-tsigot/30min"
                  data-cal-namespace="30min"
                  data-cal-config='{"layout":"month_view"}'
                  className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-md"
                >
                  <Calendar size={16} strokeWidth={2} aria-hidden="true" />
                  Book Appointment
                </button>
                <a
                  href={SITE.phoneHref}
                  className="btn-emergency text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-md"
                  aria-label="Emergency: call now"
                >
                  <Phone size={16} strokeWidth={2} aria-hidden="true" />
                  Emergency: Call Now
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-warm-100">
                {TRUST_BADGES.map(({ icon, label, sub }) => {
                  const Icon = getIcon(icon)
                  return (
                    <div key={label} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-medical-50 flex items-center justify-center flex-shrink-0">
                        {Icon && (
                          <Icon size={15} strokeWidth={1.8} className="text-medical-500" aria-hidden="true" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-sans font-semibold text-navy-700 leading-none">{label}</div>
                        <div className="text-[10px] sm:text-xs text-warm-400 mt-0.5">{sub}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </RevealWrapper>

          {/* ── Right — Visual composition ── */}
          <RevealWrapper delay={150} direction="left" className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Hero visual panel — auto-sliding */}
              <div
                className="relative w-full rounded-3xl shadow-premium overflow-hidden"
                style={{ aspectRatio: '4/5' }}
              >
                {/* Slides */}
                {HERO_SLIDES.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-navy-900" style={{ opacity: 0.35 }} aria-hidden="true" />

                {/* Dot pattern */}
                <div
                  className="absolute inset-0 opacity-[0.06] z-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
                    backgroundSize: '22px 22px',
                  }}
                  aria-hidden="true"
                />
                {/* Medical cross watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] z-10" aria-hidden="true">
                  <svg viewBox="0 0 200 200" className="w-3/4">
                    <rect x="80" y="20" width="40" height="160" rx="8" fill="white" />
                    <rect x="20" y="80" width="160" height="40" rx="8" fill="white" />
                  </svg>
                </div>

                {/* Caption */}
                <div className="absolute inset-0 p-8 md:p-10 pb-20 md:pb-24 flex flex-col justify-end text-white/90 z-20">
                  <div className="mb-6">
                    <div className="w-16 h-px bg-white/30 mb-4" aria-hidden="true" />
                    <p className="font-display text-xl md:text-2xl font-medium leading-snug">
                      Where every breath<br />matters most.
                    </p>
                    <p className="text-sm text-white/60 mt-2 font-body">
                      Specialized respiratory care<br />with ICU-grade infrastructure
                    </p>
                  </div>
                </div>

                {/* Slide indicators */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>

                {/* Decorative circles */}
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-white/5 border border-white/10 z-20" aria-hidden="true" />
                <div className="absolute top-14 right-14 w-9 h-9 rounded-full bg-white/5 z-20" aria-hidden="true" />
              </div>

              {/* Floating stat — top left */}
              <div
                className="absolute -left-10 xl:-left-12 top-12 bg-white rounded-2xl shadow-premium p-4 min-w-[140px] border border-warm-100"
                aria-label="5 or more years of clinical excellence"
              >
                <div className="text-3xl font-display font-bold text-medical-500">5+</div>
                <div className="text-xs text-warm-500 font-sans mt-1 leading-tight">Years of<br />Clinical Excellence</div>
                <div className="mt-2 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="w-4 h-0.5 rounded-full bg-medical-200" />
                  ))}
                </div>
              </div>

              {/* Floating stat — bottom right */}
              <div
                className="absolute -right-8 xl:-right-10 bottom-16 bg-white rounded-2xl shadow-premium p-4 min-w-[152px] border border-warm-100"
                aria-label="ICU and step-down unit, active 24/7"
              >
                <div className="text-sm font-sans font-semibold text-navy-700">ICU & Step-Down</div>
                <div className="text-xs text-warm-400 mt-0.5">Advanced Critical Care</div>
              </div>

              {/* Floating stat — bottom left */}
              <div
                className="absolute -left-6 -bottom-6 bg-navy-800 rounded-2xl shadow-premium p-4 min-w-[160px]"
                aria-label="24 hour emergency care, 7 days a week"
              >
                <div className="text-white/60 text-[10px] font-sans mb-1 uppercase tracking-widest">Emergency</div>
                <div className="text-white font-sans font-bold text-lg">24 / 7</div>
                <div className="text-white/50 text-xs mt-0.5">Always available</div>
              </div>
            </div>

            {/* Decorative rings */}
            <div className="absolute -top-8 -right-8 w-72 h-72 rounded-full border-2 border-medical-100 pointer-events-none" aria-hidden="true" />
            <div className="absolute -top-4 -right-4 w-56 h-56 rounded-full border border-medical-50 pointer-events-none" aria-hidden="true" />
          </RevealWrapper>
        </div>
      </div>

    </section>
  )
}
