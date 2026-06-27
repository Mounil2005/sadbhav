export const SITE = {
  name: 'Sadbhav Hospital',
  shortName: 'Sadbhav',
  tagline: 'Advanced Pulmonary & Critical Care',
  description:
    'Advanced pulmonary and critical care for patients and families in Jamnagar. Trusted, compassionate, and modern healthcare.',
  phone: '+91 93130 43422',
  phoneHref: 'tel:+919313043422',
  whatsappHref: 'https://wa.me/919313043422?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Sadbhav%20Hospital.',
  email: 'info@sadbhavhospital.in',
  address: {
    line1: '"Central Point", 4th Floor, Above SBI Bank',
    line2: 'Summair Club Road',
    city: 'Jamnagar',
    state: 'Gujarat',
    pin: '361005',
    display: '"Central Point", 4th Floor, Above SBI Bank,\nSummair Club Road, Jamnagar 361005',
  },
  googleReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Sadbhav+Hospital+Dr+Vivek+Nanda+Jamnagar',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.031286193394!2d70.05771627479758!3d22.465458579568246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39576b2cb5285cd1%3A0x8977bbd3f6c2a63!2sSADBHAV%20HOSPITAL%20CHEST%20PHYSICIAN%20IN%20JAMNGAR%20DR%20VIVEK%20NANDA!5e0!3m2!1sen!2sin!4v1779120384892!5m2!1sen!2sin',
  year: new Date().getFullYear(),
}

export const VISITING_HOURS = [
  { day: 'Monday - Saturday', time: '10:00 AM - 2:30 PM\n6:00 PM - 9:30 PM', timeShort: '10 AM - 9:30 PM', isEmergency: false },
  { day: 'Emergency', time: '24 Hours / 7 Days', timeShort: '24 / 7', isEmergency: true },
]

// export const OUTREACH_SCHEDULE = [
//   {
//     week: '2nd Sunday',
//     visits: [
//       { location: 'Khambhalia', time: '11:00 AM - 1:30 PM' },
//     ],
//   },
//   {
//     week: '3rd Sunday',
//     visits: [
//       { location: 'Jamjodhpur', time: '9:00 AM - 11:00 AM' },
//       { location: 'Bhanvad', time: '11:30 AM - 1:30 PM' },
//     ],
//   },
// ]

export const SOCIAL_LINKS = [
  { platform: 'Instagram', icon: 'Instagram', href: 'https://www.instagram.com/sadbhavhospital_dr.vivek/' },
]

export const FOOTER_QUICK_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Doctor Profile', href: '#doctor' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Health Tips', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Medical Disclaimer', href: '/medical-disclaimer' },
]

export const SOCIAL_PROOF_STATS = [
  { value: '5000+', label: 'Patients Treated' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '98%', label: 'Would Recommend' },
  { value: '10', label: 'Years of Trust' },
]

export const TRUST_BADGES = [
  { icon: 'Award', label: 'Expert Care', sub: 'Specialist Doctors' },
  { icon: 'Heart', label: 'Patient First', sub: 'Compassionate Care' },
]
