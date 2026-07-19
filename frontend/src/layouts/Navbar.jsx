import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/navigation'
import { SITE } from '../data/site'
import { cn } from '../utils/cn'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      {/* Height spacer so fixed nav doesn't overlap hero */}
      <div className="h-16" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-50">

        {/* Nav pill / bar — transitions between full-width bar and floating pill */}
        <div
          style={{
            width: scrolled ? 'min(940px, calc(100% - 2rem))' : '100%',
            margin: scrolled ? '10px auto 0' : '0 auto',
            borderRadius: scrolled ? '999px' : '0px',
            transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1), margin 0.45s cubic-bezier(0.4,0,0.2,1), border-radius 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s ease, background-color 0.3s ease, padding 0.3s ease',
          }}
          className={cn(
            scrolled
              ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-warm-100 px-4 sm:px-6'
              : 'bg-white border-b border-warm-100 px-4 sm:px-6'
          )}
        >
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex items-center justify-between"
            style={{
              height: scrolled ? '52px' : '64px',
              transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 flex-shrink-0"
              aria-label={`${SITE.name} — home`}
            >
              <img
                src="/sadbhav_transparent.png"
                alt={SITE.name}
                style={{
                  height: scrolled ? '32px' : '38px',
                  transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1)',
                }}
                className="w-auto object-contain"
              />
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link px-2.5 xl:px-3 py-2 rounded-lg hover:bg-warm-50"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2">
              <a
                href={SITE.phoneHref}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full border border-warm-200 text-warm-700 text-sm font-medium hover:bg-warm-50 hover:border-medical-300 hover:text-medical-600 transition-colors"
                aria-label={`Call us at ${SITE.phone}`}
              >
                <Phone size={14} strokeWidth={2} aria-hidden="true" />
                <span>{SITE.phone}</span>
              </a>
              <button
                className="lg:hidden p-2 rounded-lg text-warm-600 hover:bg-warm-50 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen
                  ? <X size={22} aria-hidden="true" />
                  : <Menu size={22} aria-hidden="true" />
                }
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu — drops below the pill or bar */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          )}
          aria-hidden={!mobileOpen}
        >
          <div className={cn(
            'bg-white border border-warm-100 shadow-xl py-3 px-4 space-y-0.5 mt-1',
            scrolled ? 'mx-4 sm:mx-6 rounded-2xl' : 'border-t-0 rounded-none'
          )}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 px-3 text-sm font-medium text-warm-700 hover:text-medical-500 rounded-xl hover:bg-warm-50 transition-colors"
                onClick={closeMobile}
                tabIndex={mobileOpen ? 0 : -1}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 pb-2 flex flex-col gap-2.5 border-t border-warm-100 mt-2">
              <button
                data-cal-link="mounil-kankhara-tsigot/30min"
                data-cal-namespace="30min"
                data-cal-config='{"layout":"month_view"}'
                className="btn-primary justify-center w-full"
                onClick={closeMobile}
              >
                Book Appointment
              </button>
              <a href={SITE.phoneHref} className="btn-emergency justify-center" onClick={closeMobile}>
                <Phone size={15} aria-hidden="true" /> Emergency Call
              </a>
            </div>
          </div>
        </div>

      </header>
    </>
  )
}
