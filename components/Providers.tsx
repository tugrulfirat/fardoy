'use client'
import { SiteContentProvider } from './SiteContentContext'
import { DraftProvider } from './DraftContext'
import AdminToolbar from './AdminToolbar'
import { AdminHeader } from './AdminHeader'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteContentProvider>
      <DraftProvider>
        <AdminHeader />
        {children}
        <AdminToolbar />
      </DraftProvider>
    </SiteContentProvider>
  )
}
