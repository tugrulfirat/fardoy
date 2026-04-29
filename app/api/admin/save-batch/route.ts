import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { changes } = await req.json()
    const password = req.headers.get('x-admin-password')
    
    // In a real app, this should be stored in Vercel KV or Env
    const adminPassword = process.env.ADMIN_PASSWORD || 'fardoy123'
    
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update KV
    const KV_KEY = 'fardoy_site_content'
    const currentContent = (await kv.get(KV_KEY)) || {}
    
    // Deep merge changes (simplified for now)
    const newContent = { ...currentContent as object, ...changes }
    
    await kv.set(KV_KEY, newContent)
    
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Save batch error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
