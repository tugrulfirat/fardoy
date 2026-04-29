'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password) {
      localStorage.setItem('fardoy_pw', password)
      router.push('/')
      // Trigger storage event for same-tab updates
      window.dispatchEvent(new Event('storage'))
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
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-ink text-brand-paper py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-red transition-all"
          >
            Unlock Site
          </button>
        </form>
        <p className="mt-8 text-[10px] text-center text-brand-muted uppercase tracking-widest leading-relaxed">
          Unlock the site to enable direct inline editing of all content blocks.
        </p>
      </div>
    </main>
  )
}
