'use client'
import React, { useEffect, useState } from 'react'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useDraft } from './DraftContext'

type Props = {
  contentPath: string
  value: string
  as?: React.ElementType
  className?: string
  multiline?: boolean
}

export function InlineEditable({ contentPath, value: initialValue, as = 'span', className, multiline = true }: Props) {
  const { isAdmin } = useIsAdmin()
  const { updateDraft, pendingChanges } = useDraft()
  const [editing, setEditing] = useState(false)
  
  // Use the value from draft if it exists, otherwise the initialValue
  const draftValue = pendingChanges[contentPath]
  const [value, setValue] = useState(draftValue !== undefined ? draftValue : initialValue)
  const isDirty = draftValue !== undefined

  useEffect(() => {
    if (!editing) {
      setValue(draftValue !== undefined ? draftValue : initialValue)
    }
  }, [draftValue, editing, initialValue])

  const Tag = as as any

  function handleOk() {
    updateDraft(contentPath, value)
    setEditing(false)
  }

  function handleCancel() {
    setValue(draftValue !== undefined ? draftValue : initialValue)
    setEditing(false)
  }

  // Non-admin: render plain
  if (!isAdmin) {
    const displayValue = draftValue !== undefined ? draftValue : initialValue
    return <Tag className={className} style={{ whiteSpace: 'pre-line' }}>{displayValue}</Tag>
  }

  // Editing mode
  if (editing) {
    return (
      <span 
        onClick={(e) => e.stopPropagation()} 
        style={{ display: 'inline-block', position: 'relative', minWidth: 120, zIndex: 50 }}
      >
        {multiline ? (
          <textarea
            autoFocus
            className="edit-outline"
            style={{ 
              width: '100%', 
              background: '#fbf8ea', 
              border: '2px solid #ef4d38', 
              borderRadius: 4, 
              padding: '8px 12px', 
              fontSize: '0.95em', 
              resize: 'vertical', 
              minHeight: 80, 
              color: '#21312b', 
              fontFamily: 'inherit', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
            }}
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={3}
          />
        ) : (
          <input
            autoFocus
            className="edit-outline"
            style={{ 
              background: '#fbf8ea', 
              border: '2px solid #ef4d38', 
              borderRadius: 4, 
              padding: '4px 12px', 
              fontSize: '0.95em', 
              color: '#21312b', 
              fontFamily: 'inherit', 
              width: '100%', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
            }}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        )}
        <span style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={handleCancel}
            style={{ 
              fontSize: 11, 
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'white', 
              border: '1px solid #ddd', 
              borderRadius: 0, 
              padding: '6px 16px', 
              cursor: 'pointer', 
              color: '#444', 
              fontWeight: 600
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            style={{ 
              fontSize: 11, 
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: '#ef4d38', 
              color: 'white', 
              border: '1px solid #ef4d38', 
              borderRadius: 0, 
              padding: '6px 20px', 
              fontWeight: 900, 
              cursor: 'pointer'
            }}
          >
            Confirm
          </button>
        </span>
      </span>
    )
  }

  const displayValue = draftValue !== undefined ? draftValue : initialValue

  // Admin mode — show pencil and highlight if dirty
  return (
    <span 
      onClickCapture={(e) => {
        // Intercept click at the CAPTURE phase to stop links from triggering
        e.preventDefault()
        e.stopPropagation()
        setEditing(true) 
      }}
      style={{ 
        position: 'relative', 
        display: 'inline-block',
        outline: isDirty ? '2px dashed #ef4d38' : 'none',
        outlineOffset: '4px',
        borderRadius: '2px',
        backgroundColor: isDirty ? 'rgba(239,77,56,0.05)' : 'transparent',
        cursor: 'pointer' 
      }}
      title="Click to edit"
    >
      <Tag className={className} style={{ whiteSpace: 'pre-line' }}>{displayValue}</Tag>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setEditing(true)
        }}
        className="edit-pencil-btn"
        style={{
          position: 'absolute',
          top: -10,
          right: -24,
          background: '#21312b',
          color: '#fbf8ea',
          border: 'none',
          borderRadius: 0,
          width: 22,
          height: 22,
          fontSize: 11,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          zIndex: 40,
        }}
        title={isDirty ? `Draft change: ${contentPath}` : `Edit: ${contentPath}`}
      >
        {isDirty ? '●' : '✎'}
      </button>
    </span>
  )
}
