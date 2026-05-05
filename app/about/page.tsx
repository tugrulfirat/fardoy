'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { ImageEditable } from '@/components/ImageEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useDraft } from '@/components/DraftContext'
import Link from 'next/link'

export default function About() {
  const content = useSiteContent()
  const { isAdmin } = useIsAdmin()
  const { updateDraft } = useDraft()

  if (!content?.aboutPage) {
    return (
      <main className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="animate-pulse text-brand-muted uppercase tracking-widest text-xs">Loading...</div>
      </main>
    )
  }

  const page = content.aboutPage

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* PHILOSOPHY HERO */}
      <section className="section-pad pt-20 md:pt-28 pb-16 md:pb-20 bg-brand-paper relative overflow-hidden">
        <div className="hidden lg:block absolute right-[6vw] bottom-8 pointer-events-none z-0 text-right select-none">
          <div className="font-body font-extralight text-[16vw] leading-none text-brand-ink opacity-[0.045]">
            01
          </div>
          <div className="-mt-6 text-[11px] uppercase tracking-[0.45em] font-bold text-brand-red opacity-70">
            Approach
          </div>
        </div>
        <div className="grid md:grid-cols-12 gap-10 relative z-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
              <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted uppercase">
                <InlineEditable contentPath="aboutPage.hero.label" value={page.hero.label} multiline={false} />
              </span>
            </div>
            <h1 className="font-heading text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tight">
              <InlineEditable contentPath="aboutPage.hero.headline" value={page.hero.headline} />
            </h1>
            <div className="mt-10 md:mt-14 max-w-2xl border-l border-brand-ink/15 pl-6">
              <p className="font-body text-base md:text-lg leading-relaxed text-brand-muted">
                <InlineEditable contentPath="aboutPage.hero.subheadline" value={page.hero.subheadline} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK SECTION (APPROACH) */}
      <section className="section-pad py-24 md:py-40 bg-brand-ink text-brand-paper overflow-hidden relative">
        {/* Subtle decorative background text */}
        <div className="absolute top-0 right-0 text-[30vw] font-heading opacity-[0.03] leading-none select-none translate-x-1/4 -translate-y-1/4 pointer-events-none">
          Approach
        </div>

        <div className="grid md:grid-cols-12 gap-16 md:gap-24 relative z-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-10">
              <div className="w-8 h-[1px] bg-brand-mint opacity-40"></div>
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-brand-mint uppercase opacity-70">
                <InlineEditable contentPath="aboutPage.approach.label" value={page.approach.label} multiline={false} />
              </span>
            </div>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-12">
              <InlineEditable contentPath="aboutPage.approach.title" value={page.approach.title} />
            </h2>
            <div className="w-20 h-1 bg-brand-red mb-12"></div>
          </div>
          <div className="md:col-span-7">
            <p className="font-heading text-3xl md:text-5xl leading-tight mb-16 italic text-brand-mint text-opacity-90">
              <InlineEditable contentPath="aboutPage.approach.italic" value={page.approach.italic} />
            </p>
            <div className="space-y-12 text-brand-paper text-opacity-70 leading-relaxed text-xl max-w-2xl">
              {page.approach.paragraphs.map((p: string, i: number) => (
                <div key={i} className="relative group">
                  <p>
                    <InlineEditable contentPath={`aboutPage.approach.paragraphs.${i}`} value={p} />
                  </p>
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        if (confirm('Delete this paragraph?')) {
                          const newParams = page.approach.paragraphs.filter((_: any, idx: number) => idx !== i)
                          updateDraft('aboutPage.approach.paragraphs', newParams)
                        }
                      }}
                      className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-red text-white w-6 h-6 flex items-center justify-center text-xs"
                      title="Delete Paragraph"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {isAdmin && (
                <div className="pt-8">
                  <button 
                    onClick={() => {
                      const newParams = [...page.approach.paragraphs, "New strategic paragraph content..."]
                      updateDraft('aboutPage.approach.paragraphs', newParams)
                    }}
                    className="bg-brand-mint text-brand-ink px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-brand-red hover:text-brand-paper transition-all"
                  >
                    + Add Paragraph
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OUR DIFFERENCE SECTION */}
      <section className="section-pad py-24 md:py-40 bg-brand-cream border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">
              <InlineEditable contentPath="aboutPage.difference.label" value={page.difference.label} multiline={false} />
            </span>
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
              {page.difference.points.map((pt: any, i: number) => (
                <div key={i} className="relative group">
                  <p className="text-[12px] uppercase tracking-widest font-bold text-brand-red mb-4">0{i+1}</p>
                  <p className="text-sm font-bold leading-tight mb-2">
                    <InlineEditable contentPath={`aboutPage.difference.points.${i}.title`} value={pt.title} multiline={false} />
                  </p>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    <InlineEditable contentPath={`aboutPage.difference.points.${i}.desc`} value={pt.desc} />
                  </p>
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        if (confirm('Remove this point?')) {
                          const newPoints = page.difference.points.filter((_: any, idx: number) => idx !== i)
                          updateDraft('aboutPage.difference.points', newPoints)
                        }
                      }}
                      className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-brand-red text-xs"
                      title="Remove Point"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              {isAdmin && (
                <div className="flex items-center">
                  <button 
                    onClick={() => {
                      const newPoints = [...page.difference.points, { title: "New Point", desc: "Description of your unique differentiator." }]
                      updateDraft('aboutPage.difference.points', newPoints)
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                  >
                    + Add Point
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM HEADER */}
      <section id="team" className="section-pad pt-24 pb-12 bg-brand-paper border-t border-brand-ink border-opacity-5">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">
              <InlineEditable contentPath="aboutPage.team.label" value={page.team.label} multiline={false} />
            </span>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              <InlineEditable contentPath="aboutPage.team.title" value={page.team.title} />
            </h2>
          </div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <section className="section-pad pb-24 md:pb-48 bg-brand-paper">
        {page.founders.map((founder: any, i: number) => (
          <div key={i} className={`grid md:grid-cols-12 gap-16 md:gap-24 items-center ${i === 0 ? 'mb-32 md:mb-56' : ''}`}>
            <div className={`md:col-span-5 ${i === 1 ? 'md:order-2' : ''}`}>
              <ImageEditable 
                contentPath={`aboutPage.founders.${i}.image`} 
                value={founder.image} 
                alt={founder.name} 
                className="w-full aspect-[4/5] object-cover grayscale"
              />
            </div>
            <div className={`md:col-span-7 ${i === 1 ? 'md:order-1' : ''}`}>
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
      <section className="py-24 md:py-32 bg-brand-ink text-brand-paper overflow-hidden">
        <div className="section-pad mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-mint mb-8 block text-center">
            <InlineEditable contentPath="aboutPage.principles.label" value={page.principles.label} multiline={false} />
          </span>
          <h2 className="font-heading text-5xl md:text-7xl leading-none max-w-3xl text-center mx-auto">
            <InlineEditable contentPath="aboutPage.principles.title" value={page.principles.title} />
          </h2>
        </div>
        <div className="section-pad overflow-x-auto pb-4">
          <div className="flex gap-6 lg:justify-center w-max lg:w-full">
            {page.principles.items.map((item: any, i: number) => (
              <article key={item.id} className="principle-card w-[280px] md:w-[340px] bg-[#2b3832] p-8 flex flex-col justify-between">
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
                  {i === 4 && (
                    <>
                      <span className="w-16 h-16 border border-current"></span>
                      <span className="w-16 h-16 rounded-full border border-current"></span>
                      <span className="w-16 h-16 rounded-full bg-current"></span>
                    </>
                  )}
                </div>
                <div className="mt-16">
                  <p className="text-xs opacity-50 mb-8">/ {item.id}</p>
                  <h3 className="font-heading text-4xl mb-5">
                    <InlineEditable contentPath={`aboutPage.principles.items.${i}.title`} value={item.title} multiline={false} />
                  </h3>
                  <p className="text-sm text-brand-mint leading-relaxed">
                    <InlineEditable contentPath={`aboutPage.principles.items.${i}.desc`} value={item.desc} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLE CALLOUT */}
      <section className="section-pad py-40 md:py-64 bg-brand-ink text-brand-paper border-t border-brand-paper border-opacity-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-num text-brand-mint mb-10 block uppercase tracking-[0.4em] text-[12px]">
            <InlineEditable contentPath="aboutPage.callout.label" value={page.callout.label} multiline={false} />
          </span>
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
          <div className="mt-16 flex justify-center">
            <Link href="/consultation" className="w-32 h-32 rounded-full bg-brand-red text-brand-paper flex items-center justify-center text-[12px] uppercase tracking-[0.2em] font-bold text-center leading-relaxed hover:bg-brand-paper hover:text-brand-ink transition-colors px-4">
              <InlineEditable contentPath="aboutPage.callout.buttonText" value={page.callout.buttonText} multiline={false} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
