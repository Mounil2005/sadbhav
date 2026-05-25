import { getIcon } from '../utils/icons'
import RevealWrapper from '../components/ui/RevealWrapper'
import { HIGHLIGHTS } from '../data/highlights'

export default function HighlightsSection({ highlights = HIGHLIGHTS }) {
  return (
    <section className="relative bg-navy-800 py-16 sm:py-20 overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-medical-400/40 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <RevealWrapper>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-block text-[10px] sm:text-xs font-sans font-semibold tracking-widest2 uppercase text-medical-300 mb-3">
              What Sets Us Apart
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Healthcare Built on Expertise
            </h2>
          </div>
        </RevealWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {highlights.map(({ id, icon, label, description }, i) => {
            const Icon = getIcon(icon)
            return (
              <RevealWrapper key={id} delay={i * 70}>
                <div className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-7 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                    aria-hidden="true"
                  >
                    {Icon && <Icon size={20} strokeWidth={1.8} className="text-white" />}
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2">{label}</h3>
                  <p className="text-xs sm:text-sm text-white/55 font-body leading-relaxed">{description}</p>
                  <div
                    className="mt-4 sm:mt-5 w-8 h-0.5 bg-white/20 group-hover:w-14 transition-all duration-300 rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </RevealWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
