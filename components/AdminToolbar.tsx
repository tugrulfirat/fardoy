'use client'
import { useDraft } from './DraftContext'
import { useIsAdmin } from '@/hooks/useIsAdmin'

export default function AdminToolbar() {
  const { isAdmin } = useIsAdmin()
  const { hasChanges, pendingChanges, saveDraft, discardDraft, isSaving } = useDraft()

  if (!isAdmin || !hasChanges) return null

  const count = Object.keys(pendingChanges).length

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 flex justify-center pointer-events-none">
      <div className="admin-toolbar flex items-center gap-3 bg-[#21312b] text-[#fbf8ea] pr-2 pl-6 py-3 rounded-none border border-[#fbf8ea]/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#ef4d38] leading-tight">Draft Mode</span>
          <span className="text-xs font-bold leading-tight uppercase tracking-widest">
            {count} {count === 1 ? 'change' : 'changes'} pending
          </span>
        </div>
        
        <div className="flex items-center gap-2 ml-6">
          <button 
            onClick={discardDraft}
            disabled={isSaving}
            className="px-4 py-2 text-[11px] uppercase tracking-widest font-bold text-[#fbf8ea] hover:text-white opacity-60 hover:opacity-100 transition-opacity"
          >
            Discard
          </button>
          <button 
            onClick={() => saveDraft()}
            disabled={isSaving}
            className="px-6 py-2 bg-[#ef4d38] text-white text-[11px] uppercase tracking-widest font-black rounded-none hover:bg-[#d43d2b] transition-all flex items-center gap-2 shadow-lg"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Publishing...
              </>
            ) : (
              'Publish to Live'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
