export const FACILITIES = [
  {
    id: 'icu-beds',
    icon: 'Activity',
    name: 'ICU Beds',
    detail:
      'Fully monitored intensive care beds with advanced life-support equipment and 24/7 nursing care.',
    spec: 'Level II ICU',
    imageUrl: '/icu.png',
    bgGradient: null,
  },
  {
    id: 'ac-private-rooms',
    icon: 'Thermometer',
    name: 'AC Private Rooms',
    detail:
      'Private air-conditioned rooms for patients who prefer personal comfort and family privacy.',
    spec: 'Private & semi-private',
    imageUrl: '/AC Private room.png',
    bgGradient: null,
  },
  {
    id: 'waiting-area',
    icon: 'Coffee',
    name: 'Waiting Area',
    detail:
      'Calm, clean, and comfortable waiting area for family members with seating and refreshment access.',
    spec: 'Family-friendly',
    imageUrl: '/Reception.png',
    bgGradient: null,
  },
  {
    id: 'general-ward',
    icon: 'BedDouble',
    name: 'General Ward',
    detail:
      'Well-ventilated, comfortable general ward with attentive nursing staff and regular physician rounds.',
    spec: 'Mixed-gender wards',
    imageUrl: '/General Ward.png',
    bgGradient: null,
  },
  {
    id: 'consultation-cabin',
    icon: 'Stethoscope',
    name: 'Consultation Cabin',
    detail:
      'Dedicated, private consultation cabin for in-depth patient discussions, reviews, and follow-ups.',
    spec: 'Fully private',
    imageUrl: '/Consultation Cabin.png',
    bgGradient: null,
  },
  {
    id: 'respiratory-lab',
    icon: 'Wind',
    name: 'Respiratory Lab',
    detail:
      'On-site spirometry, nebulisation, and pulmonary function testing for accurate respiratory diagnosis.',
    spec: 'In-house diagnostics',
    imageUrl: null,
    bgGradient: 'linear-gradient(160deg, #1e3a6b 0%, #0d2040 100%)',
  },
]

export const FACILITIES_CONTENT = {
  sectionLabel: 'Infrastructure',
  heading: 'Our Facilities',
  subheading:
    'Every aspect of Sadbhav Hospital is designed with patient recovery in mind, from clinical infrastructure to comfort and dignity.',
  hygiene: {
    heading: 'Hygiene & Safety Standards',
    body: 'All areas of the hospital are maintained under strict infection-control protocols. Regular sterilisation, air filtration, and safety audits ensure a clean and safe environment for every patient and visitor.',
  },
}
