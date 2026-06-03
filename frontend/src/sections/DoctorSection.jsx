import { Quote } from 'lucide-react'
import { getIcon } from '../utils/icons'
import SectionHeader from '../components/ui/SectionHeader'
import HospitalImage from '../components/ui/HospitalImage'
import RevealWrapper from '../components/ui/RevealWrapper'
import { DOCTOR, DOCTOR_JOURNEY } from '../data/doctor'

export default function DoctorSection({ doctor = DOCTOR, journey = DOCTOR_JOURNEY }) {
  return (
    <>
      {/* ── Doctor Card ── */}
      <section id="doctor" className="py-20 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <RevealWrapper>
            <div className="text-center mb-12 sm:mb-16">
              <SectionHeader
                label="Leadership"
                heading="Meet Our Lead Physician"
                align="center"
              />
            </div>
          </RevealWrapper>

          <RevealWrapper delay={80}>
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-premium border border-warm-100 max-w-5xl mx-auto">

              {/* Left — Portrait panel */}
              <div
                className="relative min-h-[400px] sm:min-h-[480px] lg:min-h-0"
                style={{ background: 'linear-gradient(160deg, #1a3a6b 0%, #1e5fa8 50%, #2255a0 100%)' }}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center pb-16 sm:pb-20 gap-4 px-6">
                  <div className="relative">
                    <div
                      className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-white/20 shadow-xl"
                      role="img"
                      aria-label={doctor.name}
                      style={{
                        backgroundImage: 'url(/vivek_sir_trial.png)',
                        backgroundSize: '120%',
                        backgroundPosition: '63.3% 43.0%',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-400 rounded-full px-3 py-1 text-white text-[10px] sm:text-xs font-semibold shadow-md">
                      {doctor.status}
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="font-display font-semibold text-white text-xl sm:text-2xl">{doctor.name}</h3>
                    <p className="text-medical-200 text-sm font-sans mt-1">{doctor.qualifications}</p>
                    <p className="text-white/50 text-xs mt-1 font-sans">{doctor.hospital}</p>
                  </div>
                </div>

                <div className="absolute top-6 sm:top-8 left-0 bg-crimson-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-r-full text-[10px] sm:text-xs font-sans font-semibold tracking-wide">
                  {doctor.experienceLabel}
                </div>
              </div>

              {/* Right — Info panel */}
              <div className="bg-white p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-6 sm:gap-8">
                <div>
                  <div className="text-[10px] sm:text-xs font-sans font-semibold text-medical-500 tracking-widest uppercase mb-3">
                    {doctor.role}
                  </div>
                  {doctor.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`leading-relaxed text-pretty ${i === 0 ? 'text-warm-600 text-sm sm:text-base mb-3 sm:mb-4' : 'text-warm-500 text-xs sm:text-sm'}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {doctor.credentials.map(({ icon, label, sub }) => {
                    const Icon = getIcon(icon)
                    return (
                      <div key={label} className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-warm-50 border border-warm-100">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-medical-50 flex items-center justify-center flex-shrink-0">
                          {Icon && <Icon size={14} strokeWidth={1.8} className="text-medical-500" aria-hidden="true" />}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-sans font-semibold text-navy-700 leading-none truncate">{label}</div>
                          <div className="text-[10px] sm:text-xs text-warm-400 mt-0.5 truncate">{sub}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div>
                  <div className="text-[10px] sm:text-xs font-sans font-semibold text-warm-400 uppercase tracking-widest mb-2 sm:mb-3">
                    Areas of Specialisation
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {doctor.specialisations.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-medical-50 border border-medical-100 text-medical-600 text-[10px] sm:text-xs font-sans font-medium rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    data-cal-link={doctor.cta.primary.calLink}
                    data-cal-namespace="30min"
                    data-cal-config='{"layout":"month_view"}'
                    className="btn-primary text-sm"
                  >
                    {doctor.cta.primary.label}
                  </button>
                  <a href={doctor.cta.secondary.href} className="btn-outline text-sm">
                    {doctor.cta.secondary.label}
                  </a>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-16 sm:py-20 bg-navy-800 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-medical-400/30 to-transparent" aria-hidden="true" />

        <RevealWrapper>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Quote size={32} className="text-medical-400/40 mx-auto mb-6" aria-hidden="true" />
            <blockquote className="font-display text-2xl sm:text-3xl md:text-[2rem] text-white font-semibold leading-snug text-balance mb-8 sm:mb-10">
              {doctor.quote.text.replace(/^[""]|[""]$/g, '')}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img
                src="/vivek sir final.jpg"
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div className="text-left">
                <div className="font-sans font-semibold text-white text-sm">{doctor.name}</div>
                <div className="text-[11px] text-white/40 font-sans mt-0.5">{doctor.role}</div>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {/* ── Professional Journey ── */}
      <section className="py-20 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <RevealWrapper>
            <div className="mb-14 sm:mb-18">
              <SectionHeader
                label="Professional Journey"
                heading="Years of Expertise"
              />
            </div>
          </RevealWrapper>

          <div className="space-y-0">
            {journey.map((milestone, i) => {
              const isEven = i % 2 === 1
              return (
                <RevealWrapper key={milestone.id} delay={i * 60}>
                  <div className={`grid lg:grid-cols-2 gap-0 border-t border-warm-100 ${i === journey.length - 1 ? 'border-b' : ''}`}>

                    {/* Year/Stage panel */}
                    <div
                      className={`py-10 sm:py-12 lg:py-16 ${isEven ? 'lg:order-2 lg:pl-14 xl:pl-20' : 'lg:pr-14 xl:pr-20'} flex flex-col justify-center`}
                    >
                      <div
                        className="text-[80px] sm:text-[100px] font-display font-bold leading-none select-none mb-1 -ml-1"
                        style={{ color: milestone.accent, opacity: 0.12 }}
                        aria-hidden="true"
                      >
                        {milestone.year.split('–')[0].trim()}
                      </div>
                      <div className="-mt-6 sm:-mt-8">
                        <div className="text-[10px] font-sans font-semibold tracking-widest uppercase text-medical-500 mb-2">
                          {milestone.stage}
                        </div>
                        <div className="font-display font-bold text-3xl sm:text-4xl text-navy-800 leading-tight">
                          {milestone.year}
                        </div>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div
                      className={`py-10 sm:py-12 lg:py-16 ${isEven ? 'lg:order-1 lg:pr-14 xl:pr-20 lg:border-r border-warm-100' : 'lg:pl-14 xl:pl-20 lg:border-l border-warm-100'} flex flex-col justify-center`}
                    >
                      {milestone.imageUrl && (
                        <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden mb-6">
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                        </div>
                      )}
                      <h3 className="font-display font-semibold text-xl sm:text-2xl text-navy-800 mb-3 sm:mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-warm-500 text-sm sm:text-base leading-relaxed text-pretty">
                        {milestone.body}
                      </p>
                    </div>

                  </div>
                </RevealWrapper>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
