# Sadbhav Hospital — Website Project

Production website for **Sadbhav Hospital**, a pulmonology and critical care practice in Jamnagar, Gujarat, India.

**Doctor:** Dr. Vivek Nanda — MBBS, MD (Pulmonology)  
**Phone:** +91 97252 32641  
**Address:** "Central Point", 4th Floor, Above SBI Bank, Summair Club Road, Jamnagar — 361005

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Booking | Cal.com (embed-react) |
| Maps | Google Maps Embed API |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Hosting | Vercel / Netlify (recommended) |

---

## Project Structure

```
Sadbhav-Hospital/
├── frontend/           # React + Vite application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── data/       # All site content (CMS-ready)
│   │   ├── hooks/      # Custom React hooks
│   │   ├── layouts/    # Navbar, Footer, RootLayout
│   │   ├── pages/      # Page components (HomePage)
│   │   ├── sections/   # Page sections (Hero, About, etc.)
│   │   └── utils/      # Icon registry, utilities
│   ├── public/         # Static assets (images, logo)
│   ├── .env.example    # Environment variable template
│   └── package.json
├── assets/             # Raw assets organized by type
├── branding/           # Brand guidelines, colours, fonts
├── documents/          # Project documentation
├── credentials/        # Account/hosting notes (gitignored content)
├── backups/            # Manual backups (gitignored content)
└── README.md
```

---

## Local Development

```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

## Production Build

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

---

## Deployment

See `documents/deployment-notes.md` for full deployment instructions.

**Quick deploy to Vercel:**
1. Connect this repository to Vercel
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables from `frontend/.env.example`

---

## Content Updates

All site content is in `frontend/src/data/`. Each file is self-documented. No framework knowledge needed to update text content.

See `documents/maintenance-notes.md` for a full content update guide.

---

## Roadmap

See `documents/future-roadmap.md` for planned phases including CMS integration, multilingual support, SEO, and analytics.

---

## Architecture Notes

- **Data-driven:** All sections accept props with defaults from `src/data/`. Ready for CMS integration — replace imports with API calls in `src/pages/HomePage.jsx`.
- **Icon registry:** Icons stored as strings in data files, resolved via `src/utils/icons.js`. CMS-safe.
- **Booking:** Cal.com initialized in `src/App.jsx`. Any button with `data-cal-link` attribute triggers the modal.
- **Image system:** `HospitalImage` component handles real photos and gradient placeholders uniformly.
- **Animations:** `RevealWrapper` with `IntersectionObserver`. Respects `prefers-reduced-motion`.
