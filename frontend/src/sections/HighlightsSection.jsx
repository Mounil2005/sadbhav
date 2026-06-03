import { getIcon } from '../utils/icons'
import RevealWrapper from '../components/ui/RevealWrapper'
import { HIGHLIGHTS } from '../data/highlights'

export default function HighlightsSection({ highlights = HIGHLIGHTS }) {
  return (
    <section className="relative bg-navy-800 py-16 sm:py-20 overflow-hidden">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          {highlights.map(({ id, icon, label, description }, i) => {
            const Icon = getIcon(icon)
            return (
              <RevealWrapper key={id} delay={i * 70}>
                <div className="group bg-navy-800 hover:bg-white/[0.04] transition-colors duration-300 px-6 sm:px-8 py-8 sm:py-10 h-full">
                  <div className="text-[11px] font-sans font-semibold text-white/20 tracking-widest mb-5">
                    0{i + 1}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-4" aria-hidden="true">
                    {Icon && <Icon size={18} strokeWidth={1.8} className="text-medical-300" />}
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2">{label}</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-body leading-relaxed">{description}</p>
                  <div className="mt-5 w-6 h-px bg-medical-400/40 group-hover:w-12 transition-all duration-300" />
                </div>
              </RevealWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
