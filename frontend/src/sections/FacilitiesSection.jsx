import { Activity, FlaskConical } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { FACILITIES, FACILITIES_CONTENT } from '../data/facilities'

function FacilityCard({ facility, large = false }) {
  const { name, detail, spec, imageUrl, bgGradient } = facility

  return (
    <div
      className={[
        'group relative overflow-hidden rounded-2xl transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40',
        large
          ? 'col-span-2 lg:col-span-2 lg:row-span-2 aspect-[16/9] lg:aspect-auto'
          : 'col-span-1 aspect-[4/3]',
      ].join(' ')}
      style={bgGradient ? { background: bgGradient } : undefined}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
      )}

      {/* Subtle dot texture for gradient placeholders */}
      {!imageUrl && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Spec badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[10px] text-white/65 font-sans">
        {spec}
      </div>

      {/* Content — always at bottom, inside image */}
      <div className={`absolute bottom-0 inset-x-0 ${large ? 'p-5 sm:p-7' : 'p-4 sm:p-5'}`}>
        <h3 className={`font-display font-semibold text-white leading-snug mb-1 ${large ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
          {name}
        </h3>
        <p className={`text-white/65 font-body leading-relaxed ${large ? 'text-xs sm:text-sm max-w-md' : 'text-[11px] sm:text-xs line-clamp-2'}`}>
          {detail}
        </p>
      </div>
    </div>
  )
}

export default function FacilitiesSection({
  facilities = FACILITIES,
  content = FACILITIES_CONTENT,
}) {
  const [feature, ...rest] = facilities

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

        <RevealWrapper>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <FacilityCard facility={feature} large />
            {rest.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </RevealWrapper>

        <RevealWrapper delay={60}>
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/10 space-y-6">
            <div className="flex gap-4 items-start">
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

            <div className="flex gap-4 items-start border-t border-white/10 pt-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FlaskConical size={16} strokeWidth={1.8} className="text-emerald-300" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-white text-sm sm:text-base mb-1.5">
                  {content.labPartner.heading}
                </h4>
                <p className="text-white/50 text-xs sm:text-sm font-body leading-relaxed max-w-2xl">
                  {content.labPartner.body}
                </p>
              </div>
            </div>
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}
