import { ArrowRight } from 'lucide-react'
import { getIcon } from '../utils/icons'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { SERVICES, SERVICES_CONTENT } from '../data/services'

export default function ServicesSection({
  services = SERVICES,
  content = SERVICES_CONTENT,
}) {
  return (
    <section id="services" className="py-20 sm:py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Split header */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-end mb-12 sm:mb-16">
          <RevealWrapper>
            <SectionHeader
              label={content.sectionLabel}
              heading={content.heading}
            />
          </RevealWrapper>
          <RevealWrapper delay={80}>
            <p className="section-subheading lg:text-right">
              {content.subheading}
            </p>
          </RevealWrapper>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)

            return (
              <RevealWrapper key={service.id} delay={i * 60}>
                <div className="group card-base h-full p-6 sm:p-8 cursor-pointer bg-white">
                  {/* Tag */}
                  <div className="inline-block text-[10px] sm:text-xs font-sans font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full mb-4 sm:mb-5 bg-medical-50 text-medical-600">
                    {service.tag}
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-colors bg-warm-50 group-hover:bg-medical-50">
                    {Icon && (
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className="text-warm-500 group-hover:text-medical-500 transition-colors"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-navy-700">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 text-warm-500">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-sans font-medium group-hover:gap-3 transition-all duration-200 text-medical-500">
                    Learn more
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
              </RevealWrapper>
            )
          })}
        </div>

        {/* CTA strip */}
        <RevealWrapper delay={100}>
          <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl border border-warm-100 shadow-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-navy-700 mb-1">
                {content.cta.heading}
              </h3>
              <p className="text-warm-500 text-sm">{content.cta.sub}</p>
            </div>
            <a href={content.cta.href} className="btn-primary flex-shrink-0">
              {content.cta.label}
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
