import { createClient } from '@vercel/kv'
import { NextResponse } from 'next/server'

const kv = createClient({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

function applyChanges(target: any, changes: Record<string, any>) {
  const result = JSON.parse(JSON.stringify(target))
  for (const [path, value] of Object.entries(changes)) {
    const keys = path.split('.')
    let current = result
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in current)) current[key] = {}
      current = current[key]
    }
    current[keys[keys.length - 1]] = value
  }
  return result
}

export async function POST(req: Request) {
  try {
    const { changes } = await req.json()
    const password = req.headers.get('x-admin-password')
    const adminPassword = (process.env.ADMIN_PASSWORD || 'fardoy26ms').trim()
    
    console.log('Save attempt. Password match:', password === adminPassword)
    
    if (!password || password.trim() !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update KV
    const KV_KEY = 'fardoy_site_content'
    
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
    if (!kvUrl) {
      console.error('❌ No database URL found (checked KV_REST_API_URL and UPSTASH_REDIS_REST_URL)')
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const currentContent = (await kv.get(KV_KEY)) || {}
    
    // Apply changes into the nested structure
    const newContent = applyChanges(currentContent, changes)
    
    await kv.set(KV_KEY, newContent)
    
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Save batch error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
