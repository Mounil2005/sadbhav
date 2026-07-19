# Future Roadmap — Sadbhav Hospital Website

## Phase 1 — Current (Static Frontend)
Single-page React website with Cal.com booking. No backend.

**Milestone:** Live on custom domain with SSL.

---

## Phase 2 — Content & SEO
- Add proper `<meta>` tags, Open Graph, structured data (Schema.org `MedicalBusiness`)
- Blog section with real health articles
- Individual service pages (`/services/asthma-copd`, `/services/icu`, etc.)
- Google Search Console setup
- Sitemap + robots.txt
- Page speed audit and image optimisation (WebP conversion)

---

## Phase 3 — CMS Integration
Move content management out of code files into a headless CMS.

**Recommended:** Sanity.io (free tier sufficient for this scale)

- Doctor profile managed via CMS
- Blog articles with rich text editor
- Services, testimonials, facilities all editable by client
- Image uploads handled by CMS CDN
- No developer needed for content updates

See `cms-plan.md` for detailed integration notes.

---

## Phase 4 — Multilingual (Gujarati)
- Add `i18n` support (react-i18next)
- Gujarati translations for all user-facing content
- Language toggle in navbar
- URL structure: `/gu/` prefix for Gujarati pages

Target audience: Gujarati-speaking families in Jamnagar and surrounding areas.

---

## Phase 5 — Advanced Features
- Online appointment form with email notifications (Resend / Nodemailer)
- WhatsApp Business API for automated appointment confirmation
- Patient FAQ section
- Health tip video embeds (YouTube)
- Doctor availability calendar (Cal.com advanced plan or custom)

---

## Phase 6 — Analytics & Growth
- Google Analytics 4
- Google My Business profile optimisation
- Patient review collection flow
- Local SEO targeting Jamnagar, Rajkot, Saurashtra region
