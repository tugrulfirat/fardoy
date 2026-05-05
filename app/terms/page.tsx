'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { InlineEditable } from '@/components/InlineEditable'
import { useSiteContent } from '@/components/SiteContentContext'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useDraft } from '@/components/DraftContext'

export default function Terms() {
  const content = useSiteContent()
  const { isAdmin } = useIsAdmin()
  const { updateDraft } = useDraft()
  const page = content?.termsPage

  if (!page) {
    return (
      <main className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="animate-pulse text-brand-muted uppercase tracking-widest text-xs">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <Header />
      
      <section className="section-pad pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-[1px] bg-brand-ink opacity-20"></div>
            <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-red">
              <InlineEditable contentPath="termsPage.lastUpdated" value={page.lastUpdated} multiline={false} />
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl leading-tight mb-12">
            <InlineEditable contentPath="termsPage.title" value={page.title} />
          </h1>
          <p className="font-heading text-2xl md:text-3xl leading-snug mb-20 italic text-brand-muted">
            <InlineEditable contentPath="termsPage.intro" value={page.intro} />
          </p>

          <div className="space-y-16">
            {page.sections.map((section: any, i: number) => (
              <div key={i} className="border-t border-brand-ink border-opacity-10 pt-12 relative group">
                {isAdmin && (
                  <button 
                    onClick={() => {
                      if (confirm('Delete this section?')) {
                        const newSections = page.sections.filter((_: any, index: number) => index !== i)
                        updateDraft('termsPage.sections', newSections)
                      }
                    }}
                    className="absolute -right-8 top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-red text-white w-6 h-6 flex items-center justify-center text-xs hover:bg-brand-ink"
                    title="Delete Section"
                  >
                    ×
                  </button>
                )}
                <h2 className="font-heading text-2xl md:text-3xl mb-6">
                  <InlineEditable contentPath={`termsPage.sections.${i}.title`} value={section.title} multiline={false} />
                </h2>
                <div className="text-brand-muted leading-relaxed text-lg whitespace-pre-line">
                  <InlineEditable contentPath={`termsPage.sections.${i}.content`} value={section.content} />
                </div>
              </div>
            ))}

            {isAdmin && (
              <div className="pt-12 border-t border-brand-ink border-opacity-10">
                <button 
                  onClick={() => {
                    const newSections = [...page.sections, { title: "New Section Title", content: "New section content goes here..." }]
                    updateDraft('termsPage.sections', newSections)
                  }}
                  className="bg-brand-ink text-brand-paper px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-brand-red transition-colors"
                >
                  + Add New Section
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
