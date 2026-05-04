'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import Link from 'next/link'

export default function Expertise() {
  const content = useSiteContent()
  const page = content.expertisePage

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* EXPERTISE HERO */}
      <section className="section-pad pt-20 md:pt-32 pb-24 md:pb-32 bg-brand-paper">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Capabilities</span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight">
              <InlineEditable contentPath="expertisePage.hero.title" value={page.hero.title} />
            </h1>
          </div>
        </div>
      </section>

      {/* OVERVIEW INDEX SECTION */}
      <section className="section-pad py-16 md:py-24 bg-brand-paper border-y border-brand-ink border-opacity-10">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5">
            <p className="font-heading text-2xl md:text-3xl leading-snug">
              <InlineEditable contentPath="expertisePage.overview.headline" value={page.overview.headline} />
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-y-6 md:gap-y-8">
              {page.overview.items.map((item: string, i: number) => (
                <div key={i} className="text-[12px] uppercase tracking-widest font-bold opacity-60">
                  <InlineEditable contentPath={`expertisePage.overview.items.${i}`} value={item} multiline={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES LIST */}
      <section>
        {page.services.map((service: any, i: number) => (
          <div 
            key={i} 
            id={service.title.toLowerCase().split(' ')[0]} 
            className={`section-pad py-24 md:py-40 ${i % 2 === 1 ? 'bg-brand-ink text-brand-paper' : 'bg-brand-paper'}`}
          >
            <div className="max-w-6xl">
              <span className={`section-num mb-8 block ${i % 2 === 1 ? 'text-brand-mint' : ''}`}>/ {service.id}</span>
              <h2 className="font-heading text-5xl md:text-8xl leading-[0.9] mb-12">
                <InlineEditable contentPath={`expertisePage.services.${i}.title`} value={service.title} />
              </h2>
              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                <div className="md:col-span-8">
                  <p className={`font-heading text-2xl md:text-4xl leading-tight mb-16 ${i % 2 === 1 ? 'text-brand-mint text-opacity-90' : 'text-brand-muted'}`}>
                    <InlineEditable contentPath={`expertisePage.services.${i}.desc`} value={service.desc} />
                  </p>
                </div>
              </div>
              
              <div className={`grid md:grid-cols-3 gap-12 border-t pt-16 ${i % 2 === 1 ? 'border-brand-paper border-opacity-10' : 'border-brand-ink border-opacity-10'}`}>
                <div>
                  <p className={`text-[12px] uppercase tracking-[0.3em] font-bold mb-6 ${i % 2 === 1 ? 'text-brand-mint' : 'text-brand-red'}`}>Typical Situations</p>
                  <ul className={`space-y-4 text-sm leading-relaxed ${i % 2 === 1 ? 'text-brand-paper text-opacity-70' : 'text-brand-muted'}`}>
                    {service.situations.map((sit: string, j: number) => (
                      <li key={j} className="flex gap-3">
                        <span>—</span>
                        <InlineEditable contentPath={`expertisePage.services.${i}.situations.${j}`} value={sit} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`text-[12px] uppercase tracking-[0.3em] font-bold mb-6 ${i % 2 === 1 ? 'text-brand-mint' : 'text-brand-red'}`}>What we focus on</p>
                  <ul className={`space-y-4 text-sm leading-relaxed font-bold ${i % 2 === 1 ? 'text-brand-paper text-opacity-70' : 'text-brand-muted'}`}>
                    {service.focus.map((f: string, j: number) => (
                      <li key={j} className="flex gap-3">
                        <span>0{j+1}</span>
                        <InlineEditable contentPath={`expertisePage.services.${i}.focus.${j}`} value={f} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={`text-[12px] uppercase tracking-[0.3em] font-bold mb-6 ${i % 2 === 1 ? 'text-brand-mint' : 'text-brand-red'}`}>What changes after</p>
                  <ul className={`space-y-4 text-sm leading-relaxed ${i % 2 === 1 ? 'text-brand-paper text-opacity-70' : 'text-brand-muted'}`}>
                    {service.outcomes.map((out: string, j: number) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-brand-red">●</span>
                        <InlineEditable contentPath={`expertisePage.services.${i}.outcomes.${j}`} value={out} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CLOSING SECTION */}
      <section className="section-pad py-32 md:py-56 bg-brand-paper border-t border-brand-ink border-opacity-10">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <h2 className="font-heading text-4xl md:text-7xl leading-[0.95] mb-10">
              <InlineEditable contentPath="expertisePage.closing.headline" value={page.closing.headline} />
            </h2>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed max-w-2xl">
              <InlineEditable contentPath="expertisePage.closing.subheadline" value={page.closing.subheadline} />
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 mt-12 md:mt-0">
            <Link href="/consultation" className="group block">
              <div className="w-full aspect-square rounded-full bg-brand-red border border-brand-red flex flex-col items-center justify-center p-10 hover:bg-brand-ink hover:border-brand-ink transition-all duration-500">
                <span className="text-xs uppercase tracking-widest font-bold mb-4 text-white transition-colors">Next Move</span>
                <span className="font-heading text-3xl md:text-4xl text-center leading-tight text-white transition-colors">
                  <InlineEditable contentPath="expertisePage.closing.cta" value={page.closing.cta} multiline={false} />
                </span>
                <svg className="w-6 h-6 mt-6 group-hover:translate-x-2 text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
