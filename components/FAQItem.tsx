'use client'
import { useState } from 'react'

export function FAQItem({ q, a, questionNode, answerNode }: { q?: string, a?: string, questionNode?: React.ReactNode, answerNode?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="faq-item py-10 border-b border-brand-ink border-opacity-10 cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-heading text-2xl md:text-3xl group-hover:text-brand-red transition-colors">
          {questionNode || q}
        </h3>
        <span className={`faq-icon transition-transform duration-500 transform ${isOpen ? 'rotate-45' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </span>
      </div>
      <div 
        className="faq-answer overflow-hidden transition-all duration-500"
        style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? '1' : '0', marginTop: isOpen ? '1.25rem' : '0' }}
      >
        <div className="font-body text-sm text-brand-muted leading-relaxed max-w-xl">
          {answerNode || a}
        </div>
      </div>
    </div>
  )
}
