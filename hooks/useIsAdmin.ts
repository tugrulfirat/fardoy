'use client'
import { useEffect, useState } from 'react'

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    function check() {
      const pw = localStorage.getItem('fardoy_pw')
      // Any non-empty password stored means the user logged in successfully
      setIsAdmin(!!pw && pw.length > 0)
    }
    check()
    window.addEventListener('storage', check)
    return () => window.removeEventListener('storage', check)
  }, [])

  return { isAdmin }
}
