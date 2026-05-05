import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, requirements } = body

    const BREVO_API_KEY = process.env.BREVO_API_KEY

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Fardoy Website', email: 'hello@fardoy.com' },
        to: [{ email: 'hello@fardoy.com', name: 'Fardoy Team' }],
        replyTo: { email, name },
        subject: `New Consultation Inquiry from ${name}`,
        htmlContent: `
          <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #ef4d38; border-bottom: 2px solid #ef4d38; padding-bottom: 10px;">New Consultation Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ef4d38; margin-top: 20px;">
              <p><strong>Requirements:</strong></p>
              <p style="white-space: pre-line;">${requirements}</p>
            </div>
            <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999;">This message was sent from the Fardoy website contact form.</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Brevo API Error:', errorData)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
