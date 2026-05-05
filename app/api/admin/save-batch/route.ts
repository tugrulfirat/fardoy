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

    const currentContent = await getSiteContent()
    const newContent = applyChanges(currentContent, changes)

    if (!hasValidKvConfig()) {
      try {
        const fs = require('fs')
        const path = require('path')
        const CONTENT_FILE = path.join(process.cwd(), 'data/siteContent.json')
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(newContent, null, 2))
        console.log('✅ Changes saved locally to data/siteContent.json')
        return NextResponse.json({ ok: true, source: 'local' })
      } catch (fsErr) {
        console.error('❌ Failed to save locally:', fsErr)
        return NextResponse.json({ error: 'Failed to save to local file system' }, { status: 500 })
      }
    }

    const kv = getKvClient()
    if (!kv) {
      return NextResponse.json({ error: 'Database not configured correctly' }, { status: 500 })
    }
    
    await kv.set(KV_KEY, newContent)
    return NextResponse.json({ ok: true, source: 'kv' })
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
