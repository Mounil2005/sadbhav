import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.sadbhav_KV_REST_API_URL,
  token: process.env.sadbhav_KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    await redis.setnx('visitor_count', 1499)
    const count = await redis.incr('visitor_count')
    return res.status(200).json({ count })
  } catch {
    return res.status(200).json({ count: null })
  }
}
