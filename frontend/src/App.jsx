import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getCalApi } from '@calcom/embed-react'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import BlogPostPage from './pages/BlogPostPage'
import HealthTipsPage from './pages/HealthTipsPage'
import ReviewPage from './pages/ReviewPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import MedicalDisclaimerPage from './pages/MedicalDisclaimerPage'

export default function App() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' })
      cal('floatingButton', {
        calLink: 'mounil-kankhara-tsigot/30min',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        buttonText: 'Book Appointment',
        buttonPosition: 'bottom-right',
        buttonColor: '#1e5fa8',
        buttonTextColor: '#ffffff',
      })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout><HomePage /></RootLayout>} />
        <Route path="/health-tips" element={<RootLayout><HealthTipsPage /></RootLayout>} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/blog/:slug" element={<RootLayout><BlogPostPage /></RootLayout>} />
        <Route path="/privacy-policy" element={<RootLayout><PrivacyPolicyPage /></RootLayout>} />
        <Route path="/terms-of-use" element={<RootLayout><TermsOfUsePage /></RootLayout>} />
        <Route path="/medical-disclaimer" element={<RootLayout><MedicalDisclaimerPage /></RootLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
