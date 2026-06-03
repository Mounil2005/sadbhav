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

        <div>
          {facilities.map(({ id, icon, name, detail, spec }, i) => {
            const Icon = getIcon(icon)
            return (
              <RevealWrapper key={id} delay={i * 50}>
                <div className={`grid sm:grid-cols-[1fr_2fr] gap-x-8 sm:gap-x-12 gap-y-2 py-6 sm:py-7 group ${i > 0 ? 'border-t border-white/10' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-medical-500/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-medical-500/25 transition-colors">
                      {Icon && <Icon size={15} strokeWidth={1.8} className="text-medical-300" aria-hidden="true" />}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-sm sm:text-base leading-snug">{name}</h3>
                      <span className="text-[10px] text-white/30 font-sans">{spec}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 font-body leading-relaxed sm:pt-0.5">{detail}</p>
                </div>
              </RevealWrapper>
            )
          })}
        </div>

        <RevealWrapper delay={60}>
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/10 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-medical-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Activity size={16} strokeWidth={1.8} className="text-medical-300" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-white text-sm sm:text-base mb-1.5">
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
