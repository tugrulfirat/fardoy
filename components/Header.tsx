'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Hysteresis prevents "shaking" by having different on/off points
      if (window.scrollY > 80) {
        setIsScrolled(true)
      } else if (window.scrollY < 20) {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textColor = isScrolled ? 'text-white hover:text-brand-paper' : 'text-brand-ink hover:text-brand-red'
  const ctaColor = isScrolled ? 'bg-white text-brand-red hover:bg-brand-paper' : 'bg-brand-red text-white hover:bg-brand-ink'

  return (
    <header className={`section-pad sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-in-out ${isScrolled ? 'bg-brand-red shadow-lg' : 'bg-brand-paper'}`}>
      <div className={`flex items-center justify-between transition-[padding] duration-500 ease-in-out ${isScrolled ? 'py-4' : 'py-5 md:py-10'}`}>
        <Link href="/" className="block w-28 md:w-32" onClick={() => setIsMenuOpen(false)}>
          <img
            src="/assets/logo-dark.svg"
            alt="Fardoy"
            className={`w-full transition-[filter] duration-500 ease-in-out ${isScrolled ? 'invert brightness-0' : ''}`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link href="/services" className={`text-[12px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${textColor}`}>
            Expertise
          </Link>
          <Link href="/about" className={`text-[12px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${textColor}`}>
            About
          </Link>
          <Link href="/consultation" className={`text-[12px] uppercase tracking-[0.3em] font-bold px-6 py-3 transition-[background-color,color] duration-500 ${ctaColor}`}>
            Inquire
          </Link>
        </nav>

        <button
          type="button"
          className={`md:hidden grid h-11 w-11 place-items-center border transition-colors duration-500 ${isScrolled ? 'border-white/35 text-white' : 'border-brand-ink/20 text-brand-ink'}`}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
        </button>
      </div>

      <nav
        className={`md:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        aria-label="Mobile navigation"
      >
        <div className="min-h-0">
          <div className={`border-t pb-5 pt-4 ${isScrolled ? 'border-white/20' : 'border-brand-ink/10'}`}>
            <Link href="/services" onClick={() => setIsMenuOpen(false)} className={`block py-3 text-[13px] uppercase tracking-[0.24em] font-bold transition-colors duration-500 ${textColor}`}>
              Expertise
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`block py-3 text-[13px] uppercase tracking-[0.24em] font-bold transition-colors duration-500 ${textColor}`}>
              About
            </Link>
            <Link href="/consultation" onClick={() => setIsMenuOpen(false)} className={`mt-3 flex h-12 w-full items-center justify-center text-[12px] uppercase tracking-[0.24em] font-bold transition-[background-color,color] duration-500 ${ctaColor}`}>
              Inquire
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
