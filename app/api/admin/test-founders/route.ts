import { getSiteContent } from '@/lib/siteContent'

export async function GET() {
  const content = await getSiteContent()
  return new Response(JSON.stringify(content.leadership.founders), {
    headers: { 'Content-Type': 'application/json' }
  })
}
