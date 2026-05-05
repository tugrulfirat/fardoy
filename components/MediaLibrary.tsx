'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Upload, X, Trash2, Check, Search, Filter, Image as ImageIcon } from 'lucide-react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect?: (url: string) => void
  currentUrl?: string
}

export function MediaLibrary({ isOpen, onClose, onSelect, currentUrl }: Props) {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) fetchImages()
  }, [isOpen])

  const fetchImages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/images')
      const data = await res.json()
      if (Array.isArray(data)) setImages(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await fetch(`/api/admin/upload?filename=${file.name}`, { method: 'POST', body: file })
      const blob = await res.json()
      if (blob.url) {
        setImages([blob, ...images])
        if (onSelect) onSelect(blob.url)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm('Delete this asset permanently?')) return
    try {
      const res = await fetch(`/api/admin/images?url=${url}`, { method: 'DELETE' })
      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || 'Failed to delete image.')
        return
      }
      setImages(images.filter(img => img.url !== url))
    } catch (err) {
      console.error(err)
      alert('Network error while deleting.')
    }
  }

  const filteredImages = images.filter(img => 
    img.pathname.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 z-[500] flex items-center justify-center p-4 md:p-12 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-brand-paper w-full max-w-7xl h-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-brand-ink/10">
        
        {/* Header */}
        <div className="p-8 border-b border-brand-ink/10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <ImageIcon className="text-brand-red" size={24} />
              <h3 className="font-heading text-4xl text-brand-ink">Media Library</h3>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted">Manage your global brand assets</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
              <input 
                type="text"
                placeholder="Search assets..."
                className="bg-brand-cream/50 border border-brand-ink/10 py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-red w-full md:w-64"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button onClick={onClose} className="bg-brand-ink text-white p-3 hover:bg-brand-red transition-all">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 bg-[#fdfcf9]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            
            {/* Upload Box */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="aspect-square bg-white border-2 border-dashed border-brand-ink/10 flex flex-col items-center justify-center gap-4 hover:border-brand-red hover:bg-white transition-all group shadow-sm"
            >
              <div className={`p-5 rounded-full ${uploading ? 'bg-brand-red/10 animate-pulse' : 'bg-brand-cream group-hover:bg-brand-red/10'}`}>
                <Upload className={uploading ? 'animate-bounce text-brand-red' : 'text-brand-ink group-hover:text-brand-red'} size={32} />
              </div>
              <span className="text-[11px] uppercase font-black tracking-widest text-brand-ink text-center px-4">
                {uploading ? 'Uploading...' : 'Upload New Asset'}
              </span>
              <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
            </button>

            {/* Images */}
            {loading ? (
              <div className="col-span-full py-32 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin"></div>
                <span className="text-brand-muted font-heading text-xl italic">Fetching your library...</span>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="col-span-full py-32 text-center text-brand-muted italic">No assets found matching your search.</div>
            ) : (
              filteredImages.map((img) => (
                <div 
                  key={img.url} 
                  className={`relative group aspect-square bg-white border p-1 transition-all duration-500 overflow-hidden shadow-sm
                    ${currentUrl === img.url ? 'border-brand-red ring-2 ring-brand-red ring-opacity-20' : 'border-brand-ink/5'}
                  `}
                >
                  <img src={img.url} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-brand-ink/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    {onSelect && (
                      <button 
                        onClick={() => onSelect(img.url)}
                        className="w-full py-2 bg-white text-brand-ink text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-mint"
                      >
                        <Check size={14} /> Select
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(img.url)}
                      className="w-full py-2 bg-brand-red/20 border border-brand-red/30 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-red"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                    <a 
                      href={img.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[9px] text-white/40 hover:text-white underline tracking-tighter"
                    >
                      View Source
                    </a>
                  </div>

                  {currentUrl === img.url && (
                    <div className="absolute top-3 left-3 bg-brand-red text-white px-2 py-1 text-[8px] font-black uppercase shadow-lg">Active</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-brand-ink/10 flex justify-between items-center">
          <p className="text-[11px] text-brand-muted font-medium tracking-wide">
            Total Library Size: <span className="text-brand-ink font-bold">{images.length} assets</span>
          </p>
          <button onClick={onClose} className="px-12 py-4 bg-brand-ink text-white text-[11px] font-bold uppercase tracking-widest hover:bg-brand-red transition-all">
            Close Library
          </button>
        </div>
      </div>
    </div>
  )
}
