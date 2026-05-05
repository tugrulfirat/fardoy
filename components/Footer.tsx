'use client'
import Link from 'next/link'
import { InlineEditable } from './InlineEditable'
import { ImageEditable } from './ImageEditable'
import { useSiteContent } from './SiteContentContext'

export default function Footer() {
  const content = useSiteContent()
  const footer = content.footer

  return (
    <footer className="section-pad bg-brand-paper text-brand-ink py-16 border-t border-brand-ink border-opacity-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="w-32 mb-8">
            <ImageEditable 
              contentPath="footer.logo" 
              value={footer.logo} 
              alt="Fardoy" 
              className="w-full h-auto"
            />
          </div>
          <div className="text-sm text-brand-muted leading-relaxed max-w-xs">
            <InlineEditable 
              contentPath="footer.tagline" 
              value={footer.tagline} 
            />
          </div>
        </div>
        <div className="md:col-span-2 md:col-start-6">
          <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted mb-5">Menu</p>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-brand-red">Home</Link></li>
            <li><Link href="/services" className="hover:text-brand-red">Expertise</Link></li>
            <li><Link href="/about" className="hover:text-brand-red">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-red">Contact</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[12px] uppercase tracking-[0.3em] font-bold text-brand-muted mb-5">Contact</p>
          <a href="mailto:hello@fardoy.com" className="font-heading text-3xl border-b border-brand-ink border-opacity-20 pb-1 hover:text-brand-red">hello@fardoy.com</a>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-brand-ink border-opacity-10 flex flex-col md:flex-row justify-between gap-6 text-[12px] uppercase tracking-[0.25em] text-brand-muted">
        <p>© 2025 Fardoy Strategic Consultancy</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-brand-red">Privacy</Link>
          <Link href="/terms" className="hover:text-brand-red">Terms</Link>
          <a href="https://www.linkedin.com/company/fardoy" target="_blank" className="hover:text-brand-red">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
