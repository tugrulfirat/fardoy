'use client'
import React, { createContext, useContext, useState } from 'react'
import { siteContent as staticContent } from '@/data/siteContent'

type SiteContent = typeof staticContent

const SiteContentContext = createContext<SiteContent>(staticContent)

export function SiteContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode
  initialContent: SiteContent
}) {
  const [content] = useState<SiteContent>(initialContent)

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  return useContext(SiteContentContext)
}
