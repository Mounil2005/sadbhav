import { useSEO } from '../hooks/useSEO'
import { LegalPage, LegalSection, LegalList, LegalHighlight } from '../components/ui/LegalPage'
import { SITE } from '../data/site'

export default function MedicalDisclaimerPage() {
  useSEO({
    title: 'Medical Disclaimer',
    description: 'Medical Disclaimer for Sadbhav Hospital — all website content is informational only and not a substitute for professional medical advice.',
  })

  return (
    <LegalPage title="Medical Disclaimer" lastUpdated="June 2026">

      <LegalHighlight>
        The content on this website is provided for general informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any medical condition or health concern.
      </LegalHighlight>

      <LegalSection title="1. Informational Purpose Only">
        <p>
          Sadbhav Hospital's website — including all articles, health tips, condition descriptions, treatment overviews, and video content — is published to support general health awareness and education. This information is not intended to:
        </p>
        <LegalList items={[
          'Diagnose any medical condition or disease.',
          'Recommend or prescribe any treatment, medication, or therapeutic procedure.',
          'Replace or substitute a consultation with a qualified medical doctor.',
          'Constitute a patient-doctor relationship of any kind.',
        ]} />
      </LegalSection>

      <LegalSection title="2. Not a Substitute for Professional Medical Advice">
        <p>
          Never delay seeking professional medical advice, disregard a doctor's recommendations, or discontinue prescribed treatment based on information read on this website. Every patient is different, and medical decisions must be made by a qualified healthcare professional who is familiar with your individual health history and circumstances.
        </p>
        <p>
          If you have questions about a specific symptom, condition, or medication, please schedule a consultation with Dr. Vivek Nanda or another qualified healthcare provider.
        </p>
      </LegalSection>

      <LegalSection title="3. Emergency Situations">
        <p>
          If you or someone around you is experiencing a medical emergency — including difficulty breathing, chest pain, loss of consciousness, or any other life-threatening symptom — do not rely on this website.
        </p>
        <p className="font-semibold text-navy-700">
          Call emergency services immediately or go to the nearest emergency department.
        </p>
        <p>
          Sadbhav Hospital's 24/7 emergency line is available at <a href={SITE.phoneHref} className="text-medical-500 hover:underline font-semibold">{SITE.phone}</a>.
        </p>
      </LegalSection>

      <LegalSection title="4. Accuracy of Information">
        <p>
          We make reasonable efforts to ensure that the medical and health information published on this website is accurate, evidence-based, and aligned with current clinical guidelines. However:
        </p>
        <LegalList items={[
          'Medical knowledge evolves continuously. Information published here may not always reflect the most recent clinical research or guidelines.',
          'Content is written for general audiences and may be simplified for readability. It may not cover all scenarios, contraindications, or edge cases relevant to your situation.',
          'Sadbhav Hospital does not warrant that all content is free from error or that it is suitable for any specific medical situation.',
        ]} />
      </LegalSection>

      <LegalSection title="5. Specialised Conditions">
        <p>
          This website focuses on respiratory health, pulmonary medicine, and critical care. Content related to conditions such as asthma, COPD, respiratory infections, and ICU care is written to support patient understanding — not to guide self-diagnosis or self-treatment.
        </p>
        <p>
          Respiratory conditions can vary significantly in presentation and severity. Proper diagnosis and management require clinical examination, investigations, and expert evaluation.
        </p>
      </LegalSection>

      <LegalSection title="6. Appointment Booking Disclaimer">
        <p>
          Booking an appointment through this website is a scheduling action only. It does not constitute medical advice, a diagnosis, or a clinical assessment of any kind.
        </p>
        <p>
          All clinical assessments, diagnoses, and treatment decisions are made exclusively during in-person consultations at Sadbhav Hospital by Dr. Vivek Nanda or qualified members of the clinical team.
        </p>
        <p>
          Appointment availability is subject to clinical schedules and may change. Confirmation will be provided separately after booking.
        </p>
      </LegalSection>

      <LegalSection title="7. External Links and Third-Party Content">
        <p>
          This website may link to external resources, research papers, health organisations, or third-party content for reference. Sadbhav Hospital does not endorse, control, or take responsibility for the accuracy of any externally linked content.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Sadbhav Hospital and Dr. Vivek Nanda shall not be liable for any harm, loss, or damage arising directly or indirectly from reliance on the information published on this website. Use of this website is entirely at your own risk.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          If you have concerns about information published on this website, or if you require medical guidance, please reach out directly:
        </p>
        <LegalList items={[
          `Phone: ${SITE.phone} (available during visiting hours)`,
          `Email: ${SITE.email}`,
          `Address: ${SITE.address.display.replace('\n', ', ')}`,
        ]} />
        <p className="mt-3">
          For appointment bookings, use the booking button on our homepage or visit the <a href="/#contact" className="text-medical-500 hover:underline">Contact</a> section.
        </p>
      </LegalSection>

    </LegalPage>
  )
}
