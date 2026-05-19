import { Quote } from 'lucide-react'
import StarRating from '../components/ui/StarRating'
import SectionHeader from '../components/ui/SectionHeader'
import RevealWrapper from '../components/ui/RevealWrapper'
import { TESTIMONIALS, TESTIMONIALS_CONTENT } from '../data/testimonials'
import { SOCIAL_PROOF_STATS } from '../data/site'

function TestimonialCard({ name, location, condition, review, rating }) {
  return (
    <article className="card-base bg-white p-6 sm:p-7 flex flex-col gap-3 sm:gap-4">
      <Quote
        size={22}
        strokeWidth={1.5}
        className="text-medical-200 flex-shrink-0"
        aria-hidden="true"
      />
      <p className="text-warm-600 text-sm leading-relaxed flex-1 text-pretty">{review}</p>
      <StarRating count={rating} />
      <div className="w-full h-px bg-warm-100" aria-hidden="true" />
      <div>
        <div className="font-sans font-semibold text-navy-700 text-sm">{name}</div>
        <div className="text-xs text-warm-400 mt-0.5">{location}</div>
        <div className="text-xs text-medical-500 mt-1 font-medium">{condition}</div>
      </div>
    </article>
  )
}

export default function TestimonialsSection({
  testimonials = TESTIMONIALS,
  content = TESTIMONIALS_CONTENT,
  stats = SOCIAL_PROOF_STATS,
}) {
  return (
    <section className="py-20 sm:py-24 bg-warm-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <RevealWrapper>
          <div className="text-center mb-10 sm:mb-14">
            <SectionHeader
              label={content.sectionLabel}
              heading={content.heading}
              subheading={content.subheading}
              align="center"
            />
          </div>
        </RevealWrapper>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {testimonials.map((testimonial, i) => (
            <RevealWrapper key={testimonial.id} delay={i * 70}>
              <TestimonialCard {...testimonial} />
            </RevealWrapper>
          ))}
        </div>

        {/* Social proof stats bar */}
        <RevealWrapper delay={80}>
          <div
            className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 bg-white rounded-2xl sm:rounded-3xl border border-warm-100 shadow-card overflow-hidden"
            role="list"
            aria-label="Hospital statistics"
          >
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                role="listitem"
                className={[
                  'px-5 sm:px-8 py-5 sm:py-7 text-center',
                  i < stats.length - 1 ? 'border-r border-warm-100' : '',
                  i < 2 ? 'border-b md:border-b-0 border-warm-100' : '',
                ].filter(Boolean).join(' ')}
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-medical-500">{value}</div>
                <div className="text-[10px] sm:text-xs text-warm-400 font-sans mt-1 sm:mt-1.5">{label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
