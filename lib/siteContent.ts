import { siteContent as staticContent } from '@/data/siteContent'
import { createClient } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

const getUrl = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || ''
  return url.startsWith('https://') ? url : 'https://dummy-url-to-prevent-build-crash.com'
}

const kv = createClient({
  url: getUrl(),
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || 'dummy-token',
})

const CONTENT_FILE = path.join(process.cwd(), 'data/siteContent.json')
const KV_KEY = 'fardoy_site_content'

/**
 * Deep merges changes into a target object.
 * Handles both nested structures and flat keys (e.g. "a.b.c")
 */
function applyChanges(target: any, changes: Record<string, any>) {
  // Ensure target is a valid object, otherwise start with an empty one
  const result = (target && typeof target === 'object') ? JSON.parse(JSON.stringify(target)) : {}

  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split('.')
    let current = result
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {}
      }
      current = current[key]
    }
    
    current[keys[keys.length - 1]] = value
  }
  
  return result
}

function deepMerge(target: any, source: any) {
  const output = { ...target }
  if (target && typeof target === 'object' && source && typeof source === 'object' && !Array.isArray(source)) {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!(key in target)) {
          output[key] = source[key]
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        output[key] = source[key]
      }
    })
  }
  return output
}

/**
 * Returns the site content.
 * In production (Vercel), it tries to fetch from KV first.
 */
export async function getSiteContent() {
  let content = { ...staticContent }

  // 1. Try KV/Upstash in production
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || ''
  if (!kvUrl || !kvUrl.startsWith('https://')) {
    console.error('❌ No valid HTTPS database URL found (checked KV_REST_API_URL and UPSTASH_REDIS_REST_URL)')
  } else {
    try {
      const kvContent = await kv.get(KV_KEY)
      if (kvContent && typeof kvContent === 'object') {
        content = deepMerge(content, kvContent)
      }
    } catch (err) {
      console.error('❌ KV Error in getSiteContent:', err)
    }
  }

  // 2. Try local JSON if it exists (for local persistence if KV is not used)
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const fileContent = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'))
      content = applyChanges(content, fileContent)
    }
  } catch (err) {
    // Silently continue
  }

  return content
}
