'use client'
import React from 'react'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { LogOut, ShieldCheck, Image as ImageIcon } from 'lucide-react'
import { MediaLibrary } from './MediaLibrary'

export function AdminHeader() {
  const { isAdmin } = useIsAdmin()
  const [showLibrary, setShowLibrary] = React.useState(false)

  if (!isAdmin) return null

  const handleLogout = () => {
    localStorage.removeItem('fardoy_pw')
    window.location.reload()
  }

  return (
    <>
      <div className="bg-[#1a2521] text-[#fbf8ea] py-3 px-6 border-b border-white/10 flex justify-between items-center z-[200] relative">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#ef4d38]" />
            <span className="text-[10px] uppercase font-black tracking-[0.2em]">Fardoy Admin</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLibrary(true)}
              className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#fbf8ea]/60 hover:text-[#fbf8ea] transition-colors"
            >
              <ImageIcon size={14} />
              Media Library
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#fbf8ea]/40 hover:text-[#ef4d38] transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      <MediaLibrary isOpen={showLibrary} onClose={() => setShowLibrary(false)} />
    </>
  )
}
