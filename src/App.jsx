import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'

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
    <RootLayout>
      <HomePage />
    </RootLayout>
  )
}
