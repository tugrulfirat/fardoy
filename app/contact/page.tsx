'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import Link from 'next/link'

export default function Contact() {
  const content = useSiteContent()
  const page = content.contactPage

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* CONTACT HERO */}
      <section className="section-pad pt-20 md:pt-32 pb-48 md:pb-64 bg-brand-paper">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">
                <InlineEditable contentPath="contactPage.hero.label" value={page.hero.label} multiline={false} />
              </span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight mb-20">
              <InlineEditable contentPath="contactPage.hero.title" value={page.hero.title} />
            </h1>
            
            <div className="grid md:grid-cols-12 gap-16 md:gap-32 items-end">
              <div className="md:col-span-7">
                <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted mb-6">General Enquiries</p>
                <a href={`mailto:${page.enquiries.email}`} className="font-heading text-4xl md:text-7xl border-b border-brand-ink border-opacity-10 pb-4 hover:text-brand-red transition-all block">
                  <InlineEditable contentPath="contactPage.enquiries.email" value={page.enquiries.email} multiline={false} />
                </a>
              </div>
              <div className="md:col-span-5 space-y-12">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted mb-4">Social</p>
                  <a href="https://linkedin.com" target="_blank" className="font-heading text-3xl hover:italic hover:text-brand-red transition-all">
                    <InlineEditable contentPath="contactPage.enquiries.social" value={page.enquiries.social} multiline={false} />
                  </a>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted mb-4">Location</p>
                  <p className="font-body text-brand-muted text-lg leading-relaxed max-w-xs">
                    <InlineEditable contentPath="contactPage.enquiries.location" value={page.enquiries.location} />
                  </p>
                </div>
              </div>
            </div>

            {/* ADDITIONAL INFO SECTION */}
            <div className="mt-24 grid md:grid-cols-2 gap-16 border-t border-brand-ink border-opacity-5 pt-16">
              <div>
                <p className="text-[12px] uppercase tracking-[0.25em] font-bold text-brand-muted mb-6">
                  <InlineEditable contentPath="contactPage.additional.engagements.title" value={page.additional.engagements.title} multiline={false} />
                </p>
                <p className="text-xl leading-relaxed text-brand-ink font-heading mb-6 max-w-sm">
                  <InlineEditable contentPath="contactPage.additional.engagements.desc1" value={page.additional.engagements.desc1} />
                </p>
                <p className="text-lg leading-relaxed text-brand-muted max-w-sm">
                  <InlineEditable contentPath="contactPage.additional.engagements.desc2" value={page.additional.engagements.desc2} />
                </p>
              </div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.25em] font-bold text-brand-muted mb-6">
                  <InlineEditable contentPath="contactPage.additional.partnerships.title" value={page.additional.partnerships.title} multiline={false} />
                </p>
                <p className="text-lg leading-relaxed text-brand-muted mb-6 max-w-sm">
                  <InlineEditable contentPath="contactPage.additional.partnerships.desc1" value={page.additional.partnerships.desc1} />
                </p>
                <p className="text-lg leading-relaxed text-brand-muted max-w-sm">
                  <InlineEditable contentPath="contactPage.additional.partnerships.desc2" value={page.additional.partnerships.desc2} />
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEXT MOVE SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-ink text-brand-paper">
        <div className="max-w-4xl">
          <h2 className="font-heading text-4xl md:text-6xl leading-tight mb-12">
            <InlineEditable contentPath="contactPage.cta.headline" value={page.cta.headline} />
          </h2>
          <Link href="/consultation" className="inline-flex items-center gap-6 group">
            <span className="text-xs uppercase tracking-widest font-bold border-b border-brand-mint pb-2 group-hover:border-brand-red group-hover:text-brand-red transition-all">
              <InlineEditable contentPath="contactPage.cta.button" value={page.cta.button} multiline={false} />
            </span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
