# Deployment Notes — Sadbhav Hospital Website

## Build Command
```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/
```

## Recommended Hosting Options

### Option A — Vercel (Recommended)
- Free tier, automatic HTTPS, global CDN
- Connect GitHub repo → auto-deploys on push to `main`
- Set root directory to `frontend` in Vercel project settings
- Build command: `npm run build`
- Output directory: `dist`

### Option B — Netlify
- Same as Vercel setup
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`

### Option C — Shared Hosting / cPanel
- Run `npm run build` locally
- Upload contents of `frontend/dist/` to `public_html/`
- Ensure `.htaccess` has SPA fallback rule:
  ```apache
  Options -MultiViews
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^ index.html [QSA,L]
  ```

---

## Environment Variables
Copy `frontend/.env.example` to `frontend/.env` and fill in values before building.  
On Vercel/Netlify, set environment variables in the dashboard — do not commit `.env`.

---

## Custom Domain Setup
1. Purchase domain: `sadbhavhospital.in` (or `.com`)
2. Point DNS A record or CNAME to hosting provider
3. Enable HTTPS/SSL (automatic on Vercel/Netlify)
4. Update `VITE_SITE_URL` in environment variables

---

## Post-Deployment Checklist
- [ ] Test all Cal.com booking flows
- [ ] Test phone call links on mobile (iOS + Android)
- [ ] Test WhatsApp link
- [ ] Verify Google Maps embed loads
- [ ] Check all images load correctly
- [ ] Test on mobile viewport (375px, 390px, 414px)
- [ ] Check navbar and mobile menu
- [ ] Verify Cal.com floating button appears
- [ ] Submit sitemap to Google Search Console
