'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { siteContent as staticContent } from '@/data/siteContent'

const SiteContentContext = createContext<any>(staticContent)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<any>(staticContent)

  useEffect(() => {
    // After hydration, fetch the live JSON content so edits are reflected
    fetch('/api/admin/content', { cache: 'no-store' })
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((data) => {
        if (data && !data.error) {
          setContent(data)
        }
      })
      .catch(() => {
        // Silently fall back to static content if fetch fails
      })
  }, [])

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  return useContext(SiteContentContext)
}
