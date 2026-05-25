export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  {
    label: 'Services',
    href: '/#services',
    children: [
      { label: 'Pulmonary Care', href: '/#services' },
      { label: 'ICU & Critical Care', href: '/#services' },
      { label: 'Respiratory Disorders', href: '/#services' },
      { label: 'Asthma & COPD', href: '/#services' },
    ],
  },
  { label: 'Doctor', href: '/#doctor' },
  { label: 'Facilities', href: '/#facilities' },
  { label: 'Health Tips', href: '/health-tips' },
  { label: 'Contact', href: '/#contact' },
]
