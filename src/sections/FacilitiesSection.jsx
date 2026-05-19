import { Activity } from 'lucide-react'
import { getIcon } from '../utils/icons'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { FACILITIES, FACILITIES_CONTENT } from '../data/facilities'

export default function FacilitiesSection({
  facilities = FACILITIES,
  content = FACILITIES_CONTENT,
}) {
  return (
    <section id="facilities" className="py-20 sm:py-24 bg-navy-800 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 hidden lg:block"
        style={{ background: 'linear-gradient(180deg, transparent, #1e5fa8, transparent)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-end mb-12 sm:mb-16">
          <RevealWrapper>
            <SectionHeader
              label={content.sectionLabel}
              heading={content.heading}
              theme="dark"
            />
          </RevealWrapper>
          <RevealWrapper delay={80}>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed font-body">
              {content.subheading}
            </p>
          </RevealWrapper>
        </div>

        {/* Facilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {facilities.map(({ id, icon, name, detail, spec }, i) => {
            const Icon = getIcon(icon)
            return (
              <RevealWrapper key={id} delay={i * 60}>
                <div className="group relative h-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 hover:bg-white/10 transition-all duration-300">
                  {/* Spec badge */}
                  <div className="absolute top-4 sm:top-5 right-4 sm:right-5 px-2 sm:px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-[10px] sm:text-xs text-white/40 font-sans">
                    {spec}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-medical-500/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-medical-500/30 transition-colors">
                    {Icon && (
                      <Icon size={18} strokeWidth={1.8} className="text-medical-300" aria-hidden="true" />
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2">{name}</h3>
                  <p className="text-xs sm:text-sm text-white/50 font-body leading-relaxed">{detail}</p>

                  <div
                    className="absolute bottom-0 left-6 sm:left-7 right-6 sm:right-7 h-px bg-white/5 group-hover:bg-medical-400/30 transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </RevealWrapper>
            )
          })}
        </div>

        {/* Hygiene callout */}
        <RevealWrapper delay={60}>
          <div className="mt-10 sm:mt-14 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-medical-500/20 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
              aria-hidden="true"
            >
              <Activity size={22} strokeWidth={1.8} className="text-medical-300" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-white text-base sm:text-lg mb-1.5">
                {content.hygiene.heading}
              </h4>
              <p className="text-white/50 text-xs sm:text-sm font-body leading-relaxed max-w-2xl">
                {content.hygiene.body}
              </p>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
