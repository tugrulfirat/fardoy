'use client'
import { SiteContentProvider } from './SiteContentContext'
import { DraftProvider } from './DraftContext'
import AdminToolbar from './AdminToolbar'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteContentProvider>
      <DraftProvider>
        {children}
        <AdminToolbar />
      </DraftProvider>
    </SiteContentProvider>
  )
}
