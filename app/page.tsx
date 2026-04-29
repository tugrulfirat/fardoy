'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import Link from 'next/link'

export default function Home() {
  const content = useSiteContent()

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* HERO SECTION */}
      <section className="section-pad pt-20 md:pt-32 pb-24 md:pb-40 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-9">
            <h1 className="font-heading text-[11vw] md:text-[7vw] lg:text-[6vw] leading-[0.95] tracking-tight max-w-5xl">
              <InlineEditable 
                contentPath="hero.headline" 
                value={content.hero.headline} 
                as="span"
              />
            </h1>
            <p className="mt-8 font-body text-lg md:text-xl text-brand-muted max-w-2xl leading-relaxed">
              <InlineEditable 
                contentPath="hero.subheadline" 
                value={content.hero.subheadline} 
                as="span"
              />
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <Link href="/consultation" className="px-8 py-4 border border-brand-ink font-body text-xs uppercase tracking-widest font-bold flex items-center gap-4 hover:bg-brand-ink hover:text-brand-paper transition-all">
                <InlineEditable 
                  contentPath="hero.cta" 
                  value={content.hero.cta} 
                  as="span"
                  multiline={false}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Images Grid */}
        <div className="grid md:grid-cols-12 gap-6 mt-20 md:mt-32">
          <div className="md:col-span-4 relative order-2 md:order-1">
            <img src="/assets/office-minimal.png" alt="Office Interior" className="w-full aspect-[1/1.4] object-cover" />
          </div>
          <div className="md:col-span-8 relative order-1 md:order-2">
            <img src="/assets/strategic-architecture.png" alt="Strategic Environment" className="w-full aspect-video object-cover" />
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS WOULD GO HERE */}
      
      <Footer />
    </main>
  )
}
