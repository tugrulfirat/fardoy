'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import { FAQItem } from '@/components/FAQItem'
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
              <InlineEditable contentPath="hero.headline" value={content.hero.headline} />
            </h1>
            <p className="mt-8 font-body text-lg md:text-xl text-brand-muted max-w-2xl leading-relaxed">
              <InlineEditable contentPath="hero.subheadline" value={content.hero.subheadline} />
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <Link href="/consultation" className="px-8 py-4 border border-brand-ink font-body text-xs uppercase tracking-widest font-bold flex items-center gap-4 hover:bg-brand-ink hover:text-brand-paper transition-all">
                <InlineEditable contentPath="hero.cta" value={content.hero.cta} multiline={false} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6 mt-20 md:mt-32">
          <div className="md:col-span-4 relative order-2 md:order-1">
            <img src="/assets/office-minimal.png" alt="Office Interior" className="w-full aspect-[1/1.4] object-cover" />
          </div>
          <div className="md:col-span-8 relative order-1 md:order-2">
            <img src="/assets/architecture-strategic.png" alt="Strategic Environment" className="w-full aspect-video object-cover" />
          </div>
        </div>
      </section>

      {/* STRATEGIC TRIGGERS */}
      <section className="section-pad py-24 md:py-36 bg-brand-sage relative overflow-hidden">
        <div className="grid md:grid-cols-12 gap-10 relative z-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-[1px] bg-brand-ink"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-ink">Strategic Triggers</span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl leading-tight text-brand-ink">
              <InlineEditable contentPath="triggers.title" value={content.triggers.title} />
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <ul className="space-y-10">
              {content.triggers.items.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-6 group">
                  <span className="text-brand-red font-bold mt-2 transform group-hover:scale-125 transition-transform duration-500">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect width="14" height="14" fill="currentColor"/></svg>
                  </span>
                  <p className="font-heading text-2xl md:text-4xl leading-tight text-brand-ink opacity-90 group-hover:opacity-100 transition-opacity">
                    <InlineEditable contentPath={`triggers.items.${i}`} value={item} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="section-pad py-24 md:py-36 bg-brand-paper">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-center max-w-[1440px] mx-auto">
          <div className="md:col-span-5">
            <img src="/assets/consultancy-meeting.png" alt="Forward Expansion" className="w-full aspect-[3/4] object-cover transition-all duration-700" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Who we are</span>
            </div>
            <h2 className="font-heading text-5xl md:text-7xl leading-[0.95] mb-8">
              <InlineEditable contentPath="whoWeAre.headline" value={content.whoWeAre.headline} />
            </h2>
            <div className="max-w-[640px]">
              <p className="font-heading text-2xl md:text-3xl leading-snug mb-6">
                <InlineEditable contentPath="whoWeAre.subheadline" value={content.whoWeAre.subheadline} />
              </p>
              <p className="font-body text-sm text-brand-muted leading-relaxed">
                <InlineEditable contentPath="whoWeAre.desc" value={content.whoWeAre.desc} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FARDOY / HIGHLIGHTS */}
      <section className="section-pad py-24 md:py-40 bg-brand-paper border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Why Fardoy</span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl leading-tight">
              <InlineEditable contentPath="whyFardoy.title" value={content.whyFardoy.title} />
            </h2>
          </div>
          <div className="md:col-span-7">
            <div className="space-y-6 font-body text-lg md:text-xl text-brand-muted leading-relaxed mb-12">
              {content.whyFardoy.paragraphs.map((p: string, i: number) => (
                <p key={i}>
                  <InlineEditable contentPath={`whyFardoy.paragraphs.${i}`} value={p} />
                </p>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-10">
              {content.whyFardoy.stats.map((stat: any, i: number) => (
                <div key={i} className="border-t border-brand-ink border-opacity-10 pt-6">
                  <p className="font-heading text-3xl mb-2 italic">
                    <InlineEditable contentPath={`whyFardoy.stats.${i}.value`} value={stat.value} multiline={false} />
                  </p>
                  <p className="text-[12px] uppercase tracking-widest font-bold text-brand-muted">
                    <InlineEditable contentPath={`whyFardoy.stats.${i}.label`} value={stat.label} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-24 md:py-32 bg-brand-ink text-brand-paper overflow-hidden">
        <div className="section-pad mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-mint mb-8 block">PRINCIPLES</span>
          <h2 className="font-heading text-5xl md:text-7xl leading-none max-w-3xl">
            <InlineEditable contentPath="principles.title" value={content.principles.title} />
          </h2>
        </div>
        <div className="pl-6 md:pl-[clamp(4rem,6vw,7rem)] overflow-x-auto pb-4">
          <div className="flex gap-6 w-max pr-6 md:pr-20">
              {content.principles.cards.map((card: any, i: number) => (
                <article key={card.id} className="principle-card w-[280px] md:w-[340px] bg-[#2b3832] p-8 flex flex-col justify-between">
                  <div className={`flex gap-3 text-brand-red ${i === 2 ? 'items-end' : 'items-center'}`}>
                    {i === 0 && (
                      <>
                        <span className="w-16 h-16 rounded-full border border-current"></span>
                        <span className="w-16 h-16 bg-current"></span>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <span className="w-16 h-16 rounded-full bg-current"></span>
                        <span className="w-28 h-16 rounded-full border border-current"></span>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <span className="w-20 h-16 rounded-t-full border border-current"></span>
                        <span className="w-16 h-16 rounded-full bg-current"></span>
                        <span className="w-16 h-16 rounded-br-full border border-current"></span>
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <span className="w-24 h-16 rounded-l-full bg-current"></span>
                        <span className="w-16 h-16 border border-current rotate-45"></span>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-xs opacity-50 mb-8">/ {card.id}</p>
                    <h3 className="font-heading text-4xl mb-5">
                      <InlineEditable contentPath={`principles.cards.${i}.title`} value={card.title} multiline={false} />
                    </h3>
                    <p className="text-sm text-brand-mint leading-relaxed">
                      <InlineEditable contentPath={`principles.cards.${i}.desc`} value={card.desc} />
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-brand-paper">
        <div className="section-pad pt-24 md:pt-36 bg-brand-paper">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red mb-8 block">LEADERSHIP</span>
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-8">
              <h2 className="font-heading text-5xl md:text-7xl leading-[0.95]">
                <InlineEditable contentPath="leadership.title" value={content.leadership.title} />
              </h2>
            </div>
            <div className="md:col-span-4 grid gap-8">
              <p className="text-brand-muted leading-relaxed">
                <InlineEditable contentPath="leadership.desc1" value={content.leadership.desc1} />
              </p>
              <p className="text-brand-muted leading-relaxed">
                <InlineEditable contentPath="leadership.desc2" value={content.leadership.desc2} />
              </p>
            </div>
          </div>

          <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-6 items-end relative z-10">
            <div className="md:col-span-5 bg-brand-cream pt-8">
              <div className="px-8 pb-8">
                <h3 className="font-heading text-4xl">
                  <InlineEditable contentPath="leadership.founders.0.name" value={content.leadership.founders[0].name} multiline={false} />
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-brand-red font-bold mt-2">
                  <InlineEditable contentPath="leadership.founders.0.role" value={content.leadership.founders[0].role} multiline={false} />
                </p>
              </div>
              <img src="/assets/shervin.png" alt="Shervin Fard" className="w-full aspect-[4/5] object-cover grayscale" />
            </div>
            <div className="md:col-span-4 bg-brand-cream pt-8 md:translate-y-14">
              <div className="px-8 pb-8">
                <h3 className="font-heading text-4xl">
                  <InlineEditable contentPath="leadership.founders.1.name" value={content.leadership.founders[1].name} multiline={false} />
                </h3>
                <p className="text-xs uppercase tracking-[0.25em] text-brand-red font-bold mt-2">
                  <InlineEditable contentPath="leadership.founders.1.role" value={content.leadership.founders[1].role} multiline={false} />
                </p>
              </div>
              <img src="/assets/marzieh.png" alt="Marzieh Fard" className="w-full aspect-[4/5] object-cover object-top grayscale" />
            </div>
            <div className="md:col-span-3 pb-10">
              <p className="text-brand-muted leading-relaxed italic">
                <InlineEditable contentPath="leadership.expertise" value={content.leadership.expertise} />
              </p>
            </div>
          </div>
        </div>
        <div className="bg-brand-ink h-28 md:h-44"></div>
      </section>

      {/* HOW WE WORK */}
      <section className="section-pad py-24 md:py-32 bg-brand-paper">
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
            <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">How we work</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl leading-tight">
            <InlineEditable contentPath="process.title" value={content.process.title} />
          </h2>
        </div>
        
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="md:col-span-7 relative group overflow-hidden">
            <img src="/assets/abstract_process.png" alt="Structured strategy process" className="w-full aspect-[4/3] md:aspect-video object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="space-y-12">
              {content.process.steps.map((step: any, i: number) => (
                <div key={i}>
                  <p className="text-brand-red font-body text-[12px] uppercase tracking-[0.3em] font-bold mb-3">{step.id}</p>
                  <h3 className="font-heading text-3xl md:text-4xl mb-3">
                    <InlineEditable contentPath={`process.steps.${i}.title`} value={step.title} multiline={false} />
                  </h3>
                  <p className="font-body text-brand-muted leading-relaxed text-lg">
                    <InlineEditable contentPath={`process.steps.${i}.desc`} value={step.desc} />
                  </p>
                  {i < 2 && <div className="w-full h-[1px] bg-brand-ink opacity-10 mt-12"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad py-24 md:py-40 bg-brand-paper border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Questions</span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl leading-tight">
              <InlineEditable contentPath="faq.title" value={content.faq.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-12 md:mt-0">
            <div className="border-t border-brand-ink border-opacity-10">
              {content.faq.items.map((item: any, i: number) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad py-24 md:py-32 bg-brand-ink text-brand-paper">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-mint mb-8 block">NEXT STEP</span>
            <h2 className="font-heading text-5xl md:text-7xl leading-none">
              <InlineEditable contentPath="cta.headline" value={content.cta.headline} />
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link href="/consultation" className="w-32 h-32 rounded-full bg-brand-red text-brand-paper flex items-center justify-center text-[12px] uppercase tracking-[0.2em] font-bold text-center leading-relaxed hover:bg-brand-paper hover:text-brand-ink transition-colors">
              <InlineEditable contentPath="cta.button" value={content.cta.button} />
            </Link>
          </div>
        </div>
        <img src="/assets/team-meeting.png" alt="Strategy meeting" className="w-full aspect-[21/8] object-cover mt-20 grayscale-[20%]" />
      </section>

      <Footer />
    </main>
  )
}
