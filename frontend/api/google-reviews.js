export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = 'ChIJ0VwotSxrVzkRYypsP717lwg'

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')

  if (!apiKey) return res.status(200).json({ reviews: [] })

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=en&reviews_sort=newest`
    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK') return res.status(200).json({ reviews: [] })

    const reviews = (data.result?.reviews ?? [])
      .filter((r) => r.text && r.text.trim().length > 0)
      .map((r) => ({
        id: `google-${r.time}`,
        name: r.author_name,
        review: r.text,
        rating: r.rating,
        verified: false,
        imageUrl: null,
        condition: r.relative_time_description,
        reply: null,
        source: 'google',
        profilePhotoUrl: r.profile_photo_url ?? null,
      }))

    return res.status(200).json({ reviews })
  } catch {
    return res.status(200).json({ reviews: [] })
  }
}
