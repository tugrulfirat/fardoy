'use client'
import { SiteContentProvider } from './SiteContentContext'
import { DraftProvider } from './DraftContext'
import AdminToolbar from './AdminToolbar'
import { AdminHeader } from './AdminHeader'
import { siteContent as staticContent } from '@/data/siteContent'

type SiteContent = typeof staticContent

export function Providers({
  children,
  initialContent,
}: {
  children: React.ReactNode
  initialContent: SiteContent
}) {
  return (
    <SiteContentProvider initialContent={initialContent}>
      <DraftProvider>
        <AdminHeader />
        {children}
        <AdminToolbar />
      </DraftProvider>
    </SiteContentProvider>
  )
}
