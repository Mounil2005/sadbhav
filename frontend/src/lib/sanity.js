import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'v0ztl8cn',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  stega: false,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}
