import { siteContent as staticContent } from '@/data/siteContent'
import { createClient } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

export const KV_KEY = 'fardoy_site_content'

type ContentObject = Record<string, unknown>

const isObject = (value: unknown): value is ContentObject =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const getKvUrl = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || ''
  return url.startsWith('https://') ? url : ''
}

const getKvToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''

export const hasValidKvConfig = () => Boolean(getKvUrl() && getKvToken())

export const getKvClient = () => {
  const url = getKvUrl()
  const token = getKvToken()

  if (!url || !token) {
    return null
  }

  return createClient({ url, token })
}

const CONTENT_FILE = path.join(process.cwd(), 'data/siteContent.json')

/**
 * Deep merges changes into a target object.
 * Handles both nested structures and flat keys (e.g. "a.b.c")
 */
export function applyChanges<T>(target: T, changes: Record<string, unknown>): T {
  // Ensure target is a valid object, otherwise start with an empty one
  const result = (target && typeof target === 'object') ? structuredClone(target) as ContentObject : {}

  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split('.')
    let current: ContentObject = result
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      const nextKey = keys[i + 1]
      const shouldBeArray = /^\d+$/.test(nextKey)

      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = shouldBeArray ? [] : {}
      }
      current = current[key] as ContentObject
    }
    
    const finalKey = keys[keys.length - 1]
    current[finalKey] = value
  }
  
  return result as T
}

export function deepMerge(target: unknown, source: unknown): unknown {
  if (Array.isArray(source)) {
    return structuredClone(source)
  }

  if (Array.isArray(target) && isObject(source)) {
    const output = [...target]

    Object.keys(source).forEach((key) => {
      const index = Number(key)
      if (Number.isInteger(index) && index >= 0) {
        output[index] = deepMerge(output[index], source[key])
      }
    })

    return output
  }

  if (!isObject(target) || !isObject(source)) {
    return source ?? target
  }

  const output = { ...target }

  Object.keys(source).forEach(key => {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = key in target ? deepMerge(target[key], source[key]) : source[key]
    } else {
      output[key] = source[key]
    }
  })

  return output
}

/**
 * Returns the site content.
 * In production (Vercel), it tries to fetch from KV first.
 */
export async function getSiteContent() {
  let content = { ...staticContent }
  const hasKv = hasValidKvConfig()

  // 1. Try KV/Upstash in production
  if (!hasKv) {
    console.error('❌ No valid HTTPS database URL found (checked KV_REST_API_URL and UPSTASH_REDIS_REST_URL)')
  } else {
    try {
      const kv = getKvClient()
      if (!kv) {
        throw new Error('KV client could not be created')
      }
      const kvContent = await kv.get(KV_KEY)
      if (kvContent && typeof kvContent === 'object') {
        content = deepMerge(content, kvContent) as typeof staticContent
      }
    } catch (err) {
      console.error('❌ KV Error in getSiteContent:', err)
    }
  }

  // 2. Try local JSON only when KV is unavailable.
  // In production, this file is a static fallback and must not overwrite live CMS edits.
  if (!hasKv) {
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        const fileContent = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'))
        content = deepMerge(content, fileContent) as typeof staticContent
      }
    } catch {
      // Silently continue
    }
  }

  return content
}
