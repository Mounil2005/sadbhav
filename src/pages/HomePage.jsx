import HeroSection from '../sections/HeroSection'
import HighlightsSection from '../sections/HighlightsSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import DoctorSection from '../sections/DoctorSection'
import FacilitiesSection from '../sections/FacilitiesSection'
import BlogSection from '../sections/BlogSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import ContactSection from '../sections/ContactSection'

/*
 * Data is currently imported by default inside each section from src/data/.
 * To integrate a CMS or API, fetch data here and pass it as props:
 *
 *   const { data: services } = useSWR('/api/services', fetcher)
 *   <ServicesSection services={services} />
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <AboutSection />
      <ServicesSection />
      <DoctorSection />
      <FacilitiesSection />
      <BlogSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
