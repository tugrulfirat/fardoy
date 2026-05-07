'use client'
import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
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
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null)
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
    try {
      const res = await fetch(`/api/admin/images?url=${url}`, { method: 'DELETE' })
      if (!res.ok) {
        const errorData = await res.json()
        alert(errorData.error || 'Failed to delete image.')
        return
      }
      setImages(images.filter(img => img.url !== url))
      setDeletingUrl(null)
    } catch (err) {
      console.error(err)
      alert('Network error while deleting.')
    }
  }

  const filteredImages = images.filter(img => 
    img.pathname.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  if (typeof document === 'undefined') return null

  return createPortal(
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6">
            
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
                  className={`relative group aspect-square bg-white border p-1 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md cursor-pointer
                    ${currentUrl === img.url ? 'border-brand-red ring-2 ring-brand-red ring-opacity-20' : 'border-brand-ink/5'}
                  `}
                  onClick={() => onSelect && onSelect(img.url)}
                >
                  <img 
                    src={img.url} 
                    alt={img.pathname}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                  />
                  
                  {/* Selection Indicator Overlay (Subtle) */}
                  <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Inline Delete Confirmation */}
                  {deletingUrl === img.url && (
                    <div className="absolute inset-0 bg-brand-red flex flex-col items-center justify-center p-2 z-20 animate-in fade-in zoom-in duration-200">
                      <Trash2 size={24} className="text-white mb-2" />
                      <p className="text-[9px] text-white font-black uppercase tracking-[0.2em] text-center mb-3">Permanently Delete?</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(img.url);
                          }}
                          className="bg-white text-brand-red px-3 py-1 text-[9px] font-black uppercase hover:bg-brand-ink hover:text-white transition-colors"
                        >
                          Yes
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingUrl(null);
                          }}
                          className="bg-brand-ink text-white px-3 py-1 text-[9px] font-black uppercase hover:bg-white hover:text-brand-ink transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {/* Only show delete if it's not a local asset */}
                    {!img.isLocal && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent selection
                          setDeletingUrl(img.url);
                        }}
                        className="p-2 bg-brand-red text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                        title="Delete Asset"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    
                    <a 
                      href={img.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-brand-ink text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
                      title="View Source"
                    >
                      <Search size={14} />
                    </a>
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                    {currentUrl === img.url && (
                      <div className="bg-brand-red text-white px-2 py-0.5 text-[8px] font-black uppercase shadow-lg">Active</div>
                    )}
                    {img.isLocal && (
                      <div className="bg-brand-ink text-white px-2 py-0.5 text-[8px] font-black uppercase shadow-lg opacity-60">System Asset</div>
                    )}
                  </div>
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
    </div>,
    document.body
  )
}
