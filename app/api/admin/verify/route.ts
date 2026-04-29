import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const adminPassword = (process.env.ADMIN_PASSWORD || 'fardoy26ms').trim()
    
    console.log('Admin login attempt with password length:', password?.length)

    if (password && password === adminPassword) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }
    
    console.log('Invalid password attempt')
    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 })
  } catch (err) {
    console.error('Verification error:', err)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
