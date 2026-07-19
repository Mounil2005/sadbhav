export const DOCTOR_JOURNEY = [
  {
    id: 'mbbs',
    year: '2016',
    stage: 'Medical Education',
    title: 'MBBS — Bachelor of Medicine & Surgery',
    body: 'Completed MBBS from Central America, building a strong foundation in clinical sciences, human physiology, and patient care. Early hospital rotations across medicine, surgery, and emergency care shaped a commitment to rigorous, evidence-based practice.',
    accent: '#1e3a6b',
  },
  {
    id: 'dnb',
    year: '2022',
    stage: 'Post-Graduate Specialisation',
    title: 'DNB in Pulmonology',
    body: 'Earned the Diplomate of National Board (DNB) in Pulmonology — a rigorous national-level post-graduate qualification in respiratory medicine. Training covered pulmonary physiology, advanced diagnostics, bronchoscopy, and management of complex conditions including asthma, COPD, and interstitial lung disease.',
    accent: '#1a4a5a',
  },
  {
    id: 'jccc',
    year: '2023 – 2025',
    stage: 'Senior Clinical Practice',
    title: 'MD Doctor — JCCC Hospital',
    body: 'Served as Chest Physician and Intensivist at JCCC Hospital, managing a high-volume ICU and complex pulmonary cases. Developed expertise in ventilator management, critical care protocols, and interventional procedures alongside a multidisciplinary medical team.',
    accent: '#1a2a52',
  },
  {
    id: 'sadbhav',
    year: '2025 – Present',
    stage: 'Founding Sadbhav Hospital',
    title: 'Bringing Specialist Care to Jamnagar',
    body: 'Founded Sadbhav Hospital with a singular mission — to make specialist pulmonary and critical care accessible to patients in Jamnagar. Built a Level II ICU, in-house respiratory lab, and a practice guided by compassion and clinical precision.',
    accent: '#1e5fa8',
    imageUrl: '/Vivek sir landscape.jpeg',
  },
]

export const DOCTOR = {
  name: 'Dr. Vivek',
  initial: 'V',
  role: 'Pulmonologist & Critical Care Specialist',
  qualifications: 'MBBS, DNB (Pulmonology)',
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
    { icon: 'Award', label: 'DNB (Pulmonology)', sub: 'Diplomate of National Board' },
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
