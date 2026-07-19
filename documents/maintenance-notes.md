# Maintenance Notes — Sadbhav Hospital Website

## Updating Content

All site content lives in `frontend/src/data/`. No developer is needed for text changes.

| File | What it controls |
|---|---|
| `site.js` | Phone, address, email, visiting hours, social links |
| `doctor.js` | Doctor name, bio, credentials, specialisations |
| `services.js` | Service titles, descriptions, tags |
| `about.js` | About section text, milestones, vision quote |
| `facilities.js` | Facility names, descriptions |
| `blog.js` | Blog article titles, excerpts, categories |
| `testimonials.js` | Patient reviews and ratings |
| `highlights.js` | "What Sets Us Apart" cards |
| `navigation.js` | Navbar links |

---

## Updating Images

All images are in `frontend/public/`. To replace an image:
1. Add the new file to `frontend/public/` with the same filename
2. Or update the `src` path in the relevant section component

---

## Adding a New Blog Article
Open `frontend/src/data/blog.js` and add a new entry to the `BLOG_ARTICLES` array:
```js
{
  id: 'unique-id',
  slug: 'url-friendly-slug',
  title: 'Article Title',
  excerpt: 'Short summary...',
  category: 'Category Name',
  categorySlug: 'category-slug',
  readTime: '4 min read',
  publishedAt: '2026-06-01',
  displayDate: 'June 1, 2026',
  featured: false,
  image: null,
  author: null,
  color: 'from-blue-50 to-white',
  accent: 'bg-blue-50 text-blue-600',
}
```

---

## Updating Visiting Hours
Edit `VISITING_HOURS` in `frontend/src/data/site.js`. The `timeShort` field is used in the top navbar bar; `time` is used in the Contact section (supports `\n` for two-line display).

---

## Cal.com Booking Link
The Cal.com link is set in `frontend/src/App.jsx`. To change the booking link, update the `calLink` value.

---

## Dependencies
Run `npm update` in `frontend/` periodically to keep packages current. Test after every update.

```bash
cd frontend
npm update
npm run build
```

---

## When Something Breaks
1. Check the browser console for errors
2. Run `npm run build` — compiler errors will be shown
3. Check if any data file has a syntax error (missing comma, unclosed string)
4. Run `npm run dev` and check which section fails to render
