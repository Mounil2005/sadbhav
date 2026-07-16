import { useState, useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import HeroSection from '../sections/HeroSection'
import HighlightsSection from '../sections/HighlightsSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import DoctorSection from '../sections/DoctorSection'
import FacilitiesSection from '../sections/FacilitiesSection'
import BlogSection from '../sections/BlogSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import ContactSection from '../sections/ContactSection'
import { fetchHealthUpdates, BLOG_CONTENT } from '../lib/queries'

export default function HomePage() {
  useSEO({
    title: 'Advanced Pulmonary & Critical Care, Jamnagar',
    description: 'Sadbhav Hospital offers expert pulmonary, respiratory and critical care in Jamnagar. Trusted care by Dr. Vivek Nanda. Book your appointment today.',
  })

  const [healthUpdates, setHealthUpdates] = useState(null)

  useEffect(() => {
    fetchHealthUpdates().then(setHealthUpdates)
  }, [])

  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <AboutSection />
      <ServicesSection />
      <DoctorSection />
      <FacilitiesSection />
      <BlogSection
        articles={healthUpdates ? healthUpdates.filter((p) => p.contentType === 'article' || p.contentType === 'image') : undefined}
        reels={healthUpdates ? healthUpdates.filter((p) => p.contentType === 'video' || p.contentType === 'reel') : []}
        content={BLOG_CONTENT}
      />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
