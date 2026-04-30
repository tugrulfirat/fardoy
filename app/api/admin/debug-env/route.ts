import { NextResponse } from 'next/server'

export async function GET() {
  const vars = {
    has_kv_url: !!process.env.KV_REST_API_URL,
    has_kv_token: !!process.env.KV_REST_API_TOKEN,
    has_upstash_url: !!process.env.UPSTASH_REDIS_REST_URL,
    has_upstash_token: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    has_redis_url: !!process.env.REDIS_URL,
    url_starts_with_https: (process.env.KV_REST_API_URL || '').startsWith('https://')
  }
  return NextResponse.json(vars)
}
