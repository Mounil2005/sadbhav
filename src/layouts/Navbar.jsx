import { useState } from 'react'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { NAV_LINKS } from '../data/navigation'
import { SITE } from '../data/site'
import { cn } from '../utils/cn'

export default function Navbar() {
  const scrolled = useScrollPosition(24)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)


  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <>
      {/* Skip navigation — keyboard accessibility */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>


      {/* Main nav */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 border-b border-warm-100',
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-nav' : 'bg-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group flex-shrink-0"
              aria-label={`${SITE.name} — home`}
            >
              <img
                src="/sadbhav_transparent.png"
                alt={SITE.name}
                className="h-9 md:h-10 w-auto object-contain"
              />
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={link.href}
                    className="nav-link flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg hover:bg-warm-50"
                    aria-haspopup={link.children ? 'true' : undefined}
                    aria-expanded={link.children ? activeDropdown === link.label : undefined}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={13}
                        strokeWidth={2}
                        className={cn(
                          'text-warm-400 transition-transform duration-200',
                          activeDropdown === link.label && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </a>

                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50">
                      <div className="bg-white rounded-xl shadow-premium border border-warm-100 py-1.5 overflow-hidden">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-warm-600 hover:text-medical-500 hover:bg-warm-50 transition-colors font-sans"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right CTAs + mobile toggle */}
            <div className="flex items-center gap-2 md:gap-3">
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
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden border-t border-warm-100 bg-white overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          )}
          aria-hidden={!mobileOpen}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-0.5">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  className="block py-3 px-3 text-sm font-medium text-warm-700 hover:text-medical-500 rounded-xl hover:bg-warm-50 transition-colors"
                  onClick={closeMobile}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="ml-4 border-l-2 border-warm-100 pl-4 space-y-0.5">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block py-2 px-2 text-sm text-warm-500 hover:text-medical-500 rounded-lg transition-colors"
                        onClick={closeMobile}
                        tabIndex={mobileOpen ? 0 : -1}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
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
              <a href={SITE.phoneHref} className="btn-emergency justify-center">
                <Phone size={15} aria-hidden="true" /> Emergency Call
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
