import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { getIcon } from '../utils/icons'
import {
  SITE,
  SOCIAL_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_LEGAL_LINKS,
} from '../data/site'
import { SERVICES } from '../data/services'

export default function Footer() {
  const footerServices = SERVICES.map((s) => ({ label: s.title, href: `#services` }))

  return (
    <footer className="bg-navy-900 text-white">
      {/* Emergency banner */}
      <div className="bg-crimson-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Phone size={16} strokeWidth={2} className="text-white" />
            </div>
            <div>
              <span className="font-sans font-bold text-white text-sm">24/7 Emergency Line: </span>
              <a href={SITE.phoneHref} className="font-sans font-bold text-white hover:underline">
                {SITE.phone}
              </a>
            </div>
          </div>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us"
            className="inline-flex items-center justify-center w-10 h-10 bg-white text-crimson-600 rounded-full hover:bg-crimson-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <img
                src="/sadbhav_transparent.png"
                alt={SITE.name}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed mb-6">
              {SITE.description}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ platform, icon, href }) => {
                const Icon = getIcon(icon)
                return (
                  <a
                    key={platform}
                    href={href}
                    aria-label={platform}
                    className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-medical-500 transition-colors border border-white/10"
                  >
                    {Icon && <Icon size={16} strokeWidth={1.8} className="text-white/60" />}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick links */}
          <FooterLinkList heading="Quick Links" links={FOOTER_QUICK_LINKS} />

          {/* Services */}
          <FooterLinkList heading="Our Services" links={footerServices} />

          {/* Contact */}
          <div>
            <div className="text-xs font-sans font-semibold tracking-widest2 uppercase text-white/40 mb-5">
              Contact
            </div>
            <div className="space-y-4">
              <FooterContactRow icon={<MapPin size={16} strokeWidth={1.8} className="text-medical-400" />}>
                <div className="text-white/80 text-sm font-sans">{SITE.name}</div>
                <div className="text-white/40 text-xs mt-0.5 leading-relaxed whitespace-pre-line">
                  {SITE.address.display}
                </div>
              </FooterContactRow>

              <FooterContactRow icon={<Phone size={16} strokeWidth={1.8} className="text-medical-400" />}>
                <a href={SITE.phoneHref} className="text-white/80 text-sm font-sans hover:text-white transition-colors">
                  {SITE.phone}
                </a>
                <div className="text-white/40 text-xs mt-0.5">Emergency 24/7</div>
              </FooterContactRow>

              <FooterContactRow icon={<Mail size={16} strokeWidth={1.8} className="text-medical-400" />}>
                <a href={`mailto:${SITE.email}`} className="text-white/80 text-sm font-sans hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </FooterContactRow>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-white/30">
          <span>&copy; {SITE.year} {SITE.name}. All Rights Reserved.</span>
          <div className="flex gap-5">
            {FOOTER_LEGAL_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="hover:text-white/60 transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinkList({ heading, links }) {
  return (
    <div>
      <div className="text-xs font-sans font-semibold tracking-widest2 uppercase text-white/40 mb-5">
        {heading}
      </div>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-white/60 hover:text-white font-sans transition-colors flex items-center gap-2 group"
            >
              <ArrowRight
                size={12}
                className="text-medical-400 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterContactRow({ icon, children }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>{children}</div>
    </div>
  )
}
