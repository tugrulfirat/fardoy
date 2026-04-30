import { getSiteContent } from '@/lib/siteContent'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json(content)
}
