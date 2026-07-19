export const SERVICES = [
  // Row 1 — image cards
  {
    id: 'pulmonary-care',
    slug: 'pulmonary-care',
    icon: 'Wind',
    title: 'Pulmonary Care',
    description:
      'Comprehensive evaluation and management of all lung conditions including infections, fibrosis, and occupational lung diseases.',
    tag: 'Respiratory',
    featured: true,
    imageUrl: '/Pulmonary Tests.jpeg',
  },
  {
    id: 'icu-critical-care',
    slug: 'icu-critical-care',
    icon: 'Activity',
    title: 'ICU & Critical Care',
    description:
      'A fully equipped intensive care unit with advanced life-support systems and round-the-clock specialist monitoring.',
    tag: 'Intensive Care',
    featured: false,
    imageUrl: '/Ventilator.jpeg',
  },
  {
    id: 'bronchoscopy',
    slug: 'bronchoscopy',
    icon: 'Microscope',
    title: 'Bronchoscopy',
    description:
      'Direct visualisation of the airways using a flexible bronchoscope for diagnosis and treatment of lung and airway conditions.',
    tag: 'Procedure',
    featured: false,
    imageUrl: '/Bronchoscopy.jpeg',
  },
  // Row 2 — image cards
  {
    id: 'thoracoscopy',
    slug: 'thoracoscopy',
    icon: 'Microscope',
    title: 'Thoracoscopy',
    description:
      'Minimally invasive procedure to examine the pleural space and lungs, used for diagnosis and treatment of pleural diseases.',
    tag: 'Procedure',
    featured: false,
    imageUrl: '/Thoracoscopy.jpeg',
  },
  {
    id: 'sonography',
    slug: 'sonography',
    icon: 'ScanLine',
    title: 'Sonography',
    description:
      'On-site ultrasound imaging for chest and abdominal assessment, guiding procedures and providing real-time diagnostic support.',
    tag: 'Diagnostics',
    featured: false,
    imageUrl: '/Sonography.jpeg',
  },
  {
    id: 'thoracentesis',
    slug: 'thoracentesis',
    icon: 'Syringe',
    title: 'Thoracentesis',
    description:
      'Safe, guided removal of fluid from the pleural space for diagnostic analysis or therapeutic relief of breathing difficulty.',
    tag: 'Procedure',
    featured: false,
    imageUrl: '/thoracentesis.jpeg',
  },
  // Row 3 — text cards
  {
    id: 'asthma-copd',
    slug: 'asthma-copd-treatment',
    icon: 'Stethoscope',
    title: 'Asthma & COPD',
    description:
      'Evidence-based treatment programmes for chronic obstructive pulmonary disease and asthma with long-term management support.',
    tag: 'Chronic Care',
    featured: false,
    imageUrl: null,
  },
  {
    id: 'preventive-health',
    slug: 'preventive-health-consultation',
    icon: 'ShieldPlus',
    title: 'Preventive Health',
    description:
      'Personalised preventive consultations and health screenings designed to detect risk factors early and promote well-being.',
    tag: 'Wellness',
    featured: false,
    imageUrl: null,
  },
]

export const SERVICES_CONTENT = {
  sectionLabel: 'Our Specialities',
  heading: 'Expert Care Across\nKey Disciplines',
  subheading:
    'From chronic respiratory conditions to emergency critical care, our specialist-led services cover the full spectrum of pulmonary and related medical needs.',
  cta: {
    heading: 'Not sure which service you need?',
    sub: 'Speak with our medical team for guidance on the right care pathway for you.',
    label: 'Call for Guidance',
    href: 'tel:+919313043422',
  },
}
