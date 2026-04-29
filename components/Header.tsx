'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`section-pad py-8 md:py-10 flex items-center justify-between sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-red py-4 shadow-lg' : 'bg-brand-paper'}`}>
      <Link href="/" className="block w-24 md:w-32">
        <img 
          src="/assets/logo-dark.svg" 
          alt="Fardoy" 
          className={`w-full transition-all duration-500 ${isScrolled ? 'invert brightness-0' : ''}`}
        />
      </Link>
      <nav className="flex items-center gap-4 md:gap-10">
        <Link href="/services" className={`text-[12px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${isScrolled ? 'text-white hover:text-brand-paper' : 'text-brand-ink hover:text-brand-red'}`}>
          Expertise
        </Link>
        <Link href="/about" className={`text-[12px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${isScrolled ? 'text-white hover:text-brand-paper' : 'text-brand-ink hover:text-brand-red'}`}>
          About
        </Link>
        <Link href="/consultation" className={`text-[12px] uppercase tracking-[0.3em] font-bold px-6 py-3 transition-all duration-500 ${isScrolled ? 'bg-white text-brand-red hover:bg-brand-paper' : 'bg-brand-red text-white hover:bg-brand-ink'}`}>
          Inquire
        </Link>
      </nav>
    </header>
  )
}
