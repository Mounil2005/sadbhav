import { useSEO } from '../hooks/useSEO'
import { LegalPage, LegalSection, LegalList, LegalHighlight } from '../components/ui/LegalPage'
import { SITE } from '../data/site'

export default function TermsOfUsePage() {
  useSEO({
    title: 'Terms of Use',
    description: 'Terms of Use for Sadbhav Hospital — the terms governing use of our website and services.',
  })

  return (
    <LegalPage title="Terms of Use" lastUpdated="June 2026">

      <LegalHighlight>
        By accessing or using the Sadbhav Hospital website, you agree to these Terms of Use. Please read them carefully before using our website or booking services.
      </LegalHighlight>

      <LegalSection title="1. Acceptance of Terms">
        <p>
          These Terms of Use govern your access to and use of the website operated by Sadbhav Hospital ("{SITE.name}"), accessible at {SITE.url ?? 'sadbhav.vercel.app'}. By using this website, you confirm that you are at least 18 years of age or are accessing the site with the consent of a parent or guardian.
        </p>
        <p>
          If you do not agree to these terms, please discontinue use of this website.
        </p>
      </LegalSection>

      <LegalSection title="2. Use of the Website">
        <p>This website is provided for informational and appointment booking purposes. You agree to use it only for lawful purposes and in a manner consistent with these terms. You must not:</p>
        <LegalList items={[
          'Use the website to transmit harmful, offensive, or misleading content.',
          'Attempt to gain unauthorised access to any part of the website or its underlying systems.',
          'Reproduce, distribute, or commercially exploit any content from this website without prior written permission.',
          'Use automated tools to scrape, crawl, or extract data from the website.',
          'Impersonate Sadbhav Hospital, its staff, or any other individual or entity.',
        ]} />
      </LegalSection>

      <LegalSection title="3. Appointment Booking">
        <p>
          Appointment booking on this website is facilitated through Cal.com, a third-party scheduling platform. By booking an appointment, you agree to the terms and conditions set by Cal.com in addition to these Terms of Use.
        </p>
        <p>
          Bookings are subject to availability and confirmation by our clinic. We reserve the right to reschedule or cancel appointments due to clinical emergencies, staff unavailability, or other unforeseen circumstances. Where possible, we will provide advance notice.
        </p>
        <p>
          Appointment bookings do not constitute a patient-doctor relationship until a formal consultation has taken place at the clinic.
        </p>
      </LegalSection>

      <LegalSection title="4. Medical Information Disclaimer">
        <p>
          Content published on this website — including articles, health tips, videos, and condition descriptions — is intended for general informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Please review our full <a href="/medical-disclaimer" className="text-medical-500 hover:underline">Medical Disclaimer</a> for details.
        </p>
      </LegalSection>

      <LegalSection title="5. Intellectual Property">
        <p>
          All content on this website — including text, images, graphics, logos, videos, and design elements — is the intellectual property of Sadbhav Hospital or its licensed contributors. Content is protected under applicable Indian copyright law.
        </p>
        <p>
          You may view and print content from this website for personal, non-commercial use only. Any other use, including reproduction, redistribution, or commercial use, requires prior written consent from Sadbhav Hospital.
        </p>
      </LegalSection>

      <LegalSection title="6. Third-Party Links and Services">
        <p>
          This website may contain links to third-party websites or services, including Google Maps, WhatsApp, Cal.com, and YouTube. These are provided for convenience and do not constitute endorsement by Sadbhav Hospital.
        </p>
        <p>
          Sadbhav Hospital is not responsible for the content, privacy practices, or terms of any third-party website. We encourage you to review the terms and privacy policies of any third-party service you use.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Sadbhav Hospital shall not be liable for any indirect, incidental, or consequential damages arising from your use of or inability to use this website or its content.
        </p>
        <p>
          We make reasonable efforts to ensure the accuracy and timeliness of information published on this website. However, we do not warrant that all content is error-free, complete, or up to date.
        </p>
      </LegalSection>

      <LegalSection title="8. Governing Law">
        <p>
          These Terms of Use are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Jamnagar, Gujarat.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes to Terms">
        <p>
          We reserve the right to update these Terms of Use at any time. The "Last updated" date at the top of this page reflects the most recent version. Continued use of the website following any changes constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact">
        <p>
          For any questions regarding these Terms of Use, please contact us:
        </p>
        <LegalList items={[
          `Email: ${SITE.email}`,
          `Phone: ${SITE.phone}`,
          `Address: ${SITE.address.display.replace('\n', ', ')}`,
        ]} />
      </LegalSection>

    </LegalPage>
  )
}
