import { sanityClient } from './sanity'
import { BLOG_ARTICLES, BLOG_CONTENT } from '../data/blog'

// Fetch all published health updates, newest first
const HEALTH_UPDATES_QUERY = `
  *[_type == "healthUpdate"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    contentType,
    category,
    language,
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    "coverImageUrl": coverImage.asset->url,
    featured,
    publishedAt,
    authorName,
  }
`

// Map a Sanity health update to the shape BlogSection expects
function mapToBlogArticle(update, index) {
  const COLORS = [
    'from-blue-50 to-white',
    'from-slate-50 to-white',
    'from-sky-50 to-white',
    'from-indigo-50 to-white',
  ]
  const ACCENTS = [
    'bg-blue-50 text-blue-600',
    'bg-slate-50 text-slate-600',
    'bg-sky-50 text-sky-600',
    'bg-indigo-50 text-indigo-600',
  ]
  const categoryLabels = {
    'pulmonary-health': 'Pulmonary Health',
    'asthma-copd': 'Asthma & COPD',
    'critical-care': 'Critical Care',
    'respiratory-tips': 'Respiratory Tips',
    'patient-awareness': 'Patient Awareness',
    'sleep-breathing': 'Sleep & Breathing',
    'general-health': 'General Health',
  }
  const typeLabels = {
    article: 'Article',
    video: 'Video',
    image: 'Image',
  }

  const date = update.publishedAt ? new Date(update.publishedAt) : new Date()
  const displayDate = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return {
    id: update._id,
    slug: update.slug,
    title: update.title,
    excerpt: update.shortDescription,
    category: categoryLabels[update.category] ?? update.category,
    categorySlug: update.category,
    readTime: update.contentType === 'article' ? '4 min read' : null,
    publishedAt: update.publishedAt,
    displayDate,
    featured: update.featured,
    coverImageUrl: update.coverImageUrl ?? null,
    image: null,
    videoUrl: update.videoUrl ?? update.videoFileUrl ?? null,
    contentType: update.contentType,
    typeLabel: typeLabels[update.contentType] ?? update.contentType,
    author: update.authorName ?? 'Dr. Vivek Nanda',
    color: COLORS[index % COLORS.length],
    accent: ACCENTS[index % ACCENTS.length],
  }
}

// Fetch health updates from Sanity with graceful fallback to static data
export async function fetchHealthUpdates() {
  try {
    const updates = await sanityClient.fetch(HEALTH_UPDATES_QUERY)
    if (!updates || updates.length === 0) return BLOG_ARTICLES
    return updates.map(mapToBlogArticle)
  } catch {
    return BLOG_ARTICLES
  }
}

const POST_BY_SLUG_QUERY = `
  *[_type == "healthUpdate" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    body,
    contentType,
    category,
    language,
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    "coverImageUrl": coverImage.asset->url,
    featured,
    publishedAt,
    authorName,
  }
`

export async function fetchPostBySlug(slug) {
  try {
    return await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug })
  } catch {
    return null
  }
}

const APPROVED_REVIEWS_QUERY = `
  *[_type == "review" && approved == true] | order(submittedAt desc) {
    _id,
    name,
    rating,
    reviewText,
    condition,
    verified,
    "imageUrl": image.asset->url,
    reply,
    repliedAt,
    submittedAt,
  }
`

export async function fetchApprovedReviews() {
  try {
    const reviews = await sanityClient.fetch(APPROVED_REVIEWS_QUERY)
    return reviews ?? []
  } catch {
    return []
  }
}

export { BLOG_CONTENT }
