'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { ImageEditable } from '@/components/ImageEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useDraft } from '@/components/DraftContext'
import { siteContent as staticContent } from '@/data/siteContent'
import Link from 'next/link'

export default function About() {
  const content = useSiteContent()
  const { isAdmin } = useIsAdmin()
  const { updateDraft } = useDraft()
  const principlesRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: principlesRef,
    offset: ["start start", "end end"]
  })

  // Only slide if on mobile. On desktop, we keep it static.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

  if (!content?.aboutPage) {
    return (
      <main className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="animate-pulse text-brand-muted uppercase tracking-widest text-xs">Loading...</div>
      </main>
    )
  }

  const page = content.aboutPage
  const principleItems = page.principles.items.length >= staticContent.aboutPage.principles.items.length
    ? page.principles.items
    : staticContent.aboutPage.principles.items.map((fallbackItem, i) => ({
        ...fallbackItem,
        ...page.principles.items[i],
      }))

  return (
    <main className="min-h-screen bg-brand-paper">
      <Header />
      
      {/* PHILOSOPHY HERO */}
      <section className="section-pad pt-20 md:pt-28 pb-16 md:pb-20 bg-brand-paper relative overflow-hidden">
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
              <div className="font-body text-base md:text-lg leading-relaxed text-brand-muted">
                <InlineEditable contentPath="aboutPage.hero.subheadline" value={page.hero.subheadline} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK SECTION (APPROACH) */}
      <section className="section-pad py-24 md:py-40 bg-brand-ink text-brand-paper overflow-hidden relative">
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
                  <div>
                    <InlineEditable contentPath={`aboutPage.approach.paragraphs.${i}`} value={p} />
                  </div>
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
      <section className="section-pad py-24 md:py-40 bg-brand-cream">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <span className="section-num mb-6 block uppercase tracking-widest text-[12px]">
              <InlineEditable contentPath="aboutPage.difference.label" value={page.difference.label} multiline={false} />
            </span>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              <InlineEditable contentPath="aboutPage.difference.title" value={page.difference.title} />
            </h2>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-24">
            <div className="font-body text-xl md:text-2xl text-brand-muted leading-relaxed mb-12 max-w-2xl">
              <InlineEditable contentPath="aboutPage.difference.headline" value={page.difference.headline} />
            </div>
            <div className="font-body text-lg text-brand-muted leading-relaxed mb-16 max-w-xl">
              <InlineEditable contentPath="aboutPage.difference.desc" value={page.difference.desc} />
            </div>
            <div className="grid sm:grid-cols-3 gap-8 border-t border-brand-ink border-opacity-10 pt-12">
              {page.difference.points.map((pt: any, i: number) => (
                <div key={i} className="relative group">
                  <p className="text-[12px] uppercase tracking-widest font-bold text-brand-red mb-4">0{i+1}</p>
                  <p className="text-sm font-bold leading-tight mb-2">
                    <InlineEditable contentPath={`aboutPage.difference.points.${i}.title`} value={pt.title} multiline={false} />
                  </p>
                  <div className="text-xs text-brand-muted leading-relaxed">
                    <InlineEditable contentPath={`aboutPage.difference.points.${i}.desc`} value={pt.desc} />
                  </div>
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
      <section id="team" className="section-pad pt-24 pb-12 bg-brand-paper">
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
                  <div key={j}>
                    <InlineEditable contentPath={`aboutPage.founders.${i}.bio.${j}`} value={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PRINCIPLES SECTION */}
      <div ref={principlesRef} className={`relative bg-[#2b3832] ${isMounted && isMobile ? 'h-[300vh]' : 'h-auto'}`}>
        <section className={`${isMounted && isMobile ? 'sticky top-0 h-screen flex flex-col justify-center' : 'py-24 md:py-32'} bg-[#2b3832] text-brand-paper overflow-hidden`}>
          <div className="section-pad mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-mint mb-8 block text-center">
              <InlineEditable contentPath="aboutPage.principles.label" value={page.principles.label} multiline={false} />
            </span>
            <h2 className="font-heading text-5xl md:text-7xl leading-none max-w-3xl text-center mx-auto text-brand-paper">
              <InlineEditable contentPath="aboutPage.principles.title" value={page.principles.title} />
            </h2>
          </div>
          <div className={`section-pad pb-8 scrollbar-hide ${isMounted && isMobile ? 'overflow-x-auto' : 'overflow-x-auto md:overflow-visible'}`}>
            <motion.div 
              style={isMounted && isMobile ? { x } : {}} 
              className={`flex gap-6 lg:gap-8 ${isMounted && isMobile ? 'w-max' : 'w-max lg:w-full lg:justify-center'}`}
            >
              {principleItems.map((item: any, i: number) => (
                <article key={item.id} className="principle-card w-[280px] md:w-[340px] bg-brand-ink p-8 flex flex-col shadow-2xl flex-shrink-0">
                  <div className="h-24 flex items-end gap-3 text-brand-red">
                    {i === 0 && <><span className="w-16 h-16 rounded-full border border-current"></span><span className="w-16 h-16 bg-current"></span></>}
                    {i === 1 && <><span className="w-16 h-16 rounded-full bg-current"></span><span className="w-28 h-16 rounded-full border border-current"></span></>}
                    {i === 2 && <><span className="w-20 h-16 rounded-t-full border border-current"></span><span className="w-16 h-16 rounded-full bg-current"></span><span className="w-16 h-16 rounded-br-full border border-current"></span></>}
                    {i === 3 && <><span className="w-24 h-16 rounded-l-full bg-current"></span><span className="w-16 h-16 border border-current rotate-45"></span></>}
                    {i === 4 && <><span className="w-16 h-16 border border-current"></span><span className="w-16 h-16 rounded-full border border-current"></span><span className="w-16 h-16 rounded-full bg-current"></span></>}
                  </div>
                  <div className="mt-12">
                    <p className="text-[10px] font-bold tracking-widest opacity-30 mb-8 uppercase">/ {item.id}</p>
                    <h3 className="font-heading text-4xl mb-5">
                      <InlineEditable contentPath={`aboutPage.principles.items.${i}.title`} value={item.title} multiline={false} />
                    </h3>
                    <div className="text-sm text-brand-mint leading-relaxed">
                      <InlineEditable contentPath={`aboutPage.principles.items.${i}.desc`} value={item.desc} />
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* PRINCIPLE CALLOUT */}
      <section className="section-pad py-40 md:py-64 bg-brand-ink text-brand-paper">
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-num text-brand-mint mb-10 block uppercase tracking-[0.4em] text-[12px]">
            <InlineEditable contentPath="aboutPage.callout.label" value={page.callout.label} multiline={false} />
          </span>
          <h2 className="font-heading text-5xl md:text-[8vw] leading-[0.9] tracking-tight italic mb-8">
            <InlineEditable contentPath="aboutPage.callout.quote" value={page.callout.quote} />
          </h2>
          <div className="text-xl md:text-2xl text-brand-mint opacity-60 max-w-xl mx-auto italic mb-0">
            <InlineEditable contentPath="aboutPage.callout.subquote" value={page.callout.subquote} />
          </div>
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-brand-mint opacity-40 mt-24 mb-6">The next step</p>
          <div className="text-brand-paper font-heading text-2xl md:text-3xl max-w-lg mx-auto leading-relaxed">
            <InlineEditable contentPath="aboutPage.callout.cta" value={page.callout.cta} />
          </div>
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
