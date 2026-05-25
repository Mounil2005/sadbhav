import { createClient } from '@sanity/client'

export const sanityWriteClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'v0ztl8cn',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
})

export async function submitReview({ name, rating, reviewText, condition, imageFile }) {
  let imageAsset = null

  if (imageFile) {
    imageAsset = await sanityWriteClient.assets.upload('image', imageFile, {
      filename: imageFile.name,
    })
  }

  return sanityWriteClient.create({
    _type: 'review',
    name,
    rating,
    reviewText,
    condition: condition || undefined,
    approved: true,
    verified: false,
    submittedAt: new Date().toISOString(),
    ...(imageAsset && {
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
    }),
  })
}
