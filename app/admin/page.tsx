'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        localStorage.setItem('fardoy_pw', password)
        // Trigger storage event for same-tab updates
        window.dispatchEvent(new Event('storage'))
        router.push('/')
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-brand-paper flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-12 border border-brand-ink/10 shadow-2xl">
        <h1 className="font-heading text-4xl mb-8 text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-brand-muted mb-2">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-brand-ink/20 py-3 font-heading text-2xl outline-none focus:border-brand-red transition-colors"
              placeholder="••••••••"
              required
              disabled={loading}
            />
            {error && <p className="mt-2 text-[10px] text-brand-red font-bold uppercase tracking-widest">{error}</p>}
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all ${loading ? 'bg-brand-muted cursor-not-allowed' : 'bg-brand-ink text-brand-paper hover:bg-brand-red'}`}
          >
            {loading ? 'Verifying...' : 'Unlock Site'}
          </button>
        </form>
        <p className="mt-8 text-[10px] text-center text-brand-muted uppercase tracking-widest leading-relaxed">
          Unlock the site to enable direct inline editing of all content blocks.
        </p>
      </div>
    </main>
  )
}
