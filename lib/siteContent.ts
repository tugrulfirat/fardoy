import { siteContent as staticContent } from '@/data/siteContent'
import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

const CONTENT_FILE = path.join(process.cwd(), 'data/siteContent.json')
const KV_KEY = 'fardoy_site_content'

/**
 * Returns the site content.
 * In production (Vercel), it tries to fetch from KV first.
 * In development, it reads from the local JSON file.
 */
export async function getSiteContent() {
  // 1. Try KV in production
  if (process.env.KV_REST_API_URL) {
    try {
      const kvContent = await kv.get(KV_KEY)
      if (kvContent && typeof kvContent === 'object') {
        return { ...staticContent, ...kvContent } as any
      }
    } catch (err) {
      console.error('❌ KV Error in getSiteContent:', err)
    }
  }

  // 2. Try local JSON if it exists
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'))
    }
  } catch (err) {
    console.error('❌ File Error in getSiteContent:', err)
  }

  // 3. Fallback to hardcoded static content
  return staticContent
}
