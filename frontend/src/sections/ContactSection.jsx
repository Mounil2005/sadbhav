import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { SITE, VISITING_HOURS } from '../data/site'

function ContactInfoCard({ href, bg, borderColor, iconBg, icon: Icon, label, value, sub, isBlock = false }) {
  const base = `flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors`

  const inner = (
    <>
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 transition-colors`}>
        <Icon size={18} strokeWidth={2} className="text-white" aria-hidden="true" />
      </div>
      <div>
        <div className="text-[10px] sm:text-xs font-sans text-warm-400 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="font-sans font-semibold text-navy-700 text-sm sm:text-base">{value}</div>
        {sub && <div className="text-[10px] sm:text-xs text-warm-400 mt-0.5 whitespace-pre-line">{sub}</div>}
      </div>
    </>
  )

  if (isBlock) return <div className={`${base} ${bg} ${borderColor}`}>{inner}</div>

  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${base} ${bg} ${borderColor} hover:brightness-[0.97] group`}
    >
      {inner}
    </a>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <RevealWrapper>
          <div className="text-center mb-10 sm:mb-14">
            <SectionHeader
              label="Get in Touch"
              heading="Find Us"
              subheading="Visit us at our clinic or reach out directly. Our team is always available to help."
              align="center"
            />
          </div>
        </RevealWrapper>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-10 items-start">

          {/* Left — Contact info */}
          <RevealWrapper direction="right">
            <div className="space-y-4 sm:space-y-5">
              <ContactInfoCard
                href={SITE.phoneHref}
                bg="bg-medical-50"
                borderColor="border-medical-100"
                iconBg="bg-medical-500 group-hover:bg-medical-600"
                icon={Phone}
                label="Call Us"
                value={SITE.phone}
                sub="Available during visiting hours"
              />
              <ContactInfoCard
                href={SITE.whatsappHref}
                bg="bg-emerald-50"
                borderColor="border-emerald-100"
                iconBg="bg-emerald-500 group-hover:bg-emerald-600"
                icon={MessageCircle}
                label="WhatsApp"
                value="Message on WhatsApp"
                sub="Quick responses during working hours"
              />
              <ContactInfoCard
                isBlock
                bg="bg-warm-50"
                borderColor="border-warm-100"
                iconBg="bg-warm-200"
                icon={MapPin}
                label="Location"
                value={SITE.name}
                sub={SITE.address.display}
              />

              {/* Visiting hours */}
              <div className="bg-navy-800 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Clock size={15} strokeWidth={1.8} className="text-medical-300" aria-hidden="true" />
                  <span className="text-white font-sans font-semibold text-sm">Visiting Hours</span>
                </div>
                <dl className="space-y-2 sm:space-y-3">
                  {VISITING_HOURS.map(({ day, time, isEmergency, isClosed, isOutreach, outreach }) => (
                    <div
                      key={day}
                      className={`py-1.5 sm:py-2 border-b border-white/10 last:border-0 ${outreach ? '' : 'flex justify-between items-start'}`}
                    >
                      <dt className="text-white/60 text-xs sm:text-sm font-sans mb-1">{day}</dt>
                      {outreach ? (
                        <dd className="space-y-1.5 pl-1">
                          {outreach.map(({ week, places }) => (
                            <div key={week}>
                              <span className="text-[10px] font-sans font-semibold text-white/40 uppercase tracking-wider">{week} Sunday</span>
                              {places.map(({ name, time: t }) => (
                                <div key={name} className="flex justify-between items-baseline gap-3 mt-0.5">
                                  <span className="text-xs font-sans text-white/80">{name}</span>
                                  <span className="text-xs font-sans text-white whitespace-nowrap">{t}</span>
                                </div>
                              ))}
                            </div>
                          ))}
                        </dd>
                      ) : (
                        <dd className={`text-xs sm:text-sm font-sans font-medium text-right whitespace-pre-line ${isEmergency ? 'text-crimson-300' : isClosed ? 'text-white/40' : 'text-white'}`}>
                          {time}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>


            </div>
          </RevealWrapper>

          {/* Right — Map */}
          <RevealWrapper delay={100}>
            <div className="rounded-2xl sm:rounded-3xl border border-warm-200 overflow-hidden shadow-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14748.125100023579!2d70.060291!3d22.465459!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39576b2cb5285cd1%3A0x8977bbd3f6c2a63!2sSADBHAV%20HOSPITAL%20CHEST%20PHYSICIAN%20IN%20JAMNGAR%20DR%20VIVEK%20NANDA!5e0!3m2!1sen!2sin!4v1779126770951!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map — ${SITE.name}, Jamnagar`}
                className="w-full h-[320px] sm:h-[420px] lg:h-full lg:min-h-[520px] block"
              />
            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
