'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface DraftContextType {
  pendingChanges: Record<string, any>
  updateDraft: (path: string, value: any) => void
  discardDraft: () => void
  saveDraft: () => Promise<boolean>
  isSaving: boolean
  hasChanges: boolean
}

const DraftContext = createContext<DraftContextType | undefined>(undefined)

export function DraftProvider({ children }: { children: React.ReactNode }) {
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({})
  const [isSaving, setIsSaving] = useState(false)

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('fardoy_draft')
    if (saved) {
      try {
        setPendingChanges(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse draft from localStorage', e)
      }
    }
  }, [])

  // Sync to localStorage
  useEffect(() => {
    if (Object.keys(pendingChanges).length > 0) {
      localStorage.setItem('fardoy_draft', JSON.stringify(pendingChanges))
    } else {
      localStorage.removeItem('fardoy_draft')
    }
  }, [pendingChanges])

  const updateDraft = (path: string, value: any) => {
    setPendingChanges(prev => ({
      ...prev,
      [path]: value
    }))
  }

  const discardDraft = () => {
    if (confirm('Are you sure you want to discard all unsaved changes?')) {
      setPendingChanges({})
      localStorage.removeItem('fardoy_draft')
    }
  }

  const saveDraft = async () => {
    if (Object.keys(pendingChanges).length === 0) return true
    
    setIsSaving(true)
    try {
      const pw = localStorage.getItem('fardoy_pw') || ''
      const res = await fetch('/api/admin/save-batch', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': pw 
        },
        body: JSON.stringify({ changes: pendingChanges }),
      })
      
      if (!res.ok) throw new Error('Save failed')
      
      const data = await res.json()
      if (data.ok) {
        setPendingChanges({})
        localStorage.removeItem('fardoy_draft')
        // Force refresh to see all changes site-wide
        window.location.reload()
        return true
      }
      return false
    } catch (err) {
      alert('Failed to save changes. Please check your connection and password.')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges = Object.keys(pendingChanges).length > 0

  return (
    <DraftContext.Provider value={{
      pendingChanges,
      updateDraft,
      discardDraft,
      saveDraft,
      isSaving,
      hasChanges
    }}>
      {children}
    </DraftContext.Provider>
  )
}

export function useDraft() {
  const context = useContext(DraftContext)
  if (context === undefined) {
    throw new Error('useDraft must be used within a DraftProvider')
  }
  return context
}
