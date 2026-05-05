'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { ImageEditable } from '@/components/ImageEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useDraft } from '@/components/DraftContext'
import Link from 'next/link'

export default function Expertise() {
  const content = useSiteContent()
  const { isAdmin } = useIsAdmin()
  const { updateDraft } = useDraft()
  if (!content?.expertisePage) {
    return (
      <main className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="animate-pulse text-brand-muted uppercase tracking-widest text-xs">Loading...</div>
      </main>
    )
  }

  const page = content.expertisePage
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* EXPERTISE HERO */}
      <section className="section-pad pt-20 md:pt-28 pb-16 md:pb-20 bg-brand-paper relative overflow-hidden">
        <div className="hidden lg:block absolute right-[6vw] bottom-8 pointer-events-none z-0 text-right select-none">
          <div className="font-body font-extralight text-[16vw] leading-none text-brand-ink opacity-[0.045]">
            04
          </div>
          <div className="-mt-6 text-[11px] uppercase tracking-[0.45em] font-bold text-brand-red opacity-70">
            Capabilities
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10 relative z-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Capabilities</span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight">
              <InlineEditable contentPath="expertisePage.hero.title" value={page.hero.title} />
            </h1>
            <div className="mt-10 md:mt-14 max-w-2xl border-l border-brand-ink/15 pl-6">
              <p className="font-body text-base md:text-lg leading-relaxed text-brand-muted">
                <InlineEditable
                  contentPath="expertisePage.hero.subheadline"
                  value={page.hero.subheadline}
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW INDEX SECTION */}
      <section className="section-pad py-20 md:py-32 bg-brand-ink text-brand-paper">
        <div className="grid md:grid-cols-12 gap-10 items-start mb-16 md:mb-24">
          <div className="md:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-brand-mint opacity-70 block mb-6">What we do</span>
            <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight text-brand-paper">
              <InlineEditable contentPath="expertisePage.overview.headline" value={page.overview.headline} />
            </p>
          </div>
        </div>
        <div className="border-t border-brand-paper border-opacity-10">
          {page.overview.items.map((item: string, i: number) => (
            <button 
              key={i} 
              onClick={() => scrollToSection(page.services[i].title.toLowerCase().split(' ')[0])}
              className="w-full text-left group flex items-center justify-between border-b border-brand-paper border-opacity-10 py-7 md:py-9 cursor-pointer hover:pl-4 transition-all duration-300"
            >
              <div className="flex items-center gap-8 md:gap-12">
                <span className="text-[11px] font-bold tracking-[0.3em] text-brand-mint opacity-50 w-8 shrink-0">
                  0{i + 1}
                </span>
                <span className="font-heading text-2xl md:text-3xl text-brand-paper group-hover:text-brand-mint transition-colors duration-300">
                  <InlineEditable contentPath={`expertisePage.overview.items.${i}`} value={item} multiline={false} />
                </span>
              </div>
              <div className="w-8 h-[2px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"></div>
            </button>
          ))}
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
            <div className="max-w-6xl mx-auto">
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
                  <p className={`text-[12px] uppercase tracking-[0.3em] font-bold mb-6 ${i % 2 === 1 ? 'text-brand-mint' : 'text-brand-red'}`}>
                    <InlineEditable contentPath="expertisePage.overview.labels.situations" value={page.overview.labels.situations} multiline={false} />
                  </p>
                  <ul className={`space-y-4 text-sm leading-relaxed ${i % 2 === 1 ? 'text-brand-paper text-opacity-70' : 'text-brand-muted'}`}>
                    {service.situations.map((sit: string, j: number) => (
                      <li key={j} className="flex gap-3 relative group/item">
                        <span className="text-brand-red shrink-0">—</span>
                        <InlineEditable contentPath={`expertisePage.services.${i}.situations.${j}`} value={sit} />
                        {isAdmin && (
                          <button 
                            onClick={() => {
                              if (confirm('Remove this item?')) {
                                const newList = service.situations.filter((_: any, idx: number) => idx !== j)
                                updateDraft(`expertisePage.services.${i}.situations`, newList)
                              }
                            }}
                            className="absolute -right-6 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity text-brand-red text-xs p-1"
                          >
                            ×
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        const newList = [...service.situations, "New situation item..."]
                        updateDraft(`expertisePage.services.${i}.situations`, newList)
                      }}
                      className="mt-6 text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                    >
                      + Add Item
                    </button>
                  )}
                </div>
                <div>
                  <p className={`text-[12px] uppercase tracking-[0.3em] font-bold mb-6 ${i % 2 === 1 ? 'text-brand-mint' : 'text-brand-red'}`}>
                    <InlineEditable contentPath="expertisePage.overview.labels.focus" value={page.overview.labels.focus} multiline={false} />
                  </p>
                  <ul className={`space-y-4 text-sm leading-relaxed font-bold ${i % 2 === 1 ? 'text-brand-paper text-opacity-70' : 'text-brand-muted'}`}>
                    {service.focus.map((f: string, j: number) => (
                      <li key={j} className="flex gap-3 relative group/item">
                        <span className="text-brand-red shrink-0">0{j+1}</span>
                        <InlineEditable contentPath={`expertisePage.services.${i}.focus.${j}`} value={f} />
                        {isAdmin && (
                          <button 
                            onClick={() => {
                              if (confirm('Remove this item?')) {
                                const newList = service.focus.filter((_: any, idx: number) => idx !== j)
                                updateDraft(`expertisePage.services.${i}.focus`, newList)
                              }
                            }}
                            className="absolute -right-6 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity text-brand-red text-xs p-1"
                          >
                            ×
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        const newList = [...service.focus, "New focus item..."]
                        updateDraft(`expertisePage.services.${i}.focus`, newList)
                      }}
                      className="mt-6 text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                    >
                      + Add Item
                    </button>
                  )}
                </div>
                <div>
                  <p className={`text-[12px] uppercase tracking-[0.3em] font-bold mb-6 ${i % 2 === 1 ? 'text-brand-mint' : 'text-brand-red'}`}>
                    <InlineEditable contentPath="expertisePage.overview.labels.outcomes" value={page.overview.labels.outcomes} multiline={false} />
                  </p>
                  <ul className={`space-y-4 text-sm leading-relaxed ${i % 2 === 1 ? 'text-brand-paper text-opacity-70' : 'text-brand-muted'}`}>
                    {service.outcomes.map((out: string, j: number) => (
                      <li key={j} className="flex gap-3 relative group/item">
                        <span className="text-brand-red shrink-0">●</span>
                        <InlineEditable contentPath={`expertisePage.services.${i}.outcomes.${j}`} value={out} />
                        {isAdmin && (
                          <button 
                            onClick={() => {
                              if (confirm('Remove this item?')) {
                                const newList = service.outcomes.filter((_: any, idx: number) => idx !== j)
                                updateDraft(`expertisePage.services.${i}.outcomes`, newList)
                              }
                            }}
                            className="absolute -right-6 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity text-brand-red text-xs p-1"
                          >
                            ×
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        const newList = [...service.outcomes, "New outcome item..."]
                        updateDraft(`expertisePage.services.${i}.outcomes`, newList)
                      }}
                      className="mt-6 text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                    >
                      + Add Item
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CLOSING SECTION */}
      <section className="section-pad py-24 md:py-32 bg-brand-ink text-brand-paper">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-mint mb-8 block">NEXT STEP</span>
            <h2 className="font-heading text-5xl md:text-7xl leading-none">
              <InlineEditable contentPath="expertisePage.closing.headline" value={page.closing.headline} />
            </h2>
            <div className="mt-8">
              <p className="text-xl md:text-2xl text-brand-paper opacity-70 leading-relaxed max-w-2xl">
                <InlineEditable contentPath="expertisePage.closing.subheadline" value={page.closing.subheadline} />
              </p>
            </div>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link href="/consultation" className="w-32 h-32 rounded-full bg-brand-red text-brand-paper flex items-center justify-center text-[12px] uppercase tracking-[0.2em] font-bold text-center leading-relaxed hover:bg-brand-paper hover:text-brand-ink transition-colors">
              <InlineEditable contentPath="expertisePage.closing.cta" value={page.closing.cta} multiline={false} />
            </Link>
          </div>
        </div>
        <div className="mt-20">
          <ImageEditable 
            contentPath="expertisePage.closing.image" 
            value={page.closing.image} 
            alt="Strategy meeting"
            className="w-full aspect-[21/8] object-cover grayscale-[20%]"
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
