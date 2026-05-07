'use client'
import React, { useState, useRef } from 'react'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useDraft } from './DraftContext'
import { Upload, X, Image as ImageIcon, Trash2, Check } from 'lucide-react'
import { MediaLibrary } from './MediaLibrary'

type Props = {
  contentPath: string
  value: string
  alt?: string
  className?: string
  aspectRatio?: string
}

export function ImageEditable({ contentPath, value: initialValue, alt, className, aspectRatio = 'aspect-video' }: Props) {
  const { isAdmin } = useIsAdmin()
  const { updateDraft, pendingChanges } = useDraft()
  const [showManager, setShowManager] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [loadingImages, setLoadingImages] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const draftValue = pendingChanges[contentPath]
  const currentValue = draftValue !== undefined ? draftValue : initialValue
  const isDirty = draftValue !== undefined

  const fetchImages = async () => {
    setLoadingImages(true)
    try {
      const res = await fetch('/api/admin/images')
      const data = await res.json()
      if (Array.isArray(data)) {
        setExistingImages(data)
      }
    } catch (err) {
      console.error('Failed to fetch images', err)
    } finally {
      setLoadingImages(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const response = await fetch(`/api/admin/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      })
      const newBlob = await response.json()
      if (newBlob.url) {
        updateDraft(contentPath, newBlob.url)
        setShowManager(false)
      }
    } catch (err) {
      console.error('Upload failed', err)
      alert('Upload failed. Check console for details.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm('Are you sure you want to delete this image? This will remove it from the server.')) return
    
    try {
      await fetch(`/api/admin/images?url=${url}`, { method: 'DELETE' })
      setExistingImages(existingImages.filter(img => img.url !== url))
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const selectImage = (url: string) => {
    updateDraft(contentPath, url)
    setShowManager(false)
  }

  if (!isAdmin) {
    return <img src={currentValue} alt={alt} className={className} />
  }

  return (
    <div className={`relative group/img ${className}`}>
      <img 
        src={currentValue} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity ${isDirty ? 'opacity-80' : ''}`} 
      />
      
      {/* Admin Overlay */}
      <div 
        onClick={(e) => {
          e.preventDefault();
          setShowManager(true);
          fetchImages();
        }}
        className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10 cursor-pointer rounded-inherit"
        title="Change Image"
      >
        <div className="bg-brand-red text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-ink transition-colors">
          <ImageIcon size={16} />
        </div>
      </div>

      {/* Dirty Indicator */}
      {isDirty && (
        <div className="absolute top-2 right-2 bg-brand-red text-white w-6 h-6 flex items-center justify-center rounded-full text-xs shadow-lg z-20 border-2 border-white">
          ●
        </div>
      )}

      <MediaLibrary 
        isOpen={showManager} 
        onClose={() => setShowManager(false)} 
        onSelect={selectImage}
        currentUrl={currentValue}
      />
    </div>
  )
}
