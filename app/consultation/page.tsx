'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { FAQItem } from '@/components/FAQItem'
import { useSiteContent } from '@/components/SiteContentContext'
import { useEffect, useState } from 'react'

export default function Consultation() {
  const content = useSiteContent()
  const page = content.consultationPage

  const [formState, setFormState] = useState({ name: '', email: '', requirements: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      
      if (!response.ok) throw new Error('Failed to send')
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    // Load Google Calendar script
    const link = document.createElement('link')
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js'
    script.async = true
    script.onload = () => {
      if (cancelled) return
      // @ts-ignore
      if (window.calendar && window.calendar.schedulingButton) {
        // @ts-ignore
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Ps4ykJzymWpVfC-PB3iMIfkYdmuNk4EXvI6fTPoxhaiRQvVZSBezDfkU-7BucMxLu6uvDxHj1?gv=true',
          color: '#ef4d38',
          label: 'Book an appointment',
          target: document.getElementById('calendar-button-target'),
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      cancelled = true
      link.parentNode?.removeChild(link)
      script.parentNode?.removeChild(script)
    }
  }, [])

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* INQUIRE HERO */}
      <section className="section-pad pt-20 md:pt-28 pb-16 md:pb-20 bg-brand-sage relative overflow-hidden">
        <div className="grid md:grid-cols-12 gap-10 relative z-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">
                <InlineEditable contentPath="consultationPage.hero.label" value={page.hero.label} multiline={false} />
              </span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight">
              <InlineEditable contentPath="consultationPage.hero.headline" value={page.hero.headline} />
            </h1>
            <div className="mt-10 md:mt-14 max-w-2xl border-l border-brand-ink/15 pl-6">
              <p className="font-body text-base md:text-lg leading-relaxed text-brand-muted">
                <InlineEditable contentPath="consultationPage.hero.subheadline" value={page.hero.subheadline} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-cream">
        <div className="grid md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Info */}
          <div className="md:col-span-4 space-y-16">
            <div>
              <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">
                <InlineEditable contentPath="consultationPage.info.preQualTitle" value={page.info.preQualTitle} multiline={false} />
              </span>
              <p className="text-brand-muted leading-relaxed text-lg">
                <InlineEditable contentPath="consultationPage.info.preQual" value={page.info.preQual} />
              </p>
            </div>
          </div>

          {/* Form and Calendar */}
          <div className="md:col-span-8">
            <div className="max-w-3xl">
              <div className="mb-16">
                <h3 className="font-heading text-3xl mb-8 italic">
                  <InlineEditable contentPath="consultationPage.form.calendarTitle" value={page.form.calendarTitle} multiline={false} />
                </h3>
                <div id="calendar-button-target"></div>
              </div>

              <div className="w-full h-[1px] bg-brand-ink opacity-10 my-16"></div>

              <h3 className="font-heading text-3xl mb-12 italic">
                <InlineEditable contentPath="consultationPage.form.messageTitle" value={page.form.messageTitle} multiline={false} />
              </h3>
              {submitted ? (
                <div className="bg-brand-mint/10 p-12 border border-brand-mint/20 text-center">
                  <h4 className="font-heading text-3xl mb-4 italic">Message Sent.</h4>
                  <p className="text-brand-muted">We'll be in touch with you at {formState.email} shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-xs uppercase tracking-widest font-bold text-brand-red">Send another message</button>
                </div>
              ) : (
                <form className="grid gap-12" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="border-b border-brand-ink border-opacity-20 pb-4">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted block mb-4">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-transparent font-heading text-2xl outline-none placeholder:opacity-20" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="border-b border-brand-ink border-opacity-20 pb-4">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted block mb-4">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-transparent font-heading text-2xl outline-none placeholder:opacity-20" 
                        placeholder="name@company.com" 
                      />
                    </div>
                  </div>
                  <div className="border-b border-brand-ink border-opacity-20 pb-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted block mb-4">Requirements</label>
                    <textarea 
                      required
                      value={formState.requirements}
                      onChange={(e) => setFormState({ ...formState, requirements: e.target.value })}
                      className="w-full bg-transparent font-heading text-2xl outline-none placeholder:opacity-20 min-h-[120px]" 
                      placeholder="Briefly describe your current challenges..."
                    ></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="group flex items-center gap-8 mt-8 disabled:opacity-50">
                    <span className="font-heading text-4xl md:text-5xl group-hover:text-brand-red transition-colors">
                      {isSubmitting ? 'Sending...' : 'Start the Conversation'}
                    </span>
                    <span className="w-16 h-16 rounded-full border border-brand-ink flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                      <svg className="w-6 h-6 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT SECTION */}
      <section className="section-pad py-24 md:py-32 bg-brand-paper">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">
                <InlineEditable contentPath="consultationPage.expect.label" value={page.expect.label} multiline={false} />
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight">
              <InlineEditable contentPath="consultationPage.expect.title" value={page.expect.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0">
            <ul className="space-y-8">
              {page.expect.items
                .map((item: string, i: number) => ({ item, originalIndex: i }))
                .filter(({ item }: { item: string; originalIndex: number }) => item.trim().length > 0)
                .map(({ item, originalIndex }: { item: string; originalIndex: number }, i: number) => (
                <li key={originalIndex} className="flex items-start gap-4 border-b border-brand-ink border-opacity-5 pb-8 text-xl md:text-2xl font-heading">
                  <span className="text-brand-red">0{i+1}</span>
                  <InlineEditable contentPath={`consultationPage.expect.items.${originalIndex}`} value={item} />
                </li>
              ))}
            </ul>
            <div className="mt-16 p-10 bg-brand-ink text-brand-paper">
              <p className="font-heading text-3xl mb-4 italic text-brand-mint">
                <InlineEditable contentPath="consultationPage.expect.callout" value={page.expect.callout} multiline={false} />
              </p>
              <p className="text-base md:text-lg opacity-70 leading-relaxed max-w-sm">
                <InlineEditable contentPath="consultationPage.expect.subcallout" value={page.expect.subcallout} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-cream">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">FAQ</span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl leading-tight">
              <InlineEditable contentPath="consultationPage.faq.title" value={page.faq.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-12 md:mt-0">
            <div className="border-t border-brand-ink/5">
              {page.faq.items.map((item: any, i: number) => (
                <FAQItem 
                  key={i} 
                  questionNode={<InlineEditable contentPath={`consultationPage.faq.items.${i}.q`} value={item.q} multiline={false} />}
                  answerNode={<InlineEditable contentPath={`consultationPage.faq.items.${i}.a`} value={item.a} />}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
