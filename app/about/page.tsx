'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import Link from 'next/link'

export default function About() {
  const content = useSiteContent()
  const page = content.aboutPage

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* PHILOSOPHY HERO */}
      <section className="section-pad pt-20 md:pt-32 pb-24 md:pb-40 bg-brand-paper">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">About</span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight">
              <InlineEditable contentPath="aboutPage.hero.headline" value={page.hero.headline} />
            </h1>
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10 mt-16 md:mt-24">
          <div className="md:col-span-6 md:col-start-7">
            <p className="font-heading text-2xl md:text-4xl leading-tight mb-10">
              <InlineEditable contentPath="aboutPage.hero.subheadline" value={page.hero.subheadline} />
            </p>
            <p className="font-body text-lg text-brand-muted leading-relaxed max-w-xl">
              <InlineEditable contentPath="aboutPage.hero.desc" value={page.hero.desc} />
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE WORK SECTION */}
      <section className="section-pad py-24 md:py-32 bg-brand-sage border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">Approach</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight">
              <InlineEditable contentPath="aboutPage.approach.title" value={page.approach.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0">
            <p className="font-heading text-2xl md:text-4xl leading-tight mb-10 italic">
              <InlineEditable contentPath="aboutPage.approach.italic" value={page.approach.italic} />
            </p>
            <div className="space-y-8 text-brand-muted leading-relaxed text-lg max-w-2xl">
              {page.approach.paragraphs.map((p: string, i: number) => (
                <p key={i}>
                  <InlineEditable contentPath={`aboutPage.approach.paragraphs.${i}`} value={p} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR DIFFERENCE SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-cream border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">Our Difference</span>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              <InlineEditable contentPath="aboutPage.difference.title" value={page.difference.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0">
            <p className="font-body text-xl md:text-2xl text-brand-muted leading-relaxed mb-12 max-w-2xl">
              <InlineEditable contentPath="aboutPage.difference.headline" value={page.difference.headline} />
            </p>
            <p className="font-body text-lg text-brand-muted leading-relaxed mb-16 max-w-xl">
              <InlineEditable contentPath="aboutPage.difference.desc" value={page.difference.desc} />
            </p>
            <div className="grid sm:grid-cols-3 gap-8 border-t border-brand-ink border-opacity-10 pt-12">
              {page.difference.points.map((pt: string, i: number) => (
                <div key={i}>
                  <p className="text-[12px] uppercase tracking-widest font-bold text-brand-red mb-4">0{i+1}</p>
                  <p className="text-sm font-bold leading-tight">
                    <InlineEditable contentPath={`aboutPage.difference.points.${i}`} value={pt} multiline={false} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section className="section-pad py-24 md:py-48 bg-brand-paper border-t border-brand-ink border-opacity-5">
        {page.founders.map((founder: any, i: number) => (
          <div key={i} className={`grid md:grid-cols-12 gap-16 md:gap-24 items-center ${i === 0 ? 'mb-32 md:mb-56' : ''}`}>
            <div className={`md:col-span-5 ${i === 1 ? 'md:order-2' : ''}`}>
              <img src={i === 0 ? "/assets/shervin.png" : "/assets/marzieh.png"} alt={founder.name} className="w-full aspect-[4/5] object-cover grayscale" />
            </div>
            <div className={`md:col-span-7 ${i === 1 ? 'md:order-1' : ''}`}>
              <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">Co-Founder</span>
              <h2 className="font-heading text-5xl md:text-7xl leading-none mb-10">
                <InlineEditable contentPath={`aboutPage.founders.${i}.name`} value={founder.name} multiline={false} />
              </h2>
              <p className="text-brand-red font-bold uppercase tracking-[0.2em] text-xs mb-10">
                <InlineEditable contentPath={`aboutPage.founders.${i}.role`} value={founder.role} multiline={false} />
              </p>
              <div className="max-w-2xl space-y-8 text-brand-muted leading-relaxed text-lg">
                {founder.bio.map((p: string, j: number) => (
                  <p key={j}>
                    <InlineEditable contentPath={`aboutPage.founders.${i}.bio.${j}`} value={p} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PRINCIPLES SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-ink text-brand-paper border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-[1px] bg-brand-paper opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-mint uppercase">Values</span>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              <InlineEditable contentPath="aboutPage.principles.title" value={page.principles.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0 grid sm:grid-cols-2 gap-x-12 gap-y-16">
            {page.principles.items.map((item: any, i: number) => (
              <div key={i}>
                <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-brand-mint opacity-60 mb-6">/ {item.id}</p>
                <p className="font-heading text-3xl mb-4 italic text-brand-mint">
                  <InlineEditable contentPath={`aboutPage.principles.items.${i}.title`} value={item.title} multiline={false} />
                </p>
                <p className="text-lg text-brand-mint opacity-80 leading-relaxed">
                  <InlineEditable contentPath={`aboutPage.principles.items.${i}.desc`} value={item.desc} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLE CALLOUT */}
      <section className="section-pad py-40 md:py-64 bg-brand-ink text-brand-paper border-t border-brand-paper border-opacity-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-num text-brand-mint mb-10 block uppercase tracking-[0.4em] text-[12px]">The Fardoy Principle</span>
          <h2 className="font-heading text-5xl md:text-[8vw] leading-[0.9] tracking-tight italic mb-8">
            <InlineEditable contentPath="aboutPage.callout.quote" value={page.callout.quote} />
          </h2>
          <p className="text-xl md:text-2xl text-brand-mint opacity-60 max-w-xl mx-auto italic mb-12">
            <InlineEditable contentPath="aboutPage.callout.subquote" value={page.callout.subquote} />
          </p>
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-brand-mint opacity-40 mb-4">The next step</p>
          <p className="text-brand-paper font-heading text-2xl md:text-3xl max-w-lg mx-auto leading-relaxed">
            <InlineEditable contentPath="aboutPage.callout.cta" value={page.callout.cta} />
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
