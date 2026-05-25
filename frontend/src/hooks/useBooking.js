import { useState, useCallback } from 'react'

/*
 * Booking flow hook — prepared for Cal.com integration.
 *
 * Current behaviour: smooth-scrolls to the contact / appointment form.
 *
 * To enable Cal.com later:
 *   1. npm install @calcom/embed-react
 *   2. Import Cal from '@calcom/embed-react'
 *   3. Replace the scrollIntoView call below with:
 *        Cal('modal', { calLink: 'sadbhav/consultation', config: { name, email } })
 *   4. Set VITE_CALCOM_LINK in .env
 */
export function useBooking() {
  const [pendingService, setPendingService] = useState(null)

  const openBooking = useCallback((serviceSlug = null) => {
    setPendingService(serviceSlug)

    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const clearPending = useCallback(() => setPendingService(null), [])

  return {
    openBooking,
    pendingService,
    clearPending,
  }
}
