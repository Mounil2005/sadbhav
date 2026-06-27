export const DOCTOR_JOURNEY = [
  {
    id: 'education',
    year: '2005 – 2011',
    stage: 'Medical Education',
    title: 'Foundation in Medicine',
    body: 'Completed MBBS with a strong grounding in clinical sciences, human physiology, and patient care. Hospital rotations across medicine, surgery, and emergency shaped an early commitment to rigorous, evidence-based practice.',
    accent: '#1e3a6b',
  },
  {
    id: 'specialisation',
    year: '2011 – 2014',
    stage: 'Post-Graduate Specialisation',
    title: 'MD in Pulmonology',
    body: 'Pursued advanced post-graduate training in respiratory medicine — pulmonary physiology, advanced diagnostics, and the long-term management of conditions including asthma, COPD, and interstitial lung disease.',
    accent: '#1a4a5a',
  },
  {
    id: 'critical-care',
    year: '2014 – 2019',
    stage: 'Fellowship & Critical Care',
    title: 'ICU Training & Respiratory Interventions',
    body: 'Completed fellowship training at tertiary care hospitals, gaining intensive expertise in ventilator management, bronchoscopy, and critical care protocols. Managed complex respiratory emergencies alongside senior specialists.',
    accent: '#1a2a52',
  },
  {
    id: 'sadbhav',
    year: '2019 – Present',
    stage: 'Founding Sadbhav Hospital',
    title: 'Bringing Specialist Care to Jamnagar',
    body: 'Founded Sadbhav Hospital with a singular mission — to make specialist pulmonary and critical care accessible to patients in Jamnagar. Built a Level II ICU, in-house respiratory lab, and a practice guided by compassion and clinical precision.',
    accent: '#1e5fa8',
    imageUrl: '/vivek sir final.jpg',
  },
]

export const DOCTOR = {
  name: 'Dr. Vivek',
  initial: 'V',
  role: 'Pulmonologist & Critical Care Specialist',
  qualifications: 'MBBS, MD (Pulmonology)',
  hospital: 'Sadbhav Hospital, Ahmedabad',
  // status: 'Accepting Patients',
  experienceLabel: '10 Years Experience',
  bio: [
    'Dr. Vivek is the principal consultant and founder of Sadbhav Hospital, bringing over fifteen years of dedicated expertise in pulmonary medicine and critical care. His patient-first philosophy, combined with deep clinical knowledge, has made him one of Ahmedabad\'s most trusted respiratory specialists.',
    'Trained in advanced bronchoscopy and ventilator management, Dr. Vivek has successfully managed thousands of complex respiratory cases. He is committed to keeping his clinical practice aligned with the latest evidence-based guidelines in pulmonology.',
  ],
  quote: {
    text: '"Medicine is not just about treating a condition. It is about understanding the person behind it and restoring their quality of life."',
    attribution: '- Dr. Vivek, Founder',
  },
  credentials: [
    { icon: 'BookOpen', label: 'MBBS', sub: 'Bachelor of Medicine & Surgery' },
    { icon: 'Award', label: 'MD (Pulmonology)', sub: 'Specialist in Respiratory Medicine' },
    { icon: 'Stethoscope', label: '10 Years', sub: 'Clinical Practice' },
    { icon: 'Users', label: '5000+', sub: 'Patients Treated' },
  ],
  specialisations: [
    'Pulmonary Medicine',
    'Critical Care',
    'Asthma & COPD Management',
    'Sleep Disorders',
    'Respiratory Infections',
    'Interventional Bronchoscopy',
  ],
  cta: {
    primary: { label: 'Schedule a Visit', href: '#contact', calLink: 'mounil-kankhara-tsigot/30min' },
    secondary: { label: 'Call Clinic', href: 'tel:+919313043422' },
  },
}
