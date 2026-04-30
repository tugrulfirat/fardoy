import { NextResponse } from 'next/server'
import { createClient } from '@vercel/kv'

const getUrl = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL || ''
  return url.startsWith('https://') ? url : 'https://dummy-url.com'
}

const kv = createClient({
  url: getUrl(),
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || 'dummy-token',
})

export async function GET() {
  const result: any = { status: 'testing' }
  
  try {
    await kv.set('test_key', 'test_value')
    result.write = 'success'
    
    const val = await kv.get('test_key')
    result.read = val
    
    result.all_good = true
  } catch (err: any) {
    result.error = err.message
    result.stack = err.stack
  }

  return NextResponse.json(result)
}

