'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import { useEffect } from 'react'

export default function Consultation() {
  const content = useSiteContent()
  const page = content.consultationPage

  useEffect(() => {
    // Load Google Calendar script
    const link = document.createElement('link')
    link.href = 'https://calendar.google.com/calendar/scheduling-button-script.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js'
    script.async = true
    script.onload = () => {
      // @ts-ignore
      if (window.calendar && window.calendar.schedulingButton) {
        // @ts-ignore
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2grDMTz3nliLjgnV8Vh7YtFf-xVdFSK7XTgoO2hURRQbPT7ZoDoMqZyeLFT-P2Jy001frUD1j7?gv=true',
          color: '#ef4d38',
          label: 'Book an appointment',
          target: document.getElementById('calendar-button-target'),
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* INQUIRE HERO */}
      <section className="section-pad pt-20 md:pt-32 pb-24 md:pb-40 bg-brand-paper">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Engagement</span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight">
              <InlineEditable contentPath="consultationPage.hero.headline" value={page.hero.headline} />
            </h1>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10 mt-16 md:mt-24">
          <div className="md:col-span-8 md:col-start-1">
            <p className="font-heading text-2xl md:text-5xl leading-tight mb-8">
              <InlineEditable contentPath="consultationPage.hero.subheadline" value={page.hero.subheadline} />
            </p>
            <p className="font-heading text-xl md:text-3xl text-brand-muted italic">
              <InlineEditable contentPath="consultationPage.hero.italic" value={page.hero.italic} />
            </p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-cream border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-16 md:gap-24">
          
          {/* Info */}
          <div className="md:col-span-4 space-y-16">
            <div>
              <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">Pre-Qualification</span>
              <p className="text-brand-muted leading-relaxed text-lg">
                <InlineEditable contentPath="consultationPage.info.preQual" value={page.info.preQual} />
              </p>
            </div>
            <div>
              <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">Availability</span>
              <p className="text-brand-muted leading-relaxed text-lg">
                <InlineEditable contentPath="consultationPage.info.availability" value={page.info.availability} />
              </p>
            </div>
            <div className="p-8 bg-brand-paper border border-brand-ink border-opacity-5">
              <p className="font-heading text-2xl mb-4 italic">
                "<InlineEditable contentPath="consultationPage.info.quote" value={page.info.quote} />"
              </p>
              <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-brand-muted">
                — <InlineEditable contentPath="consultationPage.info.author" value={page.info.author} multiline={false} />
              </p>
            </div>
          </div>

          {/* Form and Calendar */}
          <div className="md:col-span-8">
            <div className="max-w-3xl">
              <div className="mb-16">
                <h3 className="font-heading text-3xl mb-8 italic">Choose a time to speak.</h3>
                <div id="calendar-button-target"></div>
              </div>

              <div className="w-full h-[1px] bg-brand-ink opacity-10 my-16"></div>

              <h3 className="font-heading text-3xl mb-12 italic">Or send a message.</h3>
              <form className="grid gap-12">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="border-b border-brand-ink border-opacity-20 pb-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted block mb-4">Full Name</label>
                    <input type="text" className="w-full bg-transparent font-heading text-2xl outline-none placeholder:opacity-20" placeholder="John Doe" />
                  </div>
                  <div className="border-b border-brand-ink border-opacity-20 pb-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted block mb-4">Email Address</label>
                    <input type="email" className="w-full bg-transparent font-heading text-2xl outline-none placeholder:opacity-20" placeholder="name@company.com" />
                  </div>
                </div>
                <div className="border-b border-brand-ink border-opacity-20 pb-4">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-muted block mb-4">Requirements</label>
                  <textarea className="w-full bg-transparent font-heading text-2xl outline-none placeholder:opacity-20 min-h-[120px]" placeholder="Briefly describe your current challenges..."></textarea>
                </div>
                <button type="submit" className="group flex items-center gap-8 mt-8">
                  <span className="font-heading text-4xl md:text-5xl group-hover:text-brand-red transition-colors">Start the Conversation</span>
                  <span className="w-16 h-16 rounded-full border border-brand-ink flex items-center justify-center group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                    <svg className="w-6 h-6 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT SECTION */}
      <section className="section-pad py-24 md:py-32 bg-brand-paper border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Process</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight">
              <InlineEditable contentPath="consultationPage.expect.title" value={page.expect.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0">
            <ul className="space-y-8">
              {page.expect.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4 border-b border-brand-ink border-opacity-5 pb-8 text-xl md:text-2xl font-heading">
                  <span className="text-brand-red">0{i+1}</span>
                  <InlineEditable contentPath={`consultationPage.expect.items.${i}`} value={item} />
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
      <section className="section-pad py-24 md:py-32 bg-brand-paper border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">FAQ</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight">
              <InlineEditable contentPath="consultationPage.faq.title" value={page.faq.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0">
            <div className="space-y-16">
              {page.faq.items.map((item: any, i: number) => (
                <div key={i}>
                  <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-brand-muted mb-4">
                    <InlineEditable contentPath={`consultationPage.faq.items.${i}.q`} value={item.q} />
                  </p>
                  <p className="text-xl md:text-2xl font-heading leading-relaxed max-w-xl">
                    <InlineEditable contentPath={`consultationPage.faq.items.${i}.a`} value={item.a} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
