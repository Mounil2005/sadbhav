import { Quote } from 'lucide-react'
import { getIcon } from '../utils/icons'
import SectionHeader from '../components/ui/SectionHeader'
import HospitalImage from '../components/ui/HospitalImage'
import RevealWrapper from '../components/ui/RevealWrapper'
import { DOCTOR } from '../data/doctor'

export default function DoctorSection({ doctor = DOCTOR }) {
  return (
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

        {/* Split editorial card */}
        <RevealWrapper delay={80}>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-premium border border-warm-100 max-w-5xl mx-auto">

            {/* Left — Portrait panel */}
            <div
              className="relative min-h-[400px] sm:min-h-[480px] lg:min-h-0"
              style={{
                background: 'linear-gradient(160deg, #1a3a6b 0%, #1e5fa8 50%, #2255a0 100%)',
              }}
            >
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
                aria-hidden="true"
              />

              {/* Doctor portrait */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pb-16 sm:pb-20 gap-4 px-6 -translate-x-0">
                {/* Circular photo */}
                <div className="relative">
                  <div
                    id="doctor-photo-circle"
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
                {/* Name block */}
                <div className="text-center mt-2">
                  <h3 className="font-display font-semibold text-white text-xl sm:text-2xl">{doctor.name}</h3>
                  <p className="text-medical-200 text-sm font-sans mt-1">{doctor.qualifications}</p>
                  <p className="text-white/50 text-xs mt-1 font-sans">{doctor.hospital}</p>
                </div>
              </div>

              {/* Experience ribbon */}
              <div className="absolute top-6 sm:top-8 left-0 bg-crimson-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-r-full text-[10px] sm:text-xs font-sans font-semibold tracking-wide">
                {doctor.experienceLabel}
              </div>
            </div>

            {/* Right — Info panel */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-6 sm:gap-8">
              {/* Role + bio */}
              <div>
                <div className="text-[10px] sm:text-xs font-sans font-semibold text-medical-500 tracking-widest uppercase mb-3">
                  {doctor.role}
                </div>
                {doctor.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed text-pretty ${i === 0 ? 'text-warm-600 text-sm sm:text-base mb-3 sm:mb-4' : 'text-warm-500 text-xs sm:text-sm'
                      }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {doctor.credentials.map(({ icon, label, sub }) => {
                  const Icon = getIcon(icon)
                  return (
                    <div key={label} className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-warm-50 border border-warm-100">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-medical-50 flex items-center justify-center flex-shrink-0">
                        {Icon && (
                          <Icon size={14} strokeWidth={1.8} className="text-medical-500" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-sans font-semibold text-navy-700 leading-none truncate">{label}</div>
                        <div className="text-[10px] sm:text-xs text-warm-400 mt-0.5 truncate">{sub}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Specialisations */}
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

              {/* Quote */}
              <blockquote className="border-l-4 border-medical-200 pl-4 sm:pl-5 py-1">
                <Quote size={18} className="text-medical-200 mb-1.5 sm:mb-2" aria-hidden="true" />
                <p className="font-display italic text-navy-600 text-sm sm:text-base leading-relaxed">
                  {doctor.quote.text}
                </p>
                <cite className="text-[10px] sm:text-xs text-warm-400 font-sans mt-1.5 sm:mt-2 block not-italic">
                  {doctor.quote.attribution}
                </cite>
              </blockquote>

              {/* CTAs */}
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
  )
}
