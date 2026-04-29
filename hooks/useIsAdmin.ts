'use client'
import { useEffect, useState } from 'react'

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    function check() {
      const pw = localStorage.getItem('fardoy_pw')
      // Note: Real security is on the backend, this is for UI logic
      setIsAdmin(!!pw && (pw === 'fardoy26ms' || pw.length > 5))
    }
    check()
    window.addEventListener('storage', check)
    return () => window.removeEventListener('storage', check)
  }, [])

  return { isAdmin }
}
