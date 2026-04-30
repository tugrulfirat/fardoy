import { applyChanges, getKvClient, getSiteContent, hasValidKvConfig, KV_KEY } from '@/lib/siteContent'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { changes } = await req.json()
    const password = req.headers.get('x-admin-password')
    const adminPassword = (process.env.ADMIN_PASSWORD || 'fardoy26ms').trim()
    
    console.log('Save attempt. Password match:', password === adminPassword)
    
    if (!password || password.trim() !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!hasValidKvConfig()) {
      console.error('❌ No valid HTTPS database URL found. Please check your KV_REST_API_URL or UPSTASH_REDIS_REST_URL.')
      return NextResponse.json({ error: 'Database not configured correctly' }, { status: 500 })
    }

    const kv = getKvClient()
    if (!kv) {
      return NextResponse.json({ error: 'Database not configured correctly' }, { status: 500 })
    }
    
    // Save a full, array-safe content tree so sparse dot-path changes render correctly.
    const currentContent = await getSiteContent()
    const newContent = applyChanges(currentContent, changes)
    
    await kv.set(KV_KEY, newContent)
    
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const stack = err instanceof Error ? err.stack : undefined

    console.error('Save batch error:', err)
    return NextResponse.json({ 
      error: 'Internal error', 
      message,
      stack
    }, { status: 500 })
  }
}
