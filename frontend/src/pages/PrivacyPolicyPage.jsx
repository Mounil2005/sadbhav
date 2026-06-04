import { useSEO } from '../hooks/useSEO'
import { LegalPage, LegalSection, LegalList, LegalHighlight } from '../components/ui/LegalPage'
import { SITE } from '../data/site'

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Sadbhav Hospital — how we collect, use, and protect your personal information.',
  })

  return (
    <LegalPage title="Privacy Policy" lastUpdated="June 2026">

      <LegalHighlight>
        Your privacy matters to us. Sadbhav Hospital is committed to handling your personal information with care, transparency, and respect. This policy explains what we collect, why, and how we protect it.
      </LegalHighlight>

      <LegalSection title="1. Who We Are">
        <p>
          Sadbhav Hospital is a specialist pulmonary and critical care facility located at {SITE.address.display.replace('\n', ', ')}, Jamnagar. This Privacy Policy applies to our website at <strong>{SITE.url ?? 'sadbhav.vercel.app'}</strong>, including all forms, booking tools, and contact channels linked from it.
        </p>
        <p>For privacy-related enquiries, contact us at <a href={`mailto:${SITE.email}`} className="text-medical-500 hover:underline">{SITE.email}</a>.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of personal information:</p>
        <LegalList items={[
          'Name, phone number, and email address submitted via our contact form or appointment booking system.',
          'Medical condition or reason for visit, if voluntarily provided in a contact or appointment request.',
          'Messages and communication history when you contact us via WhatsApp or email.',
          'IP address, browser type, and usage data collected automatically by analytics tools (see Section 5).',
          'Appointment preferences and scheduling information submitted through our Cal.com booking integration.',
        ]} />
        <p className="mt-3">We do not collect sensitive financial information such as payment card details directly. Any payment processing is handled by third-party providers under their own privacy policies.</p>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>Information you provide is used solely for the following purposes:</p>
        <LegalList items={[
          'To respond to your enquiries and provide patient support.',
          'To confirm, schedule, or follow up on appointment bookings.',
          'To send relevant health information or appointment reminders if you have opted in.',
          'To improve our website, services, and patient experience based on aggregated, anonymised usage data.',
          'To comply with applicable healthcare regulations and legal obligations in India.',
        ]} />
        <p className="mt-3">We do not use your information for unsolicited marketing, nor do we sell or rent your personal data to any third party.</p>
      </LegalSection>

      <LegalSection title="4. Appointment Booking (Cal.com)">
        <p>
          Our appointment scheduling is powered by Cal.com, a third-party booking platform. When you book an appointment, your name, email address, and appointment details are shared with Cal.com and processed under their privacy policy.
        </p>
        <p>
          Appointment data is used exclusively to confirm your visit and manage scheduling. We recommend reviewing Cal.com's Privacy Policy for details on how they handle your data.
        </p>
      </LegalSection>

      <LegalSection title="5. WhatsApp Communication">
        <p>
          We offer WhatsApp as a convenient communication channel. Messages sent via WhatsApp are processed by WhatsApp Inc. (a Meta company) under their own terms of service and privacy policy.
        </p>
        <p>
          We do not store WhatsApp conversation history on our servers beyond what is retained naturally within the WhatsApp application. Please exercise discretion when sharing sensitive personal or medical information via any messaging platform.
        </p>
      </LegalSection>

      <LegalSection title="6. Analytics">
        <p>
          Our website uses Google Analytics to understand how visitors interact with our content. This service collects anonymised usage data including pages visited, time spent on site, and general geographic location (country/city level).
        </p>
        <p>
          Google Analytics does not identify you personally. No health or medical information is transmitted to Google Analytics. You may opt out of analytics tracking by using the Google Analytics Opt-Out Browser Add-on or by enabling "Do Not Track" in your browser settings.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies">
        <p>
          Our website uses minimal, functional cookies necessary for the site to operate correctly. We do not use advertising or tracking cookies beyond the analytics described above. By using this website, you consent to the use of these functional cookies.
        </p>
      </LegalSection>

      <LegalSection title="8. Data Security">
        <p>
          We implement reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. Our website is served over HTTPS, and access to any stored data is restricted to authorised personnel.
        </p>
        <p>
          However, no method of transmission over the internet is completely secure. We encourage you to use discretion when sharing sensitive information through any digital channel.
        </p>
      </LegalSection>

      <LegalSection title="9. Data Retention">
        <p>
          We retain personal information only for as long as necessary to fulfil the purpose for which it was collected, or as required by law. Contact form enquiries are retained for up to 12 months. Appointment records may be retained for longer periods in accordance with healthcare recordkeeping obligations.
        </p>
      </LegalSection>

      <LegalSection title="10. Your Rights">
        <p>You have the right to:</p>
        <LegalList items={[
          'Request access to the personal information we hold about you.',
          'Request correction of inaccurate or incomplete information.',
          'Request deletion of your personal data, subject to any legal obligations to retain it.',
          'Withdraw consent for communications or data processing at any time.',
        ]} />
        <p className="mt-3">To exercise any of these rights, please contact us at <a href={`mailto:${SITE.email}`} className="text-medical-500 hover:underline">{SITE.email}</a>.</p>
      </LegalSection>

      <LegalSection title="11. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the website after any changes constitutes acceptance of the updated policy.
        </p>
      </LegalSection>

    </LegalPage>
  )
}
