# CMS Integration Plan — Sadbhav Hospital Website

## Overview
Currently all content is hardcoded in `frontend/src/data/` files. This is clean and maintainable for now. When the client wants to manage content themselves (blog, testimonials, doctor info), a headless CMS should be integrated.

---

## Recommended CMS: Sanity.io

**Why Sanity:**
- Free tier covers this project comfortably
- Clean React/Next.js integration
- Real-time content editor
- Image CDN included
- Schema defined in code (version-controlled)

---

## Migration Plan

### Step 1 — Define Sanity Schemas
Create schemas matching the existing data structure:
- `doctor` — name, bio, qualifications, photo, credentials
- `service` — title, description, icon, tag, slug
- `blogPost` — title, slug, body (Portable Text), category, author, publishedAt, featuredImage
- `testimonial` — name, location, condition, review, rating
- `facility` — name, detail, spec, icon
- `siteSettings` — phone, address, email, visitingHours (singleton)

### Step 2 — Connect Frontend
Replace `import { DOCTOR } from '../data/doctor'` with Sanity client fetch:
```js
// Before (static)
import { DOCTOR } from '../data/doctor'

// After (CMS-driven)
const doctor = await sanityClient.fetch(`*[_type == "doctor"][0]`)
```

The section components already accept props with defaults — swap the defaults at `pages/HomePage.jsx`.

### Step 3 — Image Handling
Replace local `public/` images with Sanity's `urlFor()` image builder. The `HospitalImage` component already accepts a `src` prop — just pass the Sanity CDN URL.

---

## Alternative: Contentful or Directus
- **Contentful**: Well-known, good free tier, slightly more complex
- **Directus**: Self-hosted option if the client wants data on their own server

---

## Timeline Estimate
- Schema setup: 1 day
- Frontend API integration: 2-3 days
- Content migration (entering existing content into CMS): 1 day
- Testing and deployment: 1 day

**Total: approximately 1 week of development**
