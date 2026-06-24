import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'

export function Login() {
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setSubmitting(false)
  }

  const inputClass = 'w-full bg-gray-900/40 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-orange-500/50 transition-all duration-200'

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
      <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(circle at 50% 20%, rgba(17,24,39,0.7), rgba(0,0,0,1))' }} />
      <div className="w-full max-w-sm space-y-8">
        <div>
          <span className="text-orange-500 font-mono text-sm block tracking-widest uppercase animate-pulse mb-4">
            &gt; Executing: auth.sh
          </span>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Rafael Bisso<span className="text-orange-500">.</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Acesso restrito</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
          {error && <p className="text-red-500 text-sm font-mono">&gt; {error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
